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
  const Distance = process.env.REACT_APP_DISTANCE
  const environment = process.env.REACT_APP_ENVIRONMENT
  const [cartProducts, setCartProducts] = useState([]);
  const [storeID, setStoreID] = useState('');
  const [currence, setCurrence] = useState('SEK');

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/');
    }
    setCurrence(localStorage.getItem('currence'));
    let cartProduct = JSON.parse(localStorage.getItem("cart")) || [];
    const tokens = JSON.parse(localStorage.getItem('authToken'));
    let localUSER = JSON.parse(localStorage.getItem("user")) || [];
    let store = sessionStorage.getItem('storeID');
    store = 'ab25680f-916c-4b25-98cf-02cba5d2c8fa';
    setStoreID(store);
    setUser(localUSER);

    if (cartProduct.length == 0) {
      navigate('/products');
    }

    setCartProducts(cartProduct);

    const fetchProduct = async () => {
      try {
        // const response = await axios.get(
        //   `${apiUrl}/vms/getProducts/${storeID}`,
        //   {
        //     headers: {
        //       'Authorization': `Bearer ${tokens.accessToke}`,
        //       'accept': '*/*',
        //       'env': environment,
        //     },
        //   }
        // );

        // let fetchedProduct = response.data;

        const response=[
          {
              "_id": "01JHAA5CC9A2HBK67PD9BM0N21",
              "shopId": "ab25680f-916c-4b25-98cf-02cba5d2c8fa",
              "stripeCode": "123455",
              "sale": false,
              "importedAt": 0,
              "tax": 0,
              "purchasePrice": 5,
              "unitOfMeasure": "ml",
              "salePrice": 0,
              "availableItems": 7,
              "category": "Lotion",
              "units": "tagged",
              "price": 10,
              "comparison_weight": 1,
              "stock": {
                  "total_value": 50,
                  "average": 5,
                  "last_restocked": 1736586947012,
                  "value": 0,
                  "total_stock": 0,
                  "isStock": true,
                  "minStock": 0
              },
              "title": "Tanning Lotion",
              "wasted": 0,
              "soldItems": 0,
              "saleGroupRules": [],
              "updateVersion": 0,
              "ageRestriction": "",
              "quantity": 0,
              "isVending": true,
              "discount": 0,
              "priceDiff": 0,
              "originalPrice": 0,
              "noDepoPrice": 0,
              "promote": true,
              "isBagActive": false,
              "sku": "4453",
              "deposit": 5,
              "teaser": "",
              "picture": "https://tanlux.s3.eu-north-1.amazonaws.com/ab25680f-916c-4b25-98cf-02cba5d2c8fa/images/ic_at_dawn.png",
              "isGS1": false,
              "expirationDate": "",
              "lastDeliveryDate": "",
              "isDiscount": false,
              "vendingDatas": [],
              "softDelete": false,
              "environment": "demo",
              "noneBarcode": false,
              "receiptName": "Tanning Lotion",
              "searchText": "tanning lotion#123455#4453",
              "meta": {},
              "group": "general",
              "negative_stock": true,
              "isFridge": false,
              "productType": "vending",
              "created": "2025-02-10T06:27:03.072Z",
              "updated": "2025-02-10T06:27:03.072Z"
          },
          {
              "_id": "01JJ14X3K87WTF0XKNFYQGEAB9",
              "shopId": "ab25680f-916c-4b25-98cf-02cba5d2c8fa",
              "stripeCode": "5654656",
              "sale": false,
              "importedAt": 0,
              "tax": 0,
              "purchasePrice": 1,
              "unitOfMeasure": "ml",
              "salePrice": 2.94,
              "availableItems": 14,
              "category": "UNCATEGORY",
              "units": "tagged",
              "price": 3,
              "comparison_weight": 0,
              "stock": {
                  "total_value": 56,
                  "average": 1,
                  "last_restocked": 1738157875939,
                  "value": 29,
                  "total_stock": 29,
                  "isStock": true,
                  "minStock": 0
              },
              "title": "Aqualogica sun screen",
              "wasted": 0,
              "soldItems": 0,
              "saleGroupRules": [],
              "updateVersion": 0,
              "ageRestriction": "",
              "quantity": 0,
              "isVending": true,
              "discount": 2,
              "priceDiff": 0,
              "originalPrice": 0,
              "noDepoPrice": 0,
              "promote": true,
              "isBagActive": true,
              "sku": "798989",
              "deposit": 25.8,
              "teaser": "",
              "picture": "",
              "isGS1": false,
              "expirationDate": "",
              "lastDeliveryDate": "",
              "isDiscount": false,
              "vendingDatas": [],
              "softDelete": false,
              "environment": "demo",
              "noneBarcode": false,
              "receiptName": "prakash",
              "searchText": "aqualogica sun screen#5654656#798989",
              "meta": {},
              "group": "general",
              "negative_stock": true,
              "isFridge": false,
              "productType": "vending",
              "created": "2025-02-10T06:27:02.985Z",
              "updated": "2025-02-10T06:27:02.985Z"
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
                      "count": 4,
                      "price": 7,
                      "status": "Active"
                  },
                  {
                      "count": 6,
                      "price": 9,
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
              "created": "2025-02-10T06:27:03.011Z",
              "updated": "2025-02-10T06:27:03.011Z"
          },
          {
              "_id": "01JJ153HGAXQWP7RGTS61TZBAX",
              "shopId": "ab25680f-916c-4b25-98cf-02cba5d2c8fa",
              "stripeCode": "8779",
              "sale": true,
              "importedAt": 0,
              "tax": 0,
              "purchasePrice": 0,
              "unitOfMeasure": "ml",
              "salePrice": 0,
              "availableItems": 9,
              "category": "Lotion",
              "units": "tagged",
              "price": 1,
              "comparison_weight": 0,
              "stock": {
                  "total_value": 0,
                  "average": 0,
                  "value": 0,
                  "total_stock": 22,
                  "isStock": true,
                  "minStock": 0
              },
              "title": "De tan lotion",
              "wasted": 0,
              "soldItems": 0,
              "saleGroupRules": [
                  {
                      "count": 1,
                      "price": 3,
                      "status": "Active"
                  },,
                  {
                      "count": 5,
                      "price": 10,
                      "status": "Active"
                  },
                  {
                      "count": 8,
                      "price": 15,
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
              "sku": "76887",
              "deposit": 0,
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
              "searchText": "de tan lotion#8779#76887",
              "meta": {},
              "group": "general",
              "negative_stock": true,
              "isFridge": false,
              "productType": "vending",
              "created": "2025-02-10T06:27:03.038Z",
              "updated": "2025-02-10T06:27:03.038Z"
          },
          {
              "_id": "01JJ1B0ZBVYZ0GM8WK197NB11X",
              "shopId": "ab25680f-916c-4b25-98cf-02cba5d2c8fa",
              "stripeCode": "7667676",
              "sale": false,
              "importedAt": 0,
              "tax": 0,
              "purchasePrice": 0,
              "unitOfMeasure": "ml",
              "salePrice": 0,
              "availableItems": 9,
              "category": "Shower gel",
              "units": "tagged",
              "price": 2,
              "comparison_weight": 0,
              "stock": {
                  "total_value": 0,
                  "average": 0,
                  "value": 0,
                  "total_stock": 0,
                  "isStock": true,
                  "minStock": 0
              },
              "title": "De Tan gel",
              "wasted": 0,
              "soldItems": 0,
              "saleGroupRules": [],
              "updateVersion": 0,
              "ageRestriction": "",
              "quantity": 0,
              "isVending": true,
              "discount": 5,
              "priceDiff": 0,
              "originalPrice": 0,
              "noDepoPrice": 0,
              "promote": false,
              "isBagActive": false,
              "sku": "78798",
              "deposit": 0,
              "teaser": "",
              "picture": "",
              "isGS1": false,
              "expirationDate": "",
              "lastDeliveryDate": "",
              "isDiscount": true,
              "vendingDatas": [],
              "softDelete": false,
              "environment": "demo",
              "noneBarcode": false,
              "receiptName": "",
              "searchText": "de tan gel#7667676#78798",
              "meta": {},
              "group": "general",
              "negative_stock": true,
              "isFridge": false,
              "productType": "vending",
              "created": "2025-02-10T06:27:03.023Z",
              "updated": "2025-02-10T06:27:03.023Z"
          },
          {
              "_id": "01JJC1Z3D2CDJWWWKA5005NNEM",
              "shopId": "ab25680f-916c-4b25-98cf-02cba5d2c8fa",
              "stripeCode": "1231231231211",
              "sale": false,
              "importedAt": 0,
              "tax": 0,
              "purchasePrice": 5,
              "unitOfMeasure": "kg",
              "salePrice": 0,
              "availableItems": 10,
              "category": "Sun screen",
              "units": "tagged",
              "price": 30,
              "comparison_weight": 2,
              "stock": {
                  "total_value": 150,
                  "average": 5,
                  "value": 115,
                  "total_stock": 23,
                  "isStock": true,
                  "minStock": 0
              },
              "title": "sun screen 1",
              "wasted": 0,
              "soldItems": 0,
              "saleGroupRules": [],
              "updateVersion": 0,
              "ageRestriction": "",
              "quantity": 0,
              "isVending": true,
              "discount": 3,
              "priceDiff": 0,
              "originalPrice": 0,
              "noDepoPrice": 0,
              "promote": false,
              "isBagActive": false,
              "sku": "11212",
              "deposit": 5,
              "teaser": "",
              "picture": "",
              "isGS1": false,
              "expirationDate": "",
              "lastDeliveryDate": "",
              "isDiscount": true,
              "vendingDatas": [],
              "softDelete": false,
              "environment": "demo",
              "noneBarcode": false,
              "receiptName": "",
              "searchText": "sun screen 1#1231231231211#11212",
              "meta": {},
              "group": "general",
              "negative_stock": true,
              "isFridge": false,
              "productType": "vending",
              "created": "2025-02-10T06:27:03.069Z",
              "updated": "2025-02-10T06:27:03.069Z"
          }
      ]
      
      const fetchedProduct=response;

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
        console.log();

      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false); // Stop loading once data is fetched
      }
    };

    fetchProduct();
    // Set other states
    setTotal(localStorage.getItem("total"));
    setUser(JSON.parse(sessionStorage.getItem("user")));
  }, [storeID]);

  const handleCheckout = async () => {
    let localUSER = JSON.parse(localStorage.getItem("user")) || [];
    let tokens = JSON.parse(localStorage.getItem("authToken")) || [];
    let aToken = tokens.accessToke;
    console.log(products);


    // const response = await axios.post(
    //   `${apiUrl}/storedatasync/erp-task`,
    //   {
    //     storeId: storeID,
    //     userId: localUSER.id,
    //     goal: "dispense",
    //     details: {
    //       products: products
    //     }
    //   },
    //   {
    //     headers: {
    //       'accept': 'application/json',
    //       'env': environment,
    //       'Authorization': `Bearer ${aToken}`,
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
                    <div key={ruleIndex} className="flex justify-between items-center border-2 border-green-300 rounded-lg px-4 py-2 mb-4">
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
            <button onClick={handleCheckout} className="bg-buttonColor text-white text-center rounded-full px-10 py-3">Pay {total} Rs</button>
          </div>
        </div>
      )}

    </div>
  );
}

export default CheckoutScreen;