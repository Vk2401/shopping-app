import { div } from "framer-motion/client";
import react, { useEffect, useState } from "react";
import { useLocation,useNavigate } from 'react-router-dom';
import leftArrow from '../utils/images/leftArrow.png';
import axios from 'axios';

const CheckoutScreen=()=>{
    const location = useLocation(); 
    const params = new URLSearchParams(location.search);
    const storeID = params.get("storeID"); 
    const navigate = useNavigate();
    const [total,setTotal]=useState(0);
    const [cartProducts,setCartProducts]=useState([]);
    const [user,setUser]=useState({});
    const [products,setProducts]=useState([]);

    useEffect(() => {
      let cartProduct = JSON.parse(localStorage.getItem('cart')) || [];
      setTotal(localStorage.getItem('total'));
      setCartProducts(cartProduct);
      setUser(JSON.parse(sessionStorage.getItem('user')));
    }, []); 
    
    useEffect(() => {
      let proArr=[]
      console.log(cartProducts);
      cartProducts.forEach((pro)=>{
        console.log(pro)
        if(pro.productType=='saleRule'){
          let product={
            productId:pro.productID,
            quantity:pro.totalCount
          }
          proArr.push(product);
        }else{
          let product={
            productId:pro.productID,
            quantity:pro.productCount
          }
          proArr.push(product);
        }
      });

      setProducts(proArr);

    }, [cartProducts, total]); 
    

      const handleCheckout = async () => {
        // Passing selectedProducts to checkout page using `navigate`
        const response =await axios.post(
          'https://devapi-tanlux.storetech.ai/storedatasync/erp-task',
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
              'env': 'demo',
              'Authorization': `Bearer ${sessionStorage.getItem('accessToken')}`,
              'Content-Type': 'application/json'
            }
          }
        )
       
        if(response.status==201){
          navigate('/PaymentSuccess');
          localStorage.removeItem('cart');
          localStorage.removeItem('total');
        }
      };

    return(
       <div className="h-screen flex flex-col px-6 font-poppins relative">
         <div className="flex items-center justify-center relative h-10 py-8">
            <img  onClick={() => navigate('/products')}  src={leftArrow} alt="" className="absolute left-0 h-7 w-7" />
            <h1 className="text-lightBlack font-bold text-xl">Checkout</h1>
         </div>

         <div className="mt-5">
           {/* {cart?.map((product) => (
            <div
            key={product._id}
            className="flex justify-between items-center border-2 border-gray-300 rounded-lg px-4 py-2 mb-4"
            >
            <div className="flex items-center gap-2">
                <img
                src={product.picture || "default-image.jpg"} // Use a default image if no picture exists
                alt={product.title}
                className="w-14 h-16 object-cover"
                />

                <div className="flex flex-col">
                <span className="font-bold text-black">{product.title}</span>
                <span className="text-lightBlack">Qty: {product.quantity}</span>
                <span className="text-buttonColor font-semibold text-lg">
                  ${product.isDiscount 
                    ? ((product.price - (product.price * product.discount) / 100) * product.quantity).toFixed(2)
                    : (product.price * product.quantity).toFixed(2)}
                </span>

                </div>
            </div>

     
            <div className="flex font-semibold items-center justify-center gap-2 border-2 border-gray-400 rounded-full px-8 py-2">
                <span>x</span>
                <span>{product.quantity}</span>
            </div>
            </div>
            ))} */}
         </div>

         <div className="flex justify-center w-full items-center absolute bottom-10  right-0">
           <button  onClick={handleCheckout} className="bg-buttonColor text-white text-center rounded-full px-10 py-3">Pay {total} Rs</button>
         </div>
       </div>
    );
}

export default CheckoutScreen;