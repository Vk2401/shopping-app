import React, { useEffect, useState, useContext } from "react";
import loginUser from '../utils/images/loginUser.png';
import bgImage from '../utils/images/desktop-bg.png';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { useAuth } from "../context/AuthContext.js";

const Welcome_Screen = () => {
  const apiUrl = process.env.REACT_APP_API_URL
  const authAPIURL=process.env.REACT_APP_AUTH_API_URL
  const environment = process.env.REACT_APP_ENVIRONMENT
  const Distance=process.env.REACT_APP_DISTANCE
  const {isAuthenticated,storeTokens } = useAuth();
  const navigate = useNavigate();
  // const [data, setData] = useState('');
  const [data, setData] = useState({ userName: '', pnumber: '' });
  const [err, setErr] = useState('');
  const [otpValues, setOtpValues] = useState(["", "", "", "", ""]);
  const [serverOTP, setServerOTP] = useState("");
  const [showOTPField, setShowOTPField] = useState(false);
  const [registerUser,setRegisterUser]=useState(false);
  const loginData = {
    "login_type": "bankid",
    "login_id": "199609052387",
    "login_name": "Jegan",
    "device_type": "android"
  };

  const [currentLocation, setCurrentLocation] = useState({
    currentLatitude: '',
    currentLongitude: '',
  });

  const getCurrectLocation = () => {

    navigator.geolocation.getCurrentPosition(
      (position) => {

        const { latitude, longitude } = position.coords;
        setCurrentLocation({
          currentLatitude: latitude,
          currentLongitude: longitude,
        });

        // GPS is enabled
      },
      (err) => {
        if (err.code === err.PERMISSION_DENIED) {
        }
      }
    );
  };

  const haversineDistance = (lat1, lon1, lat2, lon2) => {
    const toRadians = (deg) => (deg * Math.PI) / 180;
    const R = 6371; // Earth's radius in km
    const dLat = toRadians(lat2 - lat1);
    const dLon = toRadians(lon2 - lon1);

    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(toRadians(lat1)) * Math.cos(toRadians(lat2)) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c * 1000; // Convert km to meters
  }

  const findNearbyStores = (currentLat, currentLon, stores, maxDistance = 15000) => {

    const nearbyStores = stores.filter((store) => {
      const storeLat = parseFloat(store.location.lat);
      const storeLon = parseFloat(store.location.lon);

      if (!storeLat || !storeLon) return false;

      const distance = haversineDistance(currentLat, currentLon, storeLat, storeLon);
      return distance <= maxDistance;
    });

    return nearbyStores.length > 0 ? nearbyStores : [];
  };

  const fetchStores = async () => {
 
    const aToken= sessionStorage.getItem('accessToken');

    const response = await axios.get(`${apiUrl}/shops/getshops?limit=10&page=1`, {
      headers: {
        'Authorization': `Bearer ${aToken}`,
        'accept': 'application/json',
        'env': environment,
      },
    });

    const allStores = response.data.data;

    const nearbyStores = await findNearbyStores(currentLocation.currentLatitude, currentLocation.currentLongitude, allStores, Distance);
    return nearbyStores;
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };
  

  const validatePhoneNumber = (phoneNumber) => {
    const phoneRegex = /^[0-9]{10}$/;
    return phoneRegex.test(phoneNumber);
  };

  const handleOTPChange = (e, index) => {
    const { value } = e.target;

    if (value.length > 1) {
      return;
    }

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

    // try {
    //   const response = await axios.post("http://localhost:30001/api/auth/request-otp", data);
    //   console.log(response.data);

    //   if (!response.data.success) {
    //     window.alert('Failed to sign in');
    //     throw new Error(`HTTP error! status: ${response.status}`);
    //   }
    //   setServerOTP(response.data.otp)

    // } catch (error) {
    //   console.error('Error signing in:', error);
    //   setErr('Error signing in');
    // }
  };

  const handleOTPSubmit = async (e) => {
    e.preventDefault();
    const enteredOTP = otpValues.join("");
  

    if (enteredOTP.length !== 5) {
      setErr("Please enter the complete OTP");
      return;
    }

    try {
      // const response = await axios.post("http://localhost:30001/api/auth/verify-otp", {
      //   phoneNumber: data.pnumber,
      //   otp: enteredOTP,
      // });
      // const response={
      //   data:'suc'
      // };
      
      const response = true;

      if (response) {
        const response = await axios.post(`${authAPIURL}/auth/customer-login`, loginData, {
          headers: {
            'accept': 'application/json',
            'Content-Type': 'application/json',
          },
        });

        const rToken = response.data.tokens.refresh.token;
        const aToken = response.data.tokens.access.token;
        const expireAt=response.data.tokens.access.expires;
        const user=response.data.user;

        storeTokens(aToken,expireAt,rToken,user);

        let nearbyStores = await fetchStores();
        if (nearbyStores.length > 0) {
          if (nearbyStores.length > 1) {
            // navigate('/notClose-toStore', { state: { stores: nearbyStores[0] } });
            localStorage.setItem('storeID',nearbyStores[0].id);
            navigate(`/products`);
          } else {
            localStorage.setItem('storeID',nearbyStores.id);
            navigate(`/products`);
            // navigate('/notClose-toStore', { state: { stores: nearbyStores } });
          }
        } else {
          navigate('/stores');
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
    if(isAuthenticated)
      {
        navigate('products');
      }
    getCurrectLocation();
  }, []);

  return (
    <div className="flex flex-col h-screen justify-center font-poppins px-5" style={{ backgroundImage: `url(${bgImage})`, backgroundSize: "contain" }}>
      <div className="h-1/2 w-full flex flex-col items-center justify-center gap-6 mt-10">
        <strong className="text-white text-3xl font-bold">Welcome!</strong>
        <img src={loginUser} alt="" className="h-[200px] w-[200px]" />
        <h1 className="text-3xl font-bold text-white mt-7">Sign In</h1>
      </div>

      <div className="h-1/2  w-full flex flex-col items-center justify- gap-x-1 mt-5 overflow-y-auto">
        <form onSubmit={showOTPField ? handleOTPSubmit : handleFormSubmit} className="flex flex-col gap-6 bg-white rounded-lg py-7 px-6 shadow-lg">
          <div className="flex flex-col gap-3 w-full">
            {
              registerUser  &&  
              <>
                 <label htmlFor="userName" className="font-semibold text-lg text-gray-700 ml-2">User Name</label>
                  <input
                    type="text"
                    name="userName"
                    className="w-full border border-gray-300 outline-none py-3 px-4 rounded-md focus:ring-2 focus:ring-buttonColor transition-all"
                    placeholder="Enter Name"
                    onChange={handleChange}
                  />
              </>
            }

            <label htmlFor="phone" className="font-semibold text-lg text-gray-700 ml-2">Phone Number</label>
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
                    type="text" // Use text to control input behavior
                    name={`otp${index}`}
                    id={`otp-${index}`} // Add ID for focus
                    maxLength={1}
                    className="w-[50px] h-[50px] border border-gray-300 outline-none py-3 px-4 text-center rounded-md focus:ring-2 focus:ring-buttonColor transition-all"
                    placeholder="-"
                    value={otpValues[index]}
                    onChange={(e) => handleOTPChange(e, index)}
                    onKeyDown={(e) => {
                      if (!/^[0-9]$/.test(e.key) && e.key !== "Backspace" && e.key !== "Tab") {
                        e.preventDefault(); // Prevent entering invalid characters
                      }
                    }}
                  />
                ))}
              </div>

              </div>
            )}
          </div>

          <div className="flex flex-col items-center gap-2">
            <button className="bg-buttonColor text-white font-semibold rounded-full w-full py-3 transition-all hover:opacity-90">
              {showOTPField ? 'Validate OTP' : 'GET OTP'}
            </button>
            <p onClick={()=>setRegisterUser(true)}>New here? Register now!</p>
            
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