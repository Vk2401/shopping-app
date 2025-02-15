import React, { useEffect, useState } from "react";
import arrow from '../utils/images/arrow-circle-left_solid.png';
import FontAwosemUser from '../utils/images/FontAwosemUser.png';
import Userpic from '../utils/images/Userpic.png';
import { div } from "framer-motion/client";
import door from '../utils/images/no-door.png';
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.js";

const SettingScreen = () => {
    const { isAuthenticated, logout } = useAuth();
    const [showPopup, setShowPopup] = useState(false);
    const navigate = useNavigate();
    

    const handleLogout = (text) => {
        if (text == 'yes') {
            localStorage.removeItem('cart');
            localStorage.removeItem('total');
            localStorage.removeItem('authToken');
            localStorage.removeItem('storeID');

            logout();
            navigate('/');
        }
        setShowPopup(false);
    }

    useEffect(() => {
        if (!isAuthenticated) {
            navigate("/");
        }
    }, []);
    return (
        <div>
            <div className="flex flex-col px-6 h-screen font-poppins">
                <div className="flex items-center justify-center relative py-8">
                    <img src={arrow} alt="" onClick={() => { navigate(`/products`) }} className="absolute h-10 w-10 left-0" />
                    <strong className="font-bold text-2xl">Settings</strong>
                </div>

                <div className="flex flex-col justify-around h-full">
                    <div className="flex flex-col">
                        <div className="flex flex-col items-center justify-center gap-3 py-5 bg-ligghtGray rounded-md">
                            <img src={Userpic} alt="" className="rounded-full" />
                            <strong className="text-2xl ">John smith</strong>
                        </div>

                        <div className="flex flex-col gap-5 mt-10">
                            <div className="flex items-center justify-start gap-5 py-3 border-b-2 border-gray-300" onClick={() => { navigate(`/profile`) }}>
                                <img src={FontAwosemUser} alt="" className="h-8 w-8 bg-ligghtGray rounded-full" />
                                <h1 className="font-bold text-xl text-lightBlack">Profile</h1>
                            </div>

                            <div className="flex items-center justify-start gap-5 py-3 border-b-2 border-gray-300" onClick={() => { navigate('/history') }}>
                                <img src={FontAwosemUser} alt="" className="h-8 w-8 bg-ligghtGray rounded-full" />
                                <h1 className="font-bold text-xl text-lightBlack">History</h1>
                            </div>

                            <div className="flex items-center justify-start gap-5 py-3 border-b-2 border-gray-300">
                                <img src={FontAwosemUser} alt="" className="h-8 w-8 bg-ligghtGray rounded-full" />
                                <h1 className="font-bold text-xl text-lightBlack">Call Store Support</h1>
                            </div>

                            <div className="flex items-center justify-start gap-5 py-3 border-b-2 border-gray-300">
                                <img src={FontAwosemUser} alt="" className="h-8 w-8 bg-ligghtGray rounded-full" />
                                <h1 className="font-bold text-xl text-lightBlack">Help</h1>
                            </div>

                        </div>
                    </div>

                    <div className="flex items-center justify-center mt-10">
                        <button onClick={() => setShowPopup(true)} className="bg-buttonColor text-white text-center rounded-full w-[250px] py-3">Log out</button>
                    </div>
                </div>
            </div>
            {showPopup && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 px-5 pb-5 font-poppins">
                    <div className="flex flex-col items-center justify-center bg-white rounded-lg w-[300px] h-[200px] gap-5">
                        <div className="flex items-center justify-center flex-col gap-3 w-full">
                            <img src={door} alt="" className="w-10 h-10" />
                            <strong className="tracking-wider font-semibold">Do you wish to log out?</strong>
                        </div>

                        <div className="flex items-center justify-center gap-5 w-full">
                            <button onClick={() => handleLogout('no')} className="text-black text-lg font-semibold bg-gray-200 text-center rounded-full px-12 py-2">No</button>
                            <button onClick={() => handleLogout('yes')} className="text-white text-lg font-semibold hover:bg-red-500 bg-redColor text-center rounded-full px-12 py-2">Yes</button>
                        </div>
                    </div>
                </div>
            )}
        </div>

    );
}

export default SettingScreen;