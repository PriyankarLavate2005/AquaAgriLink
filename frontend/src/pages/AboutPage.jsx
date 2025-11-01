import React, { useState } from "react";
import { motion } from "framer-motion";
import { 
  Sprout, 
  Target, 
  Users, 
  Award, 
  TrendingUp, 
  Shield,
  Droplets,
  CloudRain,
  Brain,
  BarChart3,
  Leaf,
  CheckCircle,
  ArrowRight,
  Play
}
from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "../styles/about.css";

function AboutPage() {
  const [readMore, setReadMore] = useState(false);
  const [activeTab, setActiveTab] = useState('mission');

  const teamMembers = [
    {
      name: "Dr. Sarah Chen",
      role: "Agricultural Scientist",
      image: "👩‍🔬",
      description: "Expert in sustainable farming practices with 15+ years of experience"
    },
    {
      name: "Raj Kumar",
      role: "IoT Engineer",
      image: "👨‍💻",
      description: "Specialized in smart agriculture sensor networks"
    },
    {
      name: "Maria Rodriguez",
      role: "AI Specialist",
      image: "👩‍💼",
      description: "Machine learning expert for crop prediction algorithms"
    },
    {
      name: "David Kim",
      role: "Full Stack Developer",
      image: "👨‍💻",
      description: "Built the AquaAgriLink platform from ground up"
    }
  ];

  const features = [
    {
      icon: Droplets,
      title: "Smart Irrigation",
      description: "AI-powered water management saving up to 50% water usage"
    },
    {
      icon: Brain,
      title: "Crop Intelligence",
      description: "Machine learning for disease detection and yield prediction"
    },
    {
      icon: BarChart3,
      title: "Real-time Analytics",
      description: "Live monitoring of soil conditions and crop health"
    },
    {
      icon: Shield,
      title: "Sustainable Farming",
      description: "Eco-friendly practices for long-term soil fertility"
    }
  ];

  const stats = [
    { number: "10,000+", label: "Farmers Empowered", icon: Users },
    { number: "50%", label: "Water Saved", icon: Droplets },
    { number: "95%", label: "Accuracy Rate", icon: Award },
    { number: "30%", label: "Yield Increased", icon: TrendingUp }
  ];

  return (
    <>
      <Navbar />
      <div className="about-container">
        {/* Hero Section */}
        <section className="hero-section">
          <div className="hero-background">
            <div className="floating-shape shape-1"></div>
            <div className="floating-shape shape-2"></div>
            <div className="floating-shape shape-3"></div>
          </div>
          <div className="hero-content">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="hero-text"
            >
              <h1 className="hero-title">
                Transforming Agriculture with 
                <span className="gradient-text"> AI & IoT</span>
              </h1>
              <p className="hero-description">
                Empowering farmers with cutting-edge technology for sustainable, 
                efficient, and profitable farming practices. Join the smart agriculture revolution.
              </p>
              <div className="hero-buttons">
                <motion.button 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="btn-primary"
                >
                  <Play size={20} />
                  Watch Demo
                </motion.button>
                <motion.button 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="btn-secondary"
                >
                  Learn More
                  <ArrowRight size={20} />
                </motion.button>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="hero-visual"
            >
              <div className="floating-card card-1">
                <Sprout className="card-icon" />
                <span>Crop Health</span>
              </div>
              <div className="floating-card card-2">
                <Droplets className="card-icon" />
                <span>Soil Moisture</span>
              </div>
              <div className="floating-card card-3">
                <Brain className="card-icon" />
                <span>AI Insights</span>
              </div>
              <div className="main-visual">
                <img 
                  src="/api/placeholder/400/300" 
                  alt="Smart Farming" 
                  className="hero-image"
                />
                <div className="visual-glow"></div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="stats-section">
          <div className="container">
            <div className="stats-grid">
              {stats.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="stat-card"
                  >
                    <div className="stat-icon">
                      <Icon size={32} />
                    </div>
                    <div className="stat-number">{stat.number}</div>
                    <div className="stat-label">{stat.label}</div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Mission & Vision */}
        <section className="mission-section">
          <div className="container">
            <div className="section-header">
              <h2>Our Vision for Smart Agriculture</h2>
              <p>Building the future of farming with technology and innovation</p>
            </div>
            
            <div className="tabs-container">
              <div className="tabs-header">
                {['mission', 'vision', 'values'].map((tab) => (
                  <button
                    key={tab}
                    className={`tab-button ${activeTab === tab ? 'active' : ''}`}
                    onClick={() => setActiveTab(tab)}
                  >
                    {tab.charAt(0).toUpperCase() + tab.slice(1)}
                  </button>
                ))}
              </div>
              
              <div className="tab-content">
                {activeTab === 'mission' && (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="tab-panel"
                  >
                    <Target className="tab-icon" />
                    <h3>Our Mission</h3>
                    <p>
                      To democratize smart farming technology, making it accessible 
                      to farmers of all scales. We combine IoT sensors, AI analytics, 
                      and sustainable practices to optimize crop yield while preserving 
                      our planet's resources.
                    </p>
                    <ul className="feature-list">
                      <li><CheckCircle size={18} /> Real-time crop monitoring</li>
                      <li><CheckCircle size={18} /> AI-powered disease detection</li>
                      <li><CheckCircle size={18} /> Automated irrigation systems</li>
                      <li><CheckCircle size={18} /> Data-driven insights</li>
                    </ul>
                  </motion.div>
                )}
                
                {activeTab === 'vision' && (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="tab-panel"
                  >
                    <Award className="tab-icon" />
                    <h3>Our Vision</h3>
                    <p>
                      We envision a world where every farmer has access to intelligent 
                      farming tools that maximize productivity while minimizing 
                      environmental impact. A future where technology and tradition 
                      work hand in hand.
                    </p>
                    <ul className="feature-list">
                      <li><CheckCircle size={18} /> Global food security</li>
                      <li><CheckCircle size={18} /> Sustainable practices</li>
                      <li><CheckCircle size={18} /> Farmer empowerment</li>
                      <li><CheckCircle size={18} /> Climate resilience</li>
                    </ul>
                  </motion.div>
                )}
                
                {activeTab === 'values' && (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="tab-panel"
                  >
                    <Shield className="tab-icon" />
                    <h3>Our Values</h3>
                    <p>
                      Integrity, innovation, and impact drive everything we do. 
                      We believe in creating technology that serves humanity while 
                      respecting our planet's delicate ecosystems.
                    </p>
                    <ul className="feature-list">
                      <li><CheckCircle size={18} /> Sustainability first</li>
                      <li><CheckCircle size={18} /> Farmer-centric design</li>
                      <li><CheckCircle size={18} /> Continuous innovation</li>
                      <li><CheckCircle size={18} /> Community impact</li>
                    </ul>
                  </motion.div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="features-section">
          <div className="container">
            <div className="section-header">
              <h2>Why Choose AquaAgriLink?</h2>
              <p>Comprehensive solutions for modern farming challenges</p>
            </div>
            
            <div className="features-grid">
              {features.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <motion.div
                    key={feature.title}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ y: -10 }}
                    className="feature-card"
                  >
                    <div className="feature-icon">
                      <Icon size={32} />
                    </div>
                    <h3>{feature.title}</h3>
                    <p>{feature.description}</p>
                    <div className="feature-glow"></div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>
        {/* CTA Section */}
        <section className="cta-section">
          <div className="container">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="cta-content"
            >
              <h2>Ready to Transform Your Farming?</h2>
              <p>Join thousands of farmers who are already using AquaAgriLink to make smarter decisions and increase their profits.</p>
              <div className="cta-buttons">
                <motion.button 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="btn-primary"
                >
                  Start Free Trial
                </motion.button>
                <motion.button 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="btn-secondary"
                >
                  Schedule Demo
                </motion.button>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
}

export default AboutPage;