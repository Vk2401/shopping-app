import { div } from "framer-motion/client";
import react, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import leftArrow from '../utils/images/leftArrow.png';
import axios from 'axios';
import productDefaultimg from '../utils/images/grocery.png';
import { useAuth } from "../context/AuthContext.js";
import userIcon from '../utils/images/FontAwosemUser.png';

const CheckoutScreen = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [total, setTotal] = useState(0);
  const [user, setUser] = useState({});
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state
  const apiUrl = process.env.REACT_APP_API_URL
  const Distance=process.env.REACT_APP_DISTANCE
  const environment = process.env.REACT_APP_ENVIRONMENT
  const [cartProducts,setCartProducts]=useState([]);
  const [storeID,setStoreID]=useState('');

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/');
    }
    let cartProduct = JSON.parse(localStorage.getItem("cart")) || [];
    const tokens = JSON.parse(localStorage.getItem('authToken'));
    let localUSER=JSON.parse(localStorage.getItem("user")) || [];
    let store=sessionStorage.getItem('storeID');
    store ='ab25680f-916c-4b25-98cf-02cba5d2c8fa';
    setStoreID(store);
   
    setUser(localUSER);

    if (cartProduct.length == 0) {
      navigate('/products');
    }
    setCartProducts(cartProduct);

    const fetchProduct = async () => {
      try {
        console.log(storeID);
        const response = await axios.get(
          `${apiUrl}/custom/vms/getProducts/${storeID}`,
          {
            headers: {
              'Authorization': `Bearer ${tokens.accessToke}`,
              'accept': '*/*',
              'env': environment,
            },
          }
        );

        let fetchedProduct = response.data;
        console.log(fetchedProduct);

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
      }finally {
        setLoading(false); // Stop loading once data is fetched
      }
    };

    fetchProduct();
    // Set other states
    setTotal(localStorage.getItem("total"));
    setUser(JSON.parse(sessionStorage.getItem("user")));
  }, [storeID]);

 
  const handleCheckout = async () => {
     let localUSER=JSON.parse(localStorage.getItem("user")) || [];
     let tokens=JSON.parse(localStorage.getItem("authToken")) || [];
     let aToken=tokens.accessToke;
     console.log(products);
     console.log(aToken);
  
    const response = await axios.post(
      `${apiUrl}/storedatasync/erp-task`,
      {
        storeId: storeID,
        userId: localUSER.id,
        goal: "dispense",
        details: {
          products: products
        }
      },
      {
        headers: {
          'accept': 'application/json',
          'env': environment,
          'Authorization': `Bearer ${aToken}`,
          'Content-Type': 'application/json'
        }
      }
    )
   
    if (response.status == 201) {
      localStorage.removeItem('cart');
      localStorage.removeItem('total');
      navigate('/PaymentSuccess');
    }

    // navigate('/payment');
  };

  return (
    <div className="h-screen flex flex-col px-6 font-poppins relative">
      <div className="flex items-center justify-between h-20 py-8fixed top-0 left-0 w-full z-10 bg-white">
        <img onClick={() => navigate(`/products/${storeID}`)} src={leftArrow} alt="" className="h-10 w-10" />
        <h1 className="text-lightBlack font-bold text-xl">Checkout</h1>
        <img onClick={() => navigate('/settings')} src={userIcon} alt="" className=" h-8 w-8" />
      </div>

      {loading ? (
        <div className="flex flex-1 items-center justify-center">
          <div className="loader border-t-4 border-blue-500 rounded-full w-12 h-12 animate-spin"></div>
        </div>
      ) : (
        
        <div className="mt-5 flex-1 flex flex-col overflow-y-auto w-full pb-20">
          {cartProducts?.map((product) => (
            <div key={product.productID} className="flex justify-between items-center border-2 border-gray-300 rounded-lg px-4 py-2 mb-4">
              <div className="flex items-center gap-2">
                <img
                  src={product.picture || productDefaultimg}
                  alt={product.title}
                  className="w-14 h-16 object-cover"
                />
                <div className="flex flex-col">
                  <span className="font-bold text-black">{product.title}</span>
                  <span className="text-lightBlack">Qty: {product.productCount}</span>
                  <span className="text-buttonColor font-semibold text-lg">
                    ${product.price}
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

        <div className="flex justify-center items-center fixed bottom-0 left-0 w-full z-10 pb-5 bg-white">
         <button onClick={handleCheckout} className="bg-buttonColor text-white text-center rounded-full px-10 py-3">Pay {total} Rs</button>
        </div>
        </div>
      )}

    </div>
  );
}

export default CheckoutScreen;