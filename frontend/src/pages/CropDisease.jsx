import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from '../components/Navbar';
import { 
  Upload, 
  AlertTriangle, 
  CheckCircle, 
  X, 
  Sprout,
  Thermometer,
  Droplets,
  Clock,
  Shield,
  Leaf,
  Zap,
  Calendar,
  BarChart3
} from 'lucide-react';
import '../styles/CropDisease.css';

const CropDisease = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [prediction, setPrediction] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [analysisHistory, setAnalysisHistory] = useState([]);
  const fileInputRef = useRef(null);

  // Dummy disease data
  const diseaseData = {
    'Tomato Blight': {
      confidence: 92.5,
      description: 'A fungal disease that affects tomato plants, causing leaf spots and fruit rot.',
      symptoms: [
        'Dark brown spots on leaves',
        'White mold growth on undersides',
        'Fruit rot and discoloration',
        'Rapid plant wilting'
      ],
      prevention: [
        'Remove and destroy infected plants',
        'Apply copper-based fungicides',
        'Ensure proper spacing for air circulation',
        'Water at the base, avoid wetting leaves',
        'Rotate crops annually'
      ],
      treatment: 'Apply Chlorothalonil or Mancozeb every 7-10 days',
      severity: 'High',
      season: 'Warm, humid weather',
      affectedCrops: ['Tomato', 'Potato', 'Pepper']
    },
    'Powdery Mildew': {
      confidence: 87.3,
      description: 'A common fungal disease appearing as white powdery spots on leaves and stems.',
      symptoms: [
        'White powdery spots on leaves',
        'Leaf curling and distortion',
        'Yellowing of affected leaves',
        'Reduced plant growth'
      ],
      prevention: [
        'Maintain good air circulation',
        'Avoid overhead watering',
        'Plant resistant varieties',
        'Apply sulfur-based preventatives'
      ],
      treatment: 'Use potassium bicarbonate or neem oil sprays',
      severity: 'Medium',
      season: 'Warm, dry days with cool nights',
      affectedCrops: ['Cucumber', 'Squash', 'Grapes', 'Roses']
    },
    'Leaf Spot': {
      confidence: 78.9,
      description: 'Bacterial or fungal disease causing circular spots on plant leaves.',
      symptoms: [
        'Circular brown or black spots',
        'Yellow halos around spots',
        'Premature leaf drop',
        'Reduced photosynthesis'
      ],
      prevention: [
        'Remove infected leaves promptly',
        'Avoid overhead irrigation',
        'Use disease-free seeds',
        'Practice crop rotation'
      ],
      treatment: 'Apply copper fungicide or bactericide',
      severity: 'Medium',
      season: 'Cool, wet conditions',
      affectedCrops: ['Lettuce', 'Spinach', 'Tomato', 'Pepper']
    },
    'Healthy Plant': {
      confidence: 95.2,
      description: 'Your plant appears healthy with no signs of disease.',
      symptoms: [
        'Vibrant green leaves',
        'Strong stem growth',
        'Normal flowering/fruiting',
        'No discoloration or spots'
      ],
      prevention: [
        'Continue regular maintenance',
        'Monitor for early signs',
        'Maintain proper nutrition',
        'Ensure adequate sunlight'
      ],
      treatment: 'No treatment needed. Continue good gardening practices.',
      severity: 'None',
      season: 'All seasons',
      affectedCrops: ['All crops']
    }
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onloadstart = () => {
          setIsLoading(true);
          setUploadProgress(0);
        };
        reader.onprogress = (e) => {
          if (e.lengthComputable) {
            const progress = (e.loaded / e.total) * 100;
            setUploadProgress(progress);
          }
        };
        reader.onload = (e) => {
          setSelectedImage(e.target.result);
          setUploadProgress(100);
          setTimeout(() => {
            analyzeImage();
          }, 500);
        };
        reader.readAsDataURL(file);
      } else {
        alert('Please upload an image file (JPEG, PNG, etc.)');
      }
    }
  };

  const analyzeImage = () => {
    setIsLoading(true);
    
    // Simulate AI analysis with progress
    let progress = 0;
    const interval = setInterval(() => {
      progress += Math.random() * 15;
      if (progress >= 100) {
        progress = 100;
        clearInterval(interval);
        
        // Get random disease from dummy data
        const diseases = Object.keys(diseaseData);
        const randomDisease = diseases[Math.floor(Math.random() * diseases.length)];
        const result = diseaseData[randomDisease];
        
        setPrediction({
          disease: randomDisease,
          ...result
        });
        
        // Add to history
        const analysisRecord = {
          id: Date.now(),
          disease: randomDisease,
          confidence: result.confidence,
          timestamp: new Date().toLocaleString(),
          image: selectedImage,
          severity: result.severity
        };
        
        setAnalysisHistory(prev => [analysisRecord, ...prev.slice(0, 4)]);
        setIsLoading(false);
      }
    }, 200);
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setSelectedImage(e.target.result);
        setPrediction(null);
        analyzeImage();
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const clearImage = () => {
    setSelectedImage(null);
    setPrediction(null);
    setUploadProgress(0);
  };

  const getSeverityColor = (severity) => {
    switch (severity?.toLowerCase()) {
      case 'high': return '#ef4444';
      case 'medium': return '#f59e0b';
      case 'low': return '#3b82f6';
      default: return '#10b981';
    }
  };

  const getSeverityBg = (severity) => {
    switch (severity?.toLowerCase()) {
      case 'high': return '#fef2f2';
      case 'medium': return '#fffbeb';
      case 'low': return '#eff6ff';
      default: return '#ecfdf5';
    }
  };

  return (
    <>
    <Navbar/>
    <div className="disease-detection-container">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="disease-header"
      >
        <h1 className="disease-title">
          <Sprout className="title-icon" />
          AI Crop Disease Detection
        </h1>
        <p className="disease-subtitle">
          Upload a leaf image and get instant diagnosis with treatment recommendations
        </p>
      </motion.div>

      <div className="disease-content">
        {/* Left Column - Upload & Analysis */}
        <div className="left-column">
          {/* Upload Section */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="upload-section"
          >
            <div
              className={`upload-area ${selectedImage ? 'has-image' : ''}`}
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              onClick={() => !selectedImage && fileInputRef.current?.click()}
            >
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="file-input"
              />
              
              <AnimatePresence>
                {selectedImage ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="image-preview"
                  >
                    <img src={selectedImage} alt="Uploaded crop" />
                    <button className="clear-image-btn" onClick={clearImage}>
                      <X size={20} />
                    </button>
                  </motion.div>
                ) : (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="upload-placeholder"
                  >
                    <Upload className="upload-icon" size={48} />
                    <h3>Upload Leaf Image</h3>
                    <p>Drag & drop or click to upload</p>
                    <span>Supports: JPG, PNG, WEBP</span>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Upload Progress */}
              {isLoading && uploadProgress > 0 && uploadProgress < 100 && (
                <div className="upload-progress">
                  <div className="progress-bar">
                    <div 
                      className="progress-fill" 
                      style={{ width: `${uploadProgress}%` }}
                    ></div>
                  </div>
                  <span>{Math.round(uploadProgress)}% Uploaded</span>
                </div>
              )}
            </div>

            {/* Analysis Progress */}
            {isLoading && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="analysis-progress"
              >
                <div className="progress-header">
                  <Zap className="progress-icon" />
                  <span>AI Analysis in Progress</span>
                </div>
                <div className="progress-steps">
                  <div className="progress-step active">
                    <div className="step-dot"></div>
                    <span>Image Processing</span>
                  </div>
                  <div className="progress-step active">
                    <div className="step-dot"></div>
                    <span>Feature Extraction</span>
                  </div>
                  <div className="progress-step">
                    <div className="step-dot"></div>
                    <span>Disease Matching</span>
                  </div>
                  <div className="progress-step">
                    <div className="step-dot"></div>
                    <span>Generating Report</span>
                  </div>
                </div>
              </motion.div>
            )}
          </motion.div>

          {/* Recent Analysis */}
          {analysisHistory.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="history-section"
            >
              <h3>Recent Analysis</h3>
              <div className="history-list">
                {analysisHistory.map((record) => (
                  <div key={record.id} className="history-item">
                    <div className="history-image">
                      <img src={record.image} alt="Analysis" />
                    </div>
                    <div className="history-details">
                      <div className="disease-name">{record.disease}</div>
                      <div className="history-meta">
                        <span className="confidence">{record.confidence}%</span>
                        <span className="timestamp">{record.timestamp}</span>
                      </div>
                    </div>
                    <div 
                      className="severity-badge"
                      style={{ 
                        backgroundColor: getSeverityBg(record.severity),
                        color: getSeverityColor(record.severity)
                      }}
                    >
                      {record.severity}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </div>

        {/* Right Column - Results */}
        <div className="right-column">
          <AnimatePresence>
            {prediction ? (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="results-section"
              >
                <div className="results-header">
                  <h2>Analysis Results</h2>
                  <div 
                    className="severity-indicator"
                    style={{ 
                      backgroundColor: getSeverityBg(prediction.severity),
                      color: getSeverityColor(prediction.severity)
                    }}
                  >
                    <AlertTriangle size={16} />
                    <span>{prediction.severity} Severity</span>
                  </div>
                </div>

                {/* Disease Overview */}
                <div className="disease-overview">
                  <div className="disease-name-large">
                    {prediction.disease}
                  </div>
                  <div className="confidence-meter">
                    <div className="confidence-header">
                      <span>AI Confidence</span>
                      <span className="confidence-value">{prediction.confidence}%</span>
                    </div>
                    <div className="confidence-bar">
                      <div 
                        className="confidence-fill"
                        style={{ width: `${prediction.confidence}%` }}
                      ></div>
                    </div>
                  </div>
                  <p className="disease-description">{prediction.description}</p>
                </div>

                {/* Symptoms */}
                <div className="info-card">
                  <h3>
                    <AlertTriangle className="card-icon" />
                    Common Symptoms
                  </h3>
                  <div className="symptoms-list">
                    {prediction.symptoms.map((symptom, index) => (
                      <div key={index} className="symptom-item">
                        <div className="symptom-dot"></div>
                        <span>{symptom}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Prevention & Treatment */}
                <div className="treatment-grid">
                  <div className="info-card">
                    <h3>
                      <Shield className="card-icon" />
                      Prevention Tips
                    </h3>
                    <ul className="tips-list">
                      {prediction.prevention.map((tip, index) => (
                        <li key={index}>{tip}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="info-card">
                    <h3>
                      <Leaf className="card-icon" />
                      Recommended Treatment
                    </h3>
                    <div className="treatment-content">
                      <p className="treatment-text">{prediction.treatment}</p>
                      <div className="treatment-meta">
                        <div className="meta-item">
                          <Calendar size={14} />
                          <span>Apply every 7-10 days</span>
                        </div>
                        <div className="meta-item">
                          <Droplets size={14} />
                          <span>Follow label instructions</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Additional Info */}
                <div className="additional-info">
                  <div className="info-item">
                    <Thermometer size={16} />
                    <div>
                      <label>Seasonal Risk</label>
                      <span>{prediction.season}</span>
                    </div>
                  </div>
                  <div className="info-item">
                    <Sprout size={16} />
                    <div>
                      <label>Affected Crops</label>
                      <span>{prediction.affectedCrops.join(', ')}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="empty-results"
              >
                <div className="empty-icon">
                  <BarChart3 size={64} />
                </div>
                <h3>No Analysis Yet</h3>
                <p>Upload a leaf image to get AI-powered disease detection and treatment recommendations.</p>
                <div className="empty-features">
                  <div className="feature">
                    <CheckCircle size={20} />
                    <span>95% Accuracy</span>
                  </div>
                  <div className="feature">
                    <Clock size={20} />
                    <span>Instant Results</span>
                  </div>
                  <div className="feature">
                    <Shield size={20} />
                    <span>Expert Recommendations</span>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
    </>
  );
};

export default CropDisease;