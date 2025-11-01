// src/pages/Home.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import HomeNavbar from '../components/HomeNavbar';
import { 
  Sprout, 
  Brain, 
  BarChart3,
  Upload,
  Search,
  Droplets,
  Users,
  ArrowRight,
  Leaf,
  CheckCircle,
  Star,
  TrendingUp
} from 'lucide-react';
import './Home.css';
//import HomeNavbar from '../components/HomeNavbar';

const Home = () => {
  const features = [
    {
      icon: Upload,
      title: 'AI Disease Detection',
      description: 'Instant leaf disease diagnosis with 95% accuracy using advanced AI algorithms.',
      link: '/crop-disease',
      color: 'green',
      stats: '95% Accuracy'
    },
    {
      icon: Droplets,
      title: 'Smart Irrigation',
      description: 'Real-time soil moisture monitoring with automated water management systems.',
      link: '/soil-moisture',
      color: 'blue',
      stats: '40% Water Saved'
    },
    {
      icon: Brain,
      title: 'Crop Recommendations',
      description: 'Personalized crop suggestions based on soil, climate, and market analysis.',
      link: '/crop-recommendation',
      color: 'purple',
      stats: '30% Yield Increase'
    },
    {
      icon: BarChart3,
      title: 'Farm Analytics',
      description: 'Comprehensive insights and predictive analytics for informed decisions.',
      link: '/dashboard',
      color: 'orange',
      stats: '24/7 Monitoring'
    }
  ];

  const cropCategories = [
    {
      name: 'Cereal Crops',
      icon: '🌾',
      count: '12+ Varieties',
      description: 'Wheat, Rice, Maize, Barley',
      gradient: 'amber',
      link: '/crop-info?category=cereal'
    },
    {
      name: 'Vegetables',
      icon: '🥦',
      count: '25+ Types',
      description: 'Tomato, Potato, Cabbage, Carrot',
      gradient: 'green',
      link: '/crop-info?category=vegetables'
    },
    {
      name: 'Fruits',
      icon: '🍎',
      count: '18+ Varieties',
      description: 'Apple, Banana, Citrus, Berries',
      gradient: 'red',
      link: '/crop-info?category=fruits'
    },
    {
      name: 'Cash Crops',
      icon: '💰',
      count: '8+ Types',
      description: 'Cotton, Sugarcane, Coffee, Tea',
      gradient: 'purple',
      link: '/crop-info?category=cash'
    }
  ];

  const testimonials = [
    {
      name: 'Rajesh Kumar',
      role: 'Farm Owner, Punjab',
      image: '👨‍🌾',
      content: 'AquaAgriLink increased my yield by 35% and reduced water usage significantly.',
      rating: 5
    },
    {
      name: 'Priya Sharma',
      role: 'Agricultural Researcher',
      image: '👩‍🔬',
      content: 'The AI disease detection is incredibly accurate. A game-changer for farmers.',
      rating: 5
    },
    {
      name: 'Michael Chen',
      role: 'Organic Farm Manager',
      image: '👨‍💼',
      content: 'Best investment we made for our farm. The insights are invaluable.',
      rating: 4
    }
  ];

  const stats = [
    { number: '10,000+', label: 'Farmers Empowered', icon: Users, color: 'green' },
    { number: '95%', label: 'Accuracy Rate', icon: CheckCircle, color: 'blue' },
    { number: '50%', label: 'Water Saved', icon: Droplets, color: 'cyan' },
    { number: '30%', label: 'Yield Increased', icon: TrendingUp, color: 'orange' }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  // Add the missing floatVariants definition
  const floatVariants = {
    float: {
      y: [-10, 10, -10],
      transition: {
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  const getColorClass = (color) => {
    const colorMap = {
      green: 'text-gradient-primary',
      blue: 'text-gradient-secondary',
      cyan: 'text-cyan-500',
      orange: 'text-orange-500',
      purple: 'text-purple-500',
      red: 'text-red-500',
      amber: 'text-amber-500'
    };
    return colorMap[color] || 'text-gradient-primary';
  };

  return (
  <>
  <HomeNavbar/>
    <div className="home-container gradient-bg-light">
      {/* Hero Section */}
      <section className="hero-section particle-bg">
        <div className="hero-background">
          <div className="floating-circle circle-1"></div>
          <div className="floating-circle circle-2"></div>
          <div className="floating-circle circle-3"></div>
        </div>

        <div className="hero-content">
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="hero-main"
          >
            <motion.div
              variants={floatVariants}
              animate="float"
              className="hero-badge glass-effect"
            >
              <Sprout className="hero-badge-icon" />
              <span className="hero-badge-text">Welcome to Smart Farming Revolution</span>
            </motion.div>
            
            <h1 className="hero-title text-gradient-hero">
              AquaAgri
              <span className="hero-subtitle">Link</span>
            </h1>
            
            <p className="hero-description">
              Empowering Farmers with <span className="highlight-text">AI, IoT, and Smart Insights</span> for Sustainable Agriculture
            </p>
            
            <div className="hero-buttons">
              <Link
                to="/dashboard"
                className="btn-primary hero-btn-primary"
              >
                <span className="btn-content">
                  <span>Get Started</span>
                  <ArrowRight className="btn-icon" />
                </span>
              </Link>
              
              <Link
                to="/about"
                className="btn-secondary hero-btn-secondary"
              >
                <span className="btn-content">
                  <span>Learn More</span>
                </span>
              </Link>
            </div>
          </motion.div>

          {/* Quick Stats */}
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="hero-stats"
          >
            {stats.map((stat, index) => (
              <div key={stat.label} className="stat-item">
                <div className={`stat-number ${getColorClass(stat.color)}`}>
                  {stat.number}
                </div>
                <div className="stat-label">
                  {stat.label}
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="scroll-indicator-container"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="scroll-indicator"
          >
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="scroll-dot"
            />
          </motion.div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <div className="container">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="section-header"
          >
            <motion.h2 variants={itemVariants} className="section-title">
              Why Choose <span className="accent-text">AquaAgriLink?</span>
            </motion.h2>
            <motion.p variants={itemVariants} className="section-description">
              Discover how our cutting-edge technology transforms traditional farming into smart, efficient, and sustainable agriculture
            </motion.p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="features-grid"
          >
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                variants={itemVariants}
                whileHover={{ 
                  y: -10,
                  scale: 1.02,
                  transition: { duration: 0.3 }
                }}
                className="feature-card"
              >
                <div className="feature-overlay"></div>
                
                <div className="feature-content">
                  <div className={`feature-icon feature-icon-${feature.color}`}>
                    <feature.icon className="feature-icon-svg" />
                  </div>
                  
                  <h3 className="feature-title">
                    {feature.title}
                  </h3>
                  
                  <p className="feature-description">
                    {feature.description}
                  </p>
                  
                  <div className="feature-footer">
                    <span className="feature-stats">
                      {feature.stats}
                    </span>
                    <Link
                      to={feature.link}
                      className="feature-link"
                    >
                      <span>Explore</span>
                      <ArrowRight className="link-icon" />
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Crop Information Section */}
      <section className="crop-section gradient-overlay">
        <div className="container">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="section-header"
          >
            <motion.h2 variants={itemVariants} className="section-title">
              Explore <span className="accent-text">Crop Information</span>
            </motion.h2>
            <motion.p variants={itemVariants} className="section-description">
              Comprehensive database of crops with detailed information on cultivation, diseases, and best practices
            </motion.p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="categories-grid"
          >
            {cropCategories.map((category, index) => (
              <motion.div
                key={category.name}
                variants={itemVariants}
                whileHover={{ 
                  y: -8,
                  scale: 1.02,
                  transition: { duration: 0.3 }
                }}
                className="category-card"
              >
                <div className={`category-gradient category-gradient-${category.gradient}`}></div>
                
                <div className="category-content">
                  <div className="category-icon">{category.icon}</div>
                  <h3 className="category-title">
                    {category.name}
                  </h3>
                  <p className="category-description">{category.description}</p>
                  <div className="category-footer">
                    <span className="category-count">{category.count}</span>
                    <Link
                      to={category.link}
                      className="category-link"
                    >
                      <span>View</span>
                      <ArrowRight className="link-icon-small" />
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="section-cta"
          >
            <Link
              to="/crop-info"
              className="btn-primary cta-button"
            >
              <Search className="cta-icon" />
              <span>Browse All Crops</span>
              <ArrowRight className="cta-arrow" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Crop Recommendation CTA */}
      <section className="recommendation-section">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="recommendation-banner gradient-bg-primary"
          >
            <div className="banner-overlay"></div>
            <div className="banner-circle circle-top"></div>
            <div className="banner-circle circle-bottom"></div>
            
            <div className="banner-content">
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
                className="banner-icon-container"
              >
                <Brain className="banner-icon" />
              </motion.div>
              
              <h2 className="banner-title">
                Get Smart Crop Recommendations
              </h2>
              
              <p className="banner-description">
                Tell us about your soil, climate, and requirements. Our AI will suggest the perfect crops for maximum yield and profit.
              </p>
              
              <div className="banner-buttons">
                <Link
                  to="/crop-recommendation"
                  className="btn-primary banner-btn-primary"
                >
                  <Leaf className="btn-icon" />
                  <span>Get Recommendations</span>
                  <ArrowRight className="btn-arrow" />
                </Link>
                
                <Link
                  to="/crop-info"
                  className="btn-secondary banner-btn-secondary"
                >
                  Learn How It Works
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="testimonials-section gradient-bg-light">
        <div className="container">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="section-header"
          >
            <motion.h2 variants={itemVariants} className="section-title">
              What Farmers <span className="accent-text">Say</span>
            </motion.h2>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="testimonials-grid"
          >
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.name}
                variants={itemVariants}
                whileHover={{ y: -5 }}
                className="testimonial-card"
              >
                <div className="testimonial-header">
                  <div className="testimonial-avatar">{testimonial.image}</div>
                  <div className="testimonial-info">
                    <h4 className="testimonial-name">{testimonial.name}</h4>
                    <p className="testimonial-role">{testimonial.role}</p>
                  </div>
                </div>
                
                <div className="testimonial-rating">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`star-icon ${
                        i < testimonial.rating ? 'star-filled' : 'star-empty'
                      }`}
                    />
                  ))}
                </div>
                
                <p className="testimonial-content">"{testimonial.content}"</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="final-cta-section">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="final-cta-content"
          >
            <h2 className="cta-title">
              Ready to Transform Your Farming?
            </h2>
            <p className="cta-description">
              Join thousands of farmers who are already using AquaAgriLink to make smarter decisions and increase their profits.
            </p>
            <div className="cta-buttons">
              <Link
                to="/login"
                className="btn-primary cta-btn-primary"
              >
                Start Free Trial
              </Link>
              <Link
                to="/contact"
                className="btn-secondary cta-btn-secondary"
              >
                Contact Sales
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  </>
  );
};

export default Home;