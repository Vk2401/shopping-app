import { div } from "framer-motion/client";
import react, { useEffect, useState } from "react";
import { useAsyncError, useLocation, useNavigate } from 'react-router-dom';
import leftArrow from '../utils/images/leftArrow.png';
import axios from 'axios';
import { useInfo } from '../context/infoContext.js';
import productDefaultimg from '../utils/images/grocery.png';
import userIcon from '../utils/images/FontAwosemUser.png';
import { useAuth } from "../context/AuthContext.js";

const CheckoutScreen = () => {
  const { isAuthenticated, logout } = useAuth();
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const storeID = params.get("storeID");
  const navigate = useNavigate();
  const [total, setTotal] = useState(0);
  const [cartProducts, setCartProducts] = useState([]);
  const [user, setUser] = useState({});
  const [products, setProducts] = useState([]);
  const { apiBase, env, refreshTokenFunction } = useInfo();

  useEffect(() => {

    if (!isAuthenticated) {
      navigate('/');
    }

    let cartProduct = JSON.parse(localStorage.getItem("cart")) || [];
    if (cartProduct.length == 0) {
      navigate('/products');
    }
    const fetchProduct = async () => {
      try {
        const response = await axios.get(
          `${apiBase}/custom/vms/getProducts/${storeID}`,
          {
            headers: {
              Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
              accept: "*/*",
              env: env,
            },
          }
        );

        let fetchedProduct = response.data;

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
      }
    };

    fetchProduct();

    // Set other states
    setTotal(localStorage.getItem("total"));
    setUser(JSON.parse(sessionStorage.getItem("user")));
  }, []);

 
  const handleCheckout = async () => {
    // const response = await axios.post(
    //   `${apiBase}/storedatasync/erp-task`,
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
    //       'env': env,
    //       'Authorization': `Bearer ${sessionStorage.getItem('accessToken')}`,
    //       'Content-Type': 'application/json'
    //     }
    //   }
    // )

    // if (response.status == 201) {
    //   localStorage.removeItem('cart');
    //   localStorage.removeItem('total');
    //   navigate('/PaymentSuccess');
    // }

    navigate('/payment');
  };

  return (
    <div className="h-screen flex flex-col px-6 font-poppins relative">
      <div className="flex items-center justify-between h-16 py-8fixed top-0 left-0 w-full z-10 bg-white">
        <img onClick={() => navigate('/products')} src={leftArrow} alt="" className="h-10 w-10" />
        <h1 className="text-lightBlack font-bold text-xl">Checkout</h1>
        <img onClick={() => navigate('/settings')} src={userIcon} alt="" className=" h-8 w-8" />
      </div>
 
      <div className="mt-5 flex-1 flex flex-col overflow-y-auto w-full pb-20">

        {cartProducts?.map((product) =>
          product.productType != "saleRule" ? (
            <div
              key={product.productID}
              className="flex justify-between items-center  border-2 border-gray-300 rounded-lg px-4 py-2 mb-4"
            >
              <div className="flex items-center gap-2">
                <img
                  src={product.picture || { productDefaultimg }} // Use default image if no picture exists
                  alt={product.title}
                  className="w-14 h-16 object-cover"
                />

                <div className="flex flex-col">
                  <span className="font-bold text-black">{product.title}</span>
                  <span className="text-lightBlack">Qty: {product.productCount}</span>
                  <span className="text-buttonColor font-semibold text-lg">
                    ${product.productType === "saleRule"
                      ? ((product.saleRuleNotAppliedCount))
                      : (product.price)}
                  </span>
                </div>
              </div>

              <div className="flex font-semibold items-center justify-center gap-2 border-2 border-gray-400 rounded-full px-8 py-4 h-4">
                <span>{product.productCount}</span> 
                <span>x</span>
                <span>{product.price / product.productCount}</span>
              </div>
            </div>
          ) :
            <div>
              {/* Condition for issaleApplied === false */}

              {product.issaleApplied === false && (
                <div
                  key={product.productID}
                  className="flex justify-between items-center border-2 border-yellow-300 rounded-lg px-4 py-2 mb-4"
                >
                  <div className="flex items-center gap-2">
                    <img
                      src={product.picture || productDefaultimg} // Use default image if no picture exists
                      alt={product.title}
                      className="w-14 h-16 object-cover"
                    />

                    <div className="flex flex-col">
                      <span className="font-bold text-black">{product.title}</span>
                      <span className="text-lightBlack">Qty: {product.totalCount}</span>
                      <span className="text-buttonColor font-semibold text-lg">
                        ${product.notSaleRulePrice}
                      </span>
                    </div>
                  </div>

                  <div className="flex font-semibold items-center justify-center gap-2 border-2 border-gray-400 rounded-full px-8 py-4 h-4">
                    <span>{product.totalCount}</span>
                    <span>x</span>
                    <span>{product.notSaleRulePrice/product.totalCount}</span>
                  </div>
                </div>
              )}

              {/* Condition for issaleApplied === true */}
              {product.issaleApplied === true && (product.totalCount % product.saleRulecount) == 0 && (
                <div
                  key={product.productID}
                  className=" flex justify-between items-center border-2 border-green-300 rounded-lg px-4 py-2 mb-4"
                >
                  <div className="flex items-center gap-2">
                    <img
                      src={product.picture || productDefaultimg} // Use default image if no picture exists
                      alt={product.title}
                      className="w-14 h-16 object-cover"
                    />

                    <div className="flex flex-col">
                      <span className="font-bold text-black">{product.title}</span>
                      <span className="text-lightBlack">Qty: {product.totalCount}</span>
                      <span className="text-buttonColor font-semibold text-lg">
                        ${product.salePrice}
                      </span>
                    </div>
                  </div>

                  <div className="flex font-semibold items-center justify-center gap-2 border-2 border-gray-400 rounded-full px-8 py-4 h-4">
                    <span>{product.saleAppliedCount}</span>
                    <span>x</span>
                    <span>{product.salePrice/product.saleAppliedCount}</span>
                  </div>
                </div>
              )}

              {/* Condition for issaleApplied === true AND totalCount % saleRulecount !== 0 */}
              {product.issaleApplied === true && (product.totalCount % product.saleRulecount) !== 0 && (
                <div>
                  <div
                    key={product.productID}
                    className=" flex justify-between items-center border-2 border-green-300 rounded-lg px-4 py-2 mb-4"
                  >
                    <div className="flex items-center gap-2">
                      <img
                        src={product.picture || productDefaultimg} // Use default image if no picture exists
                        alt={product.title}
                        className="w-14 h-16 object-cover"
                      />
                      {
                        console.log(product)
                      }
                      <div className="flex flex-col">
                        <span className="font-bold text-black">{product.title}</span>
                        <span className="text-lightBlack">Qty: {product.saleAppliedCount * product.saleRulecount}</span>
                        <span className="text-buttonColor font-semibold text-lg">
                          ${product.salePrice}
                        </span>
                      </div>
                    </div>

                    <div className="flex font-semibold items-center justify-center gap-2 border-2 border-gray-400 rounded-full px-8 py-4 h-4">
                      <span>{product.salePrice/product.saleAppliedCount}</span>
                      <span>x</span>
                      <span>{(product.saleAppliedCount)}</span>
                    </div>
                  </div>
                  <div
                    key={product.productID}
                    className="flex justify-between items-center border-2 border-red-300 rounded-lg px-4 py-2 mb-4"
                  >
                    <div className="flex items-center gap-2">
                      <img
                        src={product.picture || productDefaultimg} // Use default image if no picture exists
                        alt={product.title}
                        className="w-14 h-16 object-cover"
                      />

                      <div className="flex flex-col">
                        <span className="font-bold text-black">{product.title}</span>
                        <span className="text-lightBlack">Qty: {product.saleRuleNotAppliedCount}</span>
                        <span className="text-buttonColor font-semibold text-lg">
                          ${product.notSaleRulePrice}
                        </span>
                      </div>
                    </div>

                    <div className="flex font-semibold items-center justify-center gap-2 border-2 border-gray-400 rounded-full px-8 py-4 h-4">
                      <span>{product.notSaleRulePrice/product.saleRuleNotAppliedCount}</span>
                      <span>x</span>
                      <span>{product.saleRuleNotAppliedCount}</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
        )}

      </div>

      <div className="flex justify-center items-center fixed bottom-0 left-0 w-full z-10 py-5 bg-white">
        <button onClick={handleCheckout} className="bg-buttonColor text-white text-center rounded-full px-10 py-3">Pay {total} Rs</button>
      </div>
    </div>
  );
}

export default CheckoutScreen;