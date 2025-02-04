import React, { useEffect, useState } from "react";
import Products from '../products.json';
import rightArrow from '../utils/images/rightArrow.png';
import searchicon from '../utils/images/search.png';
import productImage from '../utils/images/ic_at_dawn.png';

const ProductScreen=()=>{
    useEffect(()=>{
        Products.forEach((product) => {
            if(product.isVending){
                console.log(product.title);
                console.log(product.price);
            }
        });
    },[])
    const [showCounter, setShowCounter] = useState(false);
    const [count, setCount] = useState(1);

    const [productCounts, setProductCounts] = useState({});
    // State to store selected products
    const [selectedProducts, setSelectedProducts] = useState({});
  
    const handleAddClick = (product) => {
      setProductCounts((prev) => ({
        ...prev,
        [product._id]: 1, // Set initial count to 1
      }));
  
      setSelectedProducts((prev) => ({
        ...prev,
        [product._id]: { ...product, quantity: 1 },
      }));
    };
  
    const handleIncrement = (product) => {
      setProductCounts((prev) => ({
        ...prev,
        [product._id]: (prev[product._id] || 0) + 1,
      }));
  
      setSelectedProducts((prev) => ({
        ...prev,
        [product._id]: {
          ...product,
          quantity: (prev[product._id]?.quantity || 0) + 1,
        },
      }));
    };
  
    const handleDecrement = (product) => {
      setProductCounts((prev) => {
        const newCount = Math.max((prev[product._id] || 0) - 1, 0);
        const updatedCounts = { ...prev, [product._id]: newCount };
  
        if (newCount === 0) {
          const newSelected = { ...selectedProducts };
          delete newSelected[product._id]; // Remove product if count is 0
          setSelectedProducts(newSelected);
        } else {
          setSelectedProducts((prev) => ({
            ...prev,
            [product._id]: { ...product, quantity: newCount },
          }));
        }
  
        return updatedCounts;
      });
    };
    return(
        <div className="px-6 font-poppins h-screen">
            <div className="">
                <div className="flex items-center justify-center relative py-7">
                <img src={rightArrow} alt="" className="absolute left-0 h-8 w-8" />
                <h1 className="text-lightBlack font-bold text-xl">Vending Machine</h1>
                </div>

                <div className="flex items-center justify-center">
                <div className="relative w-full">
                    <input 
                    type="text" 
                    placeholder="Search" 
                    className="w-full font-semibold py-3 px-5 border-2 border-orange-400 outline-none text-left rounded-full focus:ring-2 focus:ring-orange-500 transition-all"
                    />
                    <img 
                    src={searchicon} 
                    alt="Search" 
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 w-6 h-6"
                    />
                </div>
                </div>
            </div>

            <div className="flex flex-col h-[720px] overflow-y-auto">
                {Products?.filter((product) => product.isVending).map((product) => (
                    <div
                    key={product._id}
                    className="flex justify-between items-center w-full py-5 px-5 border-b-2 border-gray-200 outline-none"
                    >
                    <div className="flex items-center justify-center gap-3">
                        <img src={product.picture} alt={product.title} className="h-16 w-14" />
                        <div className="flex flex-col gap-2">
                        <div className="flex flex-col">
                            <p className="text-lightBlack">{product.title}</p>
                        </div>
                        <strong className="text-buttonColor">{product.price} kr</strong>
                        </div>
                    </div>

                    <div className="text-buttonColor font-bold text-lg">
                        {!productCounts[product._id] ? (
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
                        )}
                    </div>
                    </div>
                ))}
                <button
                    onClick={() => console.log("Selected Products:", selectedProducts)}
                    className="mt-5 p-2 bg-orange-500 text-white rounded"
                >
                    Checkout
                </button>
           </div>
        </div>
    );
}

export default ProductScreen;