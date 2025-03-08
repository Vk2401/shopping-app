import './App.css';
import { BrowserRouter as Router, Routes, Route,useNavigate } from 'react-router-dom';
import Welcome_Screen from './Pages/Welcome_Screen.js';
import NolocationScreen from './Pages/NolocationScreen.js';
import ProductScreen from './Pages/ProductScreen.js';
import SystemScreen from './Pages/Systemscreen.js';
import NotclosetoStore from './Pages/NotclosetoStore.js';
import Stores from './Pages/Stores.js';
import { DragCloseDrawerExample } from "./Pages/DragCloseDrawerExample";
import CheckoutScreen from './Pages/CheckoutScreen.js';
import PaymentScreen from './Pages/PaymentScreen.js';
import PaymentSuccess from './Pages/PaymentSuccess.js';
import ProfileScreen from './Pages/ProfileScreen.js';
import ReachedStore from './Pages/ReachedStore.js';
import ProtectedRoute from "./context/ProtectedRoute.js";
import NotFoundScreen from "./Pages/NotFoundScreen.js";
import SettingScreen from './Pages/SettingScreen.js'
import HistoryScreen from './Pages/History.js'
import Error_page from './Pages/ErrorScreen.js'
import React, { useEffect, useState } from "react";
import Nointernet from './Pages/Nointernet.js'
import HomeScreen from './Pages/HomeScreen.js'
import { useAuth } from "../src/context/AuthContext.js";

function App() {
  const navigate = useNavigate();
  const { isAuthenticated,refreshAccessToken } = useAuth();
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 1024);
  const [isOnline, setIsOnline] = useState(navigator.onLine); // Track internet status
  const [isLocationEnabled, setIsLocationEnabled] = useState(true);
  

  const checkLocation = () => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        () => setIsLocationEnabled(true), // Location enabled
        () => setIsLocationEnabled(false) // Location disabled
      );
    } else {
      setIsLocationEnabled(false);
    }
  };

  useEffect(() => {
    
    if (!isAuthenticated) {
      navigate('/');
    }

    const handleResize = () => {
      setIsMobile(window.innerWidth <= 1024);
    };

    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener("resize", handleResize);
    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);
    checkLocation(); 

     return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  if (!isOnline) return <Nointernet />;

  if (!isLocationEnabled) return <NolocationScreen onRetry={checkLocation} />;

  return !isMobile ? <SystemScreen /> :
    (
      <Routes>
        <Route element={<ProtectedRoute />}>
          <Route path="/system-screen" element={<SystemScreen />} />
          <Route path="/no-location" element={<NolocationScreen />} />
          <Route path="/products" element={<ProductScreen />} />
          <Route path="/notClose-toStore" element={<NotclosetoStore />} />
          <Route path="/stores" element={<Stores />} />
          <Route path="/DragCloseDrawerExample" element={<DragCloseDrawerExample />} />
          <Route path="/PaymentSuccess" element={<PaymentSuccess />} />
          <Route path="/checkout" element={<CheckoutScreen />} />
          <Route path="/payment" element={<PaymentScreen />} />
          <Route path="/profile" element={<ProfileScreen />} />
          <Route path="/ReachedStore" element={<ReachedStore />} />
          <Route path="/settings" element={<SettingScreen />} />
          <Route path="/history" element={<HistoryScreen />} />
          <Route path="/home" element={<HomeScreen />} />
          <Route path="/error" element={<Error_page />} />
        </Route>

        <Route path="*" element={<NotFoundScreen />} />
        <Route path="/" element={<Welcome_Screen />} />

      </Routes>
    );;

}

export default function AppWrapper() {
  return (
    <Router>
      <App />
    </Router>
  );
}