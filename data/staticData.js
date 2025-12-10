/**
 * Static Data for Happy Homes Website
 * This data will be served via API and can be replaced with database data
 * when admin panel is ready
 */

// Site Settings & Contact Information
const siteSettings = {
  siteName: "Happy Homes",
  tagline: "Assisted Living",
  logo: "/images/happyhomeslogo.png",
  logoLight: "/images/happyhomeslogo.png",
  favicon: "/images/happyhomesfivicon.png",
  openHours: "Mon-Sun 10:00 AM - 5:00 PM",
  phone: "+91 92099 16910",
  alternatePhone: "+91 92099 16910",
  email: "info@happyhomes.com",
  whatsapp: "+919209916910",
  address: "Happy Homes Care, Sai Satyam Park, Khandve Nagar, Wagholi, Pune, Maharashtra 412207",
  mapEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3782.265588856342!2d73.89352911541!3d18.536552287384!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTjCsDMyJzExLjYiTiA3M8KwNTMnNDUuNSJF!5e0!3m2!1sen!2sin!4v1234567890",
  socialLinks: {
    facebook: "https://facebook.com/happyhomes",
    twitter: "https://twitter.com/happyhomes",
    linkedin: "https://linkedin.com/company/happyhomes",
    instagram: "https://instagram.com/happyhomes",
    youtube: "https://youtube.com/happyhomes"
  },
  copyright: `Copyright ${new Date().getFullYear()} Happy Homes. All Rights Reserved.`
};

// Home Page Sliders - Updated with new content
const sliders = [
  {
    id: 1,
    title: "Bedridden Care",
    subtitle: "24/7 Nursing Support",
    description: "Dedicated support for fully dependent senior residents. Condition-based nutritious meals, skilled nursing, physiotherapy support, and comfortable, well-equipped rooms.",
    // image: "/images/main-slider/banner-1.jpg",
    image: "/images/imageplaceholder.jpg",
    buttonText: "Learn More",
    buttonLink: "/services",
    isActive: true,
    order: 1
  },
  {
    id: 2,
    title: "Assisted Living",
    subtitle: "Personal Daily Assistance",
    description: "Personalized daily assistance to maintain independent living. Attentive nursing, required physiotherapy, and safe, supportive rooms for your loved ones.",
    // image: "/images/main-slider/banner-1.jpg",
    image: "/images/imageplaceholder.jpg",
    buttonText: "Our Services",
    buttonLink: "/services",
    isActive: true,
    order: 2
  },
  {
    id: 3,
    title: "Independent Senior Living",
    subtitle: "Active Community Lifestyle",
    description: "Comfortable community lifestyle for active senior residents. Healthy tailored meals, wellness and physiotherapy options, and relaxed, well-equipped rooms.",
    // image: "/images/main-slider/banner-1.jpg",
    image: "/images/imageplaceholder.jpg",
    buttonText: "Explore Facility",
    buttonLink: "/living-options",
    isActive: true,
    order: 3
  }
];

