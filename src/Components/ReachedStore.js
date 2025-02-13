import React, { useEffect } from "react";
import locationReached from '../utils/images/locationReached.gif';
import backArrow from '../\/utils/images/arrow-circle-left_solid.png';
import { useAuth } from "../context/AuthContext.js";
import { useNavigate } from "react-router-dom";

const ReachedStore = () => {
    const navigate = useEffect();
    const { isAuthenticated, logout } = useAuth();

    useEffect(() => {
        if (!isAuthenticated) {
            navigate('/');
        }
    }, [])
    return (
        <div className="flex flex-col justify-between h-screen w-full font-poppins px-5">
            <div className="flex items-center justify-center py-4 relative">
                <img src={backArrow} alt="" className="h-8 w-8 absolute left-0 " />
                <h4 className="text-black font-bold text-lg text-center">Stores</h4>
            </div>

            <div className="text-lg font-semibold text-lightBlack flex flex-col items-center justify-center gap-5 h-2/3">
                <div className="flex flex-col gap-2">
                    <p className="">You've Reached the Store</p>
                    <h2 className="text-buttonColor text-xl font-bold">StoreTech</h2>
                    <h1 className="text-black text-4xl font-semibold">Arentorp</h1>
                </div>
                <img src={locationReached} alt="" className="h-[250px] w-300px" />
            </div>

            <div className="flex flex-col items-center justify-around  h-1/3">
                <div className="flex flex-col items-center justify-center">
                    <h1 className="text-black font-bold text-2xl"> <span className="text-buttonColor">34 mins 10</span> km</h1>
                    <p className="text-lightBlack font-semibold">You Journey was faster than expected.</p>
                </div>
                <button className="bg-buttonColor text-lightWhite text-center rounded-full w-[250px] py-3">Open Door</button>
            </div>
        </div>
    )
}

export default ReachedStore;