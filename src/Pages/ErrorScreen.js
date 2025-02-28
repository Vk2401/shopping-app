import React, { useEffect } from "react";
import bg from '../assets/images/desktop-bg.png';
import { useAuth } from "../context/AuthContext.js";
import { useNavigate } from "react-router-dom";
import image from '../assets/images/errrPageimage.png';
import userIcon from '../assets/images/FontAwosemUser.png';
import leftArrow from '../assets/images/leftArrow.png';

const ErrorScreen = () => {
    const { isAuthenticated, logout } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (!isAuthenticated) {
            console.log('lok');
            navigate("/");
        }
    }, []);

    return (
        <div className="flex flex-col h-screen font-poppins">
            <div className="bg-buttonColor h-20 border flex justify-between items-center px-5 rounded-b-[]">
                <img onClick={() => { navigate('/stores') }} src={leftArrow} alt="" className="h-10 w-10 p-1 bg-white rounded-full" />
                <img onClick={() => navigate('/settings')} src={userIcon} alt="" className=" h-10 w-10 p-2 bg-white rounded-full" />
            </div>

            <div className="flex-1 flex flex-col items-center w-full px-10 justify-center relative mb-10">
                <div className="flex flex-col justify-center items-center gap-5 mb-10">
                    <img src={image} alt="" className="h-80 w-80 mb-6" />
                    <strong className="text-redColor text-2xl font-bold">Something went Wrong!</strong>
                    <h2 className="text-xl text-center font-semibold text-black">We were not able verify your <br /> Bank ID Account. Please Try Again.</h2>
                </div>

                <button className="text-white absolute bottom-10 bg-redColor text-center w-[260px] py-5 rounded-full font-bold text-lg tracking-wider">Retry</button>
            </div>
        </div>
    )
}

export default ErrorScreen;