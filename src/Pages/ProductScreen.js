import React, { useContext, useEffect, useState } from "react";
import searchicon from '../assets/images/search.png';
import basketImage from '../assets/images/basket.png';
import { useAuth } from "../context/AuthContext.js";
import loader from '../assets/images/loader.gif';
import leftArrow from '../assets/images/leftArrow.png';
import { useNavigate } from 'react-router-dom';
import productDefaultimg from '../assets/images/grocery.png';
import discountImag from '../assets/images/discount.png';
import closeImage from '../assets/images/ios-close-circle.png';
import tickMark from '../assets/images/tick.png';
import userIcon from '../assets/images/FontAwosemUser.png';
import axios from "axios";
import empty from '../assets/images/ProductsNotFoundpng.png';
import noProductImage from '../assets/images/ProductsNotFoundpng.png';
import { updateDicsountProductInCart, updateNormalProductIncart, updateSaleRuleProductInCart, findTotal, changeProductQuantity } from '../utils/helpers.js';
import { Data } from '../Pages/r.js';

const ProductScreen = () => {
  const apiUrl = process.env.REACT_APP_API_URL
  const environment = process.env.REACT_APP_ENVIRONMENT
  const [storeID, setStoreid] = useState('');
  const [noProduct, setNoproduct] = useState(false);
  const { isAuthenticated ,refreshAccessToken} = useAuth();
  const [showPopup, setShowPopup] = useState(false);
  const [loading, setLoading] = useState(true); // Loader state
  const [Products, setProducts] = useState(null);
  const [accessToken, setAccessToken] = useState('');
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [totalCount, setTotalCount] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [saleruleProduct, setSaleruleProduct] = useState([]);
  const [saleRule, setSalerule] = useState([]);
  const [isProductfetched, setisProductfetched] = useState(false);
  const [currence, setCurrence] = useState('SEK');
  const [isAlert,setIsAlert]=useState(false);
  const [alertMessage,setAlertMessage]=useState('');

  useEffect(() => {

    if (!isAuthenticated) {
      navigate("/");
    }

    else {
      setAccessToken(localStorage.getItem('accessToken'));
      const fetchProducts = async () => {
        try {
          const response = await axios.get(
            `${apiUrl}/vms/getProducts/${storeID}`,
            {
              headers: {
                'Authorization': `Bearer ${accessToken}`,
                'accept': '*/*',
                'env': environment,
              },
            }
          );
          let responsew = response.data;

          // if(response.data.status=='aun'){
          //   refreshAccessToken
          // }
          // let responsew = Data;

          responsew.forEach((prod) => {
            if (prod.availableItems === 0) {
              return;
            }
          
            if (prod.quantity === undefined) {
              prod.quantity = 0;
            }
          });
          

          let fetchProduct = responsew;

          if (fetchProduct.length == 0) {
            setisProductfetched(true);
          }

          if (addedProducts.length > 0) {
            fetchProduct = changeProductQuantity(fetchProduct);
            setProducts(fetchProduct);
          } else {
            setProducts(fetchProduct);
          }

        } catch (error) {
          console.error('Error fetching products:', error);
        }
        finally {
          setLoading(false);
        }
      };

      const fetchCurrence = async () => {
     let accessToken=localStorage.getItem('accessToken');
        try {
          // Make the API request to fetch currency data
          const corrence = await axios.get(`${apiUrl}/settings/${storeID}/preferences`, {
            headers: {
              'Authorization': `Bearer ${accessToken}`,
              'accept': '*/*',
              'env': environment,
            },
          });
 
      
          // Check if 'currency' exists in the response data
          const currencyExists = corrence.data.value.hasOwnProperty('currency');
      
          if (currencyExists) {
            if (corrence.data.value !== '') {
              setCurrence(corrence.data.value.currency); // Set the currency state
            }
          }
      
          // Save the currency to localStorage
          localStorage.setItem('currence', corrence.data.value.currency);
          
        } catch (error) {
          
          // if(error.status==401 && error.messsage=='authenticate'){
          //   const newToken = await refreshAccessToken();
          //   if(newToken){
          //     fetchCurrence();
          //   }
          // }
          console.error('Error fetching currency:', error);
          // Handle error (e.g., show an error message, or fallback behavior)
        }
      };
      

      getCurrectLocation();
      const addedProducts = JSON.parse(localStorage.getItem("cart")) || [];

      // const storeID=localStorage.getItem('storeID');
      const storeID = 'ab25680f-916c-4b25-98cf-02cba5d2c8fa';
      setStoreid(storeID);
      setTotalCount(addedProducts.length);
      setTotalPrice(findTotal(addedProducts));
      fetchCurrence();
      fetchProducts();
    }
  }, []);

  const getCurrectLocation = () => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        // GPS is enabled
      },
      (err) => {
        if (err.code === err.PERMISSION_DENIED) {
          alert('Please enable location access');
        }
      }
    );
  };

  const handleAddClick = (product) => {
    product.quantity = 0;
    if (product.isDiscount) {
      updateDicsountProductInCart(product, '+', setProducts, setTotalPrice);
    }
    else if (product.sale && product.salePrice == 0 && product.saleGroupRules.length > 0) {
      updateSaleRuleProductInCart(product, '+', setProducts, setTotalPrice, setSalerule);
    }
    else {
      updateNormalProductIncart(product, '+', setProducts, setTotalPrice);
    }
  };

  const handleIncrement = (Product) => {

    if(Product.quantity==Product.availableItems){
      setIsAlert(true);
      setAlertMessage(`Stock available only ${Product.quantity}`);
      return
    }

    if (Product.isDiscount) {
      updateDicsountProductInCart(Product, '+', setProducts, setTotalPrice);
    }
    else if (Product.sale && Product.salePrice == 0 && Product.saleGroupRules.length > 0) {
      updateSaleRuleProductInCart(Product, '+', setProducts, setTotalPrice, setSalerule);
    }
    else {
      updateNormalProductIncart(Product, '+', setProducts, setTotalPrice);
    }
  };

  const handleDecrement = (Product) => {

    if (Product.isDiscount) {
      updateDicsountProductInCart(Product, '-', setProducts, setTotalPrice);
    }
    else if (Product.sale && Product.salePrice == 0 && Product.saleGroupRules.length > 0) {
      updateSaleRuleProductInCart(Product, '-', setProducts, setTotalPrice, setSalerule);
    }
    else {
      updateNormalProductIncart(Product, '-', setProducts, setTotalPrice);
    }

  };

  const handleSearchChange = async (e) => {
    const searchTerm = e.target.value.toLowerCase(); // Convert input to lowercase
    const cartProducts = JSON.parse(localStorage.getItem('cart')) || []; // Get cart products (if any)

    // Build the API URL dynamically based on whether the search term is empty or not
    const searchUrl = searchTerm === ''
      ? `${apiUrl}/vms/getProducts/ab25680f-916c-4b25-98cf-02cba5d2c8fa`
      : `${apiUrl}/vms/getProducts/ab25680f-916c-4b25-98cf-02cba5d2c8fa?searchTxt=${searchTerm}`;

    try {
      // Make the API call to fetch the products
      const response = await axios.get(searchUrl, {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'accept': '*/*',
          'env': environment,
        },
      });

      let fetchedProducts = response.data;

      // If there are cart products, adjust the quantities
      if (cartProducts.length > 0) {
        fetchedProducts = changeProductQuantity(fetchedProducts);  // Assuming changeProductQuantity takes both parameters
      }

      // Update the products state
      setProducts(fetchedProducts);

      // Update the search term state
      setSearchTerm(searchTerm);

    } catch (error) {
      console.error('Error fetching products:', error);
      // Handle any errors here, e.g., show a notification to the user
    }
  };

  const handleCheckout = () => {
    if (totalPrice > 0) {
      navigate(`/checkout`, { state: Products });
    } else {
      setNoproduct(true);
    }

  };

  const filteredProducts = Products?.filter((product) =>
    product.title.toLowerCase().includes(searchTerm) && product.isVending
  );

  const showSalePopup = (productID) => {
    const foundProduct = filteredProducts.find(product => product._id === productID);
    setSaleruleProduct(foundProduct);
    setSalerule(foundProduct.saleGroupRules);
    setShowPopup(true);
  };

  return (
    <div className="">

      {loading ? (
        <div className="h-screen flex items-center justify-center bg-buttonColor">
          <img src={loader} alt="" className="" />
        </div>
      ) : (
        <div className="font-poppins px-3 h-screen ">
          <div className=" px-3 h-36 flex flex-col fixed top-0 left-0 w-full bg-white ">
            <div className="flex items-center justify-between relative h-1/2">
              <img onClick={() => navigate(`/stores`)} src={leftArrow} alt="" className="h-10 w-10" />
              <h1 className="text-lightBlack font-bold text-xl">Vending Machine</h1>
              <img onClick={() => navigate(`/settings`)} src={userIcon} alt="" className="h-8 w-8" />
            </div>

            <div className="flex items-center justify-center h-1/2">
              <div className="relative w-full">
                <input
                  type="text"
                  placeholder="Search"
                  onChange={handleSearchChange}
                  className="w-full font-semibold py-3 px-5 border-2 border-buttonColor outline-none text-left rounded-full focus:ring-2 focus:ring-buttonColor transition-all"
                />
                <img
                  src={searchicon}
                  alt="Search"
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 w-6 h-6"
                />
              </div>
            </div>
          </div>

          {isProductfetched ? (
            <div className=" flex flex-col bg justify-center items-center h-full w-full gap-2">
              <img src={noProductImage} alt="" className="h-52 w-52" />
              <button onClick={() => { navigate(`/stores`) }} className="bg-buttonColor text-white text-lg font-semibold px-10 py-3 rounded-full">Check other stores</button>
            </div>
          ) : (
            <div className="flex flex-col items-center flex-1 ">
              {filteredProducts?.length > 0 ? (
                <div className="flex flex-col  mb-5 gap-2 w-full mt-36 overflow-y-auto pb-24">
                  {filteredProducts?.filter((product) => product.isVending).map((product) => (
                    <div key={product._id}
                      className="flex px-1 justify-between bg-gray-50 rounded-lg items-center w-full py-3 border-2 border-gray-200 outline-none"
                    >
                      <div className="flex items-center justify-center gap-3">
                        <div className="flex flex-col rounded-md">
                          <img
                            src={product.picture || productDefaultimg}
                            alt={product.title}
                            className="h-16 w-14 p-1 bg-gray-100"
                          />
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
                                <strong className="text-buttonColor font-semibold">
                                  {product.price + '  ' + currence}
                                </strong>

                                {product.sale &&
                                  product.salePrice == 0 &&
                                  product.saleGroupRules.length > 0 && (
                                    <img
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        showSalePopup(product._id);
                                      }}
                                      src={discountImag}
                                      alt="Sale"
                                      className="h-5 w-5 ml-3"
                                    />
                                  )}
                              </div>
                            ) : (
                              <div className="flex items-center">
                                <strong className="font-semibold text-buttonColor">
                                  {(product.price - (product.price * product.discount) / 100).toFixed(2)}
                                  <span className="text-gray-400 ml-2 line-through decoration-red-500">
                                    {product.price + ' ' + currence}
                                  </span>
                                </strong>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>

                      <div className="text-black font-bold text-lg">
                        {product.quantity === 0 || product.quantity === undefined ? (
                          <button
                            onClick={() =>
                              handleAddClick({ ...product, quantity: product.quantity ?? 0 })
                            }
                            className="border-2 border-buttonColor outline-none py-1 px-5 text-center rounded-full"
                          >
                            Add
                          </button>
                        ) : (
                          <div className="flex justify-between gap-4 border-2 border-buttonColor outline-none py-1 px-5 text-center rounded-full">
                            <button onClick={() => handleDecrement(product)}>-</button>
                            <span>{product.quantity}</span>
                            <button onClick={() => handleIncrement(product)}>+</button>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex flex-col mb-5 gap-2 w-full h-full items-center justify-center">
                  <img src={empty} alt="" className="h-44 w-44 " />
                </div>
              )}
            </div>
          )}

          {/* Checkout Bar - Conditionally Hidden */}
          <div className={`shadow-[0_0_20px_5px_rgba(255,255,255,0.5)] bg-buttonColor px-3 flex items-center justify-between rounded-t-lg py-5 bottom-0 left-0 w-full fixed ${isProductfetched ? 'hidden' : 'block'}`}>
            <button
              onClick={handleCheckout}
              className="p-2 px-10 font-semibold text-lg bg-white text-black rounded-full text-center"
            >
              Checkout
            </button>

            <div className="flex items-center text-white font-semibold tracking-wider gap-2">
              <span> Total <br /> {totalPrice} </span>
              <div className="h-16 w-16 flex items-center justify-center bg-white rounded-full">
                <img src={basketImage} alt="" className="h-9 w-9" />
              </div>
            </div>
          </div>
        </div>
      )}

      {showPopup && (
        <div className="fixed inset-0 flex items-end justify-center bg-black bg-opacity-50 px-5 pb-5 font-poppins z-20">
          <div className="w-full max-h-[500px] bg-white rounded-2xl px-4 py-5">
            <div className="flex items-center justify-between pb-2">
              <div className="flex  items-center justify-start gap-x-2">
                <img src={discountImag} alt="" className="h-8 w-8" />
                <strong className="tracking-wide">Offers</strong>
              </div>

              <img src={closeImage} onClick={() => setShowPopup(false)} alt="" className="h-8 w-8" />
            </div>

            <div key={saleruleProduct._id} className="flex justify-between items-center w-full py-3 border-gray-200">
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
                        <strong className="text-buttonColor font-semibold">{saleruleProduct.price} {currence}</strong>
                      </div>
                    ) : (
                      <div className="flex items-center">
                        <strong className="font-semibold text-buttonColor">
                          {(saleruleProduct.price - (saleruleProduct.price * saleruleProduct.discount) / 100).toFixed(2)}
                          <span className="text-gray-400 ml-2 line-through decoration-red-500">{saleruleProduct.price} {currence}</span>
                        </strong>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className=" font-bold text-lg">
                {saleruleProduct.quantity == 0 ? (
                  <button
                    onClick={() => handleAddClick(saleruleProduct)}
                    className="border-2 text-buttonColor border-gray-200 outline-none py-1 px-5 text-center rounded-full"
                  >
                    Add
                  </button>
                ) : (
                  <div className="flex justify-between gap-4 border-2 border-gray-200 outline-none py-1 px-5 text-center rounded-full">
                    <button className="text-buttonColor" onClick={() => handleDecrement(saleruleProduct)}>-</button>
                    <span>{saleruleProduct.quantity}</span>
                    <button className="text-buttonColor" onClick={() => handleIncrement(saleruleProduct)}>+</button>
                  </div>
                )}
              </div>
            </div>

            <div className="flex flex-col gap-3">
              {saleRule.map((rule, index) =>   rule.status === 'Active' &&  (
                <div
                  key={index}
                  className={`flex flex-col border-2 border-gray-200 rounded-md items-center justify-center relative py-2 
                  ${rule.isSaleApplied ? 'bg-buttonColor text-white' : 'bg-white text-gray-400'}`} // Change background based on isSaleApplied
                >
                  <div className="flex w-full justify-center items-center flex-1 py-4">
                    <p className="text-lg">
                      BUY <span>{rule.count}</span> FOR <span className="font-semibold">{rule.price} {currence}</span>
                    </p>
                    <img
                      src={tickMark}
                      alt=""
                      className={`h-7 w-7 rounded-full absolute right-2 ${rule.isSaleApplied ? 'block' : 'hidden'}`}
                    />
                  </div>
                  <p className={`h-3 ${(saleruleProduct.quantity + 1) % rule.count === 0 ? 'block' : 'hidden'} w-full  text-center py-3 bg-gray-100 text-redColor justify-center items-center flex absolute bottom-0 font-bold text-lg rounded-b-md`}>ADD 1 ITEM TO APPLY OFFER</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {
        isAlert && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 px-5 pb-5 font-poppins z-20">
              <div className="bg-white w-[280px] h-[150px] rounded-md flex flex-col justify-center items-center gap-3">
                <h1 className="text-xl text-buttonColor">{alertMessage}</h1>
                <button className="px-16 py-2 bg-buttonColor rounded-full text-white font-bold text-xl" onClick={()=>setIsAlert(false)}>OK</button>
              </div>
          </div>
        )
      }

      {noProduct && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 px-5 pb-5 font-poppins z-20">
          <div className="w-96 h-48 bg-white rounded-xl flex flex-col items-center justify-center gap-2">
            <img src={basketImage} alt="" className="h-14 w-14" />
            <strong className="text-black font-semibold text-lg">Please add product</strong>
            <button onClick={() => { setNoproduct(false) }} className="px-14 py-3 rounded-full bg-buttonColor text-white font-semibold text-xl text-center">Okey</button>
          </div>
        </div>
      )}

    </div>
  );
}

export default ProductScreen;