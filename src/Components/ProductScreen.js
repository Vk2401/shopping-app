import React, { useContext, useEffect, useState } from "react";
import searchicon from '../utils/images/search.png';
import basketImage from '../utils/images/basket.png';
import { useInfo } from '../context/infoContext.js';
import { useCart } from "../context/CartContext.js";
import loader from '../utils/images/loader.gif';
import axios from "axios";
import leftArrow from '../utils/images/leftArrow.png';
import { useLocation as useRouterLocation,useNavigate  } from 'react-router-dom';
import productDefaultimg from '../utils/images/grocery.png';
import discountImag from '../utils/images/discount.png';
import closeImage from '../utils/images/ios-close-circle.png';

const ProductScreen=()=>{
    
  const location2 = useRouterLocation();
   const [showPopup, setShowPopup] = useState(false);
  // const { storeID } = location2.state || {};
  const storeID='ab25680f-916c-4b25-98cf-02cba5d2c8fa';
  const [loading, setLoading] = useState(true); // Loader state
  const {cart, addToCart , removeFromCart,total} = useCart();
  const {apiBase,env,refreshTokenFunction}=useInfo();
  const [Products,setProducts]=useState();
  const [accessToken,setAccessToken]=useState('');
  const navigate = useNavigate();

  useEffect(()=>{
    const token = sessionStorage.getItem('accessToken');
    setAccessToken(token);
  },[])

  useEffect(() => {
    console.log(sessionStorage.getItem('accessToken'));
    console.log(storeID)
     const fetchProducts = async () => {
          try {

          const response = await axios.get(          
            `${apiBase}/custom/vms/getProducts/${storeID}`,
            {
              headers: {
                'Authorization': `Bearer ${sessionStorage.getItem('accessToken')}`,
                'accept': '*/*',
                'env': env,
              },
            }
          );
          console.log(response.data);
          setProducts(response.data); // Set the fetched products
        } catch (error) {   
          if(error.status==401){
            refreshTokenFunction();
          }
          console.error('Error fetching products:', error);
        }
        finally{
          setLoading(false);
        }
      };

    fetchProducts();
  }, []); 

  useEffect(() => {
    if (cart.length > 0) {

      // Create an object mapping product IDs to their quantities
      const updatedCounts = cart.reduce((acc, product) => {
        acc[product._id] = product.quantity; // Store quantity
        return acc;
      }, {});
  
      setProductCounts(updatedCounts);
    }
    if (Products?.length > 0) {
      Products.forEach((product) => {
        if (product.isVending) {
          // Handle the logic for vending products
        }
      });
    }
  }, [Products]);

    const [searchTerm, setSearchTerm] = useState('');
    const [productCounts, setProductCounts] = useState({});
    const [selectedProducts, setSelectedProducts] = useState({});
    const [totalCount, setTotalCount] = useState(0);
    const [totalPrice, setTotalPrice] = useState(0);
    const [saleruleProduct,setSaleruleProduct]=useState([]);
  
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
      addToCart({ ...product, quantity: 1 });
      setProductCounts((prev) => ({
        ...prev,
        [product._id]: 1,
      }));
    
      const updatedProducts = {
        ...selectedProducts,
        [product._id]: { ...product, quantity: 1 },
      };
    
      setSelectedProducts(updatedProducts);
      updateTotals(updatedProducts); // Call function to update total count & price
    };
    
    const handleIncrement = (product) => {
      addToCart({ ...product, quantity: 1 });
    
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
      updateTotals(updatedProducts); // Call function to update totals
    };

   const handleDecrement = (product) => {
    setProductCounts((prev) => {
      const newCount = Math.max((prev[product._id] || 0) - 1, 0);

      if (newCount === 0) {
        removeFromCart(product._id); // ✅ Remove from cart when count reaches 0
      } else {
        addToCart({ ...product, quantity: newCount }); // ✅ Update the cart with new quantity
      }

      return { ...prev, [product._id]: newCount };
    });
    };

    const handleSearchChange = async (e) => {
      const value=e.target.value.toLowerCase();

      if(e.target.value.toLowerCase()===''){
        const response = await axios.get(          
          `${apiBase}/custom/vms/getProducts/ab25680f-916c-4b25-98cf-02cba5d2c8fa`,
          {
            headers: {
              'Authorization': `Bearer ${accessToken}`,
              'accept': '*/*',
              'env': env,
            },
          }
        );
        setProducts(response.data);
      }
      else{
        const response = await axios.get(
          `https://devapi-tanlux.storetech.ai/custom/vms/getProducts/ab25680f-916c-4b25-98cf-02cba5d2c8fa?searchTxt=${value}`,
          {
            headers: {
              'Authorization': `Bearer ${accessToken}`,
              'accept': '*/*',
              'env': 'demo',
            },
          }
        );
        setProducts(response.data);
      }

      setSearchTerm(e.target.value.toLowerCase());
    };

    const handleCheckout = () => {
      navigate('/checkout', { state: { selectedProducts } });
    };

    const filteredProducts = Products?.filter((product) =>
      product.title.toLowerCase().includes(searchTerm) && product.isVending
    );
    

    const showSalePopup=(productID)=>{

      const foundProduct = filteredProducts.find(product => product._id === productID);
      setSaleruleProduct(foundProduct);
      setShowPopup(true);
    }

    return(
      <div>
      {loading ? (
        <div className="h-screen items-center justify-center bg-red-100">
          <img src={loader} alt="" className="bg-buttonColor h-full"/>
        </div>          
      ) : (
        <div className="px-6 font-poppins h-screen">
          <div className="">
              <div className="flex items-center justify-center relative py-7">
              <img onClick={()=>{navigate('/stores')}} src={leftArrow} alt="" className="absolute left-0 h-8 w-8" />
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
                      <div className="flex flex-col rounded-md">
                        <img src={product.picture || productDefaultimg} alt={product.title} className="h-16 w-14 p-1 bg-gray-100" />
                        {product.ageRestriction && (
                          <span className="bg-red-700 text-white text-center rounded-b-md w-full">
                            18+
                          </span>
                        )}
                      </div>
                      <div className="flex flex-col gap-2">
                      <div className="flex flex-col">
                        <strong>{product.title}</strong>
                        {!product.isDiscount ? (
                          <div className="flex items-center">
                            <strong className="text-buttonColor font-semibold">{product.price} $</strong>
                            {product.sale && 
                            <img onClick={(e) => { e.stopPropagation(); showSalePopup(product._id); }} 
                             src={discountImag} alt="Sale" className="h-5 w-5 ml-2" />}  
                            {/* {product.sale && product.salePrice === 0 && product.saleGroupRules.length === 0 && (
                              <img 
                                onClick={(e) => { e.stopPropagation(); showSalePopup(product._id); }} 
                                src={discountImag} 
                                alt="Sale" 
                                className="h-5 w-5 ml-3" 
                              />
                            )} */}
                          </div>
                        ) : (
                          <div className="flex items-center">
                            <strong className="font-semibold text-buttonColor">
                              {(product.price - (product.price * product.discount) / 100).toFixed(2)}
                              <span className="text-gray-400 ml-2 line-through decoration-red-500">{product.price} kr</span>
                            </strong>
                          </div>
                        )}
                                                {/* {!product.isDiscount ? (
                          <strong className="text-buttonColor font-semibold">{product.price} $</strong> 
                        ) : (
                          <strong className=" font-semibold text-buttonColor">
                            { (product.price - (product.price * product.discount) / 100).toFixed(2) }
                             <span className="text-gray-400 ml-2 line-through decoration-red-500">{product.price} kr</span> 
                          </strong>
                        )} */}
                      </div>
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
                    onClick={handleCheckout}
                    className="p-2 px-10 font-semibold text-lg bg-white text-black rounded-full text-center"
                >
                    Checkout
                </button>

                <div className="flex items-center text-white font-semibold tracking-wider gap-2">
                  <span>Total <br /> {total}</span>
                  <div className="h-16 w-16 flex items-center justify-center bg-white rounded-full">
                    <img src={basketImage} alt="" className="h-9 w-9" />
                  </div>
                </div>
          </div>
        </div>
      )}

      {showPopup && (
        <div className="fixed inset-0 flex items-end justify-center bg-black bg-opacity-50 px-5 pb-5">
          <div className="w-full max-h-[500px] bg-white rounded-2xl px-2">
              <div className="flex items-center justify-between py-5 ">
                  <div className="flex  items-center justify-start gap-x-2">
                      <img src={discountImag} alt="" className="h-8 w-8"/>
                      <strong>Offers</strong>
                  </div>

                  <img src={closeImage}onClick={() => setShowPopup(false)}  alt="" className="h-8 w-8"/>
              </div>

              <div key={saleruleProduct._id} className="flex justify-between items-center w-full py-3  border-b-2 border-gray-200 outline-none">
                <div className="flex items-center justify-center gap-3">
                      <div className="flex flex-col rounded-md">
                        <img src={saleruleProduct.picture || productDefaultimg} alt={saleruleProduct.title} className="h-16 w-14 p-1 bg-gray-100" />
                        {saleruleProduct.ageRestriction && (
                          <span className="bg-red-700 text-white text-center rounded-b-md w-full">
                            18+
                          </span>
                        )}
                      </div>
                      <div className="flex flex-col gap-2">
                      <div className="flex flex-col">
                        <strong>{saleruleProduct.title}</strong>
                        {!saleruleProduct.isDiscount ? (
                          <div className="flex items-center">
                            <strong className="text-buttonColor font-semibold">{saleruleProduct.price} $</strong>
                            {saleruleProduct.sale && 
                            <img onClick={(e) => { e.stopPropagation(); showSalePopup(saleruleProduct._id); }} 
                             src={discountImag} alt="Sale" className="h-5 w-5 ml-2" />}  
                            {/* {product.sale && product.salePrice === 0 && product.saleGroupRules.length === 0 && (
                              <img 
                                onClick={(e) => { e.stopPropagation(); showSalePopup(product._id); }} 
                                src={discountImag} 
                                alt="Sale" 
                                className="h-5 w-5 ml-3" 
                              />
                            )} */}
                          </div>
                        ) : (
                          <div className="flex items-center">
                            <strong className="font-semibold text-buttonColor">
                              {(saleruleProduct.price - (saleruleProduct.price * saleruleProduct.discount) / 100).toFixed(2)}
                              <span className="text-gray-400 ml-2 line-through decoration-red-500">{saleruleProduct.price} kr</span>
                            </strong>
                          </div>
                        )}
                                                {/* {!product.isDiscount ? (
                          <strong className="text-buttonColor font-semibold">{product.price} $</strong> 
                        ) : (
                          <strong className=" font-semibold text-buttonColor">
                            { (product.price - (product.price * product.discount) / 100).toFixed(2) }
                             <span className="text-gray-400 ml-2 line-through decoration-red-500">{product.price} kr</span> 
                          </strong>
                        )} */}
                      </div>
                      </div>
                </div>

                <div className="text-buttonColor font-bold text-lg">
                      {!productCounts[saleruleProduct._id] ? (
                      <button
                          onClick={() => handleAddClick(saleruleProduct)}
                          className="border-2 border-orange-400 outline-none py-1 px-5 text-center rounded-full"
                      >
                          Add
                      </button>
                      ) : (
                      <div className="flex justify-between gap-4 border-2 border-orange-400 outline-none py-1 px-5 text-center rounded-full">
                          <button onClick={() => handleDecrement(saleruleProduct)}>-</button>
                          <span>{productCounts[saleruleProduct._id]}</span>
                          <button onClick={() => handleIncrement(saleruleProduct)}>+</button>
                      </div>
                      )}
                </div>
              </div>
          </div>
        </div>
      )}
    </div>
    );
}

export default ProductScreen;