import logo from './logo.svg';
import './App.css';
import Welcome_Screen from './Components/Welcome_Screen.js';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NolocationScreen from './Components/NolocationScreen.js';

function App() {
  return (
    <Router>
    <Routes>
      {/* Define a route for NoLocationScreen */}
      <Route path="/no-location" element={<NolocationScreen />} />
      <Route path="/" element={<Welcome_Screen />} />
      {/* Other routes go here */}
    </Routes>
  </Router>

  );
}

export default App;
