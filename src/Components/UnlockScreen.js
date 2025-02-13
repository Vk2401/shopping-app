import React, { useContext, useEffect } from "react";
import Door from '../utils/images/Door.png';
import DoorUnlockedBG from '../utils/images/DoorUnlockedBG.png';
import { useAuth } from "../context/AuthContext.js";
import { useNavigate } from "react-router-dom";

const UnlockScreen = () => {
  const navigate = useNavigate();
  const { isAuthenticated, logout } = useAuth();
  if (!isAuthenticated) {
    navigate('/');
  }

  return (
    <div className="w-full h-screen flex flex-col justify-center items-center "
      style={{
        backgroundImage: `url(${DoorUnlockedBG})`,
        backgroundSize: "cover",
      }}>
      <img src={Door} alt="" className="h-44 w-36" />
      <h1 className="text-white font-bold text-3xl tracking-wider">Door has been  <br /> Unlocked!</h1>
    </div>
  );
}

export default UnlockScreen;