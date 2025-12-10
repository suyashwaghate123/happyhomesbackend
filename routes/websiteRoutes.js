const express = require('express');
const router = express.Router();
const websiteController = require('../controllers/websiteController');

/**
 * Website Data Routes
 * These endpoints serve static data now but will connect to database
 * when admin panel is implemented
 */

// Site Settings & Contact Info
router.get('/settings', websiteController.getSiteSettings);

// Home Page Data
router.get('/home', websiteController.getHomePageData);
router.get('/sliders', websiteController.getSliders);
router.get('/popup', websiteController.getHomePopup);

// About Page
router.get('/about', websiteController.getAboutData);

// Services
router.get('/services', websiteController.getServices);
router.get('/services/:id', websiteController.getServiceById);

// Team
router.get('/team', websiteController.getTeamMembers);

// Testimonials
router.get('/testimonials', websiteController.getTestimonials);

// Gallery
router.get('/gallery', websiteController.getGalleryImages);
router.get('/gallery/:category', websiteController.getGalleryByCategory);

// Blog
router.get('/blogs', websiteController.getBlogPosts);
router.get('/blogs/:slug', websiteController.getBlogBySlug);

// Events
router.get('/events', websiteController.getEvents);
router.get('/events/:id', websiteController.getEventById);

// Statistics
router.get('/statistics', websiteController.getStatistics);

// FAQ
router.get('/faqs', websiteController.getFaqs);

// Living Options
router.get('/living-options', websiteController.getLivingOptions);

module.exports = router;

