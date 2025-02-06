import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import LocationProvider from './context/locationContext.js';
import InfoProvider from "./context/infoContext.js";
import { CartProvider } from "./context/CartContext.js";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
      <LocationProvider>
        <InfoProvider>
          <CartProvider>
           <App />
          </CartProvider>
        </InfoProvider>
      </LocationProvider>
  </React.StrictMode>
);
