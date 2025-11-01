import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { 
  TrendingUp, 
  Droplets, 
  Thermometer, 
  Sun, 
  Sprout, 
  Calendar,
  DollarSign,
  BarChart3,
  Clock,
  Shield,
  CloudRain,
  Leaf,
  BookOpen
} from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "../styles/Dashboard.css";

function Dashboard() {
  const navigate = useNavigate();
  const [sensorData, setSensorData] = useState({
    temperature: 28,
    humidity: 65,
    soilMoisture: 42,
    lightIntensity: 1200,
    phLevel: 6.8
  });
  const [cropData, setCropData] = useState({
    crop: "",
    cultivationDate: "",
    quantity: "",
    description: "",
  });
  const [suggestedCrops, setSuggestedCrops] = useState([]);
  const [marketPrices, setMarketPrices] = useState([]);
  const [cropInformation, setCropInformation] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");

  const fetchSensorData = async () => {
    try {
      // Simulate API call
      setTimeout(() => {
        setSensorData({
          temperature: 25 + Math.random() * 10,
          humidity: 60 + Math.random() * 20,
          soilMoisture: 30 + Math.random() * 40,
          lightIntensity: 800 + Math.random() * 800,
          phLevel: 6.0 + Math.random() * 1.5
        });
      }, 1000);
    } catch (error) {
      console.error("Error fetching sensor data:", error);
    }
  };

  const suggestCrops = () => {
    const crops = [
      {
        name: "Tomato",
        reason: "Ideal for current temperature and soil conditions",
        suitability: 85,
        season: "All Season",
        waterNeeds: "Moderate",
        image: "🍅",
        profitMargin: "High"
      },
      {
        name: "Bell Pepper",
        reason: "Thrives in current humidity levels",
        suitability: 78,
        season: "Summer",
        waterNeeds: "Moderate",
        image: "🫑",
        profitMargin: "Medium"
      },
      {
        name: "Spinach",
        reason: "Perfect for current soil moisture",
        suitability: 92,
        season: "Winter",
        waterNeeds: "High",
        image: "🥬",
        profitMargin: "Medium"
      }
    ];
    setSuggestedCrops(crops);
  };

  const loadMarketPrices = () => {
    const prices = [
      { crop: "Tomato", price: "₹45/kg", change: "+5%", trend: "up" },
      { crop: "Potato", price: "₹25/kg", change: "-2%", trend: "down" },
      { crop: "Onion", price: "₹35/kg", change: "+8%", trend: "up" },
      { crop: "Rice", price: "₹50/kg", change: "+3%", trend: "up" },
      { crop: "Wheat", price: "₹22/kg", change: "-1%", trend: "down" },
    ];
    setMarketPrices(prices);
  };

  const loadCropInformation = () => {
    const crops = [
      {
        name: "Tomato",
        scientificName: "Solanum lycopersicum",
        family: "Solanaceae",
        season: "All Season",
        waterRequirement: "Moderate",
        soilType: "Well-drained loamy soil",
        phRange: "6.0-6.8",
        temperature: "18-27°C",
        duration: "60-100 days"
      },
      {
        name: "Rice",
        scientificName: "Oryza sativa",
        family: "Poaceae",
        season: "Kharif",
        waterRequirement: "High",
        soilType: "Clay loam",
        phRange: "5.5-6.5",
        temperature: "20-35°C",
        duration: "90-150 days"
      },
      {
        name: "Wheat",
        scientificName: "Triticum aestivum",
        family: "Poaceae",
        season: "Rabi",
        waterRequirement: "Moderate",
        soilType: "Clay loam",
        phRange: "6.0-7.5",
        temperature: "10-25°C",
        duration: "120-150 days"
      }
    ];
    setCropInformation(crops);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      // Simulate API call
      setTimeout(() => {
        alert("Crop record added successfully!");
        setCropData({
          crop: "",
          cultivationDate: "",
          quantity: "",
          description: "",
        });
        setIsLoading(false);
      }, 1500);
    } catch (error) {
      console.error("Error adding crop record:", error);
      alert("Failed to add crop record. Please try again.");
      setIsLoading(false);
    }
  };

  const handleQuickAction = (action) => {
    switch (action) {
      case 'irrigation':
        alert("Starting irrigation system...");
        break;
      case 'analytics':
        setActiveTab('analytics');
        break;
      case 'prediction':
        setActiveTab('crops');
        break;
      case 'market':
        setActiveTab('market');
        break;
      case 'cropInfo':
        navigate('/crop-info');
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    fetchSensorData();
    suggestCrops();
    loadMarketPrices();
    loadCropInformation();
    
    const interval = setInterval(fetchSensorData, 30000);
    return () => clearInterval(interval);
  }, [navigate]);

  const getStatusColor = (value, type) => {
    switch (type) {
      case 'temperature':
        return value > 30 ? 'status-high' : value < 20 ? 'status-low' : 'status-optimal';
      case 'moisture':
        return value > 60 ? 'status-high' : value < 30 ? 'status-low' : 'status-optimal';
      case 'humidity':
        return value > 80 ? 'status-high' : value < 40 ? 'status-low' : 'status-optimal';
      default:
        return 'status-optimal';
    }
  };

  return (
    <>
      <Navbar />
      <div className="dashboard-container">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="dashboard-header"
        >
          <h1 className="dashboard-title">
            <Sprout className="title-icon" />
            Smart Agriculture Dashboard
          </h1>
          <p className="dashboard-subtitle">
            Real-time monitoring and intelligent insights for your farm
          </p>
        </motion.div>

        {/* Navigation Tabs */}
        <div className="dashboard-tabs">
          {["overview", "crops", "analytics", "market", "cropInfo"].map((tab) => (
            <button
              key={tab}
              className={`tab-button ${activeTab === tab ? 'active' : ''}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab === 'cropInfo' ? 'Crop Information' : tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        {/* Overview Tab */}
        {activeTab === "overview" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="dashboard-content"
          >
            {/* Sensor Data Grid */}
            <section className="sensor-grid">
              <h2 className="section-title">
                <TrendingUp className="section-icon" />
                Live Sensor Data
              </h2>
              <div className="sensor-cards">
                <motion.div 
                  whileHover={{ scale: 1.02 }}
                  className={`sensor-card ${getStatusColor(sensorData.temperature, 'temperature')}`}
                >
                  <div className="sensor-icon">
                    <Thermometer />
                  </div>
                  <div className="sensor-info">
                    <h3>Temperature</h3>
                    <p className="sensor-value">{sensorData.temperature.toFixed(1)}°C</p>
                    <span className="sensor-status">
                      {sensorData.temperature > 30 ? 'High' : sensorData.temperature < 20 ? 'Low' : 'Optimal'}
                    </span>
                  </div>
                </motion.div>

                <motion.div 
                  whileHover={{ scale: 1.02 }}
                  className={`sensor-card ${getStatusColor(sensorData.humidity, 'humidity')}`}
                >
                  <div className="sensor-icon">
                    <CloudRain />
                  </div>
                  <div className="sensor-info">
                    <h3>Humidity</h3>
                    <p className="sensor-value">{sensorData.humidity.toFixed(1)}%</p>
                    <span className="sensor-status">
                      {sensorData.humidity > 80 ? 'High' : sensorData.humidity < 40 ? 'Low' : 'Optimal'}
                    </span>
                  </div>
                </motion.div>

                <motion.div 
                  whileHover={{ scale: 1.02 }}
                  className={`sensor-card ${getStatusColor(sensorData.soilMoisture, 'moisture')}`}
                >
                  <div className="sensor-icon">
                    <Droplets />
                  </div>
                  <div className="sensor-info">
                    <h3>Soil Moisture</h3>
                    <p className="sensor-value">{sensorData.soilMoisture.toFixed(1)}%</p>
                    <span className="sensor-status">
                      {sensorData.soilMoisture > 60 ? 'High' : sensorData.soilMoisture < 30 ? 'Low' : 'Optimal'}
                    </span>
                  </div>
                </motion.div>

                <motion.div 
                  whileHover={{ scale: 1.02 }}
                  className="sensor-card status-optimal"
                >
                  <div className="sensor-icon">
                    <Sun />
                  </div>
                  <div className="sensor-info">
                    <h3>Light Intensity</h3>
                    <p className="sensor-value">{sensorData.lightIntensity.toFixed(0)} lux</p>
                    <span className="sensor-status">Optimal</span>
                  </div>
                </motion.div>
              </div>
            </section>

            {/* Quick Actions */}
            <section className="quick-actions">
              <h2 className="section-title">
                <Clock className="section-icon" />
                Quick Actions
              </h2>
              <div className="action-cards">
                <motion.div 
                  whileHover={{ scale: 1.05 }} 
                  className="action-card"
                  onClick={() => handleQuickAction('irrigation')}
                >
                  <div className="action-icon irrigation">
                    <Droplets />
                  </div>
                  <h3>Start Irrigation</h3>
                  <p>Begin automated watering system</p>
                </motion.div>

                <motion.div 
                  whileHover={{ scale: 1.05 }} 
                  className="action-card"
                  onClick={() => handleQuickAction('analytics')}
                >
                  <div className="action-icon monitor">
                    <BarChart3 />
                  </div>
                  <h3>View Analytics</h3>
                  <p>Detailed farm performance</p>
                </motion.div>

                <motion.div 
                  whileHover={{ scale: 1.05 }} 
                  className="action-card"
                  onClick={() => handleQuickAction('prediction')}
                >
                  <div className="action-icon predict">
                    <Leaf />
                  </div>
                  <h3>Crop Prediction</h3>
                  <p>Get AI recommendations</p>
                </motion.div>

                <motion.div 
                  whileHover={{ scale: 1.05 }} 
                  className="action-card"
                  onClick={() => handleQuickAction('market')}
                >
                  <div className="action-icon market">
                    <DollarSign />
                  </div>
                  <h3>Market Prices</h3>
                  <p>Check current rates</p>
                </motion.div>

                <motion.div 
                  whileHover={{ scale: 1.05 }} 
                  className="action-card"
                  onClick={() => handleQuickAction('cropInfo')}
                >
                  <div className="action-icon info">
                    <BookOpen />
                  </div>
                  <h3>Crop Information</h3>
                  <p>Browse crop database</p>
                </motion.div>
              </div>
            </section>
          </motion.div>
        )}

        {/* Crops Tab */}
        {activeTab === "crops" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="dashboard-content"
          >
            {/* Crop Recommendations */}
            <section className="recommendations-section">
              <h2 className="section-title">
                <Sprout className="section-icon" />
                AI Crop Recommendations
              </h2>
              <div className="crop-grid">
                {suggestedCrops.map((crop, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ scale: 1.02 }}
                    className="crop-card"
                  >
                    <div className="crop-header">
                      <div className="crop-image">{crop.image}</div>
                      <div className="crop-info">
                        <h3>{crop.name}</h3>
                        <div className="suitability-badge">
                          <span className="suitability-score">{crop.suitability}%</span>
                          Suitable
                        </div>
                      </div>
                    </div>
                    <p className="crop-reason">{crop.reason}</p>
                    <div className="crop-details">
                      <div className="detail-item">
                        <Calendar size={16} />
                        <span>{crop.season}</span>
                      </div>
                      <div className="detail-item">
                        <Droplets size={16} />
                        <span>{crop.waterNeeds}</span>
                      </div>
                      <div className="detail-item">
                        <DollarSign size={16} />
                        <span>{crop.profitMargin} Profit</span>
                      </div>
                    </div>
                    <button className="select-crop-btn">Select This Crop</button>
                  </motion.div>
                ))}
              </div>
            </section>

            {/* Add Crop Form */}
            <section className="crop-form-section">
              <h2 className="section-title">
                <Calendar className="section-icon" />
                Add New Crop Record
              </h2>
              <form onSubmit={handleSubmit} className="crop-form">
                <div className="form-grid">
                  <div className="form-group">
                    <label>Crop Name</label>
                    <input
                      type="text"
                      value={cropData.crop}
                      onChange={(e) => setCropData({ ...cropData, crop: e.target.value })}
                      placeholder="Enter crop name"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Cultivation Date</label>
                    <input
                      type="date"
                      value={cropData.cultivationDate}
                      onChange={(e) => setCropData({ ...cropData, cultivationDate: e.target.value })}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Quantity (kg)</label>
                    <input
                      type="number"
                      value={cropData.quantity}
                      onChange={(e) => setCropData({ ...cropData, quantity: e.target.value })}
                      placeholder="Enter quantity"
                      required
                    />
                  </div>
                  <div className="form-group full-width">
                    <label>Additional Notes</label>
                    <textarea
                      value={cropData.description}
                      onChange={(e) => setCropData({ ...cropData, description: e.target.value })}
                      placeholder="Add any additional information about the crop..."
                      rows="4"
                      required
                    ></textarea>
                  </div>
                </div>
                <button type="submit" className="submit-btn" disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <div className="loading-spinner"></div>
                      Adding Crop...
                    </>
                  ) : (
                    'Add Crop Record'
                  )}
                </button>
              </form>
            </section>
          </motion.div>
        )}

        {/* Market Tab */}
        {activeTab === "market" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="dashboard-content"
          >
            {/* Market Prices */}
            <section className="market-section">
              <h2 className="section-title">
                <DollarSign className="section-icon" />
                Current Market Prices
              </h2>
              <div className="market-table">
                <div className="table-header">
                  <span>Crop</span>
                  <span>Price</span>
                  <span>Change</span>
                  <span>Trend</span>
                </div>
                {marketPrices.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="table-row"
                  >
                    <span className="crop-name">{item.crop}</span>
                    <span className="price">{item.price}</span>
                    <span className={`change ${item.trend}`}>{item.change}</span>
                    <span className={`trend ${item.trend}`}>
                      {item.trend === 'up' ? '↗' : '↘'}
                    </span>
                  </motion.div>
                ))}
              </div>
            </section>

            {/* Price Alerts */}
            <section className="alerts-section">
              <h2 className="section-title">
                <Shield className="section-icon" />
                Price Alerts
              </h2>
              <div className="alerts-grid">
                <div className="alert-card">
                  <h3>Tomato Price Drop</h3>
                  <p>Price decreased by 15% in local market</p>
                  <span className="alert-time">2 hours ago</span>
                </div>
                <div className="alert-card">
                  <h3>Wheat Demand Increase</h3>
                  <p>High demand expected next week</p>
                  <span className="alert-time">5 hours ago</span>
                </div>
                <div className="alert-card">
                  <h3>New Buyer Available</h3>
                  <p>Local supermarket looking for organic produce</p>
                  <span className="alert-time">1 day ago</span>
                </div>
              </div>
            </section>
          </motion.div>
        )}

        {/* Analytics Tab */}
        {activeTab === "analytics" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="dashboard-content"
          >
            <section className="analytics-section">
              <h2 className="section-title">
                <BarChart3 className="section-icon" />
                Farm Analytics
              </h2>
              <div className="analytics-grid">
                <div className="analytics-card">
                  <h3>Yield Prediction</h3>
                  <div className="prediction-value">85%</div>
                  <p>Expected yield based on current conditions</p>
                </div>
                <div className="analytics-card">
                  <h3>Water Usage</h3>
                  <div className="prediction-value">1,200L</div>
                  <p>Total water consumed this month</p>
                </div>
                <div className="analytics-card">
                  <h3>Cost Analysis</h3>
                  <div className="prediction-value">₹15,000</div>
                  <p>Monthly operational costs</p>
                </div>
                <div className="analytics-card">
                  <h3>Profit Forecast</h3>
                  <div className="prediction-value">₹45,000</div>
                  <p>Expected profit this season</p>
                </div>
              </div>
            </section>
          </motion.div>
        )}

        {/* Crop Information Tab */}
        {activeTab === "cropInfo" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="dashboard-content"
          >
            <section className="crop-info-section">
              <h2 className="section-title">
                <BookOpen className="section-icon" />
                Crop Information Database
              </h2>
              <div className="crop-info-grid">
                {cropInformation.map((crop, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ scale: 1.02 }}
                    className="crop-info-card"
                  >
                    <div className="crop-info-header">
                      <h3>{crop.name}</h3>
                      <span className="scientific-name">{crop.scientificName}</span>
                    </div>
                    <div className="crop-info-details">
                      <div className="info-row">
                        <span className="info-label">Family:</span>
                        <span className="info-value">{crop.family}</span>
                      </div>
                      <div className="info-row">
                        <span className="info-label">Season:</span>
                        <span className="info-value">{crop.season}</span>
                      </div>
                      <div className="info-row">
                        <span className="info-label">Water Requirement:</span>
                        <span className="info-value">{crop.waterRequirement}</span>
                      </div>
                      <div className="info-row">
                        <span className="info-label">Soil Type:</span>
                        <span className="info-value">{crop.soilType}</span>
                      </div>
                      <div className="info-row">
                        <span className="info-label">pH Range:</span>
                        <span className="info-value">{crop.phRange}</span>
                      </div>
                      <div className="info-row">
                        <span className="info-label">Temperature:</span>
                        <span className="info-value">{crop.temperature}</span>
                      </div>
                      <div className="info-row">
                        <span className="info-label">Duration:</span>
                        <span className="info-value">{crop.duration}</span>
                      </div>
                    </div>
                    <button 
                      className="view-details-btn"
                      onClick={() => navigate('/crop-info', { state: { crop } })}
                    >
                      View Full Details
                    </button>
                  </motion.div>
                ))}
              </div>
            </section>
          </motion.div>
        )}
      </div>
      <Footer />
    </>
  );
}

export default Dashboard;