import './App.css';
import Welcome_Screen from './Components/Welcome_Screen.js';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NolocationScreen from './Components/NolocationScreen.js';
import ProductScreen from './Components/ProductScreen.js';
import SystemScreen from './Components/Systemscreen.js';
import NotclosetoStore from './Components/NotclosetoStore.js';
import Stores from './Components/Stores.js';
import { DragCloseDrawerExample } from "./Components/DragCloseDrawerExample";
import CheckoutScreen from './Components/CheckoutScreen.js';
import PaymentScreen from './Components/PaymentScreen.js';
import PaymentSuccess from './Components/PaymentSuccess.js';
import ProfileScreen from './Components/ProfileScreen.js';
import ReachedStore from './Components/ReachedStore.js';
import ProtectedRoute from "./context/ProtectedRoute.js";
import NotFoundScreen from "./Pages/NotFoundScreen.js";
import SettingScreen from './Components/SettingScreen.js'
import HistoryScreen from './Components/History.js'
import Error_page from './Components/ErrorScreen.js'
import React, { useEffect, useState } from "react";
import Nointernet from './Components/Nointernet.js'
import HomeScreen from './Components/HomeScreen.js'


function App() {
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