// Services - Updated with new comprehensive services
const services = [
  {
    id: 1,
    title: "Bedridden Care with 24/7 Nursing Support",
    shortDescription: "Dedicated support for fully dependent senior residents with round-the-clock nursing care.",
    description: "Our Bedridden Care program provides comprehensive support for fully dependent senior residents. We offer condition-based nutritious meals, skilled nursing, physiotherapy support, and comfortable, well-equipped rooms designed for complete care and comfort.",
    icon: "icon-6",
    // image: "/images/resource/service-1.jpg",
    image: "/images/imageplaceholder.jpg",
    features: [
      "24/7 dedicated nursing supervision for high-dependency residents",
      "Customized diet plans based on medical condition and doctor recommendations",
      "Bedside physiotherapy routines to maintain mobility and reduce stiffness",
      "Pressure-relief bedding and safety-focused room setup",
      "Medication management & monitoring to ensure stability and comfort"
    ],
    isActive: true,
    order: 1
  },
  {
    id: 2,
    title: "Assisted Living with Personal Daily Assistance",
    shortDescription: "Personalized daily assistance to help seniors maintain independent living with dignity.",
    description: "Our Assisted Living program provides personalized nutrition, attentive nursing, required physiotherapy, and safe, supportive rooms. We focus on helping seniors maintain their independence while receiving the support they need.",
    icon: "icon-7",
    // image: "/images/resource/service-2.jpg",
    image: "/images/imageplaceholder.jpg",
    features: [
      "Dedicated personal assistance for dressing, bathing, mobility, and daily tasks",
      "Activity-based recovery programs such as light exercises, memory games, and cognitive activities",
      "Timely nutritious meals designed to support energy, recovery, and overall health",
      "Daily physiotherapy sessions as needed for improving strength and flexibility",
      "Comfortable rooms with safety features and easy accessibility",
      "Regular health monitoring to track progress and ensure wellbeing"
    ],
    isActive: true,
    order: 2
  },
  {
    id: 3,
    title: "Independent Senior Living with Optional Care",
    shortDescription: "Comfortable community lifestyle for active senior residents with optional care services.",
    description: "Our Independent Senior Living offers healthy tailored meals, wellness and physiotherapy options, and relaxed, well-equipped rooms for active seniors who want to enjoy community living.",
    icon: "icon-8",
    // image: "/images/resource/service-3.jpg",
    image: "/images/imageplaceholder.jpg",
    features: [
      "Community interaction activities like group discussions, hobby circles, and cultural events",
      "Engaging games and recreation such as chess, carrom, indoor games, music time, and outdoor walks",
      "Optional fitness and wellness programs including yoga, stretching, meditation, and light workouts",
      "Nutritious meals that promote active and healthy living",
      "Private, comfortable rooms for a peaceful, independent lifestyle",
      "Secure environment with staff available for assistance whenever needed"
    ],
    isActive: true,
    order: 3
  },
  {
    id: 4,
    title: "Condition-Based Nutritious Meals",
    shortDescription: "Six nutritious meals daily, customized according to dietary requirements and health conditions.",
    description: "Our in-house kitchen prepares fresh, nutritious meals six times a day. We cater to various dietary requirements including diabetic-friendly, low-sodium, vegetarian, Jain, soft food, and liquid diets as per medical recommendations.",
    icon: "icon-6",
    // image: "/images/resource/image-1.jpg",
    image: "/images/imageplaceholder.jpg",
    features: [
      "Six nutritious meals daily",
      "Individual dietary preferences considered",
      "Allergy-safe meal preparations",
      "Soft food and liquid diet options",
      "Festival-specific and fasting meals",
      "Meals prepared under nutrition expert guidance"
    ],
    isActive: true,
    order: 4
  },
  {
    id: 5,
    title: "Daily Physiotherapy & Wellness Programs",
    shortDescription: "Comprehensive physiotherapy and wellness programs to maintain physical health and mobility.",
    description: "Our wellness programs include daily physiotherapy sessions, yoga, meditation, and fitness activities designed specifically for senior residents to maintain their physical health, flexibility, and overall well-being.",
    icon: "icon-7",
    // image: "/images/resource/image-2.jpg",
    image: "/images/imageplaceholder.jpg",
    features: [
      "Daily physiotherapy sessions",
      "Yoga and meditation classes",
      "Light workout programs",
      "Stretching exercises",
      "Occupational therapy",
      "Cognitive activities and memory exercises"
    ],
    isActive: true,
    order: 5
  },
  {
    id: 6,
    title: "Fully Furnished Senior-Friendly Private Rooms",
    shortDescription: "Comfortable, safe, and well-equipped rooms designed specifically for senior residents.",
    description: "Our rooms are fully furnished with senior-friendly amenities including comfortable beds, spacious wardrobes, attached bathrooms, emergency call buttons, and safety features for a comfortable stay.",
    icon: "icon-8",
    // image: "/images/resource/image-3.jpg",
    image: "/images/imageplaceholder.jpg",
    features: [
      "Comfortable senior-friendly beds",
      "Spacious wardrobe",
      "Attached/dedicated washroom",
      "Emergency call/panic button",
      "Intercom facility",
      "Soft lighting & night lamp",
      "TV in select rooms",
      "Balcony or sitting area (depending on room type)"
    ],
    isActive: true,
    order: 6
  },
  {
    id: 7,
    title: "24/7 Caretakers and Emergency Support",
    shortDescription: "Round-the-clock caregiver support and emergency medical assistance.",
    description: "Our trained caregivers are available 24/7 to provide compassionate care and immediate assistance. We have emergency response systems and coordination with hospitals for any medical emergencies.",
    icon: "icon-6",
    // image: "/images/resource/service-1.jpg",
    image: "/images/imageplaceholder.jpg",
    features: [
      "24/7 trained caregiver support",
      "Emergency medical response",
      "Oxygen and suctioning support",
      "Hospital coordination",
      "Family communication",
      "Night duty staff"
    ],
    isActive: true,
    order: 7
  },
  {
    id: 8,
    title: "Regular Doctor Visits & Vital Monitoring",
    shortDescription: "Comprehensive medical care with regular doctor consultations and health monitoring.",
    description: "We provide regular doctor visits, daily vital monitoring, medication management, and coordination with specialists. Our medical team ensures timely health tracking and care adjustments.",
    icon: "icon-7",
    // image: "/images/resource/service-2.jpg",
    image: "/images/imageplaceholder.jpg",
    features: [
      "Daily vital checkups",
      "Medication dispensing",
      "Diabetes management (sugar charting, insulin administration)",
      "Catheter & Ryle's tube management",
      "Bedsore & wound care",
      "Coordination with doctors & family"
    ],
    isActive: true,
    order: 8
  },
  {
    id: 9,
    title: "Housekeeping & Laundry Services",
    shortDescription: "Complete housekeeping and laundry services for a clean and comfortable living environment.",
    description: "Our housekeeping team ensures daily cleaning and sanitation of rooms and common areas. We also provide complete laundry services for residents' convenience.",
    icon: "icon-8",
    // image: "/images/resource/image-1.jpg",
    image: "/images/imageplaceholder.jpg",
    features: [
      "Daily room cleaning",
      "Bed making and linen change",
      "Laundry and ironing services",
      "Common area sanitization",
      "Regular fumigation & mosquito control",
      "Clutter-free living environment"
    ],
    isActive: true,
    order: 9
  },
  {
    id: 10,
    title: "Safe & Supportive Environment",
    shortDescription: "Secure facility with CCTV monitoring, trained security staff, and safety protocols.",
    description: "Happy Homes provides a safe and secure environment with 24/7 security staff, CCTV monitoring, controlled entry, fire safety measures, and emergency response systems in every room.",
    icon: "icon-6",
    // image: "/images/resource/service-3.jpg",
    image: "/images/imageplaceholder.jpg",
    features: [
      "24/7 security staff",
      "CCTV monitoring",
      "Controlled entry",
      "Trained & background-verified staff",
      "Fire safety measures",
      "Emergency response system in rooms"
    ],
    isActive: true,
    order: 10
  },
  {
    id: 11,
    title: "Social Activities, Games & Cultural Events",
    shortDescription: "Engaging activities to keep residents mentally stimulated and socially connected.",
    description: "We believe in keeping our residents engaged and happy. Our activity program includes indoor games, cultural events, festival celebrations, birthday events, and regular social gatherings.",
    icon: "icon-7",
    // image: "/images/resource/image-2.jpg",
    image: "/images/imageplaceholder.jpg",
    features: [
      "Music, karaoke & bhajans",
      "Indoor games & cognitive activities",
      "Festival celebrations & birthday events",
      "Library & reading sessions",
      "Morning walks & outdoor recreation",
      "Movie time in common areas",
      "Arts & crafts activities"
    ],
    isActive: true,
    order: 11
  },
  {
    id: 12,
    title: "Yoga, Meditation & Fitness Sessions",
    shortDescription: "Holistic wellness programs including yoga, meditation, and fitness activities.",
    description: "Our wellness programs include daily yoga sessions, meditation, breathing exercises, and light fitness activities designed to promote physical and mental well-being for senior residents.",
    icon: "icon-8",
    // image: "/images/resource/image-3.jpg",
    image: "/images/imageplaceholder.jpg",
    features: [
      "Morning yoga sessions",
      "Meditation & breathing exercises",
      "Light workout programs",
      "Stretching exercises",
      "Group wellness activities",
      "Individual wellness support"
    ],
    isActive: true,
    order: 12
  },
  {
    id: 13,
    title: "Medication Management & Health Tracking",
    shortDescription: "Systematic medication management and comprehensive health tracking for all residents.",
    description: "Our nursing team ensures timely medication dispensing, maintains detailed health records, and tracks progress for each resident to ensure optimal health outcomes.",
    icon: "icon-6",
    // image: "/images/resource/service-1.jpg",
    image: "/images/imageplaceholder.jpg",
    features: [
      "Timely medication dispensing",
      "Health record maintenance",
      "Progress tracking",
      "Doctor recommendations follow-up",
      "Family health updates",
      "Medical coordination"
    ],
    isActive: true,
    order: 13
  },
  {
    id: 14,
    title: "High-Speed Wi-Fi & Modern Amenities",
    shortDescription: "Modern amenities including high-speed Wi-Fi, 24/7 hot water, and comfortable facilities.",
    description: "We provide modern amenities for comfortable living including high-speed Wi-Fi connectivity, 24/7 hot water, well-maintained common areas, and recreational facilities.",
    icon: "icon-7",
    // image: "/images/resource/service-2.jpg",
    image: "/images/imageplaceholder.jpg",
    features: [
      "High-speed Wi-Fi",
      "24/7 hot water",
      "Well-maintained common areas",
      "Recreational facilities",
      "Garden and outdoor spaces",
      "Comfortable seating areas"
    ],
    isActive: true,
    order: 14
  },
  {
    id: 15,
    title: "Community Engagement & Recreational Programs",
    shortDescription: "Regular community programs and recreational activities for social interaction and enjoyment.",
    description: "Our community engagement programs include group discussions, hobby circles, cultural events, volunteer interactions, and various recreational activities to keep residents socially active and happy.",
    icon: "icon-8",
    // image: "/images/resource/image-1.jpg",
    image: "/images/imageplaceholder.jpg",
    features: [
      "Group discussions",
      "Hobby circles",
      "Cultural events",
      "Volunteer interactions",
      "Community gatherings",
      "Recreational programs"
    ],
    isActive: true,
    order: 15
  }
];

// About Section Data
const aboutData = {
  title: "About Happy Homes",
  subtitle: "A Home Where Seniors Live with Dignity, Joy & Purpose",
  description: "Happy Homes is a premier assisted living facility in Pune, dedicated to providing exceptional care for senior citizens. We offer Independent Living, Assisted Living, and Skilled Nursing Care with 24×7 trained nursing & caregiver support.",
  longDescription: "At Happy Homes, we understand that moving to a care facility is a significant decision for families. That's why we've created an environment that feels like a second family. Our team of experienced caregivers, nurses, and doctors work together to ensure each resident receives personalized attention and care.\n\nOur services include daily vitals monitoring & medication management, doctor visits & emergency medical assistance, nutritious vegetarian meals, housekeeping & laundry services, social activities, games & events, physiotherapy, occupational therapy & counselling, and assistance with daily living activities.",
  // image: "/images/resource/about-1.jpg",
  image: "/images/imageplaceholder.jpg",
  videoUrl: "https://www.youtube.com/watch?v=XHOmBV4js_E",
  features: [
    "24×7 trained nursing & caregiver support",
    "Daily vitals monitoring & medication management",
    "Doctor visits & emergency medical assistance",
    "Nutritious vegetarian meals (6 meals daily)",
    "Physiotherapy, occupational therapy & counselling"
  ],
  mission: "To provide dignified, compassionate, and high-quality care for senior citizens, ensuring they live their golden years with comfort, happiness, and respect.",
  vision: "To be the most trusted and preferred senior care facility in India, known for excellence in care, innovation, and creating a loving community for elders."
};

// Team Members - Indian Names
const teamMembers = [
  {
    id: 1,
    name: "Dr. Rajesh Sharma",
    designation: "Medical Director",
    // image: "/images/resource/team-1.jpg",
    image: "/images/imageplaceholder.jpg",
    description: "25+ years of experience in geriatric medicine",
    social: {
      facebook: "#",
      twitter: "#",
      linkedin: "#"
    },
    isActive: true,
    order: 1
  },
  {
    id: 2,
    name: "Mrs. Priya Kulkarni",
    designation: "Care Manager",
    // image: "/images/resource/team-2.jpg",
    image: "/images/imageplaceholder.jpg",
    description: "Expert in elder care management",
    social: {
      facebook: "#",
      twitter: "#",
      linkedin: "#"
    },
    isActive: true,
    order: 2
  },
  {
    id: 3,
    name: "Mr. Amit Deshmukh",
    designation: "Administrator",
    // image: "/images/resource/team-3.jpg",
    image: "/images/imageplaceholder.jpg",
    description: "Ensuring smooth facility operations",
    social: {
      facebook: "#",
      twitter: "#",
      linkedin: "#"
    },
    isActive: true,
    order: 3
  },
  {
    id: 4,
    name: "Sister Kavita Joshi",
    designation: "Head Nurse",
    // image: "/images/resource/team-4.jpg",
    image: "/images/imageplaceholder.jpg",
    description: "Leading our nursing team with dedication",
    social: {
      facebook: "#",
      twitter: "#",
      linkedin: "#"
    },
    isActive: true,
    order: 4
  }
];

// Testimonials - Indian Names
const testimonials = [
  {
    id: 1,
    name: "Ramesh Patil",
    designation: "Son of Resident",
    // image: "/images/resource/testimonial-1.jpg",
    image: "/images/imageplaceholder.jpg",
    review: "Happy Homes has been a blessing for our family. The care and attention my mother receives here is exceptional. The staff treats her like their own family member. I'm grateful we found such a wonderful place.",
    rating: 5,
    isActive: true,
    order: 1
  },
  {
    id: 2,
    name: "Sunita Deshpande",
    designation: "Daughter of Resident",
    // image: "/images/resource/testimonial-2.jpg",
    image: "/images/imageplaceholder.jpg",
    review: "The facilities are excellent and the medical care is top-notch. My father has made wonderful friends here and looks forward to the daily activities. The staff keeps us informed about his health regularly.",
    rating: 5,
    isActive: true,
    order: 2
  },
  {
    id: 3,
    name: "Dr. Anil Mehta",
    designation: "Family Member",
    // image: "/images/resource/testimonial-1.jpg",
    image: "/images/imageplaceholder.jpg",
    review: "As a doctor myself, I was very particular about the quality of medical care. Happy Homes exceeded my expectations. Their attention to detail in medication management and health monitoring is commendable.",
    rating: 5,
    isActive: true,
    order: 3
  }
];

// Gallery Images
const galleryImages = [
  {
    id: 1,
    title: "Beautiful Garden Area",
    category: "facility",
    // image: "/images/resource/image-1.jpg",
    image: "/images/imageplaceholder.jpg",
    isActive: true,
    order: 1
  },
  {
    id: 2,
    title: "Comfortable Rooms",
    category: "rooms",
    // image: "/images/resource/image-2.jpg",
    image: "/images/imageplaceholder.jpg",
    isActive: true,
    order: 2
  },
  {
    id: 3,
    title: "Dining Hall",
    category: "facility",
    // image: "/images/resource/image-3.jpg",
    image: "/images/imageplaceholder.jpg",
    isActive: true,
    order: 3
  },
  {
    id: 4,
    title: "Recreation Area",
    category: "activities",
    // image: "/images/resource/image-4.jpg",
    image: "/images/imageplaceholder.jpg",
    isActive: true,
    order: 4
  },
  {
    id: 5,
    title: "Medical Room",
    category: "medical",
    // image: "/images/resource/about-1.jpg",
    image: "/images/imageplaceholder.jpg",
    isActive: true,
    order: 5
  },
  {
    id: 6,
    title: "Yoga Session",
    category: "activities",
    // image: "/images/resource/blog-1.jpg",
    image: "/images/imageplaceholder.jpg",
    isActive: true,
    order: 6
  }
];

// Blog Posts - Indian Names
const blogPosts = [
  {
    id: 1,
    title: "5 Ways To Help Seniors Fight Loneliness",
    slug: "5-ways-to-help-seniors-fight-loneliness",
    excerpt: "Loneliness is a common challenge for seniors. Here are five effective ways to help your elderly loved ones stay connected and happy.",
    content: "Loneliness can significantly impact the health and well-being of seniors. Here are five proven strategies to help combat isolation...\n\n1. Regular Communication: Make it a habit to call or video chat regularly.\n\n2. Encourage Social Activities: Help them join clubs or groups.\n\n3. Technology Training: Teach them to use smartphones and social media.\n\n4. Pet Companionship: Consider a pet for emotional support.\n\n5. Professional Care: Consider quality care facilities like Happy Homes where social interaction is part of daily life.",
    // image: "/images/resource/blog-1.jpg",
    image: "/images/imageplaceholder.jpg",
    author: "Dr. Priya Sharma",
    category: "Health Tips",
    date: "2024-01-15",
    isActive: true,
    order: 1
  },
  {
    id: 2,
    title: "Importance of Proper Nutrition for Elderly",
    slug: "importance-of-proper-nutrition-for-elderly",
    excerpt: "Good nutrition is crucial for seniors. Learn about the essential nutrients and dietary considerations for elderly health.",
    content: "As we age, our nutritional needs change. Seniors require specific nutrients to maintain their health and vitality...\n\nKey nutrients for seniors include:\n- Calcium and Vitamin D for bone health\n- Fiber for digestive health\n- Protein for muscle maintenance\n- Omega-3 fatty acids for heart and brain health\n\nAt Happy Homes, our meals are designed by nutritionists to meet these specific needs while keeping the food delicious and enjoyable.",
    // image: "/images/resource/blog-2.jpg",
    image: "/images/imageplaceholder.jpg",
    author: "Nutritionist Meera Kulkarni",
    category: "Nutrition",
    date: "2024-01-10",
    isActive: true,
    order: 2
  },
  {
    id: 3,
    title: "Understanding Memory Care: A Guide for Families",
    slug: "understanding-memory-care-guide",
    excerpt: "Memory care is specialized support for those with Alzheimer's and dementia. Here's what families need to know.",
    content: "Memory care provides specialized support for individuals with Alzheimer's disease, dementia, and other memory-related conditions...\n\nKey aspects of memory care:\n- Structured daily routines\n- Safe and secure environment\n- Cognitive stimulation activities\n- Trained specialized staff\n- Family support programs\n\nAt Happy Homes, our memory care unit is designed to provide the highest level of care while maintaining dignity and quality of life.",
    // image: "/images/resource/blog-3.jpg",
    image: "/images/imageplaceholder.jpg",
    author: "Dr. Rajesh Sharma",
    category: "Care Guide",
    date: "2024-01-05",
    isActive: true,
    order: 3
  }
];

// Events/News
const events = [
  {
    id: 1,
    title: "Diwali Celebration 2024",
    date: "2024-11-01",
    time: "6:00 PM",
    location: "Main Hall, Happy Homes",
    description: "Join us for a grand Diwali celebration with cultural programs, rangoli competition, and festive dinner. Families are welcome!",
    // image: "/images/resource/image-1.jpg",
    image: "/images/imageplaceholder.jpg",
    isActive: true,
    order: 1
  },
  {
    id: 2,
    title: "Health Camp - Free Check-ups",
    date: "2024-02-15",
    time: "9:00 AM - 4:00 PM",
    location: "Medical Center",
    description: "Free health check-up camp including blood pressure, sugar, eye test, and general physician consultation.",
    // image: "/images/resource/image-2.jpg",
    image: "/images/imageplaceholder.jpg",
    isActive: true,
    order: 2
  },
  {
    id: 3,
    title: "Yoga Workshop for Seniors",
    date: "2024-02-20",
    time: "7:00 AM",
    location: "Garden Area",
    description: "Special yoga workshop focusing on gentle exercises suitable for seniors. Led by certified yoga instructor.",
    // image: "/images/resource/image-3.jpg",
    image: "/images/imageplaceholder.jpg",
    isActive: true,
    order: 3
  }
];

// Home Page Popup
const homePopup = {
  isActive: false,
  title: "Welcome to Happy Homes",
  content: "Schedule a free visit and see why families trust us for their loved ones.",
  // image: "/images/resource/about-1.jpg",
  image: "/images/imageplaceholder.jpg",
  buttonText: "Book a Visit",
  buttonLink: "/contact",
  showOnce: true
};

// Statistics/Fun Facts
const statistics = [
  {
    id: 1,
    number: 150,
    suffix: "+",
    title: "Happy Residents",
    order: 1
  },
  {
    id: 2,
    number: 50,
    suffix: "+",
    title: "Trained Staff",
    order: 2
  },
  {
    id: 3,
    number: 10,
    suffix: "+",
    title: "Years Experience",
    order: 3
  },
  {
    id: 4,
    number: 98,
    suffix: "%",
    title: "Family Satisfaction",
    order: 4
  }
];

// FAQ - Updated with comprehensive content
const faqs = [
  // Services Category
  {
    id: 1,
    question: "What services does Happy Homes offer?",
    answer: "Happy Homes provides Independent Living, Assisted Living, and Skilled Nursing Care for seniors. Our services include: 24×7 trained nursing & caregiver support, daily vitals monitoring & medication management, doctor visits & emergency medical assistance, nutritious vegetarian meals, housekeeping & laundry services, social activities, games & events, physiotherapy, occupational therapy & counselling, and assistance with daily living (bathing, grooming, mobility).",
    category: "services",
    isActive: true,
    order: 1
  },
  {
    id: 2,
    question: "What medical assistance is included in the basic plan?",
    answer: "Our basic plan includes: daily vital checkups, medication dispensing, diabetes management (sugar charting, insulin administration), catheter & Ryle's tube management, bedsore & wound care, assistance with feeding, 24×7 nurse-on-duty, emergency support including oxygen & suctioning, and coordination with doctors & family.",
    category: "services",
    isActive: true,
    order: 2
  },
  {
    id: 3,
    question: "Does Happy Homes engage seniors in activities?",
    answer: "Yes! Our Activity Team prepares weekly & monthly engagement plans which include: music, karaoke & bhajans, indoor games & cognitive activities, festival celebrations & birthday events, library & reading sessions, morning walks & outdoor recreation, meditation, yoga & breathing exercises, movie time in common areas, arts & crafts, and volunteers & group interactions.",
    category: "services",
    isActive: true,
    order: 3
  },
  // Food & Dining Category
  {
    id: 4,
    question: "Can residents request food of their choice?",
    answer: "Yes. We offer a wholesome vegetarian meal plan and consider: individual preferences, allergies, soft food / liquid diets, and festival-specific or fasting meals. Special medical diets may be supported depending on feasibility.",
    category: "food",
    isActive: true,
    order: 4
  },
  {
    id: 5,
    question: "How does Happy Homes ensure nutrition?",
    answer: "At admission, we note dietary needs, restrictions, allergies, and special doctor recommendations. Our kitchen team prepares meals under the guidance of nutrition experts to ensure balanced, healthy, and delicious food for all residents.",
    category: "food",
    isActive: true,
    order: 5
  },
  // Pricing Category
  {
    id: 6,
    question: "How is pricing decided at Happy Homes?",
    answer: "Pricing depends on: 1) Level of care needed (Independent / Assisted / Nursing Care), 2) Type of occupancy (single, shared, twin), and 3) Duration of stay (short-term or long-term). Contact us for a detailed quote based on your requirements.",
    category: "pricing",
    isActive: true,
    order: 6
  },
  {
    id: 7,
    question: "Does pricing change as a resident's care needs change?",
    answer: "Yes. If a resident requires a higher level of support in the future, their care plan and charges may be revised accordingly. We ensure transparent communication with families about any changes.",
    category: "pricing",
    isActive: true,
    order: 7
  },
  // Admission Category
  {
    id: 8,
    question: "What is the admission process?",
    answer: "Our admission process involves: 1) Book an appointment/tour, 2) Assessment by our Care Team, 3) Selection of care plan, 4) Documentation & agreement, 5) Payment of deposit, 6) Move-in & orientation. Our team guides you through each step.",
    category: "admission",
    isActive: true,
    order: 8
  },
  {
    id: 9,
    question: "What if a resident wants to discontinue the service?",
    answer: "Happy Homes follows fair exit policies as per the agreement. Residents can leave after providing the required notice as specified in the agreement.",
    category: "admission",
    isActive: true,
    order: 9
  },
  // Visitors Category
  {
    id: 10,
    question: "What is the visitor policy?",
    answer: "Visitors are welcome during visiting hours. This helps maintain routine and privacy for residents while ensuring your loved ones can spend quality time with family and friends.",
    category: "visitors",
    isActive: true,
    order: 10
  },
  {
    id: 11,
    question: "Can family members stay overnight with residents?",
    answer: "Because our setting is designed specifically for senior care, overnight stays by family members are generally not encouraged. However, we do help arrange nearby accommodation for visiting family.",
    category: "visitors",
    isActive: true,
    order: 11
  },
  // Rooms Category
  {
    id: 12,
    question: "What facilities are provided in the rooms?",
    answer: "Rooms include: comfortable senior-friendly beds, spacious wardrobe, attached/dedicated washroom, emergency call/panic button, intercom, soft lighting & night lamp, TV (in select rooms), balcony or sitting area (depending on room type), and 24×7 housekeeping & laundry support.",
    category: "rooms",
    isActive: true,
    order: 12
  },
  // Safety Category
  {
    id: 13,
    question: "How does Happy Homes ensure safety and security?",
    answer: "We ensure safety through: 24×7 security staff, CCTV monitoring, controlled entry, trained caregivers & background-verified staff, fire safety measures, and emergency response system in rooms.",
    category: "safety",
    isActive: true,
    order: 13
  },
  {
    id: 14,
    question: "What hygiene measures do you follow?",
    answer: "Our hygiene protocols include: daily cleaning & sanitation, disinfection of common areas, regular fumigation & mosquito control, clean kitchen practices, health monitoring of staff, and infection prevention protocols.",
    category: "safety",
    isActive: true,
    order: 14
  },
  // General Category
  {
    id: 15,
    question: "Can I bring personal belongings or furniture?",
    answer: "Yes, residents may bring small personal items, photographs, or belongings that make them comfortable, as long as they do not disrupt safety or room arrangements.",
    category: "general",
    isActive: true,
    order: 15
  },
  {
    id: 16,
    question: "Can residents go out with family?",
    answer: "Yes. Outings with family are allowed after basic sign-out procedures. We encourage family bonding while ensuring the safety and well-being of our residents.",
    category: "general",
    isActive: true,
    order: 16
  },
  {
    id: 17,
    question: "Is short-term/temporary stay available?",
    answer: "Yes. Happy Homes offers: short-term respite care, post-surgery recovery care, temporary stays for caregivers' holidays, and trial stays for families to experience our facility before making a long-term commitment.",
    category: "general",
    isActive: true,
    order: 17
  }
];

// Living Options/Room Types
const livingOptions = [
  {
    id: 1,
    title: "Bedridden Care",
    description: "Comprehensive care for fully dependent senior residents with 24/7 nursing support, condition-based meals, and skilled medical care.",
    price: "Contact for Pricing",
    // image: "/images/resource/image-1.jpg",
    image: "/images/imageplaceholder.jpg",
    amenities: [
      "24/7 dedicated nursing supervision",
      "Customized diet plans based on medical condition",
      "Bedside physiotherapy routines",
      "Pressure-relief bedding",
      "Medication management & monitoring",
      "Emergency support including oxygen & suctioning"
    ],
    isActive: true,
    order: 1
  },
  {
    id: 2,
    title: "Assisted Living",
    description: "Personalized daily assistance to maintain independent living with attentive nursing and safe, supportive rooms.",
    price: "Contact for Pricing",
    // image: "/images/resource/image-2.jpg",
    image: "/images/imageplaceholder.jpg",
    amenities: [
      "Personal assistance for daily tasks",
      "Activity-based recovery programs",
      "Timely nutritious meals",
      "Daily physiotherapy sessions",
      "Safety features and easy accessibility",
      "Regular health monitoring"
    ],
    isActive: true,
    order: 2
  },
  {
    id: 3,
    title: "Independent Senior Living",
    description: "Comfortable community lifestyle for active senior residents with healthy meals, wellness programs, and recreational activities.",
    price: "Contact for Pricing",
    // image: "/images/resource/image-3.jpg",
    image: "/images/imageplaceholder.jpg",
    amenities: [
      "Community interaction activities",
      "Games and recreation",
      "Optional fitness and wellness programs",
      "Nutritious meals for active living",
      "Private, comfortable rooms",
      "Secure environment with staff support"
    ],
    isActive: true,
    order: 3
  }
];

module.exports = {
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
};
