import { div } from "framer-motion/client";
import react, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import leftArrow from '../utils/images/leftArrow.png';
import axios from 'axios';
import productDefaultimg from '../utils/images/grocery.png';
import { useAuth } from "../context/AuthContext.js";
import userIcon from '../utils/images/FontAwosemUser.png';
import { Data } from '../Components/r.js';
import { findTotal } from '../utils/cartUtils.js';
import { useLocation } from "react-router-dom";

const CheckoutScreen = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [total, setTotal] = useState(0);
  const [user, setUser] = useState({});
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state
  const productFecthAPI_URL = process.env.REACT_APP_API_URL
  const productPurchaseAPI_URL = process.env.REACT_APP_AUTH_API_URL
  const Distance = process.env.REACT_APP_DISTANCE
  const environment = process.env.REACT_APP_ENVIRONMENT
  const [cartProducts, setCartProducts] = useState([]);
  const [storeID, setStoreID] = useState('');
  const [currence, setCurrence] = useState('SEK');
  const [accessTOken, setAccessToken] = useState('');
  const location = useLocation();
  const data = location.state; // Get passed data
  let Total = 0;

  useEffect(() => {

    if (!isAuthenticated) {
      navigate('/');
    }

    setCurrence(localStorage.getItem('currence'));
    let cartProduct = JSON.parse(localStorage.getItem("cart")) || [];
    const aToken = sessionStorage.getItem('accessToken');
    let localUSER = JSON.parse(sessionStorage.getItem("user")) || [];
    let store = sessionStorage.getItem('storeID');
    store = 'ab25680f-916c-4b25-98cf-02cba5d2c8fa';

    setAccessToken(aToken);
    setStoreID(store);
    setUser(localUSER);
    setTotal(findTotal(cartProduct));
    Total = cartProduct;

    if (cartProduct.length == 0) {
      navigate('/products');
    }
    setCartProducts(cartProduct);

    const fetchProduct = async () => {
      try {

        // let  response = await axios.get(
        //   `${productFecthAPI_URL}/vms/getProducts/${storeID}`,
        //   {
        //     headers: {
        //       'Authorization': `Bearer ${aToken}`,
        //       'accept': '*/*',
        //       'env': environment,
        //     },
        //   }
        // );

        // const fetchedProduct = response.data;

        const fetchedProduct = data;

        // Update cartProduct with fetched product details
        cartProduct = cartProduct.map((cartItem) => {
          const matchingProduct = fetchedProduct.find(
            (product) => product._id === cartItem.productID
          );

          if (matchingProduct) {
            return {
              ...cartItem,
              picture: matchingProduct.picture, // Add image from fetchedProduct
              title: matchingProduct.title, // Add title from fetchedProduct
            };
          }
          return cartItem;
        });

        setCartProducts(cartProduct);

        // Prepare products array
        let proArr = cartProduct.map((pro) => ({
          productId: pro.productID,
          quantity: pro.productType === "saleRule" ? pro.totalCount : pro.productCount,
        }));

        setProducts(proArr);

      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false); // Stop loading once data is fetched
      }
    };

    fetchProduct();
    // Set other states
    setUser(JSON.parse(sessionStorage.getItem("user")));
  }, [storeID]);

  const handleCheckout = async () => {

    // const response = await axios.post(
    //   `${productPurchaseAPI_URL}/storedatasync/erp-task`,
    //   {
    //     storeId: storeID,
    //     userId: user.id,
    //     goal: "dispense",
    //     details: {
    //       products: products
    //     }
    //   },
    //   {
    //     headers: {
    //       'accept': 'application/json',
    //       'env': environment,
    //       'Authorization': `Bearer ${accessTOken}`,
    //       'Content-Type': 'application/json'
    //     }
    //   }
    // )


    // if (response.status == 201) {
    //   localStorage.removeItem('cart');
    //   localStorage.removeItem('total');
    //   navigate('/PaymentSuccess');
    // }

    // navigate('/payment');
  };

  return (
    <div className="h-screen flex flex-col px-6 font-poppins relative">
      <div className="flex items-center justify-between h-20 py-8 first-line:fixed top-0 left-0 w-full z-10 bg-white">
        <img onClick={() => navigate(`/products`)} src={leftArrow} alt="" className="h-10 w-10" />
        <h1 className="text-lightBlack font-bold text-xl">Checkout</h1>
        <img onClick={() => navigate('/settings')} src={userIcon} alt="" className=" h-8 w-8" />
      </div>

      {loading ? (
        <div className="flex flex-1 items-center justify-center">
          <div className="loader border-t-4 border-blue-500 rounded-full w-12 h-12 animate-spin"></div>
        </div>
      ) : (

        <div className="mt-5 flex-1 flex flex-col overflow-y-auto w-full pb-20">

          {cartProducts
            ?.filter((product) => product.productType !== "saleRule") // Filter out products with productType === "saleRule"
            .map((product) => (
              <div
                key={product.productID}
                className="flex justify-between items-center border-2 border-gray-300 rounded-lg px-4 py-2 mb-4"
              >
                <div className="flex items-center gap-2">
                  <img
                    src={product.picture || productDefaultimg} // Use default image if no picture exists
                    alt={product.title}
                    className="w-14 h-16 object-cover"
                  />
                  <div className="flex flex-col">
                    <span className="font-bold text-black">{product.title}</span>
                    <span className="text-lightBlack">Qty: {product.productCount}</span>
                    <span className="text-buttonColor font-semibold text-lg">
                      {product.price + ' ' + currence}
                    </span>
                  </div>
                </div>
                <div className="flex font-semibold items-center justify-center gap-2 border-2 border-gray-400 rounded-full px-8 py-4 h-4">
                  <span>{product.productCount}</span>
                  <span>x</span>
                  <span>{product.price / product.productCount}</span>
                </div>
              </div>
            ))}

          {cartProducts
            .filter(pro => pro.productType === 'saleRule')
            .map((pro, index) => {
              // Step 1: Calculate total before rendering
              let total = pro.totalCount;

              // Reduce total count by subtracting quantities from applied sale rules
              pro.saleRuleDetails.forEach(rule => {
                if (rule.isSaleApplied) {
                  total -= (rule.productQuantiy * rule.saleRule.count);
                }
              });

              return (
                <div key={index} className="">
                  {/* Step 2: Render Green Divs (Applied Sale Rules) */}
                  {pro.saleRuleDetails.map((rule, ruleIndex) => (
                    rule.isSaleApplied && (
                      <div key={ruleIndex} className="flex justify-between items-center border-2 border-buttonColor rounded-lg px-4 py-2 mb-4">
                        <div className="flex items-center gap-2">
                          <img src={pro.picture || productDefaultimg} alt={pro.title} className="w-14 h-16 object-cover" />
                          <div className="flex flex-col">
                            <span className="font-bold text-black">{pro.title}</span>
                            <span className="text-lightBlack">Qty: {rule.productQuantiy * rule.saleRule.count}</span>
                            <span className="text-buttonColor font-semibold text-lg">{(rule.productQuantiy * rule.saleRule.price) + ' ' + currence}</span>
                          </div>
                        </div>
                        <div className="flex font-semibold items-center justify-center gap-2 border-2 border-gray-400 rounded-full px-8 py-4 h-4">
                          <span>{rule.productQuantiy}</span>
                          <span>x</span>
                          <span>{rule.saleRule.price}</span>
                        </div>
                      </div>
                    )
                  ))}

                  {/* Step 3: Render Red Div (Remaining Quantity) */}
                  {total > 0 && (
                    <div className="flex justify-between items-center border-2 border-red-300 rounded-lg px-4 py-2 mb-4">
                      <div className="flex items-center gap-2">
                        <img src={pro.picture || productDefaultimg} alt={pro.title} className="w-14 h-16 object-cover" />
                        <div className="flex flex-col">
                          <span className="font-bold text-black">{pro.title}</span>
                          <span className="text-lightBlack">Qty: {total}</span>
                          <span className="text-buttonColor font-semibold text-lg">{(total * pro.productPrice) + ' ' + currence}</span>
                        </div>
                      </div>
                      <div className="flex font-semibold items-center justify-center gap-2 border-2 border-gray-400 rounded-full px-8 py-4 h-4">
                        <span>{total}</span>
                        <span>x</span>
                        <span>{pro.productPrice}</span>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}

          <div className="flex justify-center items-center fixed bottom-0 left-0 w-full z-10 pb-5 bg-white">
            <button onClick={handleCheckout} className="bg-buttonColor text-white text-center rounded-full px-10 py-3">Pay {total} {currence}</button>
          </div>
        </div>
      )}

    </div>
  );
}

export default CheckoutScreen;