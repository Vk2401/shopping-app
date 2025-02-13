import React, { useEffect } from "react";
import thankyou from '../utils/images/Thankyouforshopping.png';
import success from '../utils/images/checklist.png';
import reciptIcon from '../utils/images/reciptIcon.png';
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.js";

const PaymentSuccess = () => {
    const navigate = useNavigate();
    const { isAuthenticated, logout } = useAuth();

    useEffect(() => {
        if (!isAuthenticated) {
            console.log('lok');
            navigate("/");
        }
    }, []);
    return (
        <div className="flex flex-col justify-center items-center h-screen">
            <div className="h-1/2 flex flex-col items-center justify-center gap-5">
                <img src={success} alt="" className="h-24 w-24" />
                <strong className="text-xl font-semibold">Payment Successful!</strong>
            </div>

            <div className="h-1/2 flex flex-col gap-10 items-center mb-24">
                <img src={thankyou} alt="" className="w-[325px] h-[250px]" />

                <div className="flex flex-col gap-5 items-center">
                    <button className="bg-ligghtGray text-black text-center font-semibold text-xl rounded-full w-[300px] py-3 flex items-center justify-center gap-3"><img src={reciptIcon} alt="" className="h-7 w-7" />  Receipt</button>
                    <button onClick={() => { navigate('/products') }} className="bg-buttonColor text-lightWhite text-center rounded-full font-bold text-lg tracking-wider w-[300px] py-3">Done</button>
                </div>
            </div>
        </div>
    );
}
export default PaymentSuccess;