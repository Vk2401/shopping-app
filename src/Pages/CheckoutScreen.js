import react, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import leftArrow from '../assets/images/leftArrow.png';
import axios from 'axios';
import productDefaultimg from '../assets/images/grocery.png';
import { useAuth } from "../context/AuthContext.js";
import userIcon from '../assets/images/FontAwosemUser.png';
import { Data } from '../Pages/r.js';
import { findTotal } from '../utils/helpers.js';

const CheckoutScreen = () => {
  const productPurchaseAPI_URL = process.env.REACT_APP_AUTH_API_URL
  const productFecthAPI_URL = process.env.REACT_APP_API_URL
  const environment = process.env.REACT_APP_ENVIRONMENT
  const [cartProducts, setCartProducts] = useState([]);
  const [accessTOken, setAccessToken] = useState('');
  const [currency, setCurrence] = useState('SEK');
  const [clicked, setClicked] = useState(false);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [storeID, setStoreID] = useState('');
  const { refreshAccessToken } = useAuth();
  const [total, setTotal] = useState(0);
  const [user, setUser] = useState({});
  const navigate = useNavigate();
  let Total = 0;

  useEffect(() => {
    const cartProduct = JSON.parse(localStorage.getItem("cart")) || [];

    if (cartProduct.length === 0) {
      navigate('/products');
    }

    const aToken = localStorage.getItem('accessToken');
    const store = localStorage.getItem('storeID');
    setStoreID(store);
    setAccessToken(aToken);
    setCartProducts(cartProduct);
    setTotal(findTotal(cartProduct));
    setCurrence(localStorage.getItem('currence'));
    setUser(JSON.parse(localStorage.getItem("user")) || []);

    Total = cartProduct;

    // Fetch products from API
    const fetchProduct = async () => {
      try {
        let response = await axios.get(
          `${productFecthAPI_URL}/vms/getProducts/${storeID}`,
          {
            headers: {
              'Authorization': `Bearer ${aToken}`,
              'accept': '*/*',
              'env': environment,
            },
          }
        );

        const fetchedProduct = response.data;

        // Update cartProduct with fetched product details
        const updatedCartProduct = cartProduct.map((cartItem) => {
          const matchingProduct = fetchedProduct.find(
            (product) => product._id === cartItem.productID
          );

          if (matchingProduct) {
            return {
              ...cartItem,
              picture: matchingProduct.picture,
              title: matchingProduct.title,
            };
          }
          return cartItem;
        });

        setCartProducts(updatedCartProduct);

        // Prepare products array
        const proArr = updatedCartProduct.map((pro) => ({
          productId: pro.productID,
          quantity: pro.productType === "saleRule" ? pro.totalCount : pro.productCount,
        }));

        setProducts(proArr);

      } catch (error) {

        // Uncomment this part if you want to handle token refresh
        if (error.status === 401) {
          const newToken = await refreshAccessToken();
          if (newToken) {
            fetchProduct();  // Retry fetching after refreshing token
          }
        }
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [storeID]);

  const checkStatus = async (responseID) => {
    const delay = ms => new Promise(resolve => setTimeout(resolve, ms)); // Helper function to delay
    let status = '';

    // Loop to keep calling the API until the status is 'done'
    while (status !== 'done') {
      try {
        const response = await axios.get(
          `${productPurchaseAPI_URL}/storedatasync/erp-task/${user.id}/${responseID}`,
          {
            headers: {
              'accept': 'application/json',
              'env': environment,
              'Authorization': `Bearer ${accessTOken}`,  // Ensure correct token name here
              'Content-Type': 'application/json'
            }
          }
        );

        status = response.data.status;

        if (status !== 'done') {
          await delay(5000); // Wait for 5 seconds before retrying
        }

      } catch (error) {
        console.error('Error checking status:', error);
        break; // Optionally, break the loop if there's an error with the request
      }
    }

    return true;
  };

  const handleCheckout = async () => {
    setClicked(true);
    const response = await axios.post(`${productPurchaseAPI_URL}/storedatasync/erp-task`,
      {
        storeId: storeID,
        userId: user.id,
        goal: "dispense",
        details: {
          products: products
        }
      },
      {
        headers: {
          'accept': 'application/json',
          'env': environment,
          'Authorization': `Bearer ${accessTOken}`,
          'Content-Type': 'application/json'
        }
      }
    )

    const responseID = response.data.id;
    let isDispenced = await checkStatus(responseID);
    setClicked(true);

    if (isDispenced) {
      localStorage.removeItem('cart');
      localStorage.removeItem('total');
      setProducts([]);
      navigate('/PaymentSuccess');
    }

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
          <div className="loader border-t-4 border-buttonColor rounded-full w-12 h-12 animate-spin"></div>
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
                      {product.price + ' ' + currency}
                    </span>
                  </div>
                </div>
                <div className="flex font-semibold items-center justify-center gap-2 border-2 border-gray-400 rounded-full px-8 py-4 h-4">
                  <span>{product.productCount}</span>
                  <span>x</span>
                  <span>{parseFloat((product.price / product.productCount).toFixed(2))}</span>
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
                            <span className="text-buttonColor font-semibold text-lg">{(rule.productQuantiy * rule.saleRule.price) + ' ' + currency}</span>
                          </div>
                        </div>
                        <div className="flex font-semibold items-center justify-center gap-2 border-2 border-gray-400 rounded-full px-8 py-4 h-4">
                          <span>{rule.productQuantiy}</span>
                          <span>x</span>
                          <span>{rule.saleRule.price.toFixed(2)}</span>
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
                          <span className="text-buttonColor font-semibold text-lg">{(total * pro.productPrice) + ' ' + currency}</span>
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
            <button
              onClick={handleCheckout}
              className={`bg-buttonColor text-white text-center rounded-full px-10 py-3 ${clicked ? 'opacity-50 cursor-not-allowed' : ''}`}
              disabled={clicked} // Disable the button after click
            >
              {clicked ? "Processing..." : `Pay ${total} ${currency}`} {/* Show 'Processing...' after click */}
            </button>
          </div>
        </div>
      )}

      {clicked &&
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 px-5 pb-5 font-poppins z-20">
          <div className="flex flex-1 items-center justify-center">
            <div className="loader border-t-4 border-buttonColor rounded-full w-12 h-12 animate-spin"></div>
          </div>
        </div>
      }
    </div>
  );
}

export default CheckoutScreen;