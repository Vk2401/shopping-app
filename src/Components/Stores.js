import React,{useState,useEffect} from "react";
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import locationIcon from '../utils/images/location-sharp.png'
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import axios from "axios";
import { useLocation } from '../context/locationContext.js';
import { useInfo } from '../context/infoContext.js';
import searchicon from '../utils/images/search.png';
import { useAuth } from "../context/AuthContext.js";
import { useNavigate } from "react-router-dom";
import userIcon from '../utils/images/FontAwosemUser.png';

const Stores = ()=>{
      const navigate=useNavigate();
      const { isAuthenticated, logout } = useAuth();  
      const {apiBase,env}=useInfo();
      const [accessToken,setAccessToken]=useState();
      const [isExpanded, setIsExpanded] = useState(true);
      const [shops,setShops]=useState([]);
      const [userLocation, setUserLocation] = useState(null);
      const { location, setLocation, gpsEnabled, setGpsEnabled,refreshToken,setrefreshToken,user,setUser } = useLocation();
      const stores = [
        { id: 1, name: "Store A", lat: 40.7128, lng: -74.0060 },
        { id: 2, name: "Store B", lat: 34.0522, lng: -118.2437 }
      ];

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

    }
    useEffect(()=>{
      console.log('huigui');

        if(!isAuthenticated){
            navigate('/');
        }
        
        setAccessToken(sessionStorage.getItem('accessToken'));
        // if (navigator.geolocation) {
        //     navigator.geolocation.getCurrentPosition(
        //       (position) => {
        //         setUserLocation({
        //           lat: position.coords.latitude,
        //           lon: position.coords.longitude,
        //         });
        //       },
        //       (error) => {
        //         console.error("Error getting location:", error);
        //       }
        //     );
        //   } else {
        //     console.error("Geolocation is not supported by this browser.");
        //   }
    },[]);


    useEffect(()=>{
        const fetchStores=async ()=>{
            const response = await axios.get(`${apiBase}/custom/shops/getshops?limit=10&page=1` , {
                headers: {
                  'Authorization': `Bearer ${accessToken}`,
                  'accept': 'application/json',
                  'env': env,
                },
              });
           
              sortShopsByDistance(response.data.data, (sortedShops) => {
                setShops(sortedShops); // Update state with sorted shops
              });

        }
        fetchStores();

    },[]);

    return(
        <div className="h-screen font-poppins">
            <div className="flex flex-col px-7 h-1/2">
                <div className="flex items-center justify-center relative py-7">
                <img src={userIcon} alt="" className="absolute right-0 h-8 w-8" onClick={()=>{navigate('/settings')}}/>
                <h1 className="text-lightBlack font-bold text-xl">Stores</h1>
                </div>

                <div className="h-full">
                    <MapContainer center={[40.7128, -74.0060]} zoom={5} style={{ height: "100%", width: "100%" }}>
                        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                        {stores.map((store) => (
                        <Marker key={store.id} position={[store.lat, store.lng]} icon={customIcon}>
                            <Popup>
                            <div style={{ textAlign: "center" }}>
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
                        ))}
                    </MapContainer>
                </div>
            </div>

            <div className="h-1/2 p-5 z-3 relative">
                <div className="flex flex-col w-full gap-4 relative top-0 fiexed z-2 h-[30%]">
                    <div className="flex justify-between items-center">
                        <strong>Select a store</strong>
                        <img src="" alt="" />
                    </div>

                    <div className="flex items-center justify-center">
                        <div className="relative w-full">
                            <input 
                            type="text" 
                            placeholder="Search" 
                            onChange={handleSearchChange} 
                            className="w-full font-semibold py-3 px-5 border-2 border-orange-400 outline-none text-left rounded-full focus:ring-2 focus:ring-orange-500 transition-all"
                            />
                            <img 
                            src={searchicon} 
                            alt="Search" 
                            className="absolute right-4 top-1/2 transform -translate-y-1/2 w-6 h-6"
                            />
                        </div>
                    </div>
                </div>

                <div className="flex flex-col z-1 overflow-y-scroll h-[70%]">
                     {shops.map((shop) => {
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
                            <div key={shop.id} className="flex justify-between items-center border-b py-3">
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
                                        className={`rounded-md px-2 py-1 font-semibold text-white ${
                                        shop.status === "open" ? "bg-green-500" : "bg-yellow-500"
                                        }`}
                                    >
                                        {shop.status}
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