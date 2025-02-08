import React, { useContext, useEffect, useState } from "react";
import searchicon from '../utils/images/search.png';
import basketImage from '../utils/images/basket.png';
import { useInfo } from '../context/infoContext.js';
import loader from '../utils/images/loader.gif';
import axios from "axios";
import leftArrow from '../utils/images/leftArrow.png';
import { useLocation as useRouterLocation,useNavigate  } from 'react-router-dom';
import productDefaultimg from '../utils/images/grocery.png';
import discountImag from '../utils/images/discount.png';
import closeImage from '../utils/images/ios-close-circle.png';
import tickMark from '../utils/images/tick.png';

const ProductScreen=()=>{

 
    
   const [showPopup, setShowPopup] = useState(false);
  const storeID='ab25680f-916c-4b25-98cf-02cba5d2c8fa';
  const [loading, setLoading] = useState(true); // Loader state
  const {apiBase,env,refreshTokenFunction}=useInfo();
  const [Products,setProducts]=useState();
  const [accessToken,setAccessToken]=useState('');
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [productCounts, setProductCounts] = useState({});
  const [totalCount, setTotalCount] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [saleruleProduct,setSaleruleProduct]=useState([]);
  const [saleRule,setSalerule]=useState([]);

  const [saleRuleProduct, setSaleRuleProduct] = useState(
    {
      productType: '',
      productID: '',
      totalCount: '',
      saleAppliedCount: '',
      saleRuleNotAppliedCount: '',
      salePrice: 0,
      notSaleRulePrice: 0
    }
  );
  
  const [discountProduct, setDiscountProduct] = useState(
    {
      productType: '',
      productID: '',
      discountRate: '',
      originalAmount: 0,
      price: 0,
      productCount:0
    }
);
  
  const [normalProduct, setNormalProduct] = useState([
    {
      productType: '',
      productID: '',
      productCount: 0,
      price: 0
    }
  ]);
  

  useEffect(() => {
    const addedProducts=JSON.parse(localStorage.getItem("cart"))|| [];

    setTotalCount(addedProducts.length);

    let addedTotal=0;
    addedProducts.forEach(product=>{
      addedTotal=addedTotal+product.price;
    })
    setTotalPrice(addedTotal);

     const fetchProducts = async () => {
          try {

          // const response = await axios.get(          
          //   `${apiBase}/custom/vms/getProducts/${storeID}`,
          //   {
          //     headers: {
          //       'Authorization': `Bearer ${sessionStorage.getItem('accessToken')}`,
          //       'accept': '*/*',
          //       'env': env,
          //     },
          //   }
          // ); 
         

         const response =[{
            "_id": "01JHAA87Z9JV195KW5NR856ZYQ",
            "shopId": "ab25680f-916c-4b25-98cf-02cba5d2c8fa",
            "stripeCode": "434443",
            "sale": true,
            "importedAt": 0,
            "tax": 0,
            "purchasePrice": 15,
            "unitOfMeasure": "ml",
            "salePrice": 0,
            "availableItems": 9,
            "category": "Soft drinks",
            "units": "tagged",
            "price": 30,
            "comparison_weight": 0,
            "stock": {
                "total_value": 555,
                "average": 15,
                "last_restocked": 1737719318830,
                "value": 2490,
                "total_stock": 166,
                "isStock": true,
                "minStock": 0
            },
            "title": "Coca-Cola",
            "wasted": 0,
            "soldItems": 0,
            "saleGroupRules": [
                {
                    "count": 1,
                    "price": 10,
                    "status": "Active"
                },
                {
                    "count": 8,
                    "price": 5,
                    "status": "Active"
                }
    
      ],
            "updateVersion": 0,
            "ageRestriction": "",
            "quantity": 0,
            "isVending": true,
            "discount": 0,
            "priceDiff": 0,
            "originalPrice": 0,
            "noDepoPrice": 0,
            "promote": false,
            "isBagActive": false,
            "sku": "123232",
            "deposit": 5,
            "teaser": "",
            "picture": "https://tanlux.s3.eu-north-1.amazonaws.com/ab25680f-916c-4b25-98cf-02cba5d2c8fa/images/4.png",
            "isGS1": false,
            "expirationDate": "2025-02-08",
            "lastDeliveryDate": "",
            "isDiscount": false,
            "vendingDatas": [],
            "softDelete": false,
            "environment": "demo",
            "noneBarcode": false,
            "receiptName": "",
            "searchText": "coca-cola#434443#123232",
            "meta": {},
            "group": "general",
            "negative_stock": true,
            "isFridge": false,
            "productType": "vending",
            "created": "2025-02-06T05:26:11.035Z",
            "updated": "2025-02-07T11:31:14.510Z"
        },

        {
          "_id": "01JHAA6XD0RZTVAET6FREZ5J7H",
          "shopId": "ab25680f-916c-4b25-98cf-02cba5d2c8fa",
          "stripeCode": "9988893",
          "sale": true,
          "importedAt": 0,
          "tax": 0,
          "purchasePrice": 5,
          "unitOfMeasure": "ml",
          "salePrice": 0,
          "availableItems": 9,
          "category": "Lotion",
          "units": "tagged",
          "price": 20,
          "comparison_weight": 1,
          "stock": {
              "total_value": 50,
              "average": 5,
              "last_restocked": 1736587283140,
              "value": 5,
              "total_stock": 1,
              "isStock": true,
              "minStock": 0
          },
          "title": "Bed Lotoin Two",
          "wasted": 0,
          "soldItems": 0,
          "saleGroupRules": [
              {
                  "count": 1,
                  "price": 10,
                  "status": "Active"
              },
              {
                  "count": 8,
                  "price": 10,
                  "status": "Active"
              }
          ],
          "updateVersion": 0,
          "ageRestriction": "",
          "quantity": 0,
          "isVending": true,
          "discount": 0,
          "priceDiff": 0,
          "originalPrice": 0,
          "noDepoPrice": 0,
          "promote": false,
          "isBagActive": false,
          "sku": "212",
          "deposit": 1,
          "teaser": "",
          "picture": "https://tanlux.s3.eu-north-1.amazonaws.com/ab25680f-916c-4b25-98cf-02cba5d2c8fa/images/face-cream.png",
          "isGS1": false,
          "expirationDate": "",
          "lastDeliveryDate": "",
          "isDiscount": false,
          "vendingDatas": [],
          "softDelete": false,
          "environment": "demo",
          "noneBarcode": false,
          "receiptName": "",
          "searchText": "bed lotoin two#9988893#212",
          "meta": {},
          "group": "general",
          "negative_stock": true,
          "isFridge": false,
          "productType": "vending",
          "created": "2025-02-05T15:01:07.097Z",
          "updated": "2025-02-07T09:55:33.412Z"
      }
          ]
   
          let fetchProduct=response;
          let cart = JSON.parse(localStorage.getItem("cart"))|| [];
          if(cart.length>0){
            fetchProduct.forEach(fPro=>{
              cart.forEach(cartPRO=>{
                if(cartPRO.productID==fPro._id){
                  fPro.quantity=cartPRO.productCount
                }
              })
            })
            setProducts(fetchProduct);
          }else{
            console.log(response);
            setProducts(response); 
          }

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

  const addDiscountProduct = (newProduct) => {
    let cartProduct = JSON.parse(localStorage.getItem('cart')) || [];
    let updatedProduct = null;
  
    // Check if the product already exists
    for (let pro of cartProduct) {
      if (pro.productID === newProduct._id) {
        pro.price += newProduct.price - (newProduct.price * newProduct.discount) / 100;
        pro.productCount += 1; // Increase count
        updatedProduct = pro;
        break;
      }
    }
  
    if (!updatedProduct) {
      updatedProduct = {
        productType: 'discountProduct',
        productID: newProduct._id,
        discountRate: newProduct.discount,
        originalAmount: newProduct.price,
        price: newProduct.price - (newProduct.price * newProduct.discount) / 100,
        productCount: 1
      };
  
      cartProduct.push(updatedProduct);
    }
  
    // Update localStorage with modified cart
    console.log(cartProduct);
    localStorage.setItem('cart', JSON.stringify(cartProduct));
  
    // Reset state
    setDiscountProduct({
      productType: '',
      productID: '',
      discountRate: '',
      originalAmount: 0,
      price: 0,
      productCount: 0
    });

    setProducts(prevProducts =>
      prevProducts.map(pro =>
        pro._id === newProduct._id
          ? { ...pro, quantity: pro.quantity + 1 } // Create a new object with updated quantity
          : pro
      )
    );
    
  };

  const addSaleRuleProduct = (newProduct) => {
    let cartProduct = JSON.parse(localStorage.getItem("cart")) || [];
  
    if (cartProduct.length > 0) {
      let flag = 0;
  
      cartProduct.forEach((cartItem) => {
        if (cartItem.productID === newProduct._id) {
          const rules = newProduct.saleGroupRules;

          // const matchedRule = rules.find(rule => rule.count === newProduct.count);

          rules.some((rule) => {
            if (flag === 1) {
              return true; // Stops the loop
            }
            if (rule.status === "Active") {
              let count = (newProduct.quantity || 0) + 1;
              let remainder = count % rule.count;
              let appliedCount = Math.floor(count / rule.count);
              console.log(remainder);
              console.log(appliedCount);
          
              let notAppliedPrice = remainder * newProduct.price;
              let appliedPrice = appliedCount * rule.price;
          
              cartItem.totalCount = count;
              cartItem.saleAppliedCount = appliedCount;
              cartItem.saleRuleNotAppliedCount = remainder;
              cartItem.salePrice = appliedPrice;
              cartItem.notSaleRulePrice = notAppliedPrice;
          
              flag = 1;
              return true; // Breaks out of the loop
            }
            return false; // Continue looping
          });
          
        }
      });
  
      if (flag === 0) {
        newProduct.saleGroupRules.forEach((rule) => {
          if (rule.status === "Active" && rule.count === 1) {
            const newSaleRuleProduct = {
              productType: "saleRule",
              productID: newProduct._id,
              totalCount: 1,
              saleAppliedCount: 1,
              saleRuleNotAppliedCount: 0,
              salePrice: rule.price,
              notSaleRulePrice: 0,
            };
  
            cartProduct.push(newSaleRuleProduct);
          }
        });
      }
    }
    else{
      newProduct.saleGroupRules.forEach((rule) => {
        if (rule.status === "Active" && rule.count === 1) {
          const newSaleRuleProduct = {
            productType: "saleRule",
            productID: newProduct._id,
            totalCount: 1,
            saleAppliedCount: 1,
            saleRuleNotAppliedCount: 0,
            salePrice: rule.price,
            notSaleRulePrice: 0,
          };

          cartProduct.push(newSaleRuleProduct);
        }
      });
    }
  
    console.log(cartProduct);
    localStorage.setItem("cart", JSON.stringify(cartProduct));

    setProducts(prevProducts =>
      prevProducts.map(pro =>
        pro._id === newProduct._id
          ? { ...pro, quantity: pro.quantity + 1 } // Create a new object with updated quantity
          : pro
      )
    );
  };

  const addNormalProduct=(newProduct)=>{

  }

  const decrementSaleRuleProduct=(newProduct)=>{
    const cartProducts=JSON.parse(localStorage.getItem('cart')) || [];

    cartProducts.forEach((cartProduct)=>{
      if(cartProduct.ProductID==newProduct._id){
        newProduct.quantity=newProduct.quantity-1;
        const rules=newProduct.saleGroupRules;
        if( newProduct.quantity==1){
          rules.forEach((rule)=>{
          if(rule.status=='Active'){
            if(rule.count==1){
                cartProduct.totalCount= 1,
                cartProduct.saleAppliedCount= 1,
                cartProduct.saleRuleNotAppliedCount= 0,
                cartProduct.salePrice= rule.price,
                cartProductnotSaleRulePrice=0
            }
          }
        })
        }else if(newProduct.quantity>1){

          for (let rule of rules) {
            if (rule.status == 'Active') {
              if (!(newProduct.quantity < rule.count)) {
                let count = (newProduct.quantity || 0) + 1;
                let remainder = count % rule.count;
                let appliedCount = Math.floor(count / rule.count);
          
                let notAppliedPrice = remainder * newProduct.price;
                let appliedPrice = appliedCount * rule.price;
          
                cartProduct.totalCount = count;
                cartProduct.saleAppliedCount = appliedCount;
                cartProduct.saleRuleNotAppliedCount = remainder;
                cartProduct.salePrice = appliedPrice;
                cartProduct.notSaleRulePrice = notAppliedPrice;
          
                break; // Exits the loop after this line
              }
            }
          }
        }
        
      }
    })

    localStorage.setItem('cart',JSON.stringify(cartProducts))
  }

  
   const handleAddClick = (product)=>{
    if(product.isDiscount){
      addDiscountProduct(product);
    }
    else if(product.sale && product.salePrice==0 && product.saleGroupRules.length>0){
      addSaleRuleProduct(product);
    }
    else{

    }
   }
    
   const handleIncrement = (Product)=>{
    if(Product.isDiscount){
      addDiscountProduct(Product);
    }
    else if(Product.sale && Product.salePrice==0 && Product.saleGroupRules.length>0){
      addSaleRuleProduct(Product);
    }
    else{

    }
   }

  const handleDecrement = (Product)=>{
    
  }

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
      if(totalPrice>0){
        navigate('/checkout');
      }else{
        window.alert('Please add products to the cart');
      }
     
    };

    const filteredProducts = Products?.filter((product) =>
      product.title.toLowerCase().includes(searchTerm) && product.isVending
    );

    const showSalePopup=(productID)=>{

    const  saleGroupRules=[
        {
            "count": 25,
            "price": 10,
            "status": "Active"
        },
        {
            "count": 8,
            "price": 5,
            "status": "Active"
        }
    ]
      const foundProduct = filteredProducts.find(product => product._id === productID);
      setSaleruleProduct(foundProduct);
      setSalerule(saleGroupRules);
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
                    className="w-full font-semibold py-3 px-5 border-2 border-buttonColor outline-none text-left rounded-full focus:ring-2 focus:ring-orange-500 transition-all"
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

                  <div className="text-black font-bold text-lg">
                      {product.quantity == 0 ? (
                      <button
                          onClick={() => handleAddClick(product)}
                          className=" border-2 border-buttonColor outline-none py-1 px-5 text-center rounded-full"
                      >
                          Add
                      </button>
                      ) : (
                        // {
                        //   (const foundProduct = cart.find(item => item.productID === product.productID); )
                        // }
                      // Find product before JSX

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

          <div className="shadow-[0_0_20px_5px_rgba(255,255,255,0.5)] bg-buttonColor w-full px-3 flex items-center justify-between rounded-md py-5">
                <button
                    onClick={handleCheckout}
                    className="p-2 px-10 font-semibold text-lg bg-white text-black rounded-full text-center"
                >
                    Checkout
                </button>

                <div className="flex items-center text-white font-semibold tracking-wider gap-2">
                  <span>Total <br /> {totalPrice} </span>
                  <div className="h-16 w-16 flex items-center justify-center bg-white rounded-full">
                    <img src={basketImage} alt="" className="h-9 w-9" />
                  </div>
                </div>
          </div>
        </div>
      )}

      {showPopup && (
        <div className="fixed inset-0 flex items-end justify-center bg-black bg-opacity-50 px-5 pb-5 font-poppins">
          <div className="w-full max-h-[500px] bg-white rounded-2xl px-4 py-5">
              <div className="flex items-center justify-between pb-2">
                  <div className="flex  items-center justify-start gap-x-2">
                      <img src={discountImag} alt="" className="h-8 w-8"/>
                      <strong className="tracking-wide">Offers</strong>
                  </div>

                  <img src={closeImage}onClick={() => setShowPopup(false)}  alt="" className="h-8 w-8"/>
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
                            <strong className="text-buttonColor font-semibold">{saleruleProduct.price} $</strong>
                            {/* {saleruleProduct.sale && 
                            <img onClick={(e) => { e.stopPropagation(); showSalePopup(saleruleProduct._id); }} 
                             src={discountImag} alt="Sale" className="h-5 w-5 ml-2" />}   */}
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

                <div className=" font-bold text-lg">
                      {!productCounts[saleruleProduct._id] ? (
                      <button
                          onClick={() => handleAddClick(saleruleProduct)}
                          className="border-2 text-buttonColor border-gray-200 outline-none py-1 px-5 text-center rounded-full"
                      >
                          Add
                      </button>
                      ) : (
                      <div className="flex justify-between gap-4 border-2 border-gray-200 outline-none py-1 px-5 text-center rounded-full">
                          <button className="text-buttonColor" onClick={() => handleDecrement(saleruleProduct)}>-</button>
                          <span>{productCounts[saleruleProduct._id]}</span>
                          <button className="text-buttonColor" onClick={() => handleIncrement(saleruleProduct)}>+</button>
                      </div>
                      )}
                </div>
              </div>

              <div className="flex flex-col gap-3">
              {saleRule
              .filter(rule => rule.status === 'Active') // Filter only active rules
              .map((rule, index) => {
                const isActive = productCounts[saleruleProduct._id] === rule.count; // Check condition

                return (
                  <div 
                    key={index} 
                    className={`flex border-2 border-gray-200 rounded-md items-center justify-center relative p-2 py-3 
                      ${isActive ? 'bg-buttonColor text-white' : 'text-gray-400'}`} // Apply conditional styles
                  >
                    <p className="text-lg">BUY <span>{rule.count}</span> FOR <span className="font-semibold">{rule.price} Rs</span></p>
                    <img src={tickMark} alt="" className={` h-7 w-7 rounded-full absolute right-2 ${isActive ? 'block' : 'hidden'}`}/>
                  </div>
                );
              })
            }

              </div>
          </div> 
        </div>
      )}
    </div>
    );
}

export default ProductScreen;