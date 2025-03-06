import React, { useEffect, useState } from "react";
import loginUserIMG from '../assets/images/loginUser.png';
import axios from "axios";
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from "../context/AuthContext.js";
import { fetchStoresUtils } from '../utils/helpers.js';

const Welcome_Screen = () => {
  const authAPIURL = process.env.REACT_APP_AUTH_API_URL

  const Distance = process.env.REACT_APP_DISTANCE
  const imagePath = process.env.REACT_APP_IMAGE_PATH;
  const { isAuthenticated, storeTokens, checkTokenExpiration } = useAuth();
  const navigate = useNavigate();
  // const [data, setData] = useState('');
  const [data, setData] = useState({ userName: '', pnumber: '' });
  const [err, setErr] = useState('');
  const [otpValues, setOtpValues] = useState(["", "", "", "", ""]);
  const [serverOTP, setServerOTP] = useState("");
  const [showOTPField, setShowOTPField] = useState(false);
  const [isUserLogin, setIsUserLogin] = useState(false);
  let loginData = {
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

      },
      (err) => {
        if (err.code === err.PERMISSION_DENIED) {
        }
      }
    );
  };

  const checkUser = async (orderRef) => {
    setIsUserLogin(true);
    try {
      const response = await axios.get('https://devapi-tanlux.storetech.ai/v1/bankid/collect', {
        params: { orderRef },  // Sending orderRef as a query parameter
        headers: { Accept: 'application/json' } // Required header
      });

      let user = response.data;
      user = user.user;

      loginData.login_id = user.personalNumber;
      loginData.login_name = user.name;
      loginData.device_type = 'android';
      loginUser();

    } catch (err) {
      console.log(err);
    }
  }

  const BankcId = async () => {

    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

    try {
      const response = await axios.get('https://devapi-tanlux.storetech.ai/v1/bankid/auth', {
        params: { endUserIp: '1.1.1.1' }, // Query parameter
        headers: { Accept: 'application/json' }, // Header
      });
      localStorage.setItem('orderReferance', response.data.orderRef);
      const redirectURL = `https://vending.webronics.com`;
      const bankIdLink = `https://app.bankid.com/?autostarttoken=${response.data.autoStartToken}&redirect=${redirectURL}`;
      if (isMobile) {
        window.location.href = bankIdLink; // Open BankID app
      } else {
        window.location.href = "https://bankid.example.com"; // Redirect to web authentication
      }
      // console.log('Response:', response.data);
    } catch (err) {
      console.error('Error:', err);
    }
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

        const currentTimestamp = response.data.tokens.refresh.expires;
        const rtExpireAt = currentTimestamp;
        const rToken = response.data.tokens.refresh.token;
        const aToken = response.data.tokens.access.token;
        const expireAt = response.data.tokens.access.expires;
        const user = response.data.user;

        storeTokens(aToken, expireAt, rToken, user, rtExpireAt);

        let nearbyStores = await fetchStoresUtils();
        let nearbyStore = nearbyStores[0];

        if (nearbyStore.distanceInKm <= Distance) {
          navigate("/products", { state: { stores: nearbyStore.id } });
          localStorage.setItem('storeID', nearbyStore.id);
        } else {
          navigate('/stores');
        }

        // if (nearbyStores.length > 0) {
        //   if (nearbyStores.length > 1) {
        //     let prevStoreID = localStorage.getItem('storeID');

        //     if (prevStoreID !== null && prevStoreID !== String(nearbyStores[0].id)) {
        //       localStorage.setItem('cart', JSON.stringify([])); // Store an empty array properly
        //     }

        //     localStorage.setItem('storeID', nearbyStores[0].id);
        //     navigate("/products", { state: { stores: nearbyStores[0].id } });
        //     // navigate(`/products`);
        //   } else {
        //     let prevStoreID = localStorage.getItem('storeID');

        //     if (prevStoreID !== null && prevStoreID !== String(nearbyStores[0].id)) {
        //       localStorage.setItem('cart', JSON.stringify([])); // Store an empty array properly
        //     }
        //     localStorage.setItem('storeID', nearbyStores[0].id);
        //     // navigate(`/products`);
        //     navigate("/products", { state: { stores: nearbyStores[0].id } });
        //   }
        // } else {
        //   navigate('/stores');
        // }

      } else {
        setErr("Invalid OTP. Please try again.");
      }
    } catch (error) {
      console.error("Error verifying OTP:", error);
      setErr("Error verifying OTP.");
    }
  };

  const loginUser = async () => {

    try {
      const response = await axios.post(`${authAPIURL}/auth/customer-login`, loginData, {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
      });

      const { tokens, user } = response.data;
      const { access, refresh } = tokens;
    
      storeTokens(access.token, access.expires, refresh.token, loginData, refresh.expires);

      let nearbyStores = await fetchStoresUtils();

      if (nearbyStores.length > 0) {
        setIsUserLogin(false);
        let nearbyStore = nearbyStores[0];

        if (nearbyStore.distanceInKm <= Distance) {
          navigate("/products", { state: { stores: nearbyStore.id } });
          localStorage.setItem('storeID', nearbyStore.id);
        } else {
          navigate('/stores');
        }
      } else {
        setIsUserLogin(false);
        navigate('/stores');
      }
    } catch (error) {
      console.error('Login error:', error.response?.data || error.message);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      checkTokenExpiration();
      navigate('products');
    }

    let orderRefernce = localStorage.getItem('orderReferance');
    if (orderRefernce != null) {
      checkUser(orderRefernce);
    }

    getCurrectLocation();
  }, []);

  return (
    <div
      className="flex flex-col h-screen justify-center font-poppins px-5 overflow-y-scroll hidden-scrollbar bg-buttonColor"
      style={{ backgroundImage: 'url(/images/shopping-app-bg.svg)', backgroundSize: 'contain' }}
    >
      <div className="h-1/2 w-full flex flex-col items-center justify-center gap-6 mt-10">
        <strong className="text-white text-3xl font-bold">Welcome!</strong>
        <img src={loginUserIMG} alt="" className="h-[200px] w-[200px]" />
        <h1 className="text-3xl font-bold text-white mt-7">Sign In</h1>
      </div>

      <div className="h-1/2  w-full flex flex-col items-center justify- gap-x-1 mt-5 ">
        <form onSubmit={showOTPField ? handleOTPSubmit : handleFormSubmit} className="flex flex-col gap-6 bg-white rounded-lg py-7 px-6 shadow-lg">
          <div className="flex flex-col gap-3 w-full">
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
                      type="number" // Use text to control input behavior
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

            <p id='result' className="overflow-x-auto"></p>
            <button className="bg-buttonColor text-white font-semibold rounded-full w-full py-3 transition-all hover:opacity-90">
              {showOTPField ? 'Validate OTP' : 'GET OTP'}
            </button>
            or
            <a onClick={() => BankcId()} className="text-center bg-red-500 text-white font-semibold rounded-full w-full py-3 transition-all hover:opacity-90">
              Sign In using BankID
            </a>
            <p className="text-gray-600 text-sm text-center text-wrap">
              By Signing In you accept our
              <span className="text-buttonColor font-semibold cursor-pointer"> Terms of Services</span> and
              <span className="text-buttonColor font-semibold cursor-pointer"> Privacy Policy</span>.
            </p>

          </div>
        </form>
      </div>

      {isUserLogin && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 px-5 pb-5 font-poppins">
          <div className="loader border-t-4 border-buttonColor rounded-full w-12 h-12 animate-spin"></div>
        </div>
      )}
    </div>
  );
};

export default Welcome_Screen;