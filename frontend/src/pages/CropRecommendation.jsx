import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
    Brain,
    Thermometer,
    Droplets,
    CloudRain,
    TestTube2,
    Sprout,
    ArrowRight,
    Info
} from 'lucide-react';
import Navbar from '../components/Navbar';
import axios from 'axios';
import '../styles/CropRecommendation.css';

const CropRecommendation = () => {
    const [formData, setFormData] = useState({
        N: '',
        P: '',
        K: '',
        temperature: '',
        humidity: '',
        ph: '',
        rainfall: ''
    });
    const [prediction, setPrediction] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setPrediction(null);

        try {
            // Assuming our Flask API runs on port 5001
            const response = await axios.post('http://localhost:5001/predict', {
                N: parseFloat(formData.N),
                P: parseFloat(formData.P),
                K: parseFloat(formData.K),
                temperature: parseFloat(formData.temperature),
                humidity: parseFloat(formData.humidity),
                ph: parseFloat(formData.ph),
                rainfall: parseFloat(formData.rainfall)
            });

            if (response.data.success) {
                setPrediction(response.data.prediction);
            } else {
                setError(response.data.error || 'Prediction failed');
            }
        } catch (err) {
            setError(err.response?.data?.error || 'Failed to connect to recommendation service. Make sure the backend is running.');
        } finally {
            setLoading(false);
        }
    };

    const inputFields = [
        { name: 'N', label: 'Nitrogen (N)', icon: TestTube2, placeholder: 'e.g. 90' },
        { name: 'P', label: 'Phosphorus (P)', icon: TestTube2, placeholder: 'e.g. 42' },
        { name: 'K', label: 'Potassium (K)', icon: TestTube2, placeholder: 'e.g. 43' },
        { name: 'temperature', label: 'Temperature (°C)', icon: Thermometer, placeholder: 'e.g. 20.8' },
        { name: 'humidity', label: 'Humidity (%)', icon: Droplets, placeholder: 'e.g. 82.0' },
        { name: 'ph', label: 'pH Level', icon: TestTube2, placeholder: 'e.g. 6.5' },
        { name: 'rainfall', label: 'Rainfall (mm)', icon: CloudRain, placeholder: 'e.g. 202.9' },
    ];

    return (
        <>
            <Navbar />
            <div className="recommendation-page">
                <div className="recommendation-header">
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="header-content"
                    >
                        <h1><Brain className="header-icon" /> AI Crop Recommendation</h1>
                        <p>Enter your soil and environmental parameters to get the best crop suggestion</p>
                    </motion.div>
                </div>

                <div className="recommendation-container">
                    <div className="recommendation-grid">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="input-card"
                        >
                            <form onSubmit={handleSubmit}>
                                <div className="form-grid">
                                    {inputFields.map((field) => (
                                        <div key={field.name} className="input-group">
                                            <label>
                                                <field.icon size={16} /> {field.label}
                                            </label>
                                            <input
                                                type="number"
                                                step="any"
                                                name={field.name}
                                                value={formData[field.name]}
                                                onChange={handleInputChange}
                                                placeholder={field.placeholder}
                                                required
                                            />
                                        </div>
                                    ))}
                                </div>
                                <button type="submit" disabled={loading}>
                                    {loading ? 'Processing...' : 'Get Recommendation'} <ArrowRight size={18} />
                                </button>
                            </form>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="result-card"
                        >
                            {!prediction && !loading && !error && (
                                <div className="empty-state">
                                    <Info size={48} />
                                    <h3>No Prediction Yet</h3>
                                    <p>Fill out the form to see which crop is best for your farm</p>
                                </div>
                            )}

                            {loading && (
                                <div className="loading-state">
                                    <div className="spinner"></div>
                                    <p>Our AI is analyzing your soil data...</p>
                                </div>
                            )}

                            {error && (
                                <div className="error-state">
                                    <p className="error-msg">{error}</p>
                                </div>
                            )}

                            {prediction && (
                                <div className="prediction-success">
                                    <div className="success-icon">
                                        <Sprout size={48} />
                                    </div>
                                    <h3>Best Crop to Grow:</h3>
                                    <motion.div
                                        initial={{ scale: 0.8 }}
                                        animate={{ scale: 1 }}
                                        className="prediction-result"
                                    >
                                        {prediction.toUpperCase()}
                                    </motion.div>
                                    <p>Based on your input, {prediction} has the highest probability of success in these conditions.</p>

                                    <div className="recommendation-details">
                                        <div className="detail-item">
                                            <span className="detail-label">Confidence</span>
                                            <span className="detail-value">High</span>
                                        </div>
                                        <div className="detail-item">
                                            <span className="detail-label">Season</span>
                                            <span className="detail-value">Optimal</span>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </motion.div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default CropRecommendation;
