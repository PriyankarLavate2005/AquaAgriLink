import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  User, 
  Mail, 
  Shield, 
  Camera, 
  Edit2, 
  Lock, 
  Trash2, 
  Save, 
  X,
  ExternalLink,
  ChevronRight,
  Settings,
  Bell,
  MapPin,
  Calendar
} from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import axiosInstance from '../utils/axiosInstance';
import '../styles/ProfilePage.css';

function ProfilePage() {
  const [farmer, setFarmer] = useState({
    name: '',
    email: '',
    role: 'Farmer',
    profilePicture: '',
    location: 'Maharashtra, India',
    joinedDate: 'January 2024'
  });

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [updatedFarmer, setUpdatedFarmer] = useState({ ...farmer });
  const [imagePreview, setImagePreview] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [activeSettingsTab, setActiveSettingsTab] = useState('profile');

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const response = await axiosInstance.get('/auth/profile');
      if (response.data.success) {
        const farmerData = {
          ...response.data.farmer,
          location: response.data.farmer.location || 'Maharashtra, India',
          joinedDate: response.data.farmer.joinedDate || 'January 2024'
        };
        setFarmer(farmerData);
        setUpdatedFarmer(farmerData);
        setImagePreview(farmerData.profilePicture || null);
      }
    } catch (error) {
      console.error('Error fetching profile:', error);
    }
  };

  const handlePictureUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setUpdatedFarmer((prev) => ({ ...prev, profilePicture: reader.result }));
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUpdateProfile = async () => {
    setIsLoading(true);
    try {
      const response = await axiosInstance.put('/auth/profile', updatedFarmer);
      if (response.data.success) {
        setFarmer(response.data.farmer);
        setIsEditing(false);
        // Using a custom alert/toast would be better, but sticking to standard for now
        alert('Profile updated successfully!');
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      alert('Failed to update profile.');
    } finally {
      setIsLoading(false);
    }
  };

  const handlePasswordUpdate = async () => {
    if (!password) {
      alert('Please enter a new password.');
      return;
    }
    if (password !== confirmPassword) {
      alert('Passwords do not match!');
      return;
    }
    setIsLoading(true);
    try {
      await axiosInstance.put('/auth/update-password', { password });
      alert('Password updated successfully!');
      setPassword('');
      setConfirmPassword('');
    } catch (error) {
      console.error('Error updating password:', error);
      alert('Failed to update password.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleAccountDeletion = async () => {
    const confirm = window.confirm(
      'Are you sure you want to delete your account? This action is irreversible.'
    );
    if (!confirm) return;

    try {
      await axiosInstance.delete('/auth/delete-account');
      alert('Account deleted successfully!');
      localStorage.removeItem('token');
      window.location.href = '/login';
    } catch (error) {
      console.error('Error deleting account:', error);
      alert('Failed to delete account.');
    }
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5, staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 }
  };

  return (
    <div className="profile-page-wrapper">
      <Navbar />
      
      <main className="profile-main-container">
        <div className="profile-header-banner">
          <div className="banner-overlay"></div>
        </div>

        <div className="profile-content-grid">
          {/* Sidebar / Profile Card */}
          <motion.aside 
            className="profile-sidebar"
            initial="hidden"
            animate="visible"
            variants={containerVariants}
          >
            <div className="profile-card-premium">
              <div className="profile-image-section">
                <div className="profile-image-container">
                  <img
                    src={imagePreview || 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80&w=200&h=200'}
                    alt="Profile"
                    className="profile-avatar-img"
                  />
                  {isEditing && (
                    <label className="image-upload-overlay">
                      <Camera size={24} />
                      <input type="file" accept="image/*" onChange={handlePictureUpload} hidden />
                    </label>
                  )}
                </div>
                <div className="online-status-indicator"></div>
              </div>

              <div className="profile-basic-info">
                <h2>{farmer.name || 'Agri User'}</h2>
                <p className="profile-role-badge">
                  <Shield size={14} />
                  {farmer.role}
                </p>
                <div className="profile-meta-info">
                  <p><MapPin size={14} /> {farmer.location}</p>
                  <p><Calendar size={14} /> Joined {farmer.joinedDate}</p>
                </div>
              </div>
              {!isEditing ? (
                <button className="edit-profile-btn" onClick={() => setIsEditing(true)}>
                  <Edit2 size={18} />
                  Edit Profile
                </button>
              ) : (
                <div className="editing-actions">
                  <button className="save-profile-btn" onClick={handleUpdateProfile} disabled={isLoading}>
                    <Save size={18} />
                    {isLoading ? 'Saving...' : 'Save Changes'}
                  </button>
                  <button className="cancel-edit-btn" onClick={() => setIsEditing(false)}>
                    <X size={18} />
                    Cancel
                  </button>
                </div>
              )}
            </div>

            <div className="quick-links-card">
              <h3><ExternalLink size={18} /> Helpful Resources</h3>
              <ul className="resource-list">
                <li>
                  <a href="https://krishi-dss.gov.in/" target="_blank" rel="noreferrer">
                    <span>Krishi DSS Portal</span>
                    <ChevronRight size={14} />
                  </a>
                </li>
                <li>
                  <a href="https://state.bihar.gov.in/krishi" target="_blank" rel="noreferrer">
                    <span>Bihar Agri Portal</span>
                    <ChevronRight size={14} />
                  </a>
                </li>
                <li>
                  <a href="https://www.data.gov.in/" target="_blank" rel="noreferrer">
                    <span>Soil Moisture Data</span>
                    <ChevronRight size={14} />
                  </a>
                </li>
              </ul>
            </div>
          </motion.aside>

          {/* Main Content Area */}
          <motion.section 
            className="profile-details-area"
            initial="hidden"
            animate="visible"
            variants={containerVariants}
          >
            <div className="details-tabs-nav">
              <button 
                className={`tab-nav-btn ${activeSettingsTab === 'profile' ? 'active' : ''}`}
                onClick={() => setActiveSettingsTab('profile')}
              >
                <User size={18} /> Account Details
              </button>
              <button 
                className={`tab-nav-btn ${activeSettingsTab === 'security' ? 'active' : ''}`}
                onClick={() => setActiveSettingsTab('security')}
              >
                <Lock size={18} /> Security
              </button>
              <button 
                className={`tab-nav-btn ${activeSettingsTab === 'notifications' ? 'active' : ''}`}
                onClick={() => setActiveSettingsTab('notifications')}
              >
                <Bell size={18} /> Notifications
              </button>
            </div>

            <div className="tab-content-container">
              <AnimatePresence mode="wait">
                {activeSettingsTab === 'profile' && (
                  <motion.div 
                    key="profile-tab"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="tab-panel"
                  >
                    <h3>Account Information</h3>
                    <div className="info-grid">
                      <div className="input-field-group">
                        <label><User size={16} /> Full Name</label>
                        {isEditing ? (
                          <input 
                            type="text" 
                            value={updatedFarmer.name} 
                            onChange={(e) => setUpdatedFarmer({...updatedFarmer, name: e.target.value})}
                          />
                        ) : (
                          <div className="value-display">{farmer.name || 'Not set'}</div>
                        )}
                      </div>

                      <div className="input-field-group">
                        <label><Mail size={16} /> Email Address</label>
                        {isEditing ? (
                          <input 
                            type="email" 
                            value={updatedFarmer.email} 
                            onChange={(e) => setUpdatedFarmer({...updatedFarmer, email: e.target.value})}
                          />
                        ) : (
                          <div className="value-display">{farmer.email}</div>
                        )}
                      </div>

                      <div className="input-field-group">
                        <label><Shield size={16} /> Account Role</label>
                        <div className="value-display role-badge-alt">{farmer.role}</div>
                        <p className="input-hint">Default role assigned by system</p>
                      </div>

                      <div className="input-field-group">
                        <label><MapPin size={16} /> Location</label>
                        {isEditing ? (
                          <input 
                            type="text" 
                            value={updatedFarmer.location} 
                            onChange={(e) => setUpdatedFarmer({...updatedFarmer, location: e.target.value})}
                          />
                        ) : (
                          <div className="value-display">{farmer.location}</div>
                        )}
                      </div>
                    </div>
                  </motion.div>
                )}

                {activeSettingsTab === 'security' && (
                  <motion.div 
                    key="security-tab"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="tab-panel"
                  >
                    <h3>Security Settings</h3>
                    <div className="security-section">
                      <div className="password-update-form">
                        <h4>Change Password</h4>
                        <div className="input-field-group">
                          <label>New Password</label>
                          <input 
                            type="password" 
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Enter new password"
                          />
                        </div>
                        <div className="input-field-group">
                          <label>Confirm Password</label>
                          <input 
                            type="password" 
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            placeholder="Confirm new password"
                          />
                        </div>
                        <button className="security-action-btn" onClick={handlePasswordUpdate}>
                          Update Security Credentials
                        </button>
                      </div>

                      <div className="danger-zone-section">
                        <h4>Danger Zone</h4>
                        <p>Once you delete your account, there is no going back. Please be certain.</p>
                        <button className="delete-account-btn" onClick={handleAccountDeletion}>
                          <Trash2 size={18} /> Delete Account
                        </button>
                      </div>
                    </div>
                  </motion.div>
                )}

                {activeSettingsTab === 'notifications' && (
                  <motion.div 
                    key="notifications-tab"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="tab-panel"
                  >
                    <h3>Notification Preferences</h3>
                    <div className="notification-options">
                      <div className="toggle-option">
                        <div className="option-info">
                          <p className="option-title">Soil Moisture Alerts</p>
                          <p className="option-desc">Get notified when moisture levels drop below threshold</p>
                        </div>
                        <div className="custom-toggle active"></div>
                      </div>
                      <div className="toggle-option">
                        <div className="option-info">
                          <p className="option-title">Market Price Updates</p>
                          <p className="option-desc">Weekly summary of crop market prices</p>
                        </div>
                        <div className="custom-toggle"></div>
                      </div>
                      <div className="toggle-option">
                        <div className="option-info">
                          <p className="option-title">Email Reports</p>
                          <p className="option-desc">Monthly farm performance analysis</p>
                        </div>
                        <div className="custom-toggle active"></div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.section>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default ProfilePage;

