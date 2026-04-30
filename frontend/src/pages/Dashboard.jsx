import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate ,Link} from "react-router-dom";
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
  const [aiPrediction, setAiPrediction] = useState(null);

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

  const getAIPrediction = async () => {
    setIsLoading(true);
    try {
      // These values could come from sensors or user input for a real system
      const mockNPK = {
        N: 90,
        P: 42,
        K: 43,
        ph: sensorData.phLevel || 6.5,
        rainfall: 200
      };

      const response = await fetch('http://127.0.0.1:5001/predict', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          N: mockNPK.N,
          P: mockNPK.P,
          K: mockNPK.K,
          temperature: sensorData.temperature,
          humidity: sensorData.humidity,
          ph: mockNPK.ph,
          rainfall: mockNPK.rainfall
        }),
      });

      if (!response.ok) throw new Error('Prediction failed');

      const data = await response.json();
      if (data.success) {
        setAiPrediction(data.prediction);
      }
    } catch (error) {
      console.error("Error getting AI prediction:", error);
      // alert("Failed to get prediction from the ML server.");
    } finally {
      setIsLoading(false);
    }
  };

  const suggestCrops = () => {
    const crops = [
      // KHARIF (Monsoon - June to October)
      {
        name: "Rice (Paddy)",
        reason: "Excellent for high moisture and monsoon environment",
        suitability: 95,
        season: "Kharif (Monsoon)",
        waterNeeds: "Very High",
        image: "https://images.unsplash.com/photo-1536633100650-70f9518d8442?q=80&w=2070&auto=format&fit=crop",
        profitMargin: "Medium"
      },
      {
        name: "Maize (Corn)",
        reason: "Thrives in warm weather with moderate rainfall",
        suitability: 88,
        season: "Kharif/Summer",
        waterNeeds: "Moderate",
        image: "https://images.unsplash.com/photo-1551754655-cd27e38d2076?q=80&w=2070&auto=format&fit=crop",
        profitMargin: "Medium"
      },
      {
        name: "Cotton",
        reason: "Good for well-drained soil during rainy season",
        suitability: 82,
        season: "Kharif (Monsoon)",
        waterNeeds: "Moderate",
        image: "https://images.unsplash.com/photo-1594143485073-6775871f375f?q=80&w=2071&auto=format&fit=crop",
        profitMargin: "High"
      },
      {
        name: "Soybean",
        reason: "Nitrogen-fixing crop ideal for monsoon",
        suitability: 84,
        season: "Kharif (Monsoon)",
        waterNeeds: "Moderate",
        image: "https://images.unsplash.com/photo-1594489428504-5c0c480a15fd?q=80&w=2070&auto=format&fit=crop",
        profitMargin: "Medium"
      },
      {
        name: "Finger Millet (Ragi)",
        reason: "Drought-resistant, perfect for low rainfall zones",
        suitability: 91,
        season: "Kharif (Monsoon)",
        waterNeeds: "Low",
        image: "https://images.unsplash.com/photo-1626131317377-3e110c735626?q=80&w=2070&auto=format&fit=crop",
        profitMargin: "Medium"
      },
      {
        name: "Turmeric",
        reason: "Thrives in humid climate with heavy rainfall",
        suitability: 79,
        season: "Kharif (Monsoon)",
        waterNeeds: "High",
        image: "https://images.unsplash.com/photo-1615485290382-441e4d0c9cb5?q=80&w=2070&auto=format&fit=crop",
        profitMargin: "Very High"
      },
      {
        name: "Sorghum (Jowar)",
        reason: "Resilient to varying weather",
        suitability: 86,
        season: "Kharif/Rabi",
        waterNeeds: "Low",
        image: "https://images.unsplash.com/photo-1634068413644-8250ec462002?q=80&w=2070&auto=format&fit=crop",
        profitMargin: "Medium"
      },
      {
        name: "Groundnut",
        reason: "Sandy loam soil during monsoon is ideal",
        suitability: 83,
        season: "Kharif (Monsoon)",
        waterNeeds: "Moderate",
        image: "https://images.unsplash.com/photo-1568253165243-d3493779e56e?q=80&w=2070&auto=format&fit=crop",
        profitMargin: "High"
      },
      {
        name: "Sugarcane",
        reason: "Long duration crop requiring high water",
        suitability: 75,
        season: "Annual/Kharif",
        waterNeeds: "Very High",
        image: "https://images.unsplash.com/photo-1594911776991-66e2c3666f7f?q=80&w=2070&auto=format&fit=crop",
        profitMargin: "High"
      },
      {
        name: "Black Gram (Urad Dal)",
        reason: "Quick growing pulse for monsoon",
        suitability: 87,
        season: "Kharif (Monsoon)",
        waterNeeds: "Low",
        image: "https://images.unsplash.com/photo-1599307767316-776533bb941c?q=80&w=2070&auto=format&fit=crop",
        profitMargin: "Medium"
      },

      // RABI (Winter - October to March)
      {
        name: "Wheat",
        reason: "Perfect for cool winter temperatures",
        suitability: 94,
        season: "Rabi (Winter)",
        waterNeeds: "Moderate",
        image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=1932&auto=format&fit=crop",
        profitMargin: "High"
      },
      {
        name: "Mustard",
        reason: "Requires low moisture and cool climate",
        suitability: 91,
        season: "Rabi (Winter)",
        waterNeeds: "Low",
        image: "https://images.unsplash.com/photo-1596700540608-4107297f6c69?q=80&w=2070&auto=format&fit=crop",
        profitMargin: "Medium"
      },
      {
        name: "Chickpeas (Gram)",
        reason: "Thrives in dry, cool conditions",
        suitability: 89,
        season: "Rabi (Winter)",
        waterNeeds: "Low",
        image: "https://images.unsplash.com/photo-1585994192701-d07942709e6c?q=80&w=1932&auto=format&fit=crop",
        profitMargin: "Medium"
      },
      {
        name: "Barley",
        reason: "Highly tolerant to soil salinity in winter",
        suitability: 88,
        season: "Rabi (Winter)",
        waterNeeds: "Low",
        image: "https://images.unsplash.com/photo-1531233076846-dfb0596395b2?q=80&w=2070&auto=format&fit=crop",
        profitMargin: "Medium"
      },
      {
        name: "Potato",
        reason: "Cooler nights facilitate tuber growth",
        suitability: 92,
        season: "Rabi (Winter)",
        waterNeeds: "Moderate",
        image: "https://images.unsplash.com/photo-1518977676601-b53f02bad67b?q=80&w=2070&auto=format&fit=crop",
        profitMargin: "High"
      },
      {
        name: "Green Peas",
        reason: "Thrives in temperatures around 15-20°C",
        suitability: 85,
        season: "Rabi (Winter)",
        waterNeeds: "Moderate",
        image: "https://images.unsplash.com/photo-1582515073490-39981397c445?q=80&w=2070&auto=format&fit=crop",
        profitMargin: "Medium"
      },
      {
        name: "Onion",
        reason: "Ideal for mild winter climate",
        suitability: 84,
        season: "Rabi (Winter)",
        waterNeeds: "Moderate",
        image: "https://images.unsplash.com/photo-1508747703725-7197771375a0?q=80&w=2070&auto=format&fit=crop",
        profitMargin: "High"
      },
      {
        name: "Linseed (Flax)",
        reason: "Grows well in rabi season moisture",
        suitability: 81,
        season: "Rabi (Winter)",
        waterNeeds: "Low",
        image: "https://images.unsplash.com/photo-1596700540608-4107297f6c69?q=80&w=2070&auto=format&fit=crop",
        profitMargin: "Medium"
      },
      {
        name: "Garlic",
        reason: "Cold weather essential for bulb development",
        suitability: 86,
        season: "Rabi (Winter)",
        waterNeeds: "Moderate",
        image: "https://images.unsplash.com/photo-1540148426945-6cf22a6b2383?q=80&w=2070&auto=format&fit=crop",
        profitMargin: "High"
      },
      {
        name: "Coriander",
        reason: "Prefers cool weather for leaf quality",
        suitability: 90,
        season: "Rabi (Winter)",
        waterNeeds: "Moderate",
        image: "https://images.unsplash.com/photo-1606923829579-0cb981a83e2e?q=80&w=2070&auto=format&fit=crop",
        profitMargin: "Medium"
      },

      // ZAID (Summer - March to June)
      {
        name: "Watermelon",
        reason: "High tolerance for summer heat",
        suitability: 96,
        season: "Zaid (Summer)",
        waterNeeds: "High (Surface)",
        image: "https://images.unsplash.com/photo-1587049352846-4a222e784d38?q=80&w=1974&auto=format&fit=crop",
        profitMargin: "High"
      },
      {
        name: "Cucumber",
        reason: "Quick growing crop for dry hot months",
        suitability: 85,
        season: "Zaid (Summer)",
        waterNeeds: "Moderate",
        image: "https://images.unsplash.com/photo-1449339044511-311738bb5529?q=80&w=2070&auto=format&fit=crop",
        profitMargin: "Medium"
      },
      {
        name: "Muskmelon",
        reason: "Thrives in high temperatures and low humidity",
        suitability: 93,
        season: "Zaid (Summer)",
        waterNeeds: "Moderate",
        image: "https://images.unsplash.com/photo-1589927986089-35812388d1f4?q=80&w=2070&auto=format&fit=crop",
        profitMargin: "High"
      },
      {
        name: "Pumpkin",
        reason: "Very hardy crop for summer conditions",
        suitability: 88,
        season: "Zaid (Summer)",
        waterNeeds: "Moderate",
        image: "https://images.unsplash.com/photo-1506867072417-82a33785501d?q=80&w=2070&auto=format&fit=crop",
        profitMargin: "Medium"
      },
      {
        name: "Bitter Gourd",
        reason: "Heat-loving vine crop for summer",
        suitability: 82,
        season: "Zaid (Summer)",
        waterNeeds: "Moderate",
        image: "https://images.unsplash.com/photo-1583002573215-021c33ea98d7?q=80&w=2070&auto=format&fit=crop",
        profitMargin: "Medium"
      },
      {
        name: "Bottle Gourd",
        reason: "Efficient water usage in hot months",
        suitability: 84,
        season: "Zaid (Summer)",
        waterNeeds: "Moderate",
        image: "https://images.unsplash.com/photo-1594282486552-05b4d80fbb9f?q=80&w=2164&auto=format&fit=crop",
        profitMargin: "Medium"
      },
      {
        name: "Moong Dal (Green Gram)",
        reason: "Short duration summer pulse",
        suitability: 89,
        season: "Zaid (Summer)",
        waterNeeds: "Low",
        image: "https://images.unsplash.com/photo-1585994089337-dc3f749a2190?q=80&w=2070&auto=format&fit=crop",
        profitMargin: "Medium"
      },
      {
        name: "Tomato",
        reason: "Adaptable with summer irrigation",
        suitability: 85,
        season: "All Season/Zaid",
        waterNeeds: "Moderate",
        image: "https://images.unsplash.com/photo-1518977676601-b53f02bad67b?q=80&w=2070&auto=format&fit=crop",
        profitMargin: "High"
      },
      {
        name: "Lady Finger (Okra)",
        reason: "Highly resistant to summer pests",
        suitability: 87,
        season: "Summer/Zaid",
        waterNeeds: "Moderate",
        image: "https://images.unsplash.com/photo-1615217430444-296fd661f05f?q=80&w=2070&auto=format&fit=crop",
        profitMargin: "Medium"
      },
      {
        name: "Brinjal (Eggplant)",
        reason: "Resilient vegetable for summer heat",
        suitability: 83,
        season: "Summer/Zaid",
        waterNeeds: "Moderate",
        image: "https://images.unsplash.com/photo-1615484477778-ca3b77940c25?q=80&w=2070&auto=format&fit=crop",
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
      case 'analytics':
        setActiveTab('analytics');
        break;
      case 'prediction':
        setActiveTab('crops');
        getAIPrediction();
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
          {["overview", "crops", "analytics", "market"].map((tab) => (
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
                    <Link to="http://172.26.10.235">
                    <Droplets />
                    </Link>
                  </div>
                  <h3> Irrigation</h3>
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
            {/* AI Real-time Prediction */}
            <section className="recommendations-section">
              <h2 className="section-title">
                <Leaf className="section-icon" />
                Real-time AI Analysis
              </h2>
              <div className="ai-prediction-card">
                {isLoading ? (
                  <div className="loading-state">
                    <div className="loading-spinner"></div>
                    <p>Consulting AI Model...</p>
                  </div>
                ) : aiPrediction ? (
                  <div className="prediction-success">
                    <div className="prediction-icon">🏆</div>
                    <div className="prediction-text">
                      <h3>Recommended Crop: <span className="highlight">{aiPrediction.toUpperCase()}</span></h3>
                      <p>Based on live sensor data (Temp: {sensorData.temperature.toFixed(1)}°C, Humidity: {sensorData.humidity.toFixed(1)}%)</p>
                    </div>
                    <button onClick={getAIPrediction} className="refresh-btn">Re-analyze</button>
                  </div>
                ) : (
                  <div className="prediction-prompt">
                    <p>Click the button below to get a recommendation based on your real-time sensor data.</p>
                    <button onClick={getAIPrediction} className="predict-btn-primary">Run AI Analysis</button>
                  </div>
                )}
              </div>
            </section>

            {/* Crop Recommendations */}
            <section className="recommendations-section">
              <h2 className="section-title">
                <Sprout className="section-icon" />
                AI Crop Recommendations & Seasonal Guides
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
                    <div className="crop-card-image-wrapper">
                      <img src={crop.image} alt={crop.name} className="crop-card-image" />
                      <div className="suitability-badge-overlay">
                        <span className="suitability-score">{crop.suitability}%</span>
                        Suitable
                      </div>
                    </div>
                    <div className="crop-card-body">
                      <div className="crop-header-inline">
                        <h3>{crop.name}</h3>
                      </div>
                      <p className="crop-reason">{crop.reason}</p>
                      <div className="crop-details">
                        <div className="detail-item">
                          <Calendar size={16} />
                          <span className="detail-label-sub">Season:</span>
                          <span>{crop.season}</span>
                        </div>
                        <div className="detail-item">
                          <Droplets size={16} />
                          <span className="detail-label-sub">Water:</span>
                          <span>{crop.waterNeeds}</span>
                        </div>
                        <div className="detail-item">
                          <DollarSign size={16} />
                          <span className="detail-label-sub">Profit:</span>
                          <span>{crop.profitMargin}</span>
                        </div>
                      </div>
                      <button className="select-crop-btn">View Cultivation Guide</button>
                    </div>
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