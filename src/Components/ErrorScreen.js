import React,{useEffect} from "react";
import bg from '../utils/images/desktop-bg.png';
import { useAuth } from "../context/AuthContext.js";
import { useNavigate } from "react-router-dom";

const ErrorScreen=()=>{
    const { isAuthenticated, logout } = useAuth();
    const navigate=useNavigate();
    
     useEffect(()=>{
                if(!isAuthenticated){
                    console.log('lok');
                    navigate("/");
                  }
            },[]);
    
    return(
        <div className="flex flex-col h-screen">
            <div className="bg-buttonColor">
                <img src={bg} alt="" />
            </div>

            <div className="flex flex-col justify-center items-center">
                <img src="" alt="" />
                <h1 className="text-redColor">Something went Wrong!</h1>
                <h2 className="">We were not able verify your Bank ID Account. Please Try Again.</h2>
            </div>

            <button className="bg-redColor rounded-md text-center">Retry</button>
        </div>
    )
}

export default ErrorScreen;