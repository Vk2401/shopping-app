import  {React,createContext,useContext,useEffect,useState} from 'react';

const LocationContext=createContext();

const LocationProvider=({children})=>{
    const [location,setLocation]=useState(null);
     const [gpsEnabled, setGpsEnabled] = useState(true); 

    return(
        <LocationContext.Provider value={{location,setLocation,gpsEnabled,setGpsEnabled}}>
            {children}
        </LocationContext.Provider>
    )

}

export const useLocation=()=>useContext(LocationContext);
export default LocationProvider;