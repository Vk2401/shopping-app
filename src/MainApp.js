import { Routes, Route, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Welcome_Screen from './Components/Welcome_Screen';
import NolocationScreen from './Components/NolocationScreen';
import Systemscreen from './Components/Systemscreen';

const MainApp = () => {
  const navigate = useNavigate();
  const [isMobileOrTablet, setIsMobileOrTablet] = useState(true);

  useEffect(() => {
    const checkScreenSize = () => {
      if (window.innerWidth > 1024) {
        navigate('/system-Screen'); 
      }
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, [navigate]); // ✅ Include `navigate` in dependency array

  return (
    <Routes>
      <Route path="/no-location" element={<NolocationScreen />} />
      <Route path="/system-Screen" element={<Systemscreen />} />
      <Route path="/" element={<Welcome_Screen />} />
    </Routes>
  );
};

export default MainApp;
