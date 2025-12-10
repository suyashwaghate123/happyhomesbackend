/**
 * Database Seed Script
 * Run: node scripts/seedDatabase.js
 * This script will populate the database with initial data from staticData.js
 */

const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');

// Load environment variables
dotenv.config({ path: path.join(__dirname, '..', '.env') });

// Import models
const {
  SiteSettings,
  Slider,
  Service,
  About,
  TeamMember,
  Testimonial,
  Gallery,
  BlogPost,
  Event,
  FAQ,
  LivingOption,
  Statistic,
  HomePopup
} = require('../models');

// Import static data
const {
  siteSettings,
  sliders,
  services,
  aboutData,
  teamMembers,
  testimonials,
  galleryImages,
  blogPosts,
  events,
  homePopup,
  statistics,
  faqs,
  livingOptions
} = require('../data/staticData');

// Helper function to generate slug from title
const generateSlug = (title) => {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
};

// MongoDB Connection
const connectDB = async () => {
  try {
    const mongoUri = process.env.MONGODB_URI;
    if (!mongoUri) {
      throw new Error('MONGODB_URI is not defined in .env file');
    }
    
    await mongoose.connect(mongoUri);
    console.log('✅ MongoDB Connected Successfully');
    return true;
  } catch (error) {
    console.error('❌ MongoDB Connection Error:', error.message);
    process.exit(1);
  }
};

// Drop indexes to avoid conflicts
const dropIndexes = async () => {
  console.log('🔄 Dropping existing indexes...');
  
  try {
    await Service.collection.dropIndexes();
    await BlogPost.collection.dropIndexes();
    await Event.collection.dropIndexes();
    await LivingOption.collection.dropIndexes();
  } catch (error) {
    // Ignore errors if collections don't exist
    console.log('   (Some indexes may not exist yet - this is normal)');
  }
  
  console.log('✅ Indexes dropped');
};

// Clear existing data
const clearDatabase = async () => {
  console.log('🗑️  Clearing existing data...');
  
  await Promise.all([
    SiteSettings.deleteMany({}),
    Slider.deleteMany({}),
    Service.deleteMany({}),
    About.deleteMany({}),
    TeamMember.deleteMany({}),
    Testimonial.deleteMany({}),
    Gallery.deleteMany({}),
    BlogPost.deleteMany({}),
    Event.deleteMany({}),
    FAQ.deleteMany({}),
    LivingOption.deleteMany({}),
    Statistic.deleteMany({}),
    HomePopup.deleteMany({})
  ]);
  
  console.log('✅ Database cleared');
};

// Seed Site Settings
const seedSiteSettings = async () => {
  console.log('📝 Seeding Site Settings...');
  await SiteSettings.create(siteSettings);
  console.log('✅ Site Settings seeded');
};

// Seed Sliders
const seedSliders = async () => {
  console.log('📝 Seeding Sliders...');
  await Slider.insertMany(sliders);
  console.log(`✅ ${sliders.length} Sliders seeded`);
};

// Seed Services - with generated slugs
const seedServices = async () => {
  console.log('📝 Seeding Services...');
  
  const servicesWithSlugs = services.map((service, index) => ({
    ...service,
    slug: generateSlug(service.title) + '-' + (index + 1)
  }));
  
  // Insert one by one to use the pre-save hook
  for (const service of servicesWithSlugs) {
    await Service.create(service);
  }
  
  console.log(`✅ ${services.length} Services seeded`);
};

// Seed About
const seedAbout = async () => {
  console.log('📝 Seeding About Data...');
  await About.create(aboutData);
  console.log('✅ About Data seeded');
};

// Seed Team Members
const seedTeamMembers = async () => {
  console.log('📝 Seeding Team Members...');
  await TeamMember.insertMany(teamMembers);
  console.log(`✅ ${teamMembers.length} Team Members seeded`);
};

// Seed Testimonials
const seedTestimonials = async () => {
  console.log('📝 Seeding Testimonials...');
  await Testimonial.insertMany(testimonials);
  console.log(`✅ ${testimonials.length} Testimonials seeded`);
};

// Seed Gallery
const seedGallery = async () => {
  console.log('📝 Seeding Gallery...');
  await Gallery.insertMany(galleryImages);
  console.log(`✅ ${galleryImages.length} Gallery Images seeded`);
};

// Seed Blog Posts - with proper slugs
const seedBlogPosts = async () => {
  console.log('📝 Seeding Blog Posts...');
  
  // Blog posts already have slugs in static data
  for (const post of blogPosts) {
    await BlogPost.create(post);
  }
  
  console.log(`✅ ${blogPosts.length} Blog Posts seeded`);
};

// Seed Events - with generated slugs
const seedEvents = async () => {
  console.log('📝 Seeding Events...');
  
  for (const event of events) {
    await Event.create({
      ...event,
      slug: generateSlug(event.title)
    });
  }
  
  console.log(`✅ ${events.length} Events seeded`);
};

// Seed FAQs
const seedFAQs = async () => {
  console.log('📝 Seeding FAQs...');
  await FAQ.insertMany(faqs);
  console.log(`✅ ${faqs.length} FAQs seeded`);
};

// Seed Living Options - with generated slugs
const seedLivingOptions = async () => {
  console.log('📝 Seeding Living Options...');
  
  for (const option of livingOptions) {
    await LivingOption.create({
      ...option,
      slug: generateSlug(option.title)
    });
  }
  
  console.log(`✅ ${livingOptions.length} Living Options seeded`);
};

// Seed Statistics
const seedStatistics = async () => {
  console.log('📝 Seeding Statistics...');
  await Statistic.insertMany(statistics);
  console.log(`✅ ${statistics.length} Statistics seeded`);
};

// Seed Home Popup
const seedHomePopup = async () => {
  console.log('📝 Seeding Home Popup...');
  await HomePopup.create(homePopup);
  console.log('✅ Home Popup seeded');
};

// Main seed function
const seedDatabase = async () => {
  console.log('\n🌱 Starting Database Seeding...\n');
  console.log('='.repeat(50));
  
  try {
    await connectDB();
    await dropIndexes();
    await clearDatabase();
    
    console.log('\n' + '='.repeat(50));
    console.log('📦 Inserting Data...\n');
    
    await seedSiteSettings();
    await seedSliders();
    await seedServices();
    await seedAbout();
    await seedTeamMembers();
    await seedTestimonials();
    await seedGallery();
    await seedBlogPosts();
    await seedEvents();
    await seedFAQs();
    await seedLivingOptions();
    await seedStatistics();
    await seedHomePopup();
    
    console.log('\n' + '='.repeat(50));
    console.log('🎉 Database seeding completed successfully!');
    console.log('='.repeat(50) + '\n');
    
    // Display summary
    console.log('📊 Summary:');
    console.log(`   - Site Settings: 1 document`);
    console.log(`   - Sliders: ${sliders.length} documents`);
    console.log(`   - Services: ${services.length} documents`);
    console.log(`   - About: 1 document`);
    console.log(`   - Team Members: ${teamMembers.length} documents`);
    console.log(`   - Testimonials: ${testimonials.length} documents`);
    console.log(`   - Gallery: ${galleryImages.length} documents`);
    console.log(`   - Blog Posts: ${blogPosts.length} documents`);
    console.log(`   - Events: ${events.length} documents`);
    console.log(`   - FAQs: ${faqs.length} documents`);
    console.log(`   - Living Options: ${livingOptions.length} documents`);
    console.log(`   - Statistics: ${statistics.length} documents`);
    console.log(`   - Home Popup: 1 document`);
    console.log('\n');
    
    process.exit(0);
  } catch (error) {
    console.error('\n❌ Seeding Error:', error.message);
    console.error(error.stack);
    process.exit(1);
  }
};

// Run the seeder
seedDatabase();
