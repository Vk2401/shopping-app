import React, { useState, useEffect } from "react";
import noLocation from "../utils/images/noLocation.png";
import { useAuth } from "../context/AuthContext.js";
import { useNavigate } from "react-router-dom";

const NolocationScreen = () => {
  const navigate = useNavigate();
  const [showPopup, setShowPopup] = useState(false); // State for modal visibility
  const { isAuthenticated, logout } = useAuth();

  function getCurrectLocation() {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          console.log("Location enabled!", latitude, longitude);
        },
        (err) => {
          if (err.code === err.PERMISSION_DENIED) {
            setShowPopup(true); // Show custom modal
          } else if (err.code === err.POSITION_UNAVAILABLE) {
            setShowPopup(true); // Show custom modal
          }
        }
      );
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  }

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/');
    }

    getCurrectLocation();
  }, []);
  return (
    <div className="flex flex-col justify-between h-screen font-poppins">
      {/* Header Section */}
      <div
        className="bg-buttonColor py-10 relative px-6 flex flex-col items-center justify-center"
        style={{ borderBottomLeftRadius: "18%", borderBottomRightRadius: "18%" }}
      ></div>

      {/* Content Section */}
      <div className="flex flex-col h-full items-center justify-center px-6 pt-10">
        <div className="flex flex-col items-center flex-1 w-full gap-4 text-center">
          <img src={noLocation} alt="No Location" className="w-[250px] h-[300px]" />

          <h3 className="text-redColor font-bold text-2xl mt-5">No Access to Location</h3>
          <h4 className="text-black text-lg font-semibold text-center mt-8">
            Please enable location permission <br /> to unlock all the awesome features of our app!
          </h4>
        </div>

        {/* Button Section */}
        {/* <div className="flex items-center justify-center w-full pb-20">
          <button
            className="bg-redColor text-white text-center rounded-full w-[250px] py-4 font-bold"
            onClick={getCurrectLocation}
          >
            Enable Location
          </button>
        </div> */}
      </div>

      {/* Custom Modal Popup */}
      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg p-6 w-80 text-center">
            <h2 className="text-lg font-bold mb-4">Enable GPS</h2>
            <p className="text-gray-600 mb-4">GPS is turned off. Would you like to enable it?</p>
            <div className="flex justify-center gap-4">
              <button className="bg-green-500 text-white px-4 py-2 rounded-md" onClick={() => setShowPopup(false)}>
                Yes, Enable
              </button>
              <button
                className="bg-gray-400 text-white px-4 py-2 rounded-md"
                onClick={() => setShowPopup(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default NolocationScreen;
