import React, { useEffect, useState,useContext  } from "react";
import loginUser from '../utils/images/loginUser.png';
import bgImage from '../utils/images/desktop-bg.png';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { useLocation } from '../context/locationContext.js';
import { useInfo } from '../context/infoContext.js';
import { useAuth } from "../context/AuthContext.js";

const Welcome_Screen = () => {
  const apiUrl = process.env.REACT_APP_API_URL
  const environment = process.env.REACT_APP_ENVIRONMENT
  const { login } = useAuth();
  const navigate = useNavigate();
  const [data, setData] = useState('');
  const [err, setErr] = useState('');
  const [otpValues, setOtpValues] = useState(["", "", "", "", ""]);
  const [serverOTP, setServerOTP] = useState(""); 
  const [showOTPField, setShowOTPField] = useState(false);
  const { location, setLocation, gpsEnabled, setGpsEnabled,setaccessToken,setrefreshToken,setUser } = useLocation();
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

  const findNearbyStores = (currentLat, currentLon, stores, maxDistance = 500) => {

    const nearbyStores = stores.filter((store) => {
      const storeLat = parseFloat(store.location.lat);
      const storeLon = parseFloat(store.location.lon);

      if (!storeLat || !storeLon) return false;

      const distance = haversineDistance(currentLat, currentLon, storeLat, storeLon);
      return distance <= maxDistance;
    });

    return nearbyStores.length > 0 ? nearbyStores : [];
  };

  const fetchStores=async ()=>{
    // const response = await axios.get(`${apiBase}/custom/shops/getshops?limit=10&page=1` , {
    //     headers: {
    //       'Authorization': `Bearer ${accessToken}`,
    //       'accept': 'application/json',
    //       'env': env,
    //     },
    //   });
     
    const allStores=[
      {
          "id": "f1a31772-3e3b-4a77-9188-8b142f1b0d1a12",
          "user_id": "c2hvcGFkbWluNUBleGFtcGxlLmNvbQ==",
          "name": "Shop Test",
          "shop_admin_email": "shopadmin5@example.com",
          "location": {
              "lat": "13.0220500",
              "lon": "80.2423200"
          },
          "address": "123 Alpha Street, City A, Country",
          "contact_no": "+10000000001",
          "kontor_server": "kontor1",
          "status": "open",
          "environment": "demo",
          "orgnumber": "123456789",
          "paymentMethod": {},
          "tawShop": "",
          "pkg": {},
          "instructions": [],
          "verification_methods": {},
          "created": "2024-12-06T05:09:26.993Z",
          "updated": "2024-12-25T04:50:03.529Z"
      },
      {
          "id": "f1a31772-3e3b-4a77-9188-8b142f1b0d1a",
          "user_id": "c2hvcGFkbWluMUBleGFtcGxlLmNvbQ==",
          "name": "Shop Alpha",
          "shop_admin_email": "shopadmin1@example.com",
          "location": {
              "lat": "37.7749",
              "lon": "-122.4194"
          },
          "address": "123 Alpha Street, City A, Country",
          "contact_no": "+10000000001",
          "kontor_server": "kontor1",
          "status": "open",
          "environment": "demo",
          "orgnumber": "123456789",
          "paymentMethod": {},
          "tawShop": "",
          "pkg": {},
          "instructions": [],
          "verification_methods": {},
          "created": "2024-11-21T17:58:31.904Z",
          "updated": "2024-12-25T04:50:03.530Z"
      },
      {
          "id": "e1cb45d5-4a53-4e9b-b05d-c3e63163f239",
          "user_id": "c2hvcGFkbWluM0BleGFtcGxlLmNvbQ==",
          "name": "Shop Gamma",
          "shop_admin_email": "shopadmin3@example.com",
          "location": {
              "lat": "51.5074",
              "lon": "-0.1278"
          },
          "address": "789 Gamma Avenue, City C, Country",
          "contact_no": "+10000000003",
          "kontor_server": "kontor3",
          "status": "closed",
          "environment": "demo",
          "orgnumber": "192837465",
          "paymentMethod": {},
          "tawShop": "",
          "pkg": {},
          "instructions": [],
          "verification_methods": {},
          "created": "2024-11-21T17:58:31.189Z",
          "updated": "2024-12-25T04:50:03.530Z"
      },
      {
          "id": "e0bfa98f-e89a-4d32-b899-32b5b662be22",
          "user_id": "c2hvcGFkbWluMkBleGFtcGxlLmNvbQ==",
          "name": "Shop Eta",
          "shop_admin_email": "shopadmin2@example.com",
          "location": {
              "lat": "55.7558",
              "lon": "37.6173"
          },
          "address": "123 Eta Street, City G, Country",
          "contact_no": "+10000000007",
          "kontor_server": "kontor7",
          "status": "closed",
          "environment": "demo",
          "orgnumber": "918273645",
          "paymentMethod": {},
          "tawShop": "",
          "pkg": {},
          "instructions": [],
          "verification_methods": {},
          "created": "2024-11-21T17:58:31.241Z",
          "updated": "2024-12-25T04:50:03.531Z"
      },
      {
          "id": "d6a41b99-dbd1-47bc-b13d-764451b1b048",
          "user_id": "c2hvcGFkbWluM0BleGFtcGxlLmNvbQ==",
          "name": "Shop Theta",
          "shop_admin_email": "shopadmin3@example.com",
          "location": {
              "lat": "35.6895",
              "lon": "139.6917"
          },
          "address": "456 Theta Road, City H, Country",
          "contact_no": "+10000000008",
          "kontor_server": "kontor8",
          "status": "open",
          "environment": "demo",
          "orgnumber": "123876459",
          "paymentMethod": {},
          "tawShop": "",
          "pkg": {},
          "instructions": [],
          "verification_methods": {},
          "created": "2024-11-21T17:58:31.175Z",
          "updated": "2024-12-25T04:50:03.534Z"
      },
      {
          "id": "ad86d041-3685-4b55-9337-64c2c912ff7e",
          "user_id": "c2hvcGFkbWluNEBleGFtcGxlLmNvbQ==",
          "name": "Shop Delta",
          "shop_admin_email": "shopadmin4@example.com",
          "location": {
              "lat": "48.8566",
              "lon": "2.3522"
          },
          "address": "123 Delta Blvd, City D, Country",
          "contact_no": "+10000000004",
          "kontor_server": "kontor4",
          "status": "open",
          "environment": "demo",
          "orgnumber": "564738291",
          "paymentMethod": {},
          "tawShop": "",
          "pkg": {},
          "instructions": [],
          "verification_methods": {},
          "created": "2024-11-21T17:58:31.532Z",
          "updated": "2024-12-25T04:50:03.535Z"
      },
      {
          "id": "ab25680f-916c-4b25-98cf-02cba5d2c8fa",
          "user_id": "c2hvcGFkbWluMUBleGFtcGxlLmNvbQ==",
          "name": "Shop Zeta",
          "shop_admin_email": "shopadmin1@example.com",
          "location": {
              "lat": "11.731569",
              "lon": "77.877648"
          },
          "address": "789 Zeta Plaza, City h, Country",
          "contact_no": "+10000000006",
          "kontor_server": "kontor6",
          "status": "open",
          "environment": "demo",
          "orgnumber": "182736451",
          "paymentMethod": {
              "swish": {
                  "payeeAlias": 111111
              }
          },
          "searchText": "shop zeta#shopadmin1@example.com#789 zeta plaza, city h, country",
          "tawShop": "",
          "pkg": {},
          "instructions": [
              "Remove Makeup & any Accessories.",
              "You may want to remove your Contact Lenses.",
              "Disrobe, you may tan in swimwear, underwear or as you chose",
              "Apply your Favorite Indoor Tanning potion. Baby oil and other Outdoor products may not be used on sunbeds.",
              "Please wear the protective eyewear provided.",
              "While tanning, you simply lay back, relax, listen to music or sleep. Your bed will automatically turn off at the proper time.",
              "Apply your favorite after tan or moisturizer",
              "After tanning please dress immediately. Make sure to take all personal items with you. You may freshen up and re-apply makeup at our vanity."
          ],
          "verification_methods": {},
          "created": "2024-12-20T06:09:40.025Z",
          "updated": "2025-02-07T04:13:58.481Z"
      },
      {
          "id": "9c1f1a17-ec46-4f34-a30b-473ff50c2f67",
          "user_id": "c2hvcGFkbWluNUBleGFtcGxlLmNvbQ==",
          "name": "Shop Kappa",
          "shop_admin_email": "shopadmin5@example.com",
          "location": {
              "lat": "28.6139",
              "lon": "77.209"
          },
          "address": "123 Kappa Lane, City J, Country",
          "contact_no": "+10000000010",
          "kontor_server": "kontor10",
          "status": "preparation",
          "environment": "demo",
          "orgnumber": "758392016",
          "paymentMethod": {
              "swish": {
                  "payeeAlias": 897
              }
          },
          "searchText": "shop kappa#shopadmin5@example.com#123 kappa lane, city j, country",
          "tawShop": "",
          "pkg": {},
          "instructions": [],
          "verification_methods": {},
          "created": "2024-11-21T17:58:31.787Z",
          "updated": "2025-01-08T11:27:27.534Z"
      },
      {
          "id": "8a6a987f-9a4a-42b2-89f1-cb5c9b745a24",
          "user_id": "c2hvcGFkbWluNEBleGFtcGxlLmNvbQ==",
          "name": "Shop Iota",
          "shop_admin_email": "shopadmin4@example.com",
          "location": {
              "lat": "13.010261",
              "lon": "80.110278"
          },
          "address": "789 Iota Ave, City I, Country",
          "contact_no": "+10000000009",
          "kontor_server": "kontor9",
          "status": "closed",
          "environment": "demo",
          "orgnumber": "984561230",
          "paymentMethod": {},
          "searchText": "shop iota#shopadmin4@example.com#789 iota ave, city i, country",
          "tawShop": "",
          "pkg": {},
          "instructions": [],
          "verification_methods": {
              "bankId_verify": false
          },
          "created": "2024-11-21T17:58:31.518Z",
          "updated": "2025-01-21T11:13:19.402Z"
      },
      {
          "id": "6336e34d19fd3f22b8b45a46",
          "user_id": "c2FzaWRoYXJhbmFsYWdlc2FuQGdtYWlsLmNvbQ==",
          "name": "Shop 2",
          "shop_admin_email": "sasidharanalagesan@gmail.com",
          "location": {
              "lat": "59.33287",
              "lon": "18.06219"
          },
          "address": "address 2",
          "contact_no": "987654321",
          "kontor_server": "kontor2",
          "status": "open",
          "environment": "demo",
          "orgnumber": "51684",
          "paymentMethod": {
              "swish": {
                  "payeeAlias": 1235158290
              }
          },
          "searchText": "shop 2#sasidharanalagesan@gmail.com#address 2",
          "tawShop": "",
          "pkg": {},
          "instructions": [],
          "verification_methods": {},
          "created": "2024-11-21T17:58:31.675Z",
          "updated": "2024-12-25T04:50:03.538Z"
      }
  ]
  const nearbyStores = await findNearbyStores(location.latitude, location.longitude, allStores,500);
  if(nearbyStores.length>0){
    navigate('/notClose-toStore',{ state: { stores: nearbyStores } });
  }else{
    navigate('/stores');
  }
      console.log(nearbyStores.length); ;
  }
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
      console.log(response.data);
      
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
      // const response = await axios.post("http://localhost:30001/api/auth/verify-otp", {
      //   phoneNumber: data.pnumber,
      //   otp: enteredOTP,
      // });
      // const response={
      //   data:'suc'
      // };
      const response=true;
      if (response) {
        alert("OTP verified successfully!"); 
        const {latitude,longitude}=location;
        const newLat = 13.0220500; // Example latitude
        const newLon = 80.2423200; // Example longitude
        const distance = getDistanceFromLatLonInMeters(latitude, longitude, newLat, newLon);

        if (distance <= 5) {
          navigate('/products');
            console.log("The location is within 5 meters.");
        } else {
          const response = await axios.post(`${apiUrl}/auth/customer-login`, loginData, {
            headers: {
              'accept': 'application/json',
              'Content-Type': 'application/json',
            },
          });

          const rToken=response.data.tokens.refresh.token;
          const aToken=response.data.tokens.access.token;
          setaccessToken(aToken);
          setrefreshToken(rToken);
          setUser(response.data.user);


          sessionStorage.setItem("user", JSON.stringify(response.data.user));
          sessionStorage.setItem('refreshToken',rToken);
          sessionStorage.setItem('accessToken',aToken);
          login({
            accessToke:aToken,
            refreshToken:rToken
          });
          fetchStores();
          // navigate('/stores');
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