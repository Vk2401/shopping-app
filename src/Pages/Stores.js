import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import locationIcon from '../assets/images/location-sharp.png';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import axios from "axios";
import searchicon from '../assets/images/search.png';
import { useAuth } from "../context/AuthContext.js";
import { useNavigate } from "react-router-dom";
import userIcon from '../assets/images/Icon awesome-user.svg';
import leftArrow from '../assets/images/leftArrow.png';
import { fetchStoresUtils } from '../utils/helpers.js';

const Stores = () => {
  const navigate = useNavigate();
  const [shops, setShops] = useState([]);
  const [stores, seStores] = useState([]);
  const { checkTokenExpiration } = useAuth();
  const [accessToken, setAccessToken] = useState();
  const [filteredShops, setFilteredShops] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state
  const apiUrl = process.env.REACT_APP_API_URL;
  const environment = process.env.REACT_APP_ENVIRONMENT;
  const [currentLat, setCurrentLat] = useState(null);
  const [currentLon, setCurrentLon] = useState(null);
  const [tempShop,setTempShop]=useState('');
  
  const customIcon = L.icon({
    iconUrl: locationIcon,
    iconSize: [25, 28],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32],
  });

  const openNavigation = (lat, lng) => {
    const url = `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`;
    window.open(url, "_blank");
  };

  const calculateDistance = (lat1, lon1, lat2, lon2) => {

    const toRadians = (degrees) => degrees * (Math.PI / 180);
    const R = 6371; // Earth's radius in km

    const dLat = toRadians(lat2 - lat1);
    const dLon = toRadians(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(toRadians(lat1)) * Math.cos(toRadians(lat2)) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c * 1000; // Convert km to meters
  };

  const handleSearchChange = async (e) => {
    const query = e.target.value.toLowerCase();
    console.log(query);
    // Filter shops based on query
    if(query==''){
      seStores(filteredShops);
      return;
    }

    const filtered = stores.filter(store =>
      store.name.toLowerCase().includes(query)
    );
 
    seStores(filtered);
  }

  const openonMap = (shopID) => {
    console.log('hgb');
    const shop = filteredShops.filter((shop) => shop.id === shopID);
    console.log(filteredShops);
    const { lat, lon } = shop[0].location;
    window.open(`https://www.google.com/maps/dir/?api=1&destination=${lat},${lon}`, "_blank");
  }

  function formatDistance(distanceInMeters) {
    return distanceInMeters >= 1000
      ? `${(distanceInMeters / 1000).toFixed(1)} km`
      : `${Math.round(distanceInMeters)} m`;
  }

  useEffect(() => {
    setTempShop('11ed64c4-c893-4ef3-9930-25c9af02e842')
    setAccessToken(sessionStorage.getItem('accessToken'));
    if (navigator.geolocation) {

      navigator.geolocation.getCurrentPosition(
        (position) => {
          const lat = position.coords.latitude;
          const lon = position.coords.longitude;
          setCurrentLat(lat);  // Update state with latitude
          setCurrentLon(lon);  // Update state with longitude

        },
        (error) => {
          console.error("Error getting location:", error);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }

  }, []);

  useEffect(() => {
    if (currentLon && currentLat) {
      checkTokenExpiration();
      fetchStores();
    }
  }, [currentLon, currentLat]);

  const fetchStores = async () => {
    try {
      // const response = await axios.get(`${apiUrl}/shops/getshops?limit=20&page=1`, {
      //   headers: {
      //     'Authorization': `Bearer ${accessToken}`,
      //     'accept': 'application/json',
      //     'env': environment,
      //   },
      // });

      // let storesData = response.data.data;

      // const sortStoresByDistance = (storesData, currentLat, currentLon) => {
      //   // First, calculate the distance for each store
      //   const storesWithDistance = storesData.map((store) => {
      //     const lat = parseFloat(store.location.lat);
      //     const lon = parseFloat(store.location.lon);

      //     // Calculate the distance between current location and the store's location
      //     const distanceInKm = calculateDistance(currentLat, currentLon, lat, lon);
      //     const formattedDistance = formatDistance(distanceInKm);  // format the distance (e.g., 2.3 km)

      //     // Add the distance to the store object
      //     return { ...store, distance: formattedDistance, distanceInKm };  // Include raw distanceInKm for sorting
      //   });

      //   // Then, sort the stores based on the distanceInKm (which is the raw distance)
      //   storesWithDistance.sort((a, b) => a.distanceInKm - b.distanceInKm);  // Sorting by distance in ascending order

      //   // After sorting, return the stores with the calculated distance
      //   return storesWithDistance;
      // };

      // const sortedStores = sortStoresByDistance(storesData, currentLat, currentLon);
      // setFilteredShops(sortedStores);
      // seStores(sortedStores);
   
      let fetchedStores=await fetchStoresUtils();
      setFilteredShops(fetchedStores);
      seStores(fetchedStores);
    } catch (error) {
      console.error("Error fetching stores:", error);
      setShops([]);  // Empty the shops data or set an error state
      setFilteredShops([]);
    } finally {
      setLoading(false);
      // Set loading to false after data is fetched or error occurred
    }
  }

  return (
    <div className="h-screen font-poppins">

      <div className="flex flex-col px-7 h-1/2">
        <div className="flex items-center justify-between h-20">
          <img src={leftArrow} alt="" className="h-9 w-9" onClick={() => {   navigate("/products", { state: { stores: stores[0].id } });}} />
          <h1 className="text-lightBlack font-bold text-xl"></h1>
          <img src={userIcon} alt="" className="h-9 w-9 buttonColor" onClick={() => { navigate(`/settings`) }} />
        </div>
        <div className="flex-1 ">
          <MapContainer className="rounded-lg" center={[16.893746, 77.438584]} zoom={5} style={{ height: "100%", width: "100%" }}>
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            {stores.map((store) => (
              <Marker key={store.id} position={[store.location.lat, store.location.lon]} icon={customIcon} >
                <Popup>
                  <div style={{ textAlign: "center" }} className="flex flex-col items-center">
                    <img src={locationIcon} alt="Store Icon" width="30" height="30" />
                    <br />
                    <strong>{store.name}</strong>
                    <br />
                    <button
                      onClick={() => openNavigation(store.location.lat, store.location.lon)}
                      style={{
                        marginTop: "8px",
                        padding: "6px 12px",
                        border: "none",
                        backgroundColor: "#007bff",
                        color: "#fff",
                        borderRadius: "5px",
                        cursor: "pointer",
                      }}
                    >
                      Go to Store
                    </button>
                  </div>
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>
      </div>

      <div className="h-1/2 p-5 z-3 relative">
        <div className="flex flex-col w-full gap-4 relative fixed z-2 h-[25%]">
          <div className="flex justify-between items-center">
            <strong className="text-xl font-bold">Select a store</strong>
          </div>

          <div className="flex items-center justify-center">
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Search"
                onChange={handleSearchChange}
                className="w-full font-semibold py-3 px-5 border-2  border-buttonColor outline-none text-left rounded-full focus:ring-2 focus:ring-green-500 transition-all"
              />
              <img
                src={searchicon}
                alt="Search"
                className="absolute right-4 top-1/2 transform -translate-y-1/2 w-6 h-6"
              />
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-3 z-1 overflow-y-scroll h-[70%] mt-5">
          {loading ? (
            <div className="flex flex-1 items-center justify-center">
              <div className="loader border-t-4 border-buttonColor rounded-full w-12 h-12 animate-spin"></div>
            </div>
          ) : (
            stores.map((shop) => {
              return (
                <div key={shop.id} onClick={() => { openonMap(shop.id) }} className="bg-gray-100 rounded-lg px-4 py-2 flex justify-between items-center border-b mt-2">
                  <div className="flex gap-2 items-center">
                    <img src={locationIcon} alt="" className="h-5 w-4" />
                    <div className="flex flex-col">
                      <strong className="text-buttonColor text-lg font-semibold">{shop.name}</strong>
                    </div>
                  </div>

                  <div className="flex flex-col items-end gap-2">
                    <span
                      className={`rounded-md px-2 py-1 font-semibold text-white ${shop.status === "open" ? "bg-buttonColor" : "bg-yellow-500"
                        }`}
                    >
                      {shop.status === "open" ? "Open" : "Coming Soon"}
                    </span>
                    <span className="text-lg font-semibold">{shop.distance}</span>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}

export default Stores;
