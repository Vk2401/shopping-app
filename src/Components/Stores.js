import React, { useState, useEffect,useRouter } from "react";
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import locationIcon from '../utils/images/location-sharp.png'
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import axios from "axios";
import searchicon from '../utils/images/search.png';
import { useAuth } from "../context/AuthContext.js";
import { useNavigate } from "react-router-dom";
import userIcon from '../utils/images/FontAwosemUser.png';
import leftArrow from '../utils/images/leftArrow.png';

const Stores = () => {

  const navigate = useNavigate();
  const [shops, setShops] = useState([]);
  const [stores, seStores] = useState([]);
  const { isAuthenticated } = useAuth();
  const [accessToken, setAccessToken] = useState();
  const [userLocation, setUserLocation] = useState(null);
  const [filteredShops, setFilteredShops] = useState([]);
  const apiUrl = process.env.REACT_APP_API_URL
  const environment = process.env.REACT_APP_ENVIRONMENT
  const customIcon = L.icon({
    iconUrl: locationIcon,
    iconSize: [25, 28], // Adjust size as needed
    iconAnchor: [16, 32], // Positioning of the icon
    popupAnchor: [0, -32], // Positioning of the popup
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

  const sortShopsByDistance = (shops, callback) => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const userLat = position.coords.latitude;
          const userLon = position.coords.longitude;


          const sortedShops = shops
            .map((shop) => ({
              ...shop,
              distance: calculateDistance(
                userLat, userLon,
                parseFloat(shop.location.lat),
                parseFloat(shop.location.lon)
              )
            }))
            .sort((a, b) => a.distance - b.distance);

          callback(sortedShops); // Return sorted shops via callback
        },
        (error) => {
          console.error("Error getting location:", error);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  };

  const handleSearchChange = async (e) => {
    const query = e.target.value.toLowerCase();

    // Filter shops based on query
    const filtered = shops.filter(shop =>
      shop.name.toLowerCase().includes(query)
    );

    setFilteredShops(filtered);
  }

  const openonMap=(shopID)=>{
   
    const shop=filteredShops.filter((shop)=>shop.id===shopID)
 
    const { lat, lon } = shop[0].location;
    window.open(`https://www.google.com/maps/dir/?api=1&destination=${lat},${lon}`, "_blank");
  }
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/');
    }

    setAccessToken(sessionStorage.getItem('accessToken'));
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lon: position.coords.longitude,
          });
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
    const fetchStores = async () => {
      const response = await axios.get(`${apiUrl}/custom/shops/getshops?limit=10&page=1`, {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'accept': 'application/json',
          'env': environment,
        },
      });

      sortShopsByDistance(response.data.data, (sortedShops) => {

        let storesData = sortedShops.map((shop, index) => ({
          id: index + 1,  // Generating a sequential ID
          name: shop.name,
          lat: parseFloat(shop.location.lat),  // Converting lat to number
          lng: parseFloat(shop.location.lon)   // Converting lon to number
        }));

        seStores(storesData);
        setShops(sortedShops); // Update state with sorted shops
        setFilteredShops(sortedShops);
      });


    }
    fetchStores();

  }, []);

  return (
    <div className="h-screen font-poppins">
      <div className="flex flex-col px-7 h-1/2">
        <div className="flex items-center justify-between h-20">
          <img src={leftArrow} alt="" className="h-9 w-9" onClick={() => { navigate(`/products`) }} />
            <h1 className="text-lightBlack font-bold text-xl"></h1>
          <img src={userIcon} alt="" className="h-9 w-9" onClick={() => { navigate(`/settings`) }} />
        </div>
        <div className="flex-1 ">
          <MapContainer className="rounded-lg" center={[16.893746, 77.438584]} zoom={5} style={{ height: "100%", width: "100%" }}>
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            {stores.map((store) => (

              <Marker  key={store.id} position={[store.lat, store.lng]} icon={customIcon} >
                <Popup>
                  <div  style={{ textAlign: "center" } }>
                    <img src={locationIcon} alt="Store Icon" width="30" height="30" />
                    <br />
                    <strong>{store.name}</strong>
                    <br />
                    <button
                      onClick={() => openNavigation(store.lat, store.lng)}
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

              // <Marker key={store.id} position={[store.lat, store.lng]} icon={customIcon}>
              //     <Popup>
              //     <div style={{ textAlign: "center" }}>
              //         <img src={locationIcon} alt="Store Icon" width="30" height="30" />
              //         <br />
              //         <strong>{store.name}</strong>
              //         <br />
              //         <button
              //         onClick={() => openNavigation(store.lat, store.lng)}
              //         style={{
              //             marginTop: "8px",
              //             padding: "6px 12px",
              //             border: "none",
              //             backgroundColor: "#007bff",
              //             color: "#fff",
              //             borderRadius: "5px",
              //             cursor: "pointer",
              //         }}
              //         >
              //         Go to Store
              //         </button>
              //     </div>
              //     </Popup>
              // </Marker>
            ))}
          </MapContainer>
        </div>
      </div>

      <div className="h-1/2 p-5 z-3 relative">
        <div className="flex flex-col w-full gap-4 relative fiexed z-2 h-[25%]">
          <div className="flex justify-between items-center">
            <strong className="text-xl font-bold">Select a store</strong>
            <img src="" alt="" />
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

        <div className="flex flex-col gap-3 z-1 overflow-y-scroll h-[70%]">
          {filteredShops.map((shop) => {
            const shopLat = parseFloat(shop.location.lat);
            const shopLon = parseFloat(shop.location.lon);

            // Calculate distance if user location is available
            const distance =
              userLocation && shopLat && shopLon
                ? formatDistance(
                  calculateDistance(userLocation.lat, userLocation.lon, shopLat, shopLon)
                )
                : "Calculating...";

            // Function declaration (hoisted)
            function formatDistance(distanceInMeters) {
              return distanceInMeters >= 1000
                ? `${(distanceInMeters / 1000).toFixed(1)} km`
                : `${Math.round(distanceInMeters)} m`;
            }

            return (
              <div key={shop.id} onClick={()=>{ openonMap(shop.id)}} className="bg-gray-100 rounded-lg px-4 py-2 flex justify-between items-center border-b">
                {/* Left side - Shop Name and Details */}
                <div className="flex gap-2 items-center">
                  <img src={locationIcon} alt="" className="h-5 w-4" />
                  <div className="flex flex-col">
                    <strong className="text-buttonColor text-lg font-semibold">{shop.name}</strong>
                    <span className="text-lightBlack"></span>
                  </div>
                </div>

                {/* Right side - Status and Distance */}
                <div className="flex flex-col items-end gap-2">
                  <span
                    className={`rounded-md px-2 py-1 font-semibold text-white ${shop.status === "open" ? "bg-buttonColor" : "bg-yellow-500"
                      }`}
                  >
                    {shop.status === "open" ? "Open" : "Coming Soon"}
                  </span>
                  <span className="text-lg font-semibold">{distance}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>

  )
}

export default Stores;