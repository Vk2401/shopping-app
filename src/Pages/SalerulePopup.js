import { div } from "framer-motion/client";
import React, { useState, useEffect } from "react";
import discountImag from '../assets/images/discount.png';
import closeImage from '../assets/images/ios-close-circle.png';
import productDefaultimg from '../assets/images/grocery.png';

const SalerulePopup = () => {
    return (
        <div className="w-full max-h-[500px] bg-white">
            <div className="flex items-center justify-between">
                <div className="flex  items-center justify-start">
                    <img src={discountImag} alt="" />
                    <strong>Offers</strong>
                </div>

                <img src={closeImage} alt="" />
            </div>

            <div
                key=''
                className="flex justify-between items-center w-full py-3  border-b-2 border-gray-200 outline-none"
            >
                <div className="flex items-center justify-center gap-3">
                    <div className="flex flex-col rounded-md">
                        <img src={productDefaultimg} alt='' className="h-16 w-14 p-1 bg-gray-100" />
                        <span className="bg-red-700 text-white text-center rounded-b-md w-full">
                            18+
                        </span>
                        {/* {product.ageRestriction && (
                          <span className="bg-red-700 text-white text-center rounded-b-md w-full">
                            18+
                          </span>
                        )} */}
                    </div>
                    <div className="flex flex-col gap-2">
                        <div className="flex flex-col">
                            <strong>Product Title</strong>
                            <strong className=" font-semibold text-buttonColor">
                                {/* { (product.price - (product.price * product.discount) / 100).toFixed(2) } */}
                                <span className="text-gray-400 ml-2 line-through decoration-red-500">200 kr</span>
                            </strong>
                        </div>
                    </div>
                </div>

                <div className="text-buttonColor font-bold text-lg">
                    <button onClick={() => handleAddClick(product)}
                        className="border-2 border-orange-400 outline-none py-1 px-5 text-center rounded-full">
                        Add
                    </button>
                    {/* {!productCounts[product._id] ? (
                      <button
                          onClick={() => handleAddClick(product)}
                          className="border-2 border-orange-400 outline-none py-1 px-5 text-center rounded-full"
                      >
                          Add
                      </button>
                      ) : (
                      <div className="flex justify-between gap-4 border-2 border-orange-400 outline-none py-1 px-5 text-center rounded-full">
                          <button onClick={() => handleDecrement(product)}>-</button>
                          <span>{productCounts[product._id]}</span>
                          <button onClick={() => handleIncrement(product)}>+</button>
                      </div>
                      )} */}
                </div>
            </div>
        </div>
    )
}

export default SalerulePopup;