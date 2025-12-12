// Quick test script to verify Visitor model and database connection
const mongoose = require('mongoose');
require('dotenv').config();

const uri = process.env.MONGODB_URI || 'mongodb+srv://vasundharacrafts25_db_user:ixc2An1GtRvbuaut@happyhomesdb.zpadag1.mongodb.net/happyhomes';

async function testVisitor() {
  try {
    console.log('🔄 Connecting to MongoDB...');
    await mongoose.connect(uri);
    console.log('✅ Connected to MongoDB');
    
    const { Visitor } = require('./models');
    console.log('✅ Visitor model loaded');
    
    // Count existing visitors
    const count = await Visitor.countDocuments();
    console.log(`📊 Total visitors in database: ${count}`);
    
    // Get recent visitors
    const visitors = await Visitor.find().sort({ createdAt: -1 }).limit(5);
    console.log('\n📋 Recent visitors:');
    if (visitors.length === 0) {
      console.log('  No visitors found');
    } else {
      visitors.forEach((v, i) => {
        console.log(`  ${i + 1}. ${v.name} - ${v.phone} - ${v.service}`);
        console.log(`     Visit: ${v.visitDate ? v.visitDate.toISOString().split('T')[0] : 'N/A'} at ${v.visitTime}`);
        console.log(`     Status: ${v.status} | Created: ${v.createdAt ? v.createdAt.toISOString().split('T')[0] : 'N/A'}`);
      });
    }
    
    await mongoose.connection.close();
    console.log('\n✅ Test completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

testVisitor();

