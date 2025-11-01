import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import { 
  Droplets, 
  Power, 
  Calendar, 
  TrendingUp, 
  AlertTriangle,
  CheckCircle,
  Clock,
  Zap,
  CloudRain,
  ThermometerSun
} from 'lucide-react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import '../styles/Soilmoisture.css';

const SoilMoisture = () => {
  const [moistureData, setMoistureData] = useState([]);
  const [pumpStatus, setPumpStatus] = useState(false);
  const [autoMode, setAutoMode] = useState(true);
  const [currentMoisture, setCurrentMoisture] = useState(45);
  const [threshold, setThreshold] = useState(30);
  const [irrigationHistory, setIrrigationHistory] = useState([]);
  const [loading, setLoading] = useState(false);

  // Generate mock data for the past 7 days
  const generateMockData = () => {
    const data = [];
    const today = new Date();
    
    for (let i = 6; i >= 0; i--) {
      const date = new Date();
      date.setDate(today.getDate() - i);
      
      const moisture = Math.floor(Math.random() * 30) + 35;
      const temperature = Math.floor(Math.random() * 10) + 22;
      const humidity = Math.floor(Math.random() * 30) + 50;
      const irrigation = moisture < 40 ? Math.floor(Math.random() * 20) + 10 : 0;
      
      data.push({
        date: date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' }),
        fullDate: date.toISOString().split('T')[0],
        moisture,
        temperature,
        humidity,
        irrigation,
        pumpActive: moisture < 40
      });
    }
    return data;
  };

  // Generate irrigation history
  const generateIrrigationHistory = () => {
    const history = [];
    const now = new Date();
    
    for (let i = 0; i < 10; i++) {
      const time = new Date(now.getTime() - (i * 2 * 60 * 60 * 1000)); // Every 2 hours
      const duration = Math.floor(Math.random() * 30) + 10;
      const waterUsed = (duration * 2).toFixed(1); // 2 liters per minute
      
      history.push({
        time: time.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
        date: time.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
        duration: `${duration} min`,
        waterUsed: `${waterUsed}L`,
        status: i === 0 ? 'Active' : 'Completed'
      });
    }
    return history;
  };

  useEffect(() => {
    setMoistureData(generateMockData());
    setIrrigationHistory(generateIrrigationHistory());

    // Simulate real-time moisture updates
    const interval = setInterval(() => {
      setCurrentMoisture(prev => {
        let change = (Math.random() - 0.5) * 8;
        // If pump is on, moisture increases faster
        if (pumpStatus) change += Math.random() * 5;
        let newValue = prev + change;
        newValue = Math.max(20, Math.min(80, newValue));
        
        // Auto mode logic
        if (autoMode) {
          if (newValue < threshold && !pumpStatus) {
            setPumpStatus(true);
          } else if (newValue > threshold + 15 && pumpStatus) {
            setPumpStatus(false);
          }
        }
        
        return Math.round(newValue * 10) / 10;
      });
    }, 3000);

    return () => clearInterval(interval);
  }, [pumpStatus, autoMode, threshold]);

  const togglePump = () => {
    if (!autoMode) {
      setLoading(true);
      setTimeout(() => {
        setPumpStatus(!pumpStatus);
        setLoading(false);
        
        // Add to irrigation history
        const now = new Date();
        const newEntry = {
          time: now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
          date: now.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
          duration: pumpStatus ? '0 min' : 'Manual Start',
          waterUsed: '0L',
          status: pumpStatus ? 'Stopped' : 'Started'
        };
        setIrrigationHistory(prev => [newEntry, ...prev.slice(0, 9)]);
      }, 1000);
    }
  };

  const toggleAutoMode = () => {
    setAutoMode(!autoMode);
    if (!autoMode && currentMoisture < threshold) {
      setPumpStatus(true);
    } else if (!autoMode) {
      setPumpStatus(false);
    }
  };

  const getMoistureStatus = (value) => {
    if (value < 30) return { status: 'Critical', color: '#ef4444', bg: '#fef2f2', text: '#dc2626', icon: AlertTriangle };
    if (value < 50) return { status: 'Dry', color: '#f59e0b', bg: '#fffbeb', text: '#d97706', icon: AlertTriangle };
    if (value < 70) return { status: 'Optimal', color: '#10b981', bg: '#ecfdf5', text: '#047857', icon: CheckCircle };
    return { status: 'Wet', color: '#3b82f6', bg: '#eff6ff', text: '#1d4ed8', icon: CloudRain };
  };

  const getPumpStatusColor = () => {
    return pumpStatus ? '#10b981' : '#6b7280';
  };

  const status = getMoistureStatus(currentMoisture);
  const StatusIcon = status.icon;

  // Data for charts
  const weeklyStats = [
    { day: 'Mon', moisture: 42, irrigation: 15 },
    { day: 'Tue', moisture: 38, irrigation: 25 },
    { day: 'Wed', moisture: 45, irrigation: 12 },
    { day: 'Thu', moisture: 52, irrigation: 8 },
    { day: 'Fri', moisture: 28, irrigation: 35 },
    { day: 'Sat', moisture: 65, irrigation: 5 },
    { day: 'Sun', moisture: 48, irrigation: 18 }
  ];

  const soilComposition = [
    { name: 'Water', value: currentMoisture, color: '#3b82f6' },
    { name: 'Minerals', value: 35, color: '#d97706' },
    { name: 'Organic', value: 5, color: '#10b981' },
    { name: 'Air', value: 25 - (currentMoisture / 4), color: '#6b7280' }
  ];

  return (
   <>
   <Navbar/>
    <div className="soil-moisture-container">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="moisture-header"
      >
        <h1 className="moisture-title">
          <Droplets className="title-icon" />
          Soil Moisture & Irrigation
        </h1>
        <p className="moisture-subtitle">
          Real-time monitoring and automated irrigation control
        </p>
      </motion.div>

      <div className="moisture-content">
        {/* Left Column - Controls & Current Status */}
        <div className="left-column">
          {/* Current Status Card */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="status-card"
          >
            <div className="status-header">
              <h2>Current Soil Status</h2>
              <div className={`status-badge ${status.status.toLowerCase()}`}>
                <StatusIcon size={16} />
                <span>{status.status}</span>
              </div>
            </div>

            <div className="moisture-gauge">
              <div className="gauge-container">
                <svg className="gauge" viewBox="0 0 120 120">
                  <circle cx="60" cy="60" r="54" fill="none" stroke="#e5e7eb" strokeWidth="8" />
                  <circle 
                    cx="60" 
                    cy="60" 
                    r="54" 
                    fill="none" 
                    stroke={status.color} 
                    strokeWidth="8" 
                    strokeLinecap="round"
                    strokeDasharray={`${(currentMoisture / 100) * 339} 339`}
                    transform="rotate(-90 60 60)"
                  />
                </svg>
                <div className="gauge-content">
                  <div className="moisture-value">{currentMoisture}%</div>
                  <div className="moisture-label">Soil Moisture</div>
                </div>
              </div>
            </div>

            <div className="status-details">
              <div className="detail-item">
                <ThermometerSun size={16} />
                <span>Temperature: {moistureData[6]?.temperature || 25}°C</span>
              </div>
              <div className="detail-item">
                <CloudRain size={16} />
                <span>Humidity: {moistureData[6]?.humidity || 60}%</span>
              </div>
              <div className="detail-item">
                <Clock size={16} />
                <span>Last Updated: {new Date().toLocaleTimeString()}</span>
              </div>
            </div>
          </motion.div>

          {/* Pump Control Card */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="control-card"
          >
            <h2>Irrigation Control</h2>
            
            <div className="pump-control">
              <div className="pump-status">
                <div className="pump-indicator">
                  <div 
                    className={`pump-circle ${pumpStatus ? 'active' : ''} ${loading ? 'loading' : ''}`}
                    style={{ backgroundColor: getPumpStatusColor() }}
                  >
                    <Power size={24} />
                  </div>
                  <span className="pump-text">
                    {loading ? 'Processing...' : pumpStatus ? 'Pump Running' : 'Pump Stopped'}
                  </span>
                </div>
              </div>

              <button 
                className={`pump-toggle-btn ${pumpStatus ? 'stop' : 'start'} ${loading ? 'loading' : ''}`}
                onClick={togglePump}
                disabled={autoMode || loading}
              >
                {loading ? (
                  <div className="spinner"></div>
                ) : pumpStatus ? (
                  <>
                    <Power size={18} />
                    Stop Pump
                  </>
                ) : (
                  <>
                    <Zap size={18} />
                    Start Pump
                  </>
                )}
              </button>
            </div>

            <div className="auto-control">
              <label className="auto-toggle">
                <input 
                  type="checkbox" 
                  checked={autoMode}
                  onChange={toggleAutoMode}
                />
                <span className="toggle-slider"></span>
                <span className="toggle-text">Auto Mode</span>
              </label>
              
              {autoMode && (
                <div className="threshold-control">
                  <label>Moisture Threshold: {threshold}%</label>
                  <input
                    type="range"
                    min="20"
                    max="60"
                    value={threshold}
                    onChange={(e) => setThreshold(parseInt(e.target.value))}
                    className="threshold-slider"
                  />
                  <div className="threshold-labels">
                    <span>Dry</span>
                    <span>Optimal</span>
                    <span>Wet</span>
                  </div>
                </div>
              )}
            </div>
          </motion.div>

          {/* Soil Composition */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="composition-card"
          >
            <h2>Soil Composition</h2>
            <div className="composition-chart">
              <ResponsiveContainer width="100%" height={200}>
                <PieChart>
                  <Pie
                    data={soilComposition}
                    cx="50%"
                    cy="50%"
                    innerRadius={40}
                    outerRadius={80}
                    paddingAngle={2}
                    dataKey="value"
                  >
                    {soilComposition.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
              <div className="composition-legend">
                {soilComposition.map((item, index) => (
                  <div key={index} className="legend-item">
                    <div 
                      className="legend-color" 
                      style={{ backgroundColor: item.color }}
                    ></div>
                    <span>{item.name}: {item.value}%</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Right Column - Charts & History */}
        <div className="right-column">
          {/* Weekly Trends */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="trends-card"
          >
            <div className="card-header">
              <h2>
                <TrendingUp className="card-icon" />
                Weekly Trends
              </h2>
              <Calendar className="calendar-icon" />
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={moistureData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Area
                  type="monotone"
                  dataKey="moisture"
                  stroke="#10b981"
                  fill="#a7f3d0"
                  fillOpacity={0.6}
                  strokeWidth={2}
                />
                <Line
                  type="monotone"
                  dataKey="irrigation"
                  stroke="#3b82f6"
                  strokeWidth={2}
                  dot={{ fill: '#3b82f6' }}
                />
              </AreaChart>
            </ResponsiveContainer>
          </motion.div>

          {/* Day-wise Comparison */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="comparison-card"
          >
            <h2>Daily Moisture Levels</h2>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={weeklyStats}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Bar 
                  dataKey="moisture" 
                  fill="#10b981"
                  radius={[4, 4, 0, 0]}
                >
                  {weeklyStats.map((entry, index) => (
                    <Cell 
                      key={`cell-${index}`}
                      fill={entry.moisture < 40 ? '#ef4444' : entry.moisture < 50 ? '#f59e0b' : '#10b981'}
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </motion.div>

          {/* Irrigation History */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="history-card"
          >
            <h2>Irrigation History</h2>
            <div className="history-list">
              {irrigationHistory.map((record, index) => (
                <div key={index} className="history-item">
                  <div className="history-time">
                    <div className="time">{record.time}</div>
                    <div className="date">{record.date}</div>
                  </div>
                  <div className="history-details">
                    <span className="duration">{record.duration}</span>
                    <span className="water-used">{record.waterUsed}</span>
                  </div>
                  <div className={`history-status ${record.status.toLowerCase()}`}>
                    {record.status}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Summary Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="summary-stats"
      >
        <div className="stat-item">
          <div className="stat-value">{currentMoisture}%</div>
          <div className="stat-label">Current Moisture</div>
        </div>
        <div className="stat-item">
          <div className="stat-value">{pumpStatus ? 'ON' : 'OFF'}</div>
          <div className="stat-label">Pump Status</div>
        </div>
        <div className="stat-item">
          <div className="stat-value">{autoMode ? 'AUTO' : 'MANUAL'}</div>
          <div className="stat-label">Control Mode</div>
        </div>
        <div className="stat-item">
          <div className="stat-value">
            {irrigationHistory.filter(r => r.status === 'Completed').length}
          </div>
          <div className="stat-label">Sessions Today</div>
        </div>
      </motion.div>
    </div></>
  );
};

export default SoilMoisture;