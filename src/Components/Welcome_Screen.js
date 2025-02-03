import React, { useEffect, useState } from "react";
import loginUser from '../utils/images/loginUser.png';
import bgImage from '../utils/images/desktop-bg.png';
import axios from "axios";
import { useNavigate } from 'react-router-dom';

const Welcome_Screen = () => {
  const navigate = useNavigate();
  const [data, setData] = useState('');
  const [location, setLocation] = useState(null);
  const [gpsEnabled, setGpsEnabled] = useState(false); 
  const [err, setErr] = useState('');

  const getCurrectLocation = () => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setLocation({ latitude, longitude });
        setGpsEnabled(true); // GPS is enabled
      },
      (err) => {
        if (err.code === err.PERMISSION_DENIED) {
          setGpsEnabled(false); // GPS denied
        }
        setLocation(null);
      }
    );
  };

  const [showOTPField, setShowOTPField] = useState(false);

  const handleChange = async (e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value })); 
  };

  const validatePhoneNumber = (phoneNumber) => {
    const phoneRegex = /^[0-9]{10}$/;
    return phoneRegex.test(phoneNumber);
  };

  const handleOTPChange = (e) => {
    const { name, value } = e.target;
    const index = name.replace("otp", "");
    console.log(`OTP digit at position ${index}: ${value}`);
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
      const response = await axios.post("http://localhost:30001/api/user/signin", data);
      
      if (!response.data.success) {
        window.alert('Failed to sign in');
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      setData(''); // Reset form data on success

    } catch (error) {
      console.error('Error signing in:', error);
      setErr('Error signing in');
    }
  };

  useEffect(() => {
    getCurrectLocation(); // Get location on component mount

    // Check GPS status
    if (!gpsEnabled) {
      window.alert('Need to enable location');
      navigate('/no-location'); // Redirect if GPS is disabled
    } else {
      if (!location) {
        window.alert('Something went wrong with the location');
      }
    }
  }, [gpsEnabled, location, navigate]); // Adding dependencies for correct behavior

  return (
    <div className="flex flex-col h-screen font-poppins px-5" style={{ backgroundImage: `url(${bgImage})`, backgroundSize: "contain" }}>
      <div className="h-1/2 w-full flex flex-col items-center justify-center gap-4">
        <strong className="text-white text-3xl font-bold">Welcome!</strong>
        <img src={loginUser} alt="" className="h-[200px] w-[200px]" />
      </div>

      <div className="h-1/2 w-full flex flex-col items-center gap-1">
        <h1 className="text-3xl font-bold text-white">Sign In</h1>

        <form onSubmit={handleFormSubmit} className="flex flex-col gap-6 bg-white rounded-lg py-7 px-6 shadow-lg w-[90%] max-w-md">
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
                      maxLength={1}
                      className="w-[50px] h-[50px] border border-gray-300 outline-none py-3 px-4 text-center rounded-md focus:ring-2 focus:ring-buttonColor transition-all"
                      placeholder="-"
                      onChange={handleOTPChange}
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
