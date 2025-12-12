/**
 * Lead Controller
 * Handles lead/inquiry form submissions
 * Uses MongoDB when connected, falls back to in-memory storage otherwise
 */

const mongoose = require('mongoose');
const { validationResult } = require('express-validator');
const nodemailer = require('nodemailer');
const { Lead, Visitor } = require('../models');

// Helper to check if MongoDB is connected
const isDBConnected = () => mongoose.connection.readyState === 1;

// In-memory storage for leads (fallback when no DB)
let leadsInMemory = [];
let leadIdCounter = 1;

// In-memory storage for admission applications
let admissionApplications = [];
let admissionIdCounter = 1;

// Email transporter setup
const createTransporter = () => {
  if (process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS) {
    return nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT || 587,
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
      }
    });
  }
  return null;
};

// Send notification email to admin
const sendAdminNotification = async (lead, type) => {
  const transporter = createTransporter();
  if (!transporter || !process.env.ADMIN_EMAIL) {
    console.log('Email not configured - skipping notification');
    return;
  }

  try {
    const mailOptions = {
      from: process.env.SMTP_USER,
      to: process.env.ADMIN_EMAIL,
      subject: `New ${type} Inquiry - Happy Homes`,
      html: `
        <h2>New ${type} Inquiry Received</h2>
        <p><strong>Name:</strong> ${lead.name}</p>
        <p><strong>Email:</strong> ${lead.email}</p>
        <p><strong>Phone:</strong> ${lead.phone}</p>
        ${lead.subject ? `<p><strong>Subject:</strong> ${lead.subject}</p>` : ''}
        ${lead.serviceInterested ? `<p><strong>Service Interested:</strong> ${lead.serviceInterested}</p>` : ''}
        ${lead.appointmentDate ? `<p><strong>Preferred Date:</strong> ${new Date(lead.appointmentDate).toLocaleDateString()}</p>` : ''}
        ${lead.appointmentTime ? `<p><strong>Preferred Time:</strong> ${lead.appointmentTime}</p>` : ''}
        <p><strong>Message:</strong></p>
        <p>${lead.message || 'No message provided'}</p>
        <hr>
        <p>Received at: ${new Date().toLocaleString()}</p>
      `
    };

    await transporter.sendMail(mailOptions);
    console.log('Admin notification sent successfully');
  } catch (error) {
    console.error('Error sending email:', error.message);
  }
};

// Send auto-reply to user
const sendAutoReply = async (lead) => {
  const transporter = createTransporter();
  if (!transporter) {
    console.log('Email not configured - skipping auto-reply');
    return;
  }

  try {
    const mailOptions = {
      from: process.env.SMTP_USER,
      to: lead.email,
      subject: 'Thank you for contacting Happy Homes',
      html: `
        <h2>Dear ${lead.name},</h2>
        <p>Thank you for reaching out to Happy Homes. We have received your inquiry and our team will get back to you within 24 hours.</p>
        <p>In the meantime, feel free to call us at <strong>+91-9876543210</strong> for immediate assistance.</p>
        <br>
        <p>Warm Regards,</p>
        <p><strong>Happy Homes Team</strong></p>
        <p>123, Green Valley Road, Koregaon Park, Pune - 411001</p>
        <p>Phone: +91-9876543210 | Email: info@happyhomes.com</p>
      `
    };

    await transporter.sendMail(mailOptions);
    console.log('Auto-reply sent successfully');
  } catch (error) {
    console.error('Error sending auto-reply:', error.message);
  }
};

// Helper function for validation errors
const handleValidationErrors = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors: errors.array()
    });
  }
  return null;
};

// Submit General Inquiry
exports.submitInquiry = async (req, res) => {
  try {
    const validationError = handleValidationErrors(req, res);
    if (validationError) return;

    const { name, email, phone, message, inquiryType, preferredContactMethod } = req.body;

    const leadData = {
      name,
      email,
      phone,
      message: message || '',
      source: 'contact_form',
      serviceInterested: inquiryType || 'general',
      status: 'new',
      priority: 'medium',
      ipAddress: req.ip,
      userAgent: req.get('User-Agent')
    };

    let savedLead;

    if (isDBConnected()) {
      // Save to MongoDB
      savedLead = await Lead.create(leadData);
      console.log('Lead saved to MongoDB:', savedLead._id);
    } else {
      // Save to in-memory
      savedLead = {
        id: leadIdCounter++,
        ...leadData,
        createdAt: new Date().toISOString()
      };
      leadsInMemory.push(savedLead);
      console.log('Lead saved to memory:', savedLead.id);
    }

    // Send notifications (async, don't wait)
    sendAdminNotification(savedLead, 'General');
    sendAutoReply(savedLead);

    res.status(201).json({
      success: true,
      message: 'Thank you for your inquiry! Our team will contact you shortly.',
      data: {
        id: savedLead._id || savedLead.id,
        name: savedLead.name,
        email: savedLead.email
      }
    });

  } catch (error) {
    console.error('Error submitting inquiry:', error);
    res.status(500).json({
      success: false,
      message: 'Something went wrong. Please try again later.'
    });
  }
};

// Submit Appointment/Visit Request
exports.submitAppointment = async (req, res) => {
  try {
    const validationError = handleValidationErrors(req, res);
    if (validationError) return;

    const { 
      name, 
      email, 
      phone, 
      message, 
      preferredDate, 
      preferredTime,
      serviceInterested,
      preferredContactMethod 
    } = req.body;

    const leadData = {
      name,
      email,
      phone,
      message: message || '',
      source: 'appointment',
      appointmentDate: preferredDate ? new Date(preferredDate) : null,
      appointmentTime: preferredTime || null,
      serviceInterested: serviceInterested || null,
      status: 'new',
      priority: 'high',
      ipAddress: req.ip,
      userAgent: req.get('User-Agent')
    };

    let savedLead;

    if (isDBConnected()) {
      savedLead = await Lead.create(leadData);
      console.log('Appointment request saved to MongoDB:', savedLead._id);
    } else {
      savedLead = {
        id: leadIdCounter++,
        ...leadData,
        createdAt: new Date().toISOString()
      };
      leadsInMemory.push(savedLead);
      console.log('Appointment request saved to memory:', savedLead.id);
    }

    // Send notifications
    sendAdminNotification(savedLead, 'Appointment');
    sendAutoReply(savedLead);

    res.status(201).json({
      success: true,
      message: 'Thank you for your visit request! We will confirm your appointment shortly.',
      data: {
        id: savedLead._id || savedLead.id,
        name: savedLead.name,
        preferredDate: savedLead.appointmentDate
      }
    });

  } catch (error) {
    console.error('Error submitting appointment:', error);
    res.status(500).json({
      success: false,
      message: 'Something went wrong. Please try again later.'
    });
  }
};

// Submit Visit Request (from VisitNowPopup)
exports.submitVisitRequest = async (req, res) => {
  try {
    const { name, phone, service, visitDate, visitTime, email } = req.body;

    // Basic validation
    if (!name || !phone || !service || !visitDate || !visitTime) {
      return res.status(400).json({
        success: false,
        message: 'All required fields must be provided'
      });
    }

    const visitorData = {
      name: name.trim(),
      phone: phone.trim(),
      service: service.trim(),
      visitDate: new Date(visitDate),
      visitTime: visitTime.trim(),
      status: 'pending',
      ipAddress: req.ip,
      userAgent: req.get('User-Agent')
    };

    // Add email if provided
    if (email && email.trim()) {
      visitorData.email = email.trim().toLowerCase();
    }

    let savedVisitor;

    if (isDBConnected()) {
      // Save to MongoDB
      savedVisitor = await Visitor.create(visitorData);
      console.log('✅ Visitor saved to MongoDB:', savedVisitor._id);
      console.log('📋 Visitor Details:', {
        name: savedVisitor.name,
        phone: savedVisitor.phone,
        service: savedVisitor.service,
        visitDate: savedVisitor.visitDate,
        visitTime: savedVisitor.visitTime
      });
    } else {
      // Fallback to in-memory (shouldn't happen if DB is configured)
      savedVisitor = {
        id: `VIS-${Date.now()}`,
        ...visitorData,
        createdAt: new Date().toISOString()
      };
      console.log('⚠️  MongoDB not connected - saved to memory:', savedVisitor.id);
    }

    // Send admin notification (async, don't wait)
    const notificationData = {
      name: savedVisitor.name,
      email: savedVisitor.email || 'N/A',
      phone: savedVisitor.phone,
      serviceInterested: savedVisitor.service,
      appointmentDate: savedVisitor.visitDate,
      appointmentTime: savedVisitor.visitTime,
      message: 'Visit request from website popup'
    };
    sendAdminNotification(notificationData, 'Visit Request');

    res.status(201).json({
      success: true,
      message: 'Thank you! Your visit request has been submitted. We will contact you shortly to confirm.',
      data: {
        id: savedVisitor._id || savedVisitor.id,
        name: savedVisitor.name,
        visitDate: savedVisitor.visitDate
      }
    });

  } catch (error) {
    console.error('❌ Error submitting visit request:', error);
    res.status(500).json({
      success: false,
      message: 'Something went wrong. Please try again later.',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

// Submit Contact Form
exports.submitContactForm = async (req, res) => {
  try {
    const validationError = handleValidationErrors(req, res);
    if (validationError) return;

    const { name, email, phone, message, subject } = req.body;

    const leadData = {
      name,
      email,
      phone,
      subject: subject || 'General Inquiry',
      message: message || '',
      source: 'contact_form',
      status: 'new',
      priority: 'medium',
      ipAddress: req.ip,
      userAgent: req.get('User-Agent')
    };

    let savedLead;

    if (isDBConnected()) {
      savedLead = await Lead.create(leadData);
      console.log('Contact form saved to MongoDB:', savedLead._id);
    } else {
      savedLead = {
        id: leadIdCounter++,
        ...leadData,
        createdAt: new Date().toISOString()
      };
      leadsInMemory.push(savedLead);
      console.log('Contact form saved to memory:', savedLead.id);
    }

    // Send notifications
    sendAdminNotification(savedLead, 'Contact Form');
    sendAutoReply(savedLead);

    res.status(201).json({
      success: true,
      message: 'Thank you for contacting us! We will get back to you soon.',
      data: {
        id: savedLead._id || savedLead.id,
        name: savedLead.name
      }
    });

  } catch (error) {
    console.error('Error submitting contact form:', error);
    res.status(500).json({
      success: false,
      message: 'Something went wrong. Please try again later.'
    });
  }
};

// Submit Admission Form - Step-wise submission
exports.submitAdmissionStep = async (req, res) => {
  try {
    const { applicationId, step, data } = req.body;
    
    let application;
    
    if (applicationId) {
      // Find existing application
      application = admissionApplications.find(app => app.applicationId === applicationId);
      if (!application) {
        return res.status(404).json({
          success: false,
          message: 'Application not found'
        });
      }
      // Update with new step data
      application.steps[`step${step}`] = data;
      application.currentStep = step;
      application.updatedAt = new Date().toISOString();
    } else {
      // Create new application
      const newApplicationId = 'HH' + Date.now().toString().slice(-8);
      application = {
        id: admissionIdCounter++,
        applicationId: newApplicationId,
        currentStep: step,
        status: 'in_progress',
        steps: {
          [`step${step}`]: data
        },
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      admissionApplications.push(application);
    }
    
    console.log('Admission form step saved:', { applicationId: application.applicationId, step });

    res.status(200).json({
      success: true,
      message: `Step ${step} saved successfully`,
      data: {
        applicationId: application.applicationId,
        currentStep: application.currentStep
      }
    });

  } catch (error) {
    console.error('Error saving admission step:', error);
    res.status(500).json({
      success: false,
      message: 'Something went wrong. Please try again later.'
    });
  }
};

// Complete Admission Form
exports.completeAdmission = async (req, res) => {
  try {
    const { applicationId } = req.body;
    
    const application = admissionApplications.find(app => app.applicationId === applicationId);
    if (!application) {
      return res.status(404).json({
        success: false,
        message: 'Application not found'
      });
    }
    
    // Mark as completed
    application.status = 'completed';
    application.completedAt = new Date().toISOString();
    application.updatedAt = new Date().toISOString();
    
    console.log('Admission form completed:', applicationId);
    
    // Create a lead entry for the admission
    const applicantData = application.steps.step1 || {};
    const guardianData = application.steps.step6 || {};
    
    const leadData = {
      name: `${applicantData.firstName || ''} ${applicantData.lastName || ''}`.trim() || 'Unknown',
      email: applicantData.email || guardianData.guardianEmail || 'no-email@example.com',
      phone: applicantData.phone || guardianData.guardianPhone || 'N/A',
      message: `Admission application submitted. Application ID: ${applicationId}`,
      source: 'other',
      status: 'new',
      priority: 'high'
    };

    if (isDBConnected()) {
      await Lead.create(leadData);
    }
    
    sendAdminNotification(leadData, 'Admission Application');
    
    res.status(200).json({
      success: true,
      message: 'Application submitted successfully!',
      data: {
        applicationId: application.applicationId,
        status: 'completed'
      }
    });

  } catch (error) {
    console.error('Error completing admission:', error);
    res.status(500).json({
      success: false,
      message: 'Something went wrong. Please try again later.'
    });
  }
};

// Get Admission Application by ID
exports.getAdmissionApplication = async (req, res) => {
  try {
    const { applicationId } = req.params;
    
    const application = admissionApplications.find(app => app.applicationId === applicationId);
    if (!application) {
      return res.status(404).json({
        success: false,
        message: 'Application not found'
      });
    }
    
    res.status(200).json({
      success: true,
      data: application
    });

  } catch (error) {
    console.error('Error fetching admission:', error);
    res.status(500).json({
      success: false,
      message: 'Something went wrong. Please try again later.'
    });
  }
};

// Get all leads (for admin - to be used later)
exports.getAllLeads = async (req, res) => {
  try {
    const { status, source, page = 1, limit = 20 } = req.query;
    
    if (isDBConnected()) {
      const query = {};
      if (status) query.status = status;
      if (source) query.source = source;

      const leads = await Lead.find(query)
        .sort({ createdAt: -1 })
        .skip((page - 1) * limit)
        .limit(parseInt(limit));

      const total = await Lead.countDocuments(query);

      return res.json({
        success: true,
        data: leads,
        pagination: {
          page: parseInt(page),
          limit: parseInt(limit),
          total,
          pages: Math.ceil(total / limit)
        }
      });
    }

    // Return in-memory leads
    res.json({
      success: true,
      data: leadsInMemory.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)),
      pagination: {
        page: 1,
        limit: leadsInMemory.length,
        total: leadsInMemory.length,
        pages: 1
      }
    });

  } catch (error) {
    console.error('Error fetching leads:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching leads'
    });
  }
};

// Update lead status (for admin)
exports.updateLeadStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status, notes, priority } = req.body;

    if (isDBConnected()) {
      const updateData = {};
      if (status) updateData.status = status;
      if (priority) updateData.priority = priority;
      if (notes) {
        updateData.$push = {
          notes: {
            text: notes,
            addedBy: 'Admin',
            addedAt: new Date()
          }
        };
      }

      const lead = await Lead.findByIdAndUpdate(id, updateData, { new: true });
      if (!lead) {
        return res.status(404).json({
          success: false,
          message: 'Lead not found'
        });
      }

      return res.json({
        success: true,
        message: 'Lead updated successfully',
        data: lead
      });
    }

    res.status(400).json({
      success: false,
      message: 'Database not connected'
    });

  } catch (error) {
    console.error('Error updating lead:', error);
    res.status(500).json({
      success: false,
      message: 'Error updating lead'
    });
  }
};
