import  {React,createContext,useContext,useEffect,useState} from 'react';
const LocationContext=createContext();

const LocationProvider=({children})=>{
    const [location,setLocation]=useState(null);
    const [gpsEnabled, setGpsEnabled] = useState(true); 
    const [accessToken,setaccessToken]=useState('');
    const [refreshToken,setrefreshToken]=useState('');
    const [user,setUser]=useState(null);

    return(
        <LocationContext.Provider value={{user,setUser,location,setLocation,gpsEnabled,setGpsEnabled,setaccessToken,accessToken,setrefreshToken,refreshToken}}>
            {children}
        </LocationContext.Provider>
    )

}

export const useLocation=()=>useContext(LocationContext);
export default LocationProvider;