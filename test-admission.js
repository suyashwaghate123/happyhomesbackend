/**
 * Test script to verify Admission model and database connection
 * Run with: node test-admission.js
 */

require('dotenv').config();
const mongoose = require('mongoose');
const { Admission } = require('./models');

const testAdmission = async () => {
  try {
    // Connect to MongoDB
    const mongoUri = process.env.MONGODB_URI;
    if (!mongoUri) {
      console.error('❌ MONGODB_URI not found in .env file');
      process.exit(1);
    }

    console.log('🔄 Connecting to MongoDB...');
    await mongoose.connect(mongoUri);
    console.log('✅ Connected to MongoDB:', mongoose.connection.name);

    // Test creating an admission
    console.log('\n📝 Testing admission creation...');
    const testData = {
      basicInfo: {
        firstName: 'Test',
        lastName: 'User',
        email: 'test@example.com',
        phone: '1234567890',
        dateOfBirth: new Date('1950-01-01'),
        gender: 'male',
        nationality: 'Indian'
      },
      currentStep: 1,
      status: 'in_progress'
    };

    const admission = await Admission.create(testData);
    console.log('✅ Test admission created:', {
      applicationId: admission.applicationId,
      _id: admission._id
    });

    // Count all admissions
    const count = await Admission.countDocuments();
    console.log(`\n📊 Total admissions in database: ${count}`);

    // List all admissions
    const allAdmissions = await Admission.find().select('applicationId basicInfo.firstName basicInfo.lastName status createdAt');
    console.log('\n📋 All admissions:');
    allAdmissions.forEach(adm => {
      console.log(`  - ${adm.applicationId}: ${adm.basicInfo?.firstName} ${adm.basicInfo?.lastName} (${adm.status})`);
    });

    // Clean up test data
    await Admission.deleteOne({ _id: admission._id });
    console.log('\n🧹 Test admission deleted');

    await mongoose.connection.close();
    console.log('\n✅ Test completed successfully');
    process.exit(0);

  } catch (error) {
    console.error('\n❌ Error:', error.message);
    if (error.errors) {
      console.error('Validation errors:');
      Object.keys(error.errors).forEach(key => {
        console.error(`  - ${key}: ${error.errors[key].message}`);
      });
    }
    process.exit(1);
  }
};

testAdmission();


