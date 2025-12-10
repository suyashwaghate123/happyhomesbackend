/**
 * Website Controller
 * Handles all website data requests
 * Uses MongoDB when connected, falls back to static data otherwise
 */

const mongoose = require('mongoose');

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

// Import static data as fallback
const staticData = require('../data/staticData');

// Helper to check if MongoDB is connected
const isDBConnected = () => mongoose.connection.readyState === 1;

// Helper function for consistent API responses
const sendResponse = (res, data, message = 'Success') => {
  res.json({
    success: true,
    message,
    data,
    source: isDBConnected() ? 'database' : 'static'
  });
};

// Helper function for error responses
const sendError = (res, message, statusCode = 500) => {
  res.status(statusCode).json({
    success: false,
    message
  });
};

// Site Settings
exports.getSiteSettings = async (req, res) => {
  try {
    if (isDBConnected()) {
      const settings = await SiteSettings.findOne();
      if (settings) {
        return sendResponse(res, settings, 'Site settings retrieved successfully');
      }
    }
    sendResponse(res, staticData.siteSettings, 'Site settings retrieved successfully');
  } catch (error) {
    console.error('Error fetching site settings:', error);
    sendResponse(res, staticData.siteSettings, 'Site settings retrieved successfully');
  }
};

// Home Page - All data needed for home page
exports.getHomePageData = async (req, res) => {
  try {
    if (isDBConnected()) {
      const [settings, sliders, services, about, testimonials, team, blogs, statistics, popup] = await Promise.all([
        SiteSettings.findOne(),
        Slider.find({ isActive: true }).sort({ order: 1 }),
        Service.find({ isActive: true }).sort({ order: 1 }).limit(3),
        About.findOne(),
        Testimonial.find({ isActive: true }).sort({ order: 1 }),
        TeamMember.find({ isActive: true }).sort({ order: 1 }).limit(4),
        BlogPost.find({ isActive: true }).sort({ createdAt: -1 }).limit(3),
        Statistic.find({ isActive: true }).sort({ order: 1 }),
        HomePopup.findOne()
      ]);

      const homeData = {
        settings: settings || staticData.siteSettings,
        sliders: sliders.length ? sliders : staticData.sliders.filter(s => s.isActive),
        services: services.length ? services : staticData.services.filter(s => s.isActive).slice(0, 3),
        about: about || staticData.aboutData,
        testimonials: testimonials.length ? testimonials : staticData.testimonials.filter(t => t.isActive),
        team: team.length ? team : staticData.teamMembers.filter(t => t.isActive).slice(0, 4),
        blogs: blogs.length ? blogs : staticData.blogPosts.filter(b => b.isActive).slice(0, 3),
        statistics: statistics.length ? statistics : staticData.statistics,
        popup: popup?.isActive ? popup : null
      };

      return sendResponse(res, homeData, 'Home page data retrieved successfully');
    }

    // Fallback to static data
    const homeData = {
      settings: staticData.siteSettings,
      sliders: staticData.sliders.filter(s => s.isActive).sort((a, b) => a.order - b.order),
      services: staticData.services.filter(s => s.isActive).slice(0, 3).sort((a, b) => a.order - b.order),
      about: staticData.aboutData,
      testimonials: staticData.testimonials.filter(t => t.isActive).sort((a, b) => a.order - b.order),
      team: staticData.teamMembers.filter(t => t.isActive).slice(0, 4).sort((a, b) => a.order - b.order),
      blogs: staticData.blogPosts.filter(b => b.isActive).slice(0, 3).sort((a, b) => a.order - b.order),
      statistics: staticData.statistics.sort((a, b) => a.order - b.order),
      popup: staticData.homePopup.isActive ? staticData.homePopup : null
    };
    sendResponse(res, homeData, 'Home page data retrieved successfully');
  } catch (error) {
    console.error('Error fetching home page data:', error);
    sendError(res, 'Error fetching home page data');
  }
};

// Sliders
exports.getSliders = async (req, res) => {
  try {
    if (isDBConnected()) {
      const sliders = await Slider.find({ isActive: true }).sort({ order: 1 });
      if (sliders.length) {
        return sendResponse(res, sliders, 'Sliders retrieved successfully');
      }
    }
    const activeSliders = staticData.sliders
      .filter(s => s.isActive)
      .sort((a, b) => a.order - b.order);
    sendResponse(res, activeSliders, 'Sliders retrieved successfully');
  } catch (error) {
    console.error('Error fetching sliders:', error);
    sendError(res, 'Error fetching sliders');
  }
};

// Home Popup
exports.getHomePopup = async (req, res) => {
  try {
    if (isDBConnected()) {
      const popup = await HomePopup.findOne();
      if (popup) {
        return sendResponse(res, popup, 'Home popup retrieved successfully');
      }
    }
    sendResponse(res, staticData.homePopup, 'Home popup retrieved successfully');
  } catch (error) {
    console.error('Error fetching home popup:', error);
    sendError(res, 'Error fetching home popup');
  }
};

// About Data
exports.getAboutData = async (req, res) => {
  try {
    if (isDBConnected()) {
      const [about, team, statistics, testimonials] = await Promise.all([
        About.findOne(),
        TeamMember.find({ isActive: true }).sort({ order: 1 }),
        Statistic.find({ isActive: true }).sort({ order: 1 }),
        Testimonial.find({ isActive: true }).sort({ order: 1 })
      ]);

      const aboutPageData = {
        about: about || staticData.aboutData,
        team: team.length ? team : staticData.teamMembers.filter(t => t.isActive),
        statistics: statistics.length ? statistics : staticData.statistics,
        testimonials: testimonials.length ? testimonials : staticData.testimonials.filter(t => t.isActive)
      };

      return sendResponse(res, aboutPageData, 'About page data retrieved successfully');
    }

    const aboutPageData = {
      about: staticData.aboutData,
      team: staticData.teamMembers.filter(t => t.isActive).sort((a, b) => a.order - b.order),
      statistics: staticData.statistics.sort((a, b) => a.order - b.order),
      testimonials: staticData.testimonials.filter(t => t.isActive).sort((a, b) => a.order - b.order)
    };
    sendResponse(res, aboutPageData, 'About page data retrieved successfully');
  } catch (error) {
    console.error('Error fetching about data:', error);
    sendError(res, 'Error fetching about data');
  }
};

// Services
exports.getServices = async (req, res) => {
  try {
    if (isDBConnected()) {
      const services = await Service.find({ isActive: true }).sort({ order: 1 });
      if (services.length) {
        return sendResponse(res, services, 'Services retrieved successfully');
      }
    }
    const activeServices = staticData.services
      .filter(s => s.isActive)
      .sort((a, b) => a.order - b.order);
    sendResponse(res, activeServices, 'Services retrieved successfully');
  } catch (error) {
    console.error('Error fetching services:', error);
    sendError(res, 'Error fetching services');
  }
};

exports.getServiceById = async (req, res) => {
  try {
    const { id } = req.params;
    
    if (isDBConnected()) {
      // Try to find by MongoDB _id first, then by slug
      let service;
      if (mongoose.Types.ObjectId.isValid(id)) {
        service = await Service.findById(id);
      }
      if (!service) {
        service = await Service.findOne({ slug: id });
      }
      if (service) {
        return sendResponse(res, service, 'Service retrieved successfully');
      }
    }

    // Fallback to static data
    const service = staticData.services.find(s => 
      s.id === parseInt(id) || s.slug === id
    );
    if (!service) {
      return sendError(res, 'Service not found', 404);
    }
    sendResponse(res, service, 'Service retrieved successfully');
  } catch (error) {
    console.error('Error fetching service:', error);
    sendError(res, 'Error fetching service');
  }
};

// Team Members
exports.getTeamMembers = async (req, res) => {
  try {
    if (isDBConnected()) {
      const team = await TeamMember.find({ isActive: true }).sort({ order: 1 });
      if (team.length) {
        return sendResponse(res, team, 'Team members retrieved successfully');
      }
    }
    const activeTeam = staticData.teamMembers
      .filter(t => t.isActive)
      .sort((a, b) => a.order - b.order);
    sendResponse(res, activeTeam, 'Team members retrieved successfully');
  } catch (error) {
    console.error('Error fetching team members:', error);
    sendError(res, 'Error fetching team members');
  }
};

// Testimonials
exports.getTestimonials = async (req, res) => {
  try {
    if (isDBConnected()) {
      const testimonials = await Testimonial.find({ isActive: true }).sort({ order: 1 });
      if (testimonials.length) {
        return sendResponse(res, testimonials, 'Testimonials retrieved successfully');
      }
    }
    const activeTestimonials = staticData.testimonials
      .filter(t => t.isActive)
      .sort((a, b) => a.order - b.order);
    sendResponse(res, activeTestimonials, 'Testimonials retrieved successfully');
  } catch (error) {
    console.error('Error fetching testimonials:', error);
    sendError(res, 'Error fetching testimonials');
  }
};

// Gallery
exports.getGalleryImages = async (req, res) => {
  try {
    if (isDBConnected()) {
      const images = await Gallery.find({ isActive: true }).sort({ order: 1 });
      if (images.length) {
        return sendResponse(res, images, 'Gallery images retrieved successfully');
      }
    }
    const activeImages = staticData.galleryImages
      .filter(g => g.isActive)
      .sort((a, b) => a.order - b.order);
    sendResponse(res, activeImages, 'Gallery images retrieved successfully');
  } catch (error) {
    console.error('Error fetching gallery:', error);
    sendError(res, 'Error fetching gallery');
  }
};

exports.getGalleryByCategory = async (req, res) => {
  try {
    const { category } = req.params;
    
    if (isDBConnected()) {
      const images = await Gallery.find({ isActive: true, category }).sort({ order: 1 });
      if (images.length) {
        return sendResponse(res, images, 'Gallery images retrieved successfully');
      }
    }
    const filteredImages = staticData.galleryImages
      .filter(g => g.isActive && g.category === category)
      .sort((a, b) => a.order - b.order);
    sendResponse(res, filteredImages, 'Gallery images retrieved successfully');
  } catch (error) {
    console.error('Error fetching gallery by category:', error);
    sendError(res, 'Error fetching gallery');
  }
};

// Blog
exports.getBlogPosts = async (req, res) => {
  try {
    if (isDBConnected()) {
      const blogs = await BlogPost.find({ isActive: true }).sort({ createdAt: -1 });
      if (blogs.length) {
        return sendResponse(res, blogs, 'Blog posts retrieved successfully');
      }
    }
    const activeBlogs = staticData.blogPosts
      .filter(b => b.isActive)
      .sort((a, b) => new Date(b.date) - new Date(a.date));
    sendResponse(res, activeBlogs, 'Blog posts retrieved successfully');
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    sendError(res, 'Error fetching blog posts');
  }
};

exports.getBlogBySlug = async (req, res) => {
  try {
    const { slug } = req.params;
    
    if (isDBConnected()) {
      const blog = await BlogPost.findOne({ slug });
      if (blog) {
        // Increment view count
        blog.views = (blog.views || 0) + 1;
        await blog.save();
        return sendResponse(res, blog, 'Blog post retrieved successfully');
      }
    }

    const blog = staticData.blogPosts.find(b => b.slug === slug);
    if (!blog) {
      return sendError(res, 'Blog post not found', 404);
    }
    sendResponse(res, blog, 'Blog post retrieved successfully');
  } catch (error) {
    console.error('Error fetching blog post:', error);
    sendError(res, 'Error fetching blog post');
  }
};

// Events
exports.getEvents = async (req, res) => {
  try {
    if (isDBConnected()) {
      const events = await Event.find({ isActive: true }).sort({ date: -1 });
      if (events.length) {
        return sendResponse(res, events, 'Events retrieved successfully');
      }
    }
    const activeEvents = staticData.events
      .filter(e => e.isActive)
      .sort((a, b) => new Date(b.date) - new Date(a.date));
    sendResponse(res, activeEvents, 'Events retrieved successfully');
  } catch (error) {
    console.error('Error fetching events:', error);
    sendError(res, 'Error fetching events');
  }
};

exports.getEventById = async (req, res) => {
  try {
    const { id } = req.params;
    
    if (isDBConnected()) {
      let event;
      if (mongoose.Types.ObjectId.isValid(id)) {
        event = await Event.findById(id);
      }
      if (!event) {
        event = await Event.findOne({ slug: id });
      }
      if (event) {
        return sendResponse(res, event, 'Event retrieved successfully');
      }
    }

    const event = staticData.events.find(e => e.id === parseInt(id));
    if (!event) {
      return sendError(res, 'Event not found', 404);
    }
    sendResponse(res, event, 'Event retrieved successfully');
  } catch (error) {
    console.error('Error fetching event:', error);
    sendError(res, 'Error fetching event');
  }
};

// Statistics
exports.getStatistics = async (req, res) => {
  try {
    if (isDBConnected()) {
      const stats = await Statistic.find({ isActive: true }).sort({ order: 1 });
      if (stats.length) {
        return sendResponse(res, stats, 'Statistics retrieved successfully');
      }
    }
    const sortedStats = staticData.statistics.sort((a, b) => a.order - b.order);
    sendResponse(res, sortedStats, 'Statistics retrieved successfully');
  } catch (error) {
    console.error('Error fetching statistics:', error);
    sendError(res, 'Error fetching statistics');
  }
};

// FAQ
exports.getFaqs = async (req, res) => {
  try {
    const { category } = req.query;
    
    if (isDBConnected()) {
      const query = { isActive: true };
      if (category) {
        query.category = category;
      }
      const faqs = await FAQ.find(query).sort({ order: 1 });
      if (faqs.length) {
        return sendResponse(res, faqs, 'FAQs retrieved successfully');
      }
    }

    let filteredFaqs = staticData.faqs.filter(f => f.isActive);
    if (category) {
      filteredFaqs = filteredFaqs.filter(f => f.category === category);
    }
    filteredFaqs.sort((a, b) => a.order - b.order);
    sendResponse(res, filteredFaqs, 'FAQs retrieved successfully');
  } catch (error) {
    console.error('Error fetching FAQs:', error);
    sendError(res, 'Error fetching FAQs');
  }
};

// Living Options
exports.getLivingOptions = async (req, res) => {
  try {
    if (isDBConnected()) {
      const options = await LivingOption.find({ isActive: true }).sort({ order: 1 });
      if (options.length) {
        return sendResponse(res, options, 'Living options retrieved successfully');
      }
    }
    const activeOptions = staticData.livingOptions
      .filter(l => l.isActive)
      .sort((a, b) => a.order - b.order);
    sendResponse(res, activeOptions, 'Living options retrieved successfully');
  } catch (error) {
    console.error('Error fetching living options:', error);
    sendError(res, 'Error fetching living options');
  }
};
