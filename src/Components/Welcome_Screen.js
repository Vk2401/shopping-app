import React, { useEffect, useState,useContext  } from "react";
import loginUser from '../utils/images/loginUser.png';
import bgImage from '../utils/images/desktop-bg.png';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { useLocation } from '../context/locationContext.js';
import { useInfo } from '../context/infoContext.js';

const Welcome_Screen = () => {
  const navigate = useNavigate();
  const [data, setData] = useState('');
  const [err, setErr] = useState('');
  const [otpValues, setOtpValues] = useState(["", "", "", "", ""]);
  const [serverOTP, setServerOTP] = useState(""); 
  const [showOTPField, setShowOTPField] = useState(false);
  const { location, setLocation, gpsEnabled, setGpsEnabled,accessToken,setaccessToken,refreshToken,setrefreshToken,user,setUser } = useLocation();
  const {apiBase,env}=useInfo();
  const [error, setError] = useState(null);
  const loginData = {
      "login_type": "bankid",
      "login_id": "199609052387",
      "login_name": "Jegan",
      "device_type": "android"
  };

  const getCurrectLocation = () => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        console.log(latitude);
        console.log(longitude);

        setGpsEnabled(true);
        setLocation({latitude,longitude});
        // GPS is enabled
      },
      (err) => {
        if (err.code === err.PERMISSION_DENIED) {
          setGpsEnabled(false); // GPS denied
        }
      }
    );
  };

  function getDistanceFromLatLonInMeters(lat1, lon1, lat2, lon2) {
      const R = 6371000; // Earth's radius in meters
      const dLat = (lat2 - lat1) * (Math.PI / 180);
      const dLon = (lon2 - lon1) * (Math.PI / 180);
      
      const a = 
          Math.sin(dLat / 2) * Math.sin(dLat / 2) +
          Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) * 
          Math.sin(dLon / 2) * Math.sin(dLon / 2);
      
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      const distance = R * c; // Distance in meters
      
      return distance;
  }

  const handleChange = async (e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value })); 
  };

  const validatePhoneNumber = (phoneNumber) => {
    const phoneRegex = /^[0-9]{10}$/;
    return phoneRegex.test(phoneNumber);
  };

  const handleOTPChange = (e, index) => {
   
    const { value } = e.target;

    if (value.length > 1) return;

    const newOtpValues = [...otpValues];
    newOtpValues[index] = value;
    setOtpValues(newOtpValues);

    // Move focus to the next input
    if (value && index < 4) {
      document.getElementById(`otp-${index + 1}`).focus();
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault(); 

    // Validate phone number
    if (!validatePhoneNumber(data.pnumber)) {
      setErr('Invalid phone number');
      return;
    }

    setErr(''); // Reset error
    setShowOTPField(true); // Show OTP fields

    try {
      const response = await axios.post("http://localhost:30001/api/auth/request-otp", data);
      console.log(response);
      
      // if (!response.data.success) {
      //   window.alert('Failed to sign in');
      //   throw new Error(`HTTP error! status: ${response.status}`);
      // }
      // setServerOTP(response.data.otp)
      
    } catch (error) {
      console.error('Error signing in:', error);
      setErr('Error signing in');
    }
  };

  const handleOTPSubmit = async (e) => {
    e.preventDefault();
    const enteredOTP = otpValues.join("");

    if (enteredOTP.length !== 5) {
      setErr("Please enter the complete OTP");
      return;
    }

    try {
      const response = await axios.post("http://localhost:30001/api/auth/verify-otp", {
        phoneNumber: data.pnumber,
        otp: enteredOTP,
      });
      if (response.data.success) {
        alert("OTP verified successfully!"); 
        const {latitude,longitude}=location;
        const newLat = 13.0220500; // Example latitude
        const newLon = 80.2423200; // Example longitude
        const distance = getDistanceFromLatLonInMeters(latitude, longitude, newLat, newLon);

        if (distance <= 5) {
          navigate('/products');
            console.log("The location is within 5 meters.");
        } else {
          // `${apiBase}/auth/customer-login`

          const response = await axios.post(`${apiBase}/auth/customer-login`, loginData, {
            headers: {
              'accept': 'application/json',
              'Content-Type': 'application/json',
            },
          });
          console.log(response);

          setaccessToken(response.data.tokens.access.token);
          setrefreshToken(response.data.tokens.refresh);
          setUser(response.data.user);

          sessionStorage.setItem("user", JSON.stringify(response.data.user));
          sessionStorage.setItem('refreshToken',response.data.tokens.refresh.token);
          sessionStorage.setItem('accessToken',response.data.tokens.access.token);


          navigate('/stores');
          console.log("The location is farther than 5 meters.");
        }

      } else {
        setErr("Invalid OTP. Please try again.");
      }
    } catch (error) {
      console.error("Error verifying OTP:", error);
      setErr("Error verifying OTP.");
    }
  };

  useEffect(() => {
    getCurrectLocation();
  }, []);

  useEffect(() => {
    if (gpsEnabled === false) {
      navigate('/no-location'); // Redirect if GPS is disabled
    }
  }, [gpsEnabled]);

  return (
    <div className="flex flex-col h-screen font-poppins px-5" style={{ backgroundImage: `url(${bgImage})`, backgroundSize: "contain" }}>
      <div className="h-1/2 w-full flex flex-col items-center justify-center gap-6">
        <strong className="text-white text-3xl font-bold">Welcome!</strong>
        <img src={loginUser} alt="" className="h-[200px] w-[200px]" />
        <h1 className="text-3xl font-bold text-white mt-7">Sign In</h1>
      </div>

      <div className="h-1/2 w-full flex flex-col items-center gaxp-1">
        <form onSubmit={showOTPField ? handleOTPSubmit : handleFormSubmit}  className="flex flex-col gap-6 bg-white rounded-lg py-7 px-6 shadow-lg w-[90%] max-w-md">
          <div className="flex flex-col gap-3 w-full">
            <label htmlFor="phone" className="font-semibold text-lg text-gray-700">Phone Number</label>
            <input
              type="number"
              name="pnumber"
              className="w-full border border-gray-300 outline-none py-3 px-4 rounded-md focus:ring-2 focus:ring-buttonColor transition-all"
              placeholder="Enter mobile number"
              onChange={handleChange}
            />
            {err && (<p className="text-red-500">{err}</p>)}

            {showOTPField && (
              <div>
                <label htmlFor="otp" className="font-semibold text-lg text-gray-700">Enter OTP</label>
                <div className="flex gap-2">
                  {[...Array(5)].map((_, index) => (
                    <input
                      key={index}
                      type="number"
                      name={`otp${index}`}
                      id={`otp-${index}`} // Add ID for focus
                      maxLength={1}
                      className="w-[50px] h-[50px] border border-gray-300 outline-none py-3 px-4 text-center rounded-md focus:ring-2 focus:ring-buttonColor transition-all"
                      placeholder="-"
                      value={otpValues[index]}
                      onChange={(e) => handleOTPChange(e, index)}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="flex flex-col items-center gap-4">
            <button className="bg-buttonColor text-white font-semibold rounded-full w-full py-3 transition-all hover:opacity-90">
              {showOTPField ? 'Validate OTP' : 'GET OTP'}
            </button>
            <p className="text-gray-600 text-sm text-center">
              By Signing In you accept our
              <span className="text-buttonColor font-semibold cursor-pointer"> Terms of Services</span> and
              <span className="text-buttonColor font-semibold cursor-pointer"> Privacy Policy</span>.
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Welcome_Screen;