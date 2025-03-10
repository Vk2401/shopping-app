import React, { useEffect, useState } from "react";
import LanguageSwitch from '../assets/images/LanguageSwitch.png'
import storeImage from '../assets/images/location.png'
import locationImage from '../assets/images/locatioImage.png'
import { useLocation as useRouterLocation, useNavigate } from 'react-router-dom';
import { useAuth } from "../context/AuthContext.js";
import userIcon from '../assets/images/awesome-user.svg';

const NotclosetoStore = () => {
  const navigate = useNavigate();
  const [distance, setDistance] = useState('');
  const [storeID, setStoreID] = useState('');
  const { isAuthenticated } = useAuth();
  const location2 = useRouterLocation();
  const { stores } = location2.state || { stores: [] };

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

  const getCurrectLocation2 = () => {

    if (Array.isArray(stores)) {
      setStoreID(stores[0].id);
    } else if (typeof stores === "object" && stores !== null) {
      setStoreID(stores.id);
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        const formattedDistance = (distance) => {
          return distance % 1 === 0 ? distance : distance >= 100 ? Math.round(distance) : Number(distance.toFixed(3));
        };

        let distance;
        if (Array.isArray(stores)) {
          setStoreID(stores[0].id);
          distance = haversineDistance(latitude, longitude, stores[0].location.lat, stores[0].location.lon);
        } else if (typeof stores === "object" && stores !== null) {
          setStoreID(stores.id);
          distance = haversineDistance(latitude, longitude, stores.location.lat, stores.location.lon);
        }

        setDistance(formattedDistance(distance));

      },
      (err) => {
        if (err.code === err.PERMISSION_DENIED) {
        }
      }
    );
  };

  const getCurrectLocation = () => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        // GPS is enabled
      },
      (err) => {
        if (err.code === err.PERMISSION_DENIED) {
        }
      }
    );
  };

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/');
      return;  // Stop further execution
    }


    if (stores.length === 0) {
      navigate('/error');
      return;  // Stop further execution
    }

    // These functions should only run if stores.length !== 0
    getCurrectLocation2();
    getCurrectLocation();

  }, [isAuthenticated, stores]); // Include dependencies to re-run when `stores` changes

  return (

    <div className="flex flex-col h-screen w-full font-poppins">
      <div className="bg-buttonColor py-10 relative flex flex-col items-center justify-center"
        style={{ borderBottomLeftRadius: '38%', borderBottomRightRadius: '38%' }}>
        <img src={userIcon} alt="" className="w-9 h-9 absolute right-5 bg-white rounded-full p-1" onClick={() => { navigate('/settings') }} />
      </div>

      <div className="flex flex-col items-center justify-around flex-1">
        <div className="flex flex-col gap-7">
          <strong className="text-2xl font-bold text-black text-center">You are not close to <br /> our Store</strong>
          <div className="flex flex-col items-center gap-5 bg-ligghtGray px-5 py-8 rounded-xl">
            <img src={storeImage} alt="" className="h-[110px] w-[110px]" />
            <p className="text-black text-wrap text-center font-xl font-semibold">Make sure you are within <br /> 50 meters of the store to utilize <br /> our App's features</p>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-5 items-center px-11 pb-10 mb-14">
        <strong className="text-black text-xl">Nearby Store</strong>

        <div className="flex bg-ligghtGray justify-between items-center w-full py-2 px-2 rounded-md ">
          <div className="flex">
            <img src={locationImage} alt="" className="h-10 w-10 mr-2" />
            <div className="flex flex-col">
              <span className="text-buttonColor text-left text-xl font-semibold ">Bäckefors</span>
              <span className="text-left">Lasarettsvägen 1</span>
            </div>
          </div>

          <strong className="text-black">{distance + ' m'}</strong>
        </div>

        <button className="bg-buttonColor text-white text-center text-lg font-semibold rounded-full w-[250px] py-3"
          onClick={() => navigate(`/products/${storeID}`)}>Get Product</button>
        <button className="bg-ligghtGray text-black text-center text-lg font-semibold rounded-full w-[250px] py-3"
          onClick={() => navigate('/stores')}>Find Other Stores</button>
      </div>
    </div>

  );
}

export default NotclosetoStore;