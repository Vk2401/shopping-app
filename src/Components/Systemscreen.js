import React, { useContext, useEffect } from "react";
import bgImage from '../utils/images/desktop-bg.png';
import { useAuth } from "../context/AuthContext.js";
import { useNavigate } from "react-router-dom";

const Systemscreen = () => {
  const navigate = useNavigate();
  const { isAuthenticated, logout } = useAuth();
  if (!isAuthenticated) {
    navigate('/');
  }

  return (
    <div className="w-full h-screen flex justify-center items-center"
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: "contain",

      }}>
      <h1 className="text-white">Please Login using an Mobile Device to get access to our App</h1>
    </div>
  );
};

export default Systemscreen;
