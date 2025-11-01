import React, { useState, useRef, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Home, 
  User, 
  Info, 
  Phone, 
  LogOut,
  ChevronDown,
  Sprout,
  BarChart3,
  CloudRain,
  Brain,
  BookOpen,
  Cloud,
  Thermometer,
  Droplets,
  Wind
} from 'lucide-react';
import '../styles/Navbar.css';

function Navbar() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [weatherData, setWeatherData] = useState(null);
  const [weatherLoading, setWeatherLoading] = useState(true);
  const dropdownRef = useRef(null);
  const profileDropdownRef = useRef(null);
  const location = useLocation();

  const toggleDropdown = () => {
    setIsDropdownOpen((prevState) => !prevState);
  };

  const toggleProfileDropdown = () => {
    setIsProfileDropdownOpen((prevState) => !prevState);
  };

  // Mock weather data - in real app, you'd fetch from API
  const fetchWeatherData = () => {
    setWeatherLoading(true);
    // Simulate API call
    setTimeout(() => {
      setWeatherData({
        temperature: 28,
        condition: 'Partly Cloudy',
        humidity: 65,
        windSpeed: 12,
        icon: '⛅',
        location: 'Farm Field'
      });
      setWeatherLoading(false);
    }, 1000);
  };

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
      if (profileDropdownRef.current && !profileDropdownRef.current.contains(event.target)) {
        setIsProfileDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    fetchWeatherData();
    // Refresh weather every 5 minutes
    const interval = setInterval(fetchWeatherData, 300000);
    return () => clearInterval(interval);
  }, []);

  const navItems = [
    { path: '/dashboard', icon: BarChart3, label: 'Dashboard' },
    { path: '/crop-disease', icon: Sprout, label: 'Disease Detection' },
    { path: '/crop-recommendation', icon: Brain, label: 'Crop Recommendation' },
    { path: '/soil-moisture', icon: CloudRain, label: 'Soil Moisture' },
    { path: '/weather', icon: Cloud, label: 'Weather' },
  ];

  const profileItems = [
    { path: '/profile', icon: User, label: 'My Profile' },
    { path: '/about', icon: Info, label: 'About Us' },
    { path: '/contact', icon: Phone, label: 'Contact Us' },
  ];

  const isActiveLink = (path, exact = false) => {
    if (exact) {
      return location.pathname === path;
    }
    return location.pathname.startsWith(path);
  };

  return (
    <nav className="navbar">
      {/* Logo Section */}
      <div className="navbar-brand">
        <div className="logo-container">
          <Sprout className="logo-icon" />
          <div className="logo-text">
            <span className="logo-primary">AquaAgri</span>
            <span className="logo-secondary">Link</span>
          </div>
        </div>
      </div>

      {/* Desktop Navigation */}
      <div className="navbar-center">
        <div className="nav-links">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`nav-link ${isActiveLink(item.path, item.exact) ? 'active' : ''}`}
              >
                <Icon className="nav-icon" size={18} />
                <span className="nav-text">{item.label}</span>
                {isActiveLink(item.path, item.exact) && <div className="active-indicator" />}
              </Link>
            );
          })}
        </div>
      </div>

      {/* Right Section - Weather & Profile */}
      <div className="navbar-right">
        {/* Weather Widget - Text Only */}
        <div className="weather-widget">
          {weatherLoading ? (
            <div className="weather-loading">
              <div className="weather-spinner"></div>
            </div>
          ) : weatherData ? (
            <Link to="/weather" className="weather-info-text">
              <div className="weather-text-content">
                <div className="weather-temp-text">
                  {weatherData.temperature}°C
                </div>
                <div className="weather-location-text">{weatherData.location}</div>
              </div>
            </Link>
          ) : (
            <div className="weather-error">
              <Cloud size={18} />
              <span>No Data</span>
            </div>
          )}
        </div>

        {/* Profile Dropdown */}
        <div className="profile-section" ref={profileDropdownRef}>
          <button 
            className="profile-trigger"
            onClick={toggleProfileDropdown}
          >
            <div className="profile-avatar">
              <User size={20} />
            </div>
            <span className="profile-name">Priyanka Lavate</span>
            <ChevronDown 
              size={16} 
              className={`dropdown-arrow ${isProfileDropdownOpen ? 'open' : ''}`} 
            />
          </button>

          {isProfileDropdownOpen && (
            <div className="profile-dropdown">
              <div className="profile-header">
                <div className="profile-avatar-large">
                  <User size={24} />
                </div>
                <div className="profile-info">
                  <div className="profile-name-large">Priyanka Lavate</div>
                  <div className="profile-email">priyankalavate@gmail.com</div>
                  <div className="profile-role">Premium Farmer</div>
                </div>
              </div>

              <div className="dropdown-divider" />

              <div className="dropdown-items">
                {profileItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.path}
                      to={item.path}
                      className="dropdown-item"
                      onClick={() => setIsProfileDropdownOpen(false)}
                    >
                      <Icon className="dropdown-icon" size={18} />
                      <span>{item.label}</span>
                    </Link>
                  );
                })}
              </div>

              <div className="dropdown-divider" />

              <button className="logout-button">
                <LogOut className="dropdown-icon" size={18} />
                <span>Logout</span>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Menu Button */}
      <div className="navbar-mobile" ref={dropdownRef}>
        <button 
          className="mobile-menu-button"
          onClick={toggleDropdown}
        >
          <div className={`menu-icon ${isDropdownOpen ? 'open' : ''}`}>
            <span></span>
            <span></span>
            <span></span>
          </div>
        </button>

        {/* Mobile Dropdown Menu */}
        {isDropdownOpen && (
          <div className="mobile-dropdown">
            {/* Mobile Weather - Text Only */}
            <div className="mobile-weather">
              {weatherData && (
                <div className="mobile-weather-info-text">
                  <div className="mobile-weather-text-content">
                    <div className="mobile-weather-temp-text">
                      {weatherData.temperature}°C
                    </div>
                    <div className="mobile-weather-location-text">
                      {weatherData.location}
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="mobile-divider" />

            <div className="mobile-profile">
              <div className="mobile-avatar">
                <User size={24} />
              </div>
              <div className="mobile-profile-info">
                <div className="mobile-profile-name">Priyanka Lavate</div>
                <div className="mobile-profile-email">priyankarlavate@gmail.com</div>
              </div>
            </div>

            <div className="mobile-nav-links">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`mobile-nav-link ${isActiveLink(item.path, item.exact) ? 'active' : ''}`}
                    onClick={() => setIsDropdownOpen(false)}
                  >
                    <Icon className="mobile-nav-icon" size={18} />
                    <span>{item.label}</span>
                  </Link>
                );
              })}
            </div>

            <div className="mobile-divider" />

            <div className="mobile-profile-links">
              {profileItems.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className="mobile-profile-link"
                    onClick={() => setIsDropdownOpen(false)}
                  >
                    <Icon className="mobile-profile-icon" size={18} />
                    <span>{item.label}</span>
                  </Link>
                );
              })}
            </div>

            <div className="mobile-divider" />

            <button className="mobile-logout-button">
              <LogOut className="mobile-logout-icon" size={18} />
              <span>Logout</span>
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;