import { div } from "framer-motion/client";
import react, { useEffect, useState } from "react";
import { useLocation,useNavigate } from 'react-router-dom';
import { useCart } from "../context/CartContext.js";
import leftArrow from '../utils/images/leftArrow.png';

const CheckoutScreen=()=>{
    const location = useLocation();
    const navigate = useNavigate();

    const selectedProducts = location.state?.selectedProducts || [];
    const { cart,total, removeFromCart, clearCart } = useCart();
    console.log(cart);

      const handleCheckout = () => {
        // Passing selectedProducts to checkout page using `navigate`
        navigate('/payment', { state: { selectedProducts } });
      };

    return(
       <div className="h-screen flex flex-col px-6 font-poppins relative">
         <div className="flex items-center justify-center relative h-10 py-8">
            <img  onClick={() => navigate('/products')}  src={leftArrow} alt="" className="absolute left-0 h-7 w-7" />
            <h1 className="text-lightBlack font-bold text-xl">Checkout</h1>
         </div>

         <div className="mt-5">
         {cart?.map((product) => (
           
            <div
            key={product._id}
            className="flex justify-between items-center border-2 border-gray-300 rounded-lg px-4 py-2 mb-4"
            >
            <div className="flex items-center gap-2">
                {/* Display product image */}
                <img
                src={product.picture || "default-image.jpg"} // Use a default image if no picture exists
                alt={product.title}
                className="w-14 h-16 object-cover"
                />

                <div className="flex flex-col">
                {/* Display product name */}
                <span className="font-bold text-black">{product.title}</span>
                {/* Display quantity */}
                <span className="text-lightBlack">Qty: {product.quantity}</span>
                {/* Display price */}
                <span className="text-buttonColor font-semibold text-lg">
                  ${product.isDiscount 
                    ? ((product.price - (product.price * product.discount) / 100) * product.quantity).toFixed(2)
                    : (product.price * product.quantity).toFixed(2)}
                </span>

                </div>
            </div>

            {/* Display quantity in another section */}
            <div className="flex font-semibold items-center justify-center gap-2 border-2 border-gray-400 rounded-full px-8 py-2">
                <span>x</span>
                <span>{product.quantity}</span>
            </div>
            </div>
            ))}
         </div>

         <div className="flex justify-center w-full items-center absolute bottom-10  right-0">
           <button  onClick={handleCheckout} className="bg-buttonColor text-white text-center rounded-full px-10 py-3">Pay - {total} Rs</button>
         </div>
       </div>
    );
}

export default CheckoutScreen;