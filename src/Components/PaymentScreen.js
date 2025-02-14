import { div } from "framer-motion/client";
import react, { useEffect } from "react";
import visaImage from '../utils/images/visa.png';
import cardImage from '../utils/images/card.png';
import gPay from '../utils/images/Google-Pay-hero.webp'
import closeIcon from '../utils/images/ios-close-circle.png';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from "../context/AuthContext.js";
import leftArrow from '../utils/images/leftArrow.png';

const PaymentScreen = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { logout } = useAuth();
    const total = 0;
    const selectedProducts = location.state?.selectedProducts || [];


    // const totalPrice = cart.reduce((total, product) => {
    //     return total + (product.price * product.quantity);
    //   }, 0);

    const handleCheckout = () => {
        // Passing selectedProducts to checkout page using `navigate`
        navigate('/PaymentSuccess');
    };

    return (
        <div className="flex flex-col px-5 font-poppins h-screen">
            <div className="flex items-center justify-between py-7">
                <img src={leftArrow} alt="" className="h-8 w-8" />
                <h1 className="text-black font-bold text-xl">Payment</h1>
                <img src={closeIcon} alt="" className=" h-8 w-8" />
            </div>

            <div className="flex flex-col justify-between  h-full">
                <div className="flex flex-col gap-5">
                    <div className="flex flex-col gap-5">
                        <p className="font-semibold">Choose Payment</p>
                        <div className="flex justify-center gap-10 items-center">
                            <img src={gPay} alt="" className="h-36 w-36 border-2 border-gray-200 rounded-lg" />
                            {/* <GooglePayUPI /> */}

                            <img src={cardImage} alt="" className="h-36 w-36 border-2 border-gray-200 rounded-lg p-5" />
                        </div>
                    </div>

                    <div className="flex flex-col gap-4">
                        <p className="font-semibold">Saved Cards</p>

                        <div className="flex justify-between border-2 border-gray-200 rounded-lg py-3 px-3">
                            <div className="flex flex-col">
                                <span className="font-bold ">**** **** **** 1234</span>
                                <span className="text-lightBlack font-semibold">Expires 11/2025</span>
                            </div>

                            <img src={visaImage} alt="" className="h-10 w-10" />
                        </div>

                        <button className="border-2 border-gray-200 rounded-lg justify-center items-center text-center py-2">
                            <span className="p-3 border-black rounded-md">+</span>New Card
                        </button>
                    </div>
                </div>

                <div className="flex flex-col gap-5 mb-10">
                    <div className="flex flex-col bg-gray-100 rounded-lg p-3">
                        <div className="flex flex-col gap-2 border-b-2 border-black-100">
                            <div className="flex items-center justify-between py-2">
                                <span className="font-bold">Sub Total</span>
                                <span className="font-bold"> Rs</span>
                            </div>

                            <div className="flex items-center justify-between py-2">
                                <span className="font-semibold">Discount</span>
                                <span className="text-orange-500 font-semibold">-22 kr</span>
                            </div>
                        </div>
                        <div className="flex justify-between items-center py-4">
                            <strong className="font-bold text-xl">Total</strong>
                            <strong className="font-bold text-xl">Rs</strong>
                        </div>
                    </div>

                    <button onClick={handleCheckout} className="bg-buttonColor text-white text-center rounded-full py-3 px-8 font-semibold">Continue</button>
                </div>
            </div>
        </div>
    );
}

export default PaymentScreen;