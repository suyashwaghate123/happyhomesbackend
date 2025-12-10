const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const leadController = require('../controllers/leadController');

/**
 * Lead/Inquiry Routes
 * Handles lead form submissions from the website
 */

// Validation rules for lead form
const leadValidation = [
  body('name')
    .trim()
    .notEmpty()
    .withMessage('Name is required')
    .isLength({ min: 2, max: 100 })
    .withMessage('Name must be between 2 and 100 characters'),
  
  body('email')
    .trim()
    .notEmpty()
    .withMessage('Email is required')
    .isEmail()
    .withMessage('Please provide a valid email address')
    .normalizeEmail(),
  
  body('phone')
    .trim()
    .notEmpty()
    .withMessage('Phone number is required')
    .matches(/^[0-9+\-\s()]{10,15}$/)
    .withMessage('Please provide a valid phone number'),
  
  body('message')
    .optional()
    .trim()
    .isLength({ max: 1000 })
    .withMessage('Message cannot exceed 1000 characters'),
  
  body('inquiryType')
    .optional()
    .isIn(['general', 'admission', 'visit', 'pricing', 'other'])
    .withMessage('Invalid inquiry type'),
  
  body('preferredContactMethod')
    .optional()
    .isIn(['phone', 'email', 'whatsapp'])
    .withMessage('Invalid contact method')
];

// Validation rules for appointment/visit request
const appointmentValidation = [
  ...leadValidation,
  body('preferredDate')
    .optional()
    .isISO8601()
    .withMessage('Invalid date format'),
  
  body('preferredTime')
    .optional()
    .matches(/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/)
    .withMessage('Invalid time format')
];

// Submit general inquiry
router.post('/inquiry', leadValidation, leadController.submitInquiry);

// Submit appointment/visit request
router.post('/appointment', appointmentValidation, leadController.submitAppointment);

// Contact form submission
router.post('/contact', leadValidation, leadController.submitContactForm);

// Admission form routes
router.post('/admission/step', leadController.submitAdmissionStep);
router.post('/admission/complete', leadController.completeAdmission);
router.get('/admission/:applicationId', leadController.getAdmissionApplication);

// Admin routes (to be protected with auth middleware later)
router.get('/', leadController.getAllLeads);
router.patch('/:id/status', leadController.updateLeadStatus);

module.exports = router;

