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

function App() {
  return (
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

      </Route>

      <Route path="*" element={<NotFoundScreen />} />

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
