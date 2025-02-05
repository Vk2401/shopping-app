import React,{useState,useEffect} from "react";
import axios from "axios";
import { useLocation } from '../context/locationContext.js';

const Stores = ()=>{
      const { location, setLocation, gpsEnabled, setGpsEnabled,accessToken,setaccessToken,refreshToken,setrefreshToken,user,setUser } = useLocation();
    
    useEffect(()=>{
        console.log(user);
        console.log(accessToken);
        console.log(refreshToken);
        // const response = await axios.post('https://devapi-tanlux.storetech.ai/auth/customer-login', loginData, {
        //     headers: {
        //       'accept': 'application/json',
        //       'Content-Type': 'application/json',
        //     },
        //   });
    },[]);
    return(
        <div>
            Stores
        </div>
    )
}

export default Stores;