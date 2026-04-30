import React, { useState, useRef, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  Home,
  User,
  Settings,
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
  Wind,
  Shield
} from 'lucide-react';
import axiosInstance from '../utils/axiosInstance';
import '../styles/Navbar.css';

function Navbar() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [weatherData, setWeatherData] = useState(null);
  const [weatherLoading, setWeatherLoading] = useState(true);
  const [user, setUser] = useState(null);

  const dropdownRef = useRef(null);
  const profileDropdownRef = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();

  const toggleDropdown = () => {
    setIsDropdownOpen((prevState) => !prevState);
  };

  const toggleProfileDropdown = () => {
    setIsProfileDropdownOpen((prevState) => !prevState);
  };

  const fetchUserProfile = async () => {
    const token = localStorage.getItem('token');
    if (!token) return;

    try {
      const response = await axiosInstance.get('/auth/profile');
      if (response.data.success) {
        setUser(response.data.farmer);
      }
    } catch (error) {
      console.error('Error fetching user profile:', error);
      // If token is invalid, clear it
      if (error.response?.status === 401) {
        localStorage.removeItem('token');
        setUser(null);
      }
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setUser(null);
    navigate('/');
  };

  // Fetch real weather data from OpenWeatherMap
  const fetchWeatherData = async () => {
    setWeatherLoading(true);
    const city = 'Solapur';
    const apiKey = '0c005fa00b6a2d265bfea09a97e0d15f';

    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
      );

      if (!response.ok) throw new Error('Weather data unavailable');

      const data = await response.json();
      setWeatherData({
        temperature: Math.round(data.main.temp),
        condition: data.weather[0].main,
        humidity: data.main.humidity,
        windSpeed: data.wind.speed,
        icon: data.weather[0].icon,
        location: data.name
      });
    } catch (error) {
      console.error('Error fetching weather:', error);
      // Fallback data if API fails
      setWeatherData({
        temperature: 25,
        condition: 'Clear',
        location: 'Solapur'
      });
    } finally {
      setWeatherLoading(false);
    }
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
    fetchUserProfile();
    // Refresh weather every 5 minutes
    const interval = setInterval(fetchWeatherData, 300000);
    return () => clearInterval(interval);
  }, []);

  // Re-fetch profile when location changes (in case user updated profile)
  useEffect(() => {
    fetchUserProfile();
  }, [location.pathname]);

  const navItems = [
    { path: '/dashboard', icon: BarChart3, label: 'Dashboard' },
    { path: 'http://localhost:5002/index', icon: Sprout, label: 'Disease Detection' },
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
        <Link to="/dashboard" className="logo-link">
          <div className="logo-container">
            <Sprout className="logo-icon" />
            <div className="logo-text">
              <span className="logo-primary">AquaAgri</span>
              <span className="logo-secondary">Link</span>
            </div>
          </div>
        </Link>
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
              {weatherData.icon && (
                <img
                  src={`https://openweathermap.org/img/wn/${weatherData.icon}.png`}
                  alt={weatherData.condition}
                  className="weather-icon-small"
                />
              )}
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
              {user?.profilePicture ? (
                <img src={user.profilePicture} alt="Avatar" className="avatar-img" />
              ) : (
                <User size={20} />
              )}
            </div>
            <span className="profile-name">{user?.name || 'Guest'}</span>
            <ChevronDown
              size={16}
              className={`dropdown-arrow ${isProfileDropdownOpen ? 'open' : ''}`}
            />
          </button>

          {isProfileDropdownOpen && (
            <div className="profile-dropdown">
              <div className="profile-header">
                <div className="profile-avatar-large">
                  {user?.profilePicture ? (
                    <img src={user.profilePicture} alt="Avatar" className="avatar-img-large" />
                  ) : (
                    <User size={24} />
                  )}
                </div>
                <div className="profile-info">
                  <div className="profile-name-large">{user?.name || 'Agri User'}</div>
                  <div className="profile-email">{user?.email || 'Login to access full features'}</div>
                  {user && (
                    <div className="profile-role-badge-nav">
                      <Shield size={12} />
                      {user.role}
                    </div>
                  )}
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

              <button className="logout-button" onClick={handleLogout}>
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
                  {weatherData.icon && (
                    <img
                      src={`https://openweathermap.org/img/wn/${weatherData.icon}@2x.png`}
                      alt={weatherData.condition}
                      className="weather-icon-mobile"
                    />
                  )}
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
                {user?.profilePicture ? (
                  <img src={user.profilePicture} alt="Avatar" className="avatar-img" />
                ) : (
                  <User size={24} />
                )}
              </div>
              <div className="mobile-profile-info">
                <div className="mobile-profile-name">{user?.name || 'Agri User'}</div>
                <div className="mobile-profile-email">{user?.email || 'Welcome!'}</div>
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

            <button className="mobile-logout-button" onClick={handleLogout}>
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