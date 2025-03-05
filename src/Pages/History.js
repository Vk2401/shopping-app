import React, { useEffect } from "react";
import rightArrow from '../assets/images/rightArrow.svg';
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.js";
import { ReactComponent as LeftArrow } from "../assets/images/arrow-circle-left_solid.svg"
import { ReactComponent as CloseIcon } from '../assets/images/close-circle.svg';
import { ReactComponent as RightArrow } from '../assets/images/rightArrow.svg';

const History = () => {
    const { isAuthenticated, logout } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (!isAuthenticated) {
            navigate('/');
        }
    }, [])

    return (
        <div className="flex flex-col px-6 h-screen font-poppins">
            <div className="flex items-center justify-between py-8">
                <LeftArrow onClick={() => navigate(`/stores`)} className="h-10 w-10 text-buttonColor" />
                <strong className="font-bold text-2xl">History</strong>
                <CloseIcon onClick={() => { navigate('/products') }} className="h-10 w-10 text-buttonColor" />
            </div>

            <div className="flex flex-col gap-3 f-full overflow-scroll">
                <div className="flex justify-between items-center bg-ligghtGray py-5 rounded-lg px-5">
                    <div className="flex flex-col items-start gap-1 tracking-wider">
                        <strong className="font-bold text-xl">Order Receipt <strong className="text-buttonColor"> #123455</strong></strong>
                        <span className="font-semibold text-lg text-lightBlack">Date:12-12-2024</span>
                    </div>
                    <RightArrow className="h-7 w-7 text-buttonColor" />
                </div>

                <div className="flex justify-between items-center bg-ligghtGray py-5 rounded-lg px-5">
                    <div className="flex flex-col items-start gap-1 tracking-wider">
                        <strong className="font-bold text-xl">Order Receipt <strong className="text-buttonColor"> #123455</strong></strong>
                        <span className="font-semibold text-lg text-lightBlack">Date:12-12-2024</span>
                    </div>
                    <RightArrow className="h-7 w-7 text-buttonColor" />
                </div>

                <div className="flex justify-between items-center bg-ligghtGray py-5 rounded-lg px-5">
                    <div className="flex flex-col items-start gap-1 tracking-wider">
                        <strong className="font-bold text-xl">Order Receipt <strong className="text-buttonColor"> #123455</strong></strong>
                        <span className="font-semibold text-lg text-lightBlack">Date:12-12-2024</span>
                    </div>
                    <RightArrow className="h-7 w-7 text-buttonColor" />
                </div>
            </div>
        </div>
    );
}

export default History;