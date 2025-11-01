import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import Dashboard from "./pages/Dashboard";
import ProfilePage from "./pages/ProfilePage";
import PreviousRecords from "./pages/PreviousRecords";
import ManualAutomation from './pages/ManualAutomation';
import AboutPage from "./pages/AboutPage";
import Home from "./pages/Home";
import CropInfo from "./CropInfo/CropInfo";
import SoilMoisture from "./pages/Soilmoisture";
import CropDisease from "./pages/CropDisease";
import Forecast from "./pages/Forecast";
import ContactPage from "./pages/contact";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/records" element={<PreviousRecords />} />
        <Route path="/manual-automation" element={<ManualAutomation />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/crop-info" element={<CropInfo />} />
        <Route path="/soil-moisture" element={<SoilMoisture />} />
        <Route path='/crop-disease' element={<CropDisease />} />
        <Route path='/weather' element={<Forecast />} />
      </Routes>
    </Router>
  );
}

export default App;
