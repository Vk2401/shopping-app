import React, { useEffect, useState } from "react";
import Products from '../products.json';
import rightArrow from '../utils/images/rightArrow.png';
import searchicon from '../utils/images/search.png';
import productImage from '../utils/images/ic_at_dawn.png';
import basketImage from '../utils/images/basket.png';

const ProductScreen=()=>{
    useEffect(()=>{
        Products.forEach((product) => {
            if(product.isVending){
                console.log(product.title);
                console.log(product.price);
            }
        });
    },[])

    const [searchTerm, setSearchTerm] = useState('');

    const [productCounts, setProductCounts] = useState({});
    // State to store selected products
    const [selectedProducts, setSelectedProducts] = useState({});
    const [totalCount, setTotalCount] = useState(0);
    const [totalPrice, setTotalPrice] = useState(0);
  
    const updateTotals = (newSelectedProducts) => {
      let count = 0;
      let price = 0;
    
      Object.values(newSelectedProducts).forEach((product) => {
        count += product.quantity;
        price += product.quantity * product.price; // Assuming `price` is a number
      });
    
      setTotalCount(count);
      setTotalPrice(price);
    };
    
    const handleAddClick = (product) => {
      setProductCounts((prev) => ({
        ...prev,
        [product._id]: 1,
      }));
    
      const updatedProducts = {
        ...selectedProducts,
        [product._id]: { ...product, quantity: 1 },
      };
    
      setSelectedProducts(updatedProducts);
      updateTotals(updatedProducts);
    };
    
    const handleIncrement = (product) => {
      setProductCounts((prev) => ({
        ...prev,
        [product._id]: (prev[product._id] || 0) + 1,
      }));
    
      const updatedProducts = {
        ...selectedProducts,
        [product._id]: {
          ...product,
          quantity: (selectedProducts[product._id]?.quantity || 0) + 1,
        },
      };
    
      setSelectedProducts(updatedProducts);
      updateTotals(updatedProducts);
    };
    
    const handleDecrement = (product) => {
      setProductCounts((prev) => {
        const newCount = Math.max((prev[product._id] || 0) - 1, 0);
        const updatedCounts = { ...prev, [product._id]: newCount };
    
        const newSelectedProducts = { ...selectedProducts };
        if (newCount === 0) {
          delete newSelectedProducts[product._id];
        } else {
          newSelectedProducts[product._id] = {
            ...product,
            quantity: newCount,
          };
        }
    
        setSelectedProducts(newSelectedProducts);
        updateTotals(newSelectedProducts);
    
        return updatedCounts;
      });
    };

    const handleSearchChange = (e) => {
      setSearchTerm(e.target.value.toLowerCase());
      console.log(e.target.value.toLowerCase());
    };

    const filteredProducts = Products?.filter((product) =>
      product.title.toLowerCase().includes(searchTerm) && product.isVending
    );

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
                    onChange={handleSearchChange} 
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

            <div className="flex flex-col h-[650px] overflow-y-auto py-2">
                {filteredProducts?.filter((product) => product.isVending).map((product) => (
                    <div
                    key={product._id}
                    className="flex justify-between items-center w-full py-3  border-b-2 border-gray-200 outline-none"
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
                
           </div>

           <div className="shadow-[0_0_20px_5px_rgba(255,255,255,0.5)] bg-buttonColor w-full px-3 flex items-center justify-between rounded-md py-5">
                  <button
                      onClick={() => console.log("Selected Products:", selectedProducts)}
                      className="p-2 px-10 font-semibold text-lg bg-white text-black rounded-full text-center"
                  >
                      Checkout
                  </button>

                  <div className="flex items-center text-white font-semibold tracking-wider gap-2">
                    <span>Total <br /> {totalPrice.toFixed(2)}</span>
                    <div className="h-16 w-16 flex items-center justify-center bg-white rounded-full">
                      <img src={basketImage} alt="" className="h-9 w-9" />
                    </div>
                  </div>
            </div>
        </div>
    );
}

export default ProductScreen;