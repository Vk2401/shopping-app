import React, { useState, useEffect } from "react";

import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";
import locationIcon from '../assets/images/location-sharp.png';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import axios from "axios";
import { useAuth } from "../context/AuthContext.js";
import { useNavigate } from "react-router-dom";
import { ReactComponent as LeftArrow } from "../assets/images/arrow-circle-left_solid.svg"
import { ReactComponent as UserIcon } from '../assets/images/awesome-user.svg';
import { ReactComponent as SearchIcon } from '../assets/images/search.svg';
import { fetchStoresUtils } from '../utils/helpers.js';

const Stores = () => {
  const navigate = useNavigate();
  const [shops, setShops] = useState([]);
  const [stores, setStores] = useState([]);
  const { checkTokenExpiration } = useAuth();
  const [accessToken, setAccessToken] = useState();
  const [filteredShops, setFilteredShops] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state
  const apiUrl = process.env.REACT_APP_API_URL;
  const environment = process.env.REACT_APP_ENVIRONMENT;
  const [currentLat, setCurrentLat] = useState(null);
  const [currentLon, setCurrentLon] = useState(null);
  const [tempShop, setTempShop] = useState('');
  const mapContainerStyle = {
    width: "100%",
    height: "100%",
  };

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

  const handleSearchChange = async (e) => {
    setLoading(true);
    try {
      const query = e.target.value.toLowerCase();
      if (query === '') {
        await fetchStores(); // Ensure fetchStores is awaited
        return;
      }
      const filtered = stores.filter(store =>
        store.name.toLowerCase().includes(query)
      );
      setLoading(false);
      setStores(filtered);
      setFilteredShops(filtered);
    } catch (error) {
      console.error("Error in handleSearchChange:", error);
    } finally {

    }
  };
  
  const openonMap = (shopID) => {
    console.log('hgb');
    const shop = filteredShops.filter((shop) => shop.id === shopID);
    console.log(filteredShops);
    const { lat, lon } = shop[0].location;
    window.open(`https://www.google.com/maps/dir/?api=1&destination=${lat},${lon}`, "_blank");
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
      let fetchedStores = await fetchStoresUtils();
      setFilteredShops(fetchedStores);
      setStores(fetchedStores);
    } catch (error) {
      console.error("Error fetching stores:", error);
      setShops([]);
      setFilteredShops([]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="h-screen font-poppins">

      <div className="flex flex-col px-7 h-1/2">
        <div className="flex items-center justify-between h-20">
          <LeftArrow onClick={() => { navigate("/products", { state: { stores: stores[0].id } }); }} className="h-10 w-10 text-buttonColor" />
          <h1 className="text-lightBlack font-bold text-xl">Stores</h1>
          <UserIcon onClick={() => { navigate(`/settings`) }} className="h-10 w-10 text-buttonColor" />
        </div>
        <div className="flex-1 ">
          {/* <MapContainer className="rounded-lg" center={[16.893746, 77.438584]} zoom={5} style={{ height: "100%", width: "100%" }}>
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
          </MapContainer> */}

<GoogleMap mapContainerStyle={mapContainerStyle} zoom={5} center={[16.893746, 77.438584]}>
      {stores.map((store) => (
        <Marker
          key={store.id}
          position={{ lat: parseFloat(store.location.lat), lng: parseFloat(store.location.lon) }}
          onClick={() => window.open(`https://www.google.com/maps?q=${store.location.lat},${store.location.lon}`, "_blank")}
        />
      ))}
    </GoogleMap>


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
              <SearchIcon onClick={() => navigate(`/settings`)} className="absolute right-4 top-1/2 transform -translate-y-1/2 w-6 h-6 text-buttonColor" />
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-3 z-1 overflow-y-scroll h-[70%] mt-5">
          {loading ? (
            <div className="flex flex-1 items-center justify-center">
              <div className="loader border-t-4 border-buttonColor rounded-full w-12 h-12 animate-spin"></div>
            </div>
          ) : (
            stores.map((shop,index) => {
              return (
                <div key={index} onClick={() => { openonMap(shop.id) }} className="bg-gray-100 rounded-lg px-4 py-2 flex justify-between items-center border-b mt-2">
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
