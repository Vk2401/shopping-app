import React, { useEffect, useState } from "react";
import arrow from '../assets/images/arrow-circle-left_solid.png';
import Userpic from '../assets/images/Userpic.png';
import { ReactComponent as LeftArrow } from "../assets/images/arrow-circle-left_solid.svg"
import { ReactComponent as UserIcon } from '../assets/images/awesome-user.svg';
import door from '../assets/images/no-door.png';
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.js";
import axios from "axios";

const SettingScreen = () => {
    const { isAuthenticated, logout } = useAuth();
    const [showPopup, setShowPopup] = useState(false);
    const navigate = useNavigate();
    const [user, setUser] = useState([]);

    const userLogout = async (orderReference) => {
        try {
            const response = await axios.get(`https://devapi-tanlux.storetech.ai/v1/bankid/logout?orderRef=${orderReference}`, {
                headers: {
                    'Accept': 'application/json',
                },
            });
        }
        catch (err) {
            console.log(err);
        }

    }

    const handleLogout = (text) => {
        if (text == 'yes') {
            let orderReference = localStorage.getItem('orderReferance');
            if (orderReference != null) {
                userLogout(orderReference);
            }
            localStorage.removeItem('cart');
            localStorage.removeItem('total');
            localStorage.removeItem('storeID');
            localStorage.removeItem('orderReferance');

            logout();
            navigate('/');
        }
        setShowPopup(false);
    }

    useEffect(() => {
        if (!isAuthenticated) {
            navigate("/");
        }
        let storeUser = JSON.parse(localStorage.getItem('user'));
        setUser(storeUser);
    }, []);
    return (
        <div>
            <div className="flex flex-col px-6 h-screen font-poppins">
                <div className="flex items-center justify-center relative py-8">
                    <LeftArrow onClick={() => { navigate(`/products`) }} className="absolute h-10 w-10 left-0 text-buttonColor" />
                    <strong className="font-bold text-2xl">Settings</strong>
                </div>

                <div className="flex flex-col justify-around h-full">
                    <div className="flex flex-col">
                        <div className="flex flex-col items-center justify-center gap-3 py-5 bg-ligghtGray rounded-md">
                            <img src={Userpic} alt="" className="rounded-full" />
                            <strong className="text-2xl ">{user.login_name}</strong>
                        </div>

                        <div className="flex flex-col gap-5 mt-10">
                            <div className="flex items-center justify-start gap-5 py-3 border-b-2 border-gray-300" onClick={() => { navigate(`/profile`) }}>
                                <UserIcon className="h-8 w-8 text-buttonColor rounded-full" />
                                <h1 className="font-bold text-xl text-lightBlack">Profile</h1>
                            </div>

                            <div className="flex items-center justify-start gap-5 py-3 border-b-2 border-gray-300" onClick={() => { navigate('/history') }}>
                                <UserIcon className="h-8 w-8 text-buttonColor rounded-full" />
                                <h1 className="font-bold text-xl text-lightBlack">History</h1>
                            </div>

                            <div className="flex items-center justify-start gap-5 py-3 border-b-2 border-gray-300">
                                <UserIcon className="h-8 w-8 text-buttonColor rounded-full" />
                                <h1 className="font-bold text-xl text-lightBlack">Call Store Support</h1>
                            </div>

                            <div className="flex items-center justify-start gap-5 py-3 border-b-2 border-gray-300">
                                <UserIcon className="h-8 w-8 text-buttonColor rounded-full" />
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