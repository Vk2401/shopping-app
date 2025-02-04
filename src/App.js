import './App.css';
import Welcome_Screen from './Components/Welcome_Screen.js';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import NolocationScreen from './Components/NolocationScreen.js';
import ProductScreen from './Components/ProductScreen.js';
import SystemScreen from './Components/Systemscreen.js';
import { useEffect, useState } from 'react';

function App() {
  const navigate = useNavigate();
  const [isMobileOrTablet, setIsMobileOrTablet] = useState(true);

  useEffect(() => {
    const checkScreenSize = () => {
      if (window.innerWidth > 1024) {
        setIsMobileOrTablet(false); // Desktop detected
        navigate('/system-screen'); // Redirect to system screen
      } else {
        setIsMobileOrTablet(true);
      }
    };

    checkScreenSize(); // Check on mount
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, [navigate]);

  return (
    <Routes>
      {/* Show system screen if accessed from a desktop */}
      <Route path="/system-screen" element={<SystemScreen />} />

      {/* Define other routes */}
      <Route path="/no-location" element={<NolocationScreen />} />
      <Route path="/products" element={<ProductScreen />} />
      <Route path="/" element={<Welcome_Screen />} />
    </Routes>
  );
}

export default function AppWrapper() {
  return (
    <Router>
      <App />
    </Router>
  );
}
