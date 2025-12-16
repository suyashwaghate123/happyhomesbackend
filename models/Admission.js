const mongoose = require('mongoose');

const admissionSchema = new mongoose.Schema({
  // Application ID (auto-generated)
  applicationId: {
    type: String,
    required: true,
    unique: true,
    index: true
  },
  
  // Step 1: Basic Information
  basicInfo: {
    firstName: { type: String, required: true, trim: true },
    lastName: { type: String, required: true, trim: true },
    email: { 
      type: String, 
      required: true, 
      lowercase: true, 
      trim: true,
      match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email']
    },
    phone: { type: String, required: true, trim: true },
    dateOfBirth: { type: Date, required: true },
    gender: { 
      type: String, 
      required: true, 
      enum: ['male', 'female', 'other'] 
    },
    maritalStatus: { 
      type: String, 
      enum: ['single', 'married', 'widowed', 'divorced', ''] 
    },
    documentType: { 
      type: String, 
      enum: ['aadhar', 'pan', 'passport', 'voter', 'driving', ''] 
    },
    documentNumber: { type: String, trim: true },
    documentFile: { type: String }, // File path or URL
    residentImage: { type: String }, // File path or URL
    admissionPeriod: { 
      type: String, 
      enum: ['short', 'medium', 'long', ''] 
    },
    nationality: { type: String, default: 'Indian' },
    state: { type: String, trim: true },
    language: { type: String, trim: true },
    education: { 
      type: String, 
      enum: ['primary', 'secondary', 'graduate', 'postgraduate', 'other', ''] 
    },
    profession: { type: String, trim: true },
    postRetirement: { type: String, trim: true }
  },
  
  // Step 2: Address Details
  addressDetails: {
    currentAddress: {
      flatNo: { type: String, trim: true },
      societyName: { type: String, trim: true },
      landmark: { type: String, trim: true },
      streetName: { type: String, trim: true },
      city: { type: String, trim: true },
      state: { type: String, trim: true },
      pincode: { type: String, trim: true }
    },
    permanentAddress: {
      flatNo: { type: String, trim: true },
      societyName: { type: String, trim: true },
      landmark: { type: String, trim: true },
      streetName: { type: String, trim: true },
      city: { type: String, trim: true },
      state: { type: String, trim: true },
      pincode: { type: String, trim: true }
    },
    sameAsCurrentAddress: { type: Boolean, default: false }
  },
  
  // Step 3: Reference Details
  referenceDetails: {
    howDidYouKnow: { 
      type: String, 
      enum: ['google', 'facebook', 'instagram', 'friend', 'newspaper', 'other', ''] 
    },
    referredBy: { type: String, trim: true },
    otherDetails: { type: String, trim: true }
  },
  
  // Step 4: Medical Info
  medicalInfo: {
    medicalHistory: { type: String, trim: true },
    currentHealthStatus: { type: String, trim: true },
    conditions: {
      trachealTube: { type: Boolean, default: false },
      feedingTube: { type: Boolean, default: false },
      urinaryCatheter: { type: Boolean, default: false },
      usesDiapers: { type: Boolean, default: false },
      bedSores: { type: Boolean, default: false },
      wound: { type: Boolean, default: false },
      oxygenSupport: { type: Boolean, default: false }
    },
    physicalCondition: { 
      type: String, 
      enum: ['Independent', 'Requires Help', 'Mobile', 'Mobile with Support', 'Bedridden', 'Unconscious', 'Coma', ''] 
    },
    chronicIllness: {
      alzheimers: { type: String, enum: ['Not Applicable', 'Mild', 'Moderate', 'Severe'], default: 'Not Applicable' },
      arthritis: { type: String, enum: ['Not Applicable', 'Mild', 'Moderate', 'Severe'], default: 'Not Applicable' },
      asthma: { type: String, enum: ['Not Applicable', 'Mild', 'Moderate', 'Severe'], default: 'Not Applicable' },
      bipolarDisorder: { type: String, enum: ['Not Applicable', 'Mild', 'Moderate', 'Severe'], default: 'Not Applicable' },
      cancer: { type: String, enum: ['Not Applicable', 'Mild', 'Moderate', 'Severe'], default: 'Not Applicable' },
      copd: { type: String, enum: ['Not Applicable', 'Mild', 'Moderate', 'Severe'], default: 'Not Applicable' },
      diabetes: { type: String, enum: ['Not Applicable', 'Mild', 'Moderate', 'Severe'], default: 'Not Applicable' },
      depression: { type: String, enum: ['Not Applicable', 'Mild', 'Moderate', 'Severe'], default: 'Not Applicable' },
      heartDisease: { type: String, enum: ['Not Applicable', 'Mild', 'Moderate', 'Severe'], default: 'Not Applicable' },
      hypertension: { type: String, enum: ['Not Applicable', 'Mild', 'Moderate', 'Severe'], default: 'Not Applicable' },
      ibd: { type: String, enum: ['Not Applicable', 'Mild', 'Moderate', 'Severe'], default: 'Not Applicable' },
      kidneyDisease: { type: String, enum: ['Not Applicable', 'Mild', 'Moderate', 'Severe'], default: 'Not Applicable' },
      osteoporosis: { type: String, enum: ['Not Applicable', 'Mild', 'Moderate', 'Severe'], default: 'Not Applicable' },
      parkinsons: { type: String, enum: ['Not Applicable', 'Mild', 'Moderate', 'Severe'], default: 'Not Applicable' },
      stroke: { type: String, enum: ['Not Applicable', 'Mild', 'Moderate', 'Severe'], default: 'Not Applicable' },
      thyroid: { type: String, enum: ['Not Applicable', 'Mild', 'Moderate', 'Severe'], default: 'Not Applicable' }
    },
    activities: {
      bathing: { type: String, enum: ['Independent', 'Needs Assistance', 'Dependent'], default: 'Independent' },
      dressing: { type: String, enum: ['Independent', 'Needs Assistance', 'Dependent'], default: 'Independent' },
      grooming: { type: String, enum: ['Independent', 'Needs Assistance', 'Dependent'], default: 'Independent' },
      oralCare: { type: String, enum: ['Independent', 'Needs Assistance', 'Dependent'], default: 'Independent' },
      toileting: { type: String, enum: ['Independent', 'Needs Assistance', 'Dependent'], default: 'Independent' },
      transferring: { type: String, enum: ['Independent', 'Needs Assistance', 'Dependent'], default: 'Independent' },
      walking: { type: String, enum: ['Independent', 'Needs Assistance', 'Dependent'], default: 'Independent' },
      eating: { type: String, enum: ['Independent', 'Needs Assistance', 'Dependent'], default: 'Independent' },
      usingPhone: { type: String, enum: ['Independent', 'Needs Assistance', 'Dependent'], default: 'Independent' },
      managingMoney: { type: String, enum: ['Independent', 'Needs Assistance', 'Dependent'], default: 'Independent' }
    },
    psychiatricCondition: [{ type: String }],
    otherConditions: { type: String, trim: true },
    foodPreferences: { type: String, trim: true },
    habits: { type: String, trim: true },
    likesDislikes: { type: String, trim: true }
  },
  
  // Step 5: Dedicated Health Assessment
  healthAssessment: {
    recognizeHunger: { type: String, enum: ['Yes', 'No', ''] },
    manageHygiene: { type: String, enum: ['Yes', 'No', ''] },
    recognizeTimePlacePeople: { type: String, enum: ['Yes', 'No', ''] },
    makeSafeDecisions: { type: String, enum: ['Yes', 'No', ''] },
    communicateSymptoms: { type: String, enum: ['Yes', 'No', ''] },
    avoidFalls: { type: String, enum: ['Yes', 'No', ''] },
    callForHelp: { type: String, enum: ['Yes', 'No', ''] },
    recognizeMaintenance: { type: String, enum: ['Yes', 'No', ''] }
  },
  
  // Step 6: Guardian Info
  guardianInfo: {
    guardianName: { type: String, required: true, trim: true },
    guardianRelation: { type: String, required: true, trim: true },
    guardianAddress: { type: String, trim: true },
    guardianPhone: { type: String, required: true, trim: true },
    guardianEmail: { 
      type: String, 
      required: true, 
      lowercase: true, 
      trim: true,
      match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email']
    },
    fillerName: { type: String, trim: true },
    fillerPhone: { type: String, trim: true },
    fillerEmail: { type: String, trim: true },
    fillerSignature: { type: String, trim: true }
  },
  
  // Application Status
  status: {
    type: String,
    enum: ['in_progress', 'completed', 'under_review', 'approved', 'rejected', 'on_hold'],
    default: 'in_progress'
  },
  
  // Current step (for multi-step form tracking)
  currentStep: {
    type: Number,
    default: 1,
    min: 1,
    max: 6
  },
  
  // Tracking
  ipAddress: { type: String },
  userAgent: { type: String },
  
  // Completion tracking
  completedAt: { type: Date },
  reviewedAt: { type: Date },
  reviewedBy: { type: String }
}, {
  timestamps: true
});

// Indexes for efficient querying
admissionSchema.index({ applicationId: 1 });
admissionSchema.index({ status: 1, createdAt: -1 });
admissionSchema.index({ 'basicInfo.email': 1 });
admissionSchema.index({ 'basicInfo.phone': 1 });
admissionSchema.index({ 'guardianInfo.guardianEmail': 1 });

// Generate application ID before saving
admissionSchema.pre('save', async function(next) {
  if (!this.applicationId) {
    // Generate unique application ID: HH + timestamp (last 8 digits)
    this.applicationId = 'HH' + Date.now().toString().slice(-8);
  }
  next();
});

module.exports = mongoose.model('Admission', admissionSchema);


