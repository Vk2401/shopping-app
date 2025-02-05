import './App.css';
import Welcome_Screen from './Components/Welcome_Screen.js';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NolocationScreen from './Components/NolocationScreen.js';
import ProductScreen from './Components/ProductScreen.js';
import SystemScreen from './Components/Systemscreen.js';
import NotclosetoStore from './Components/NotclosetoStore.js';

function App() {
  return (
    <Routes>
      <Route path="/system-screen" element={<SystemScreen />} />
      <Route path="/no-location" element={<NolocationScreen />} />
      <Route path="/products" element={<ProductScreen />} />
      <Route path="/notClose-toStore" element={<NotclosetoStore />} />

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
