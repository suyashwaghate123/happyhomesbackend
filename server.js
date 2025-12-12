const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');

// Load environment variables
dotenv.config();

// Import routes
const websiteRoutes = require('./routes/websiteRoutes');
const leadRoutes = require('./routes/leadRoutes');

const app = express();

// Middleware
// CORS configuration - allows your frontend domain(s)
// Set FRONTEND_URL in Render environment variables for production (e.g., "https://yourdomain.com")
// For multiple domains, separate with comma: "https://domain1.com,https://domain2.com"
// Helper function to normalize URLs (remove trailing slashes for CORS matching)
const normalizeOrigin = (url) => {
  if (!url) return url;
  return url.replace(/\/$/, ''); // Remove trailing slash
};

const corsOptions = {
  origin: function (origin, callback) {
    // Allow requests with no origin (mobile apps, curl, Postman, etc.)
    if (!origin) {
      return callback(null, true);
    }

    // Normalize the incoming origin (remove trailing slash)
    const normalizedOrigin = normalizeOrigin(origin);

    // If FRONTEND_URL is set, check against allowed origins
    if (process.env.FRONTEND_URL) {
      const allowedOrigins = process.env.FRONTEND_URL
        .split(',')
        .map(url => normalizeOrigin(url.trim())); // Normalize allowed origins too
      
      // Check if normalized origin is in allowed list
      if (allowedOrigins.includes(normalizedOrigin)) {
        callback(null, true);
      } else {
        // For now, allow all origins to avoid deployment issues
        // Can be restricted later by removing this fallback
        callback(null, true);
      }
    } else {
      // Allow all origins if FRONTEND_URL is not set (for easier deployment)
      callback(null, true);
    }
  },
  credentials: true
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// API Routes
app.use('/api/website', websiteRoutes);
app.use('/api/leads', leadRoutes);

// Health check route
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'Happy Homes API is running',
    database: mongoose.connection.readyState === 1 ? 'Connected' : 'Disconnected',
    timestamp: new Date().toISOString()
  });
});

// Database status route
app.get('/api/db-status', (req, res) => {
  const states = {
    0: 'Disconnected',
    1: 'Connected',
    2: 'Connecting',
    3: 'Disconnecting'
  };
  
  res.json({
    success: true,
    database: {
      status: states[mongoose.connection.readyState] || 'Unknown',
      readyState: mongoose.connection.readyState,
      host: mongoose.connection.host || 'N/A',
      name: mongoose.connection.name || 'N/A'
    }
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 
    success: false, 
    message: 'Something went wrong!',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ 
    success: false, 
    message: 'Route not found' 
  });
});

const PORT = process.env.PORT || 5000;

// MongoDB Connection
const connectDB = async () => {
  try {
    const mongoUri = process.env.MONGODB_URI;
    
    if (!mongoUri) {
      console.log('⚠️  MONGODB_URI not found in environment variables');
      console.log('📝 Running without MongoDB - using static data');
      console.log('💡 To enable MongoDB, create a .env file with MONGODB_URI');
      return false;
    }
    
    console.log('🔄 Connecting to MongoDB...');
    
    await mongoose.connect(mongoUri, {
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    });
    
    console.log('✅ MongoDB Connected Successfully');
    console.log(`📊 Database: ${mongoose.connection.name}`);
    console.log(`🌐 Host: ${mongoose.connection.host}`);
    
    // Handle connection events
    mongoose.connection.on('error', (err) => {
      console.error('❌ MongoDB connection error:', err.message);
    });
    
    mongoose.connection.on('disconnected', () => {
      console.log('⚠️  MongoDB disconnected');
    });
    
    mongoose.connection.on('reconnected', () => {
      console.log('✅ MongoDB reconnected');
    });
    
    return true;
  } catch (error) {
    console.error('❌ MongoDB Connection Failed:', error.message);
    console.log('📝 Falling back to static data');
    return false;
  }
};

// Graceful shutdown
const gracefulShutdown = async () => {
  console.log('\n🛑 Received shutdown signal...');
  
  try {
    await mongoose.connection.close();
    console.log('✅ MongoDB connection closed');
  } catch (error) {
    console.error('Error closing MongoDB connection:', error);
  }
  
  process.exit(0);
};

process.on('SIGINT', gracefulShutdown);
process.on('SIGTERM', gracefulShutdown);

// Start server
const startServer = async () => {
  const dbConnected = await connectDB();
  
  app.listen(PORT, () => {
    console.log('\n' + '='.repeat(50));
    console.log('🏠 Happy Homes API Server');
    console.log('='.repeat(50));
    console.log(`🚀 Server running on port ${PORT}`);
    console.log(`📡 API Base URL: http://localhost:${PORT}/api`);
    console.log(`💓 Health Check: http://localhost:${PORT}/api/health`);
    console.log(`📊 DB Status: http://localhost:${PORT}/api/db-status`);
    console.log(`💾 Database: ${dbConnected ? 'MongoDB Connected' : 'Using Static Data'}`);
    console.log('='.repeat(50) + '\n');
  });
};

startServer();

module.exports = app;
