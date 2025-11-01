import React, { useState, useRef, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Sprout, 
  User, 
  Phone, 
  Info, 
  ChevronDown,
  LogOut,
  Home,
  Shield,
  TrendingUp,
  BookOpen,
  Calendar,
  CloudRain,
  Thermometer
} from 'lucide-react';
import '../styles/HomeNavbar.css';

function HomeNavbar() {
  const [isCropDropdownOpen, setIsCropDropdownOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  
  const cropDropdownRef = useRef(null);
  const profileDropdownRef = useRef(null);
  const mobileMenuRef = useRef(null);
  const location = useLocation();

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (cropDropdownRef.current && !cropDropdownRef.current.contains(event.target)) {
        setIsCropDropdownOpen(false);
      }
      if (profileDropdownRef.current && !profileDropdownRef.current.contains(event.target)) {
        setIsProfileDropdownOpen(false);
      }
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target)) {
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggleCropDropdown = () => {
    setIsCropDropdownOpen(!isCropDropdownOpen);
  };

  const toggleProfileDropdown = () => {
    setIsProfileDropdownOpen(!isProfileDropdownOpen);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const cropCategories = [
    {
      title: "Vegetables",
      items: ["Tomato", "Potato", "Onion", "Cabbage", "Carrot"]
    },
    {
      title: "Grains",
      items: ["Wheat", "Rice", "Corn", "Barley", "Oats"]
    },
    {
      title: "Fruits",
      items: ["Mango", "Apple", "Banana", "Orange", "Grapes"]
    },
    {
      title: "Cash Crops",
      items: ["Cotton", "Sugarcane", "Coffee", "Tea", "Rubber"]
    }
  ];

  const quickLinks = [
    { icon: Calendar, label: "Seasonal Guide", path: "/seasonal-guide" },
    { icon: Shield, label: "Disease Control", path: "/disease-control" },
    { icon: TrendingUp, label: "Market Prices", path: "/market-prices" },
    { icon: BookOpen, label: "Farming Tips", path: "/farming-tips" }
  ];

  return (
    <nav className={`home-navbar ${isScrolled ? 'scrolled' : ''}`}>
      <div className="nav-container">
        {/* Logo Section */}
        <div className="logo-section">
          <Link to="/" className="logo-link">
            <div className="logo">
              <Sprout className="logo-icon" />
              <div className="logo-text">
                <span className="logo-primary">Farm</span>
                <span className="logo-secondary">Connect</span>
              </div>
            </div>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <div className="nav-center">
          <div className="nav-links">
            <Link to="/" className="nav-link">
              <Home size={18} />
              <span>Home</span>
            </Link>

            {/* Crop Information Dropdown */}
            <div 
              className="nav-dropdown"
              ref={cropDropdownRef}
              onMouseEnter={() => setIsCropDropdownOpen(true)}
              onMouseLeave={() => setIsCropDropdownOpen(false)}
            >
              <button className="dropdown-trigger">
                <Sprout size={18} />
                <span>Crop Information</span>
                <ChevronDown 
                  size={16} 
                  className={`dropdown-arrow ${isCropDropdownOpen ? 'open' : ''}`} 
                />
              </button>

              {isCropDropdownOpen && (
                <div className="crop-dropdown-menu">
                  <div className="dropdown-header">
                    <h3>Crop Information Center</h3>
                    <p>Complete guide for all your crops</p>
                  </div>
                  
                  <div className="dropdown-grid">
                    {cropCategories.map((category, index) => (
                      <div key={index} className="category-section">
                        <h4 className="category-title">{category.title}</h4>
                        <div className="category-items">
                          {category.items.map((item, itemIndex) => (
                            <Link
                              key={itemIndex}
                              to={`/crops/${item.toLowerCase()}`}
                              className="category-item"
                              onClick={() => setIsCropDropdownOpen(false)}
                            >
                              {item}
                            </Link>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="dropdown-quick-links">
                    <h4>Quick Access</h4>
                    <div className="quick-links-grid">
                      {quickLinks.map((link, index) => {
                        const Icon = link.icon;
                        return (
                          <Link
                            key={index}
                            to={link.path}
                            className="quick-link"
                            onClick={() => setIsCropDropdownOpen(false)}
                          >
                            <Icon size={16} />
                            <span>{link.label}</span>
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* About Us Link */}
            <Link to="/about" className="nav-link">
              <Info size={18} />
              <span>About Us</span>
            </Link>

            {/* Contact Us Link */}
            <Link to="/contact" className="nav-link">
              <Phone size={18} />
              <span>Contact Us</span>
            </Link>
          </div>
        </div>

        {/* Right Section - Auth & Profile */}
        <div className="nav-right">
          <div className="auth-section">
            <Link to="/login" className="login-btn">
              <User size={18} />
              <span>Login</span>
            </Link>
            <Link to="/register" className="register-btn">
              <span>Sign Up</span>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="mobile-menu" ref={mobileMenuRef}>
            <button 
              className="mobile-menu-button"
              onClick={toggleMobileMenu}
            >
              <div className={`menu-icon ${isMobileMenuOpen ? 'open' : ''}`}>
                <span></span>
                <span></span>
                <span></span>
              </div>
            </button>

            {/* Mobile Dropdown Menu */}
            {isMobileMenuOpen && (
              <div className="mobile-dropdown">
                <div className="mobile-nav-links">
                  <Link 
                    to="/" 
                    className="mobile-nav-link"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <Home size={18} />
                    <span>Home</span>
                  </Link>

                  <div className="mobile-dropdown-section">
                    <button 
                      className="mobile-dropdown-trigger"
                      onClick={() => setIsCropDropdownOpen(!isCropDropdownOpen)}
                    >
                      <Sprout size={18} />
                      <span>Crop Information</span>
                      <ChevronDown 
                        size={16} 
                        className={`dropdown-arrow ${isCropDropdownOpen ? 'open' : ''}`} 
                      />
                    </button>

                    {isCropDropdownOpen && (
                      <div className="mobile-crop-dropdown">
                        {cropCategories.map((category, index) => (
                          <div key={index} className="mobile-category">
                            <h5>{category.title}</h5>
                            <div className="mobile-category-items">
                              {category.items.map((item, itemIndex) => (
                                <Link
                                  key={itemIndex}
                                  to={`/crops/${item.toLowerCase()}`}
                                  className="mobile-category-item"
                                  onClick={() => {
                                    setIsMobileMenuOpen(false);
                                    setIsCropDropdownOpen(false);
                                  }}
                                >
                                  {item}
                                </Link>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  <Link 
                    to="/about" 
                    className="mobile-nav-link"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <Info size={18} />
                    <span>About Us</span>
                  </Link>

                  <Link 
                    to="/contact" 
                    className="mobile-nav-link"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <Phone size={18} />
                    <span>Contact Us</span>
                  </Link>
                </div>

                <div className="mobile-divider" />

                <div className="mobile-auth-section">
                  <Link 
                    to="/login" 
                    className="mobile-login-btn"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <User size={18} />
                    <span>Login</span>
                  </Link>
                  <Link 
                    to="/register" 
                    className="mobile-register-btn"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <span>Create Account</span>
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default HomeNavbar;