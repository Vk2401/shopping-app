import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { GlobalProvider } from "./GlobalContext"; // Import GlobalProvider

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <GlobalProvider> {/* Wrap App inside GlobalProvider */}
      <App />
    </GlobalProvider>
  </React.StrictMode>
);
