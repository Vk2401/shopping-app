import React, { useContext, useEffect, useState } from "react";
import searchicon from '../utils/images/search.png';
import basketImage from '../utils/images/basket.png';
import { useAuth } from "../context/AuthContext.js";
import loader from '../utils/images/loader.gif';
import leftArrow from '../utils/images/leftArrow.png';
import { useNavigate } from 'react-router-dom';
import productDefaultimg from '../utils/images/grocery.png';
import discountImag from '../utils/images/discount.png';
import closeImage from '../utils/images/ios-close-circle.png';
import tickMark from '../utils/images/tick.png';
import userIcon from '../utils/images/FontAwosemUser.png';
import axios from "axios";
import empty from '../utils/images/ProductsNotFoundpng.png';
import noProductImage from '../utils/images/ProductsNotFoundpng.png';
import { updateDicsountProductInCart, updateNormalProductIncart, updateSaleRuleProductInCart } from '../utils/cartUtils';

const ProductScreen = () => {
  const apiUrl = process.env.REACT_APP_API_URL
  const environment = process.env.REACT_APP_ENVIRONMENT
  const [storeID, setStoreid] = useState('');
  const [noProduct, setNoproduct] = useState(false);
  const { isAuthenticated } = useAuth();
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

  useEffect(() => {

    if (!isAuthenticated) {
      navigate("/");
    }
    else {
      getCurrectLocation();

      const addedProducts = JSON.parse(localStorage.getItem("cart")) || [];
      const aToken = JSON.parse(sessionStorage.getItem('accessToken'));
      const rToken = JSON.parse(sessionStorage.getItem('v'));

      const total = localStorage.getItem('total') || 0;

      // const storeID=localStorage.getItem('storeID');
      const storeID = 'ab25680f-916c-4b25-98cf-02cba5d2c8fa';
      setStoreid(storeID);
      setTotalCount(addedProducts.length);
      setTotalPrice(total);

      const fetchProducts = async () => {
        try {

          const response = await axios.get(
            `${apiUrl}/vms/getProducts/${storeID}`,
            {
              headers: {
                'Authorization': `Bearer ${aToken.accessToke}`,
                'accept': '*/*',
                'env': environment,
              },
            }
          );

          // const response = [
          //   {
          //     "_id": "01JHAA5CC9A2HBK67PD9BM0N21",
          //     "shopId": "ab25680f-916c-4b25-98cf-02cba5d2c8fa",
          //     "stripeCode": "123455",
          //     "sale": false,
          //     "importedAt": 0,
          //     "tax": 0,
          //     "purchasePrice": 5,
          //     "unitOfMeasure": "ml",
          //     "salePrice": 0,
          //     "availableItems": 7,
          //     "category": "Lotion",
          //     "units": "tagged",
          //     "price": 10,
          //     "comparison_weight": 1,
          //     "stock": {
          //       "total_value": 50,
          //       "average": 5,
          //       "last_restocked": 1736586947012,
          //       "value": 0,
          //       "total_stock": 0,
          //       "isStock": true,
          //       "minStock": 0
          //     },
          //     "title": "Tanning Lotion",
          //     "wasted": 0,
          //     "soldItems": 0,
          //     "saleGroupRules": [],
          //     "updateVersion": 0,
          //     "ageRestriction": "",
          //     "quantity": 0,
          //     "isVending": true,
          //     "discount": 0,
          //     "priceDiff": 0,
          //     "originalPrice": 0,
          //     "noDepoPrice": 0,
          //     "promote": true,
          //     "isBagActive": false,
          //     "sku": "4453",
          //     "deposit": 5,
          //     "teaser": "",
          //     "picture": "https://tanlux.s3.eu-north-1.amazonaws.com/ab25680f-916c-4b25-98cf-02cba5d2c8fa/images/ic_at_dawn.png",
          //     "isGS1": false,
          //     "expirationDate": "",
          //     "lastDeliveryDate": "",
          //     "isDiscount": false,
          //     "vendingDatas": [],
          //     "softDelete": false,
          //     "environment": "demo",
          //     "noneBarcode": false,
          //     "receiptName": "Tanning Lotion",
          //     "searchText": "tanning lotion#123455#4453",
          //     "meta": {},
          //     "group": "general",
          //     "negative_stock": true,
          //     "isFridge": false,
          //     "productType": "vending",
          //     "created": "2025-02-10T06:27:03.072Z",
          //     "updated": "2025-02-10T06:27:03.072Z"
          //   },
          //   {
          //     "_id": "01JJ14X3K87WTF0XKNFYQGEAB9",
          //     "shopId": "ab25680f-916c-4b25-98cf-02cba5d2c8fa",
          //     "stripeCode": "5654656",
          //     "sale": false,
          //     "importedAt": 0,
          //     "tax": 0,
          //     "purchasePrice": 1,
          //     "unitOfMeasure": "ml",
          //     "salePrice": 2.94,
          //     "availableItems": 14,
          //     "category": "UNCATEGORY",
          //     "units": "tagged",
          //     "price": 3,
          //     "comparison_weight": 0,
          //     "stock": {
          //       "total_value": 56,
          //       "average": 1,
          //       "last_restocked": 1738157875939,
          //       "value": 29,
          //       "total_stock": 29,
          //       "isStock": true,
          //       "minStock": 0
          //     },
          //     "title": "Aqualogica sun screen",
          //     "wasted": 0,
          //     "soldItems": 0,
          //     "saleGroupRules": [],
          //     "updateVersion": 0,
          //     "ageRestriction": "",
          //     "quantity": 0,
          //     "isVending": true,
          //     "discount": 2,
          //     "priceDiff": 0,
          //     "originalPrice": 0,
          //     "noDepoPrice": 0,
          //     "promote": true,
          //     "isBagActive": true,
          //     "sku": "798989",
          //     "deposit": 25.8,
          //     "teaser": "",
          //     "picture": "",
          //     "isGS1": false,
          //     "expirationDate": "",
          //     "lastDeliveryDate": "",
          //     "isDiscount": false,
          //     "vendingDatas": [],
          //     "softDelete": false,
          //     "environment": "demo",
          //     "noneBarcode": false,
          //     "receiptName": "prakash",
          //     "searchText": "aqualogica sun screen#5654656#798989",
          //     "meta": {},
          //     "group": "general",
          //     "negative_stock": true,
          //     "isFridge": false,
          //     "productType": "vending",
          //     "created": "2025-02-10T06:27:02.985Z",
          //     "updated": "2025-02-10T06:27:02.985Z"
          //   },
          //   {
          //     "_id": "01JHAA6XD0RZTVAET6FREZ5J7H",
          //     "shopId": "ab25680f-916c-4b25-98cf-02cba5d2c8fa",
          //     "stripeCode": "9988893",
          //     "sale": true,
          //     "importedAt": 0,
          //     "tax": 0,
          //     "purchasePrice": 5,
          //     "unitOfMeasure": "ml",
          //     "salePrice": 0,
          //     "availableItems": 9,
          //     "category": "Lotion",
          //     "units": "tagged",
          //     "price": 20,
          //     "comparison_weight": 1,
          //     "stock": {
          //       "total_value": 50,
          //       "average": 5,
          //       "last_restocked": 1736587283140,
          //       "value": 5,
          //       "total_stock": 1,
          //       "isStock": true,
          //       "minStock": 0
          //     },
          //     "title": "Bed Lotoin Two",
          //     "wasted": 0,
          //     "soldItems": 0,
          //     "saleGroupRules": [
          //       {
          //         "count": 8,
          //         "price": 10,
          //         "status": "Active"
          //       },
          //       // {
          //       //       "count": 2,
          //       //       "price": 7,
          //       //       "status": "Active"
          //       // },
          //       {
          //         "count": 4,
          //         "price": 9,
          //         "status": "Active"
          //       },
          //       // {
          //       //     "count": 1,
          //       //     "price": 3,
          //       //     "status": "Active"
          //       // }
          //     ],
          //     "updateVersion": 0,
          //     "ageRestriction": "",
          //     "quantity": 0,
          //     "isVending": true,
          //     "discount": 0,
          //     "priceDiff": 0,
          //     "originalPrice": 0,
          //     "noDepoPrice": 0,
          //     "promote": false,
          //     "isBagActive": false,
          //     "sku": "212",
          //     "deposit": 1,
          //     "teaser": "",
          //     "picture": "https://tanlux.s3.eu-north-1.amazonaws.com/ab25680f-916c-4b25-98cf-02cba5d2c8fa/images/face-cream.png",
          //     "isGS1": false,
          //     "expirationDate": "",
          //     "lastDeliveryDate": "",
          //     "isDiscount": false,
          //     "vendingDatas": [],
          //     "softDelete": false,
          //     "environment": "demo",
          //     "noneBarcode": false,
          //     "receiptName": "",
          //     "searchText": "bed lotoin two#9988893#212",
          //     "meta": {},
          //     "group": "general",
          //     "negative_stock": true,
          //     "isFridge": false,
          //     "productType": "vending",
          //     "created": "2025-02-10T06:27:03.011Z",
          //     "updated": "2025-02-10T06:27:03.011Z"
          //   },
          //   {
          //     "_id": "01JJ153HGAXQWP7RGTS61TZBAX",
          //     "shopId": "ab25680f-916c-4b25-98cf-02cba5d2c8fa",
          //     "stripeCode": "8779",
          //     "sale": true,
          //     "importedAt": 0,
          //     "tax": 0,
          //     "purchasePrice": 0,
          //     "unitOfMeasure": "ml",
          //     "salePrice": 0,
          //     "availableItems": 9,
          //     "category": "Lotion",
          //     "units": "tagged",
          //     "price": 1,
          //     "comparison_weight": 0,
          //     "stock": {
          //       "total_value": 0,
          //       "average": 0,
          //       "value": 0,
          //       "total_stock": 22,
          //       "isStock": true,
          //       "minStock": 0
          //     },
          //     "title": "De tan lotion",
          //     "wasted": 0,
          //     "soldItems": 0,
          //     "saleGroupRules": [
          //       {
          //         "count": 1,
          //         "price": 3,
          //         "status": "Active"
          //       }, ,
          //       {
          //         "count": 5,
          //         "price": 10,
          //         "status": "Active"
          //       },
          //       {
          //         "count": 8,
          //         "price": 15,
          //         "status": "Active"
          //       }
          //     ],
          //     "updateVersion": 0,
          //     "ageRestriction": "",
          //     "quantity": 0,
          //     "isVending": true,
          //     "discount": 0,
          //     "priceDiff": 0,
          //     "originalPrice": 0,
          //     "noDepoPrice": 0,
          //     "promote": false,
          //     "isBagActive": false,
          //     "sku": "76887",
          //     "deposit": 0,
          //     "teaser": "",
          //     "picture": "https://tanlux.s3.eu-north-1.amazonaws.com/ab25680f-916c-4b25-98cf-02cba5d2c8fa/images/face-cream.png",
          //     "isGS1": false,
          //     "expirationDate": "",
          //     "lastDeliveryDate": "",
          //     "isDiscount": false,
          //     "vendingDatas": [],
          //     "softDelete": false,
          //     "environment": "demo",
          //     "noneBarcode": false,
          //     "receiptName": "",
          //     "searchText": "de tan lotion#8779#76887",
          //     "meta": {},
          //     "group": "general",
          //     "negative_stock": true,
          //     "isFridge": false,
          //     "productType": "vending",
          //     "created": "2025-02-10T06:27:03.038Z",
          //     "updated": "2025-02-10T06:27:03.038Z"
          //   },
          //   {
          //     "_id": "01JJ1B0ZBVYZ0GM8WK197NB11X",
          //     "shopId": "ab25680f-916c-4b25-98cf-02cba5d2c8fa",
          //     "stripeCode": "7667676",
          //     "sale": false,
          //     "importedAt": 0,
          //     "tax": 0,
          //     "purchasePrice": 0,
          //     "unitOfMeasure": "ml",
          //     "salePrice": 0,
          //     "availableItems": 9,
          //     "category": "Shower gel",
          //     "units": "tagged",
          //     "price": 2,
          //     "comparison_weight": 0,
          //     "stock": {
          //       "total_value": 0,
          //       "average": 0,
          //       "value": 0,
          //       "total_stock": 0,
          //       "isStock": true,
          //       "minStock": 0
          //     },
          //     "title": "De Tan gel",
          //     "wasted": 0,
          //     "soldItems": 0,
          //     "saleGroupRules": [],
          //     "updateVersion": 0,
          //     "ageRestriction": "",
          //     "quantity": 0,
          //     "isVending": true,
          //     "discount": 5,
          //     "priceDiff": 0,
          //     "originalPrice": 0,
          //     "noDepoPrice": 0,
          //     "promote": false,
          //     "isBagActive": false,
          //     "sku": "78798",
          //     "deposit": 0,
          //     "teaser": "",
          //     "picture": "",
          //     "isGS1": false,
          //     "expirationDate": "",
          //     "lastDeliveryDate": "",
          //     "isDiscount": true,
          //     "vendingDatas": [],
          //     "softDelete": false,
          //     "environment": "demo",
          //     "noneBarcode": false,
          //     "receiptName": "",
          //     "searchText": "de tan gel#7667676#78798",
          //     "meta": {},
          //     "group": "general",
          //     "negative_stock": true,
          //     "isFridge": false,
          //     "productType": "vending",
          //     "created": "2025-02-10T06:27:03.023Z",
          //     "updated": "2025-02-10T06:27:03.023Z"
          //   },
          //   {
          //     "_id": "01JJC1Z3D2CDJWWWKA5005NNEM",
          //     "shopId": "ab25680f-916c-4b25-98cf-02cba5d2c8fa",
          //     "stripeCode": "1231231231211",
          //     "sale": false,
          //     "importedAt": 0,
          //     "tax": 0,
          //     "purchasePrice": 5,
          //     "unitOfMeasure": "kg",
          //     "salePrice": 0,
          //     "availableItems": 10,
          //     "category": "Sun screen",
          //     "units": "tagged",
          //     "price": 30,
          //     "comparison_weight": 2,
          //     "stock": {
          //       "total_value": 150,
          //       "average": 5,
          //       "value": 115,
          //       "total_stock": 23,
          //       "isStock": true,
          //       "minStock": 0
          //     },
          //     "title": "sun screen 1",
          //     "wasted": 0,
          //     "soldItems": 0,
          //     "saleGroupRules": [],
          //     "updateVersion": 0,
          //     "ageRestriction": "",
          //     "quantity": 0,
          //     "isVending": true,
          //     "discount": 3,
          //     "priceDiff": 0,
          //     "originalPrice": 0,
          //     "noDepoPrice": 0,
          //     "promote": false,
          //     "isBagActive": false,
          //     "sku": "11212",
          //     "deposit": 5,
          //     "teaser": "",
          //     "picture": "",
          //     "isGS1": false,
          //     "expirationDate": "",
          //     "lastDeliveryDate": "",
          //     "isDiscount": true,
          //     "vendingDatas": [],
          //     "softDelete": false,
          //     "environment": "demo",
          //     "noneBarcode": false,
          //     "receiptName": "",
          //     "searchText": "sun screen 1#1231231231211#11212",
          //     "meta": {},
          //     "group": "general",
          //     "negative_stock": true,
          //     "isFridge": false,
          //     "productType": "vending",
          //     "created": "2025-02-10T06:27:03.069Z",
          //     "updated": "2025-02-10T06:27:03.069Z"
          //   }
          // ]

          response.data.forEach((prod) => {
            if (prod.quantity === undefined) {
              prod.quantity = 0; // Set quantity to 0 if undefined
            }
          })

          let fetchProduct = response.data;
          if (fetchProduct.length == 0) {
            setisProductfetched(true);
          }

          let cart = JSON.parse(localStorage.getItem("cart")) || [];

          if (cart.length > 0) {

            fetchProduct.forEach(fPro => {
              cart.forEach(cartPRO => {
                if (cartPRO.productID == fPro._id) {
                  if (cartPRO.productType == 'saleRule') {
                    fPro.quantity = (fPro.quantity ?? 0) + cartPRO.totalCount;
                  }
                  else {
                    fPro.quantity = (fPro.quantity ?? 0) + cartPRO.productCount;
                  }
                }
              })
            })

            setProducts(fetchProduct);

          } else {
            setProducts(response.data);
          }

        } catch (error) {
          if (error.status == 401) {
          }
          console.error('Error fetching products:', error);
        }
        finally {
          setLoading(false);
        }
      };

      const fetchCurrence = async () => {

        const correnc = await axios.get(`${apiUrl}/settings/${storeID}/preferences`,
          {
            headers: {
              'Authorization': `Bearer ${aToken.accessToke}`,
              'accept': '*/*',
              'env': environment,
            },
          }
        );
        const currencyExists = correnc.data.value.hasOwnProperty('currency');

        if (currencyExists) {
          if (correnc.data.value !== '') {
            setCurrence(correnc.data.value.currency)
          }
        }
        localStorage.setItem('currence', currence);
      }

      fetchCurrence();
      fetchProducts();
    }

  }, [])

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

  // const findSaleRules = (Product, quantity) => {
  //   let flag = 0;
  //   let rules = Product.saleGroupRules;
  //   rules.sort((a, b) => b.count - a.count);
  //   let tempArr = [];
  //   let tempQuantity = quantity;

  //   rules.forEach(rule => {

  //     let tempObj = {
  //       productQuantiy: 0,
  //       saleRule: rule,
  //       isNearby: false,
  //       isSaleApplied: false,
  //     }

  //     if ((tempQuantity + 1) % rule.count == 0 && flag == 0) {
  //       tempObj.isNearby = true;
  //       flag = 1;
  //     }

  //     if (rule.status == 'Active' && rule.count <= tempQuantity) {

  //       let saleAppliedQuantiy = Math.floor(tempQuantity / rule.count);
  //       let saleNotAppliedQuantity = tempQuantity % rule.count;
  //       tempObj.productQuantiy = saleAppliedQuantiy;
  //       tempObj.isSaleApplied = true;

  //       saleNotAppliedQuantity = saleNotAppliedQuantity + 1;
  //       tempQuantity = tempQuantity - (saleAppliedQuantiy * rule.count);

  //     }

  //     tempArr.push(tempObj);
  //   })

  //   return tempArr;
  // }

  // const findSaleRuleProductTOtal = (Product, Quantity) => {
  //   // Calculate total count and total price
  //   const { totalCount, totalPrice } = Product.saleRuleDetails.reduce((acc, detail) => {
  //     if (detail.productQuantiy !== 0) {
  //       acc.totalCount += detail.productQuantiy * detail.saleRule.count;
  //       acc.totalPrice += detail.productQuantiy * detail.saleRule.price;
  //     }
  //     return acc;
  //   }, { totalCount: 0, totalPrice: 0 });


  //   let a = Product.totalCount - totalCount;
  //   a = a * Product.productPrice;
  //   a = a + totalPrice;

  //   return a;

  // }

  // const addSaleRuleProduct = (Product, operation) => {
  //   let cartProducts = JSON.parse(localStorage.getItem("cart")) || [];
  //   let updatedCartProducts = [];
  //   let resultArr = [];
  //   let newProductQuantity;

  //   const saleRuleProduct = {
  //     productType: 'saleRule',
  //     productID: Product._id,
  //     productPrice: Product.price,
  //     totalPrice: Product.price,
  //     totalCount: 1,
  //     saleRuleDetails: null,
  //   }

  //   newProductQuantity = operation === '-' ? --Product.quantity : ++Product.quantity;

  //   if (cartProducts.length == 0) {
  //     resultArr = findSaleRules(Product, newProductQuantity);
  //     saleRuleProduct.saleRuleDetails = resultArr;
  //     saleRuleProduct.totalPrice = findSaleRuleProductTOtal(saleRuleProduct, newProductQuantity);
  //     updatedCartProducts.push(saleRuleProduct);
  //   } else {

  //     updatedCartProducts = cartProducts.filter(pro => pro.productID !== Product._id);
  //     resultArr = findSaleRules(Product, newProductQuantity);
  //     saleRuleProduct.saleRuleDetails = resultArr;

  //     if (newProductQuantity != 0) {
  //       resultArr = findSaleRules(Product, newProductQuantity);
  //       saleRuleProduct.saleRuleDetails = resultArr;
  //       saleRuleProduct.totalCount = newProductQuantity;
  //       saleRuleProduct.totalPrice = findSaleRuleProductTOtal(saleRuleProduct, newProductQuantity);
  //       updatedCartProducts.push(saleRuleProduct);
  //     }

  //   }

  //   Product.saleGroupRules = Product.saleGroupRules.map(rule => {
  //     let matchingRule = resultArr.find(res => res.saleRule.count === rule.count);

  //     if (matchingRule) {
  //       return {
  //         ...rule,
  //         isSaleApplied: matchingRule.isSaleApplied,
  //         isNearby: matchingRule.isNearby
  //       };
  //     }

  //     return rule; // If no match, return original object
  //   })

  //   setSalerule(Product.saleGroupRules);
  //   let total = findTotal(updatedCartProducts, '+');
  //   setTotalPrice(total);

  //   setProducts(prevProducts =>
  //     prevProducts.map(pro =>
  //       pro._id === Product._id
  //         ? { ...pro, quantity: newProductQuantity } // Creates a new object (safer for React state updates)
  //         : pro
  //     )
  //   );

  //   localStorage.setItem('total', total);
  //   localStorage.setItem('cart', JSON.stringify(updatedCartProducts));
  // }

  // const findTotal = (cartProducts, op) => {
  //   let totalPrice = 0;
  //   let totalCount = 0;

  //   if (cartProducts.length == 0) {
  //     return totalPrice;
  //   }

  //   cartProducts.forEach((pro) => {
  //     if (pro.productType == 'saleRule') {
  //       totalPrice += pro.totalPrice;
  //     }
  //     else {
  //       totalPrice += pro.price;
  //     }
  //   })
  //   return totalPrice.toFixed(1);
  // }

  // const updateDicsountProductInCart = (newProduct, action) => {
  //   let cartProducts = JSON.parse(localStorage.getItem('cart')) || [];

  //   let dpOBJ = {
  //     productType: 'discountProduct',
  //     productID: newProduct._id,
  //     discountRate: newProduct.discount,
  //     originalAmount: newProduct.price,
  //     price: newProduct.price - (newProduct.price * newProduct.discount) / 100,
  //     productCount: 1
  //   };

  //   let newQuantity = action === '+' ? newProduct.quantity + 1 : newProduct.quantity - 1;

  //   if (cartProducts.length!=0) {
  //     cartProducts = cartProducts.filter(pro => pro.productID !== newProduct._id);

  //     if (newQuantity != 0) {
  //       dpOBJ.productCount = newQuantity;
  //       dpOBJ.price = newQuantity * (newProduct.price - (newProduct.price * newProduct.discount) / 100);
  //       cartProducts.push(dpOBJ);
  //     }
  //   }else{
  //     cartProducts.push(dpOBJ);
  //   }
    
  //   let total = findTotal(cartProducts, '+');
  //   setTotalPrice(total);
  //   localStorage.setItem('total', total);
  //   localStorage.setItem('cart', JSON.stringify(cartProducts));

  //   setProducts(prevProducts =>
  //     prevProducts.map(pro =>
  //       pro._id === newProduct._id
  //         ? { ...pro, quantity: newQuantity }
  //         : pro
  //     )
  //   );

  // }

  // const updateNormalProductIncart = (newProduct, action) => {
  //   let npOBJ = {
  //     productType: 'NormalProduct',
  //     productID: newProduct._id,
  //     productCount: 1,
  //     price: newProduct.price
  //   }

  //   let cartProducts = JSON.parse(localStorage.getItem('cart')) || [];
  //   let newQuantity = action === '+' ? newProduct.quantity + 1 : newProduct.quantity - 1;

  //   if (cartProducts != null) {
  //     cartProducts = cartProducts.filter(pro => pro.productID !== newProduct._id);
  //     if (newQuantity != 0) {
  //       npOBJ.productCount = newQuantity;
  //       npOBJ.price = (newQuantity * newProduct.price)
  //       cartProducts.push(npOBJ);
  //     }
  //   } else {
  //     cartProducts.push(npOBJ);
  //   }

  //   let total = findTotal(cartProducts, '+');
  //   setTotalPrice(total);
  //   localStorage.setItem('total', total);
  //   localStorage.setItem('cart', JSON.stringify(cartProducts));

  //   setProducts(prevProducts =>
  //     prevProducts.map(pro =>
  //       pro._id === newProduct._id
  //         ? { ...pro, quantity: newQuantity } // Creates a new object (safer for React state updates)
  //         : pro
  //     )
  //   );

  // }

  const handleAddClick = (product) => {
    product.quantity = 0;
    if (product.isDiscount) {
      updateDicsountProductInCart(product, '+',setProducts, setTotalPrice);
    }
    else if (product.sale && product.salePrice == 0 && product.saleGroupRules.length > 0) {
      updateSaleRuleProductInCart(product, '+',setProducts,setTotalPrice,setSalerule);
    }
    else {
      updateNormalProductIncart(product, '+',setProducts, setTotalPrice);
    }
  }

  const handleIncrement = (Product) => {
    if (Product.isDiscount) {
      updateDicsountProductInCart(Product, '+',setProducts, setTotalPrice);
    }
    else if (Product.sale && Product.salePrice == 0 && Product.saleGroupRules.length > 0) {
      updateSaleRuleProductInCart(Product, '+',setProducts,setTotalPrice,setSalerule);
    }
    else {
      updateNormalProductIncart(Product, '+',setProducts, setTotalPrice);
    }
  }

  const handleDecrement = (Product) => {

    if (Product.isDiscount) {
      updateDicsountProductInCart(Product, '-', setProducts, setTotalPrice);
    }
    else if (Product.sale && Product.salePrice == 0 && Product.saleGroupRules.length > 0) {
      updateSaleRuleProductInCart(Product, '-',setProducts,setTotalPrice,setSalerule);
    }
    else {
      updateNormalProductIncart(Product, '-',setProducts, setTotalPrice);
    }

  }

  const handleSearchChange = async (e) => {
    const value = e.target.value.toLowerCase();

    //   const response=[
    //     {
    //         "_id": "01JHAA5CC9A2HBK67PD9BM0N21",
    //         "shopId": "ab25680f-916c-4b25-98cf-02cba5d2c8fa",
    //         "stripeCode": "123455",
    //         "sale": false,
    //         "importedAt": 0,
    //         "tax": 0,
    //         "purchasePrice": 5,
    //         "unitOfMeasure": "ml",
    //         "salePrice": 0,
    //         "availableItems": 7,
    //         "category": "Lotion",
    //         "units": "tagged",
    //         "price": 10,
    //         "comparison_weight": 1,
    //         "stock": {
    //             "total_value": 50,
    //             "average": 5,
    //             "last_restocked": 1736586947012,
    //             "value": 0,
    //             "total_stock": 0,
    //             "isStock": true,
    //             "minStock": 0
    //         },
    //         "title": "Tanning Lotion",
    //         "wasted": 0,
    //         "soldItems": 0,
    //         "saleGroupRules": [],
    //         "updateVersion": 0,
    //         "ageRestriction": "",
    //         "quantity": 0,
    //         "isVending": true,
    //         "discount": 0,
    //         "priceDiff": 0,
    //         "originalPrice": 0,
    //         "noDepoPrice": 0,
    //         "promote": true,
    //         "isBagActive": false,
    //         "sku": "4453",
    //         "deposit": 5,
    //         "teaser": "",
    //         "picture": "https://tanlux.s3.eu-north-1.amazonaws.com/ab25680f-916c-4b25-98cf-02cba5d2c8fa/images/ic_at_dawn.png",
    //         "isGS1": false,
    //         "expirationDate": "",
    //         "lastDeliveryDate": "",
    //         "isDiscount": false,
    //         "vendingDatas": [],
    //         "softDelete": false,
    //         "environment": "demo",
    //         "noneBarcode": false,
    //         "receiptName": "Tanning Lotion",
    //         "searchText": "tanning lotion#123455#4453",
    //         "meta": {},
    //         "group": "general",
    //         "negative_stock": true,
    //         "isFridge": false,
    //         "productType": "vending",
    //         "created": "2025-02-10T06:27:03.072Z",
    //         "updated": "2025-02-10T06:27:03.072Z"
    //     },
    //     {
    //         "_id": "01JJ14X3K87WTF0XKNFYQGEAB9",
    //         "shopId": "ab25680f-916c-4b25-98cf-02cba5d2c8fa",
    //         "stripeCode": "5654656",
    //         "sale": false,
    //         "importedAt": 0,
    //         "tax": 0,
    //         "purchasePrice": 1,
    //         "unitOfMeasure": "ml",
    //         "salePrice": 2.94,
    //         "availableItems": 14,
    //         "category": "UNCATEGORY",
    //         "units": "tagged",
    //         "price": 3,
    //         "comparison_weight": 0,
    //         "stock": {
    //             "total_value": 56,
    //             "average": 1,
    //             "last_restocked": 1738157875939,
    //             "value": 29,
    //             "total_stock": 29,
    //             "isStock": true,
    //             "minStock": 0
    //         },
    //         "title": "Aqualogica sun screen",
    //         "wasted": 0,
    //         "soldItems": 0,
    //         "saleGroupRules": [],
    //         "updateVersion": 0,
    //         "ageRestriction": "",
    //         "quantity": 0,
    //         "isVending": true,
    //         "discount": 2,
    //         "priceDiff": 0,
    //         "originalPrice": 0,
    //         "noDepoPrice": 0,
    //         "promote": true,
    //         "isBagActive": true,
    //         "sku": "798989",
    //         "deposit": 25.8,
    //         "teaser": "",
    //         "picture": "",
    //         "isGS1": false,
    //         "expirationDate": "",
    //         "lastDeliveryDate": "",
    //         "isDiscount": false,
    //         "vendingDatas": [],
    //         "softDelete": false,
    //         "environment": "demo",
    //         "noneBarcode": false,
    //         "receiptName": "prakash",
    //         "searchText": "aqualogica sun screen#5654656#798989",
    //         "meta": {},
    //         "group": "general",
    //         "negative_stock": true,
    //         "isFridge": false,
    //         "productType": "vending",
    //         "created": "2025-02-10T06:27:02.985Z",
    //         "updated": "2025-02-10T06:27:02.985Z"
    //     },
    //     {
    //         "_id": "01JHAA6XD0RZTVAET6FREZ5J7H",
    //         "shopId": "ab25680f-916c-4b25-98cf-02cba5d2c8fa",
    //         "stripeCode": "9988893",
    //         "sale": true,
    //         "importedAt": 0,
    //         "tax": 0,
    //         "purchasePrice": 5,
    //         "unitOfMeasure": "ml",
    //         "salePrice": 0,
    //         "availableItems": 9,
    //         "category": "Lotion",
    //         "units": "tagged",
    //         "price": 20,
    //         "comparison_weight": 1,
    //         "stock": {
    //             "total_value": 50,
    //             "average": 5,
    //             "last_restocked": 1736587283140,
    //             "value": 5,
    //             "total_stock": 1,
    //             "isStock": true,
    //             "minStock": 0
    //         },
    //         "title": "Bed Lotoin Two",
    //         "wasted": 0,
    //         "soldItems": 0,
    //         "saleGroupRules": [
    //             {
    //                 "count": 4,
    //                 "price": 7,
    //                 "status": "Active"
    //             },
    //             {
    //                 "count": 6,
    //                 "price": 9,
    //                 "status": "Active"
    //             }
    //         ],
    //         "updateVersion": 0,
    //         "ageRestriction": "",
    //         "quantity": 0,
    //         "isVending": true,
    //         "discount": 0,
    //         "priceDiff": 0,
    //         "originalPrice": 0,
    //         "noDepoPrice": 0,
    //         "promote": false,
    //         "isBagActive": false,
    //         "sku": "212",
    //         "deposit": 1,
    //         "teaser": "",
    //         "picture": "https://tanlux.s3.eu-north-1.amazonaws.com/ab25680f-916c-4b25-98cf-02cba5d2c8fa/images/face-cream.png",
    //         "isGS1": false,
    //         "expirationDate": "",
    //         "lastDeliveryDate": "",
    //         "isDiscount": false,
    //         "vendingDatas": [],
    //         "softDelete": false,
    //         "environment": "demo",
    //         "noneBarcode": false,
    //         "receiptName": "",
    //         "searchText": "bed lotoin two#9988893#212",
    //         "meta": {},
    //         "group": "general",
    //         "negative_stock": true,
    //         "isFridge": false,
    //         "productType": "vending",
    //         "created": "2025-02-10T06:27:03.011Z",
    //         "updated": "2025-02-10T06:27:03.011Z"
    //     },
    //     {
    //         "_id": "01JJ153HGAXQWP7RGTS61TZBAX",
    //         "shopId": "ab25680f-916c-4b25-98cf-02cba5d2c8fa",
    //         "stripeCode": "8779",
    //         "sale": true,
    //         "importedAt": 0,
    //         "tax": 0,
    //         "purchasePrice": 0,
    //         "unitOfMeasure": "ml",
    //         "salePrice": 0,
    //         "availableItems": 9,
    //         "category": "Lotion",
    //         "units": "tagged",
    //         "price": 1,
    //         "comparison_weight": 0,
    //         "stock": {
    //             "total_value": 0,
    //             "average": 0,
    //             "value": 0,
    //             "total_stock": 22,
    //             "isStock": true,
    //             "minStock": 0
    //         },
    //         "title": "De tan lotion",
    //         "wasted": 0,
    //         "soldItems": 0,
    //         "saleGroupRules": [
    //             {
    //                 "count": 1,
    //                 "price": 3,
    //                 "status": "Active"
    //             },,
    //             {
    //                 "count": 5,
    //                 "price": 10,
    //                 "status": "Active"
    //             },
    //             {
    //                 "count": 8,
    //                 "price": 15,
    //                 "status": "Active"
    //             }
    //         ],
    //         "updateVersion": 0,
    //         "ageRestriction": "",
    //         "quantity": 0,
    //         "isVending": true,
    //         "discount": 0,
    //         "priceDiff": 0,
    //         "originalPrice": 0,
    //         "noDepoPrice": 0,
    //         "promote": false,
    //         "isBagActive": false,
    //         "sku": "76887",
    //         "deposit": 0,
    //         "teaser": "",
    //         "picture": "https://tanlux.s3.eu-north-1.amazonaws.com/ab25680f-916c-4b25-98cf-02cba5d2c8fa/images/face-cream.png",
    //         "isGS1": false,
    //         "expirationDate": "",
    //         "lastDeliveryDate": "",
    //         "isDiscount": false,
    //         "vendingDatas": [],
    //         "softDelete": false,
    //         "environment": "demo",
    //         "noneBarcode": false,
    //         "receiptName": "",
    //         "searchText": "de tan lotion#8779#76887",
    //         "meta": {},
    //         "group": "general",
    //         "negative_stock": true,
    //         "isFridge": false,
    //         "productType": "vending",
    //         "created": "2025-02-10T06:27:03.038Z",
    //         "updated": "2025-02-10T06:27:03.038Z"
    //     },
    //     {
    //         "_id": "01JJ1B0ZBVYZ0GM8WK197NB11X",
    //         "shopId": "ab25680f-916c-4b25-98cf-02cba5d2c8fa",
    //         "stripeCode": "7667676",
    //         "sale": false,
    //         "importedAt": 0,
    //         "tax": 0,
    //         "purchasePrice": 0,
    //         "unitOfMeasure": "ml",
    //         "salePrice": 0,
    //         "availableItems": 9,
    //         "category": "Shower gel",
    //         "units": "tagged",
    //         "price": 2,
    //         "comparison_weight": 0,
    //         "stock": {
    //             "total_value": 0,
    //             "average": 0,
    //             "value": 0,
    //             "total_stock": 0,
    //             "isStock": true,
    //             "minStock": 0
    //         },
    //         "title": "De Tan gel",
    //         "wasted": 0,
    //         "soldItems": 0,
    //         "saleGroupRules": [],
    //         "updateVersion": 0,
    //         "ageRestriction": "",
    //         "quantity": 0,
    //         "isVending": true,
    //         "discount": 5,
    //         "priceDiff": 0,
    //         "originalPrice": 0,
    //         "noDepoPrice": 0,
    //         "promote": false,
    //         "isBagActive": false,
    //         "sku": "78798",
    //         "deposit": 0,
    //         "teaser": "",
    //         "picture": "",
    //         "isGS1": false,
    //         "expirationDate": "",
    //         "lastDeliveryDate": "",
    //         "isDiscount": true,
    //         "vendingDatas": [],
    //         "softDelete": false,
    //         "environment": "demo",
    //         "noneBarcode": false,
    //         "receiptName": "",
    //         "searchText": "de tan gel#7667676#78798",
    //         "meta": {},
    //         "group": "general",
    //         "negative_stock": true,
    //         "isFridge": false,
    //         "productType": "vending",
    //         "created": "2025-02-10T06:27:03.023Z",
    //         "updated": "2025-02-10T06:27:03.023Z"
    //     },
    //     {
    //         "_id": "01JJC1Z3D2CDJWWWKA5005NNEM",
    //         "shopId": "ab25680f-916c-4b25-98cf-02cba5d2c8fa",
    //         "stripeCode": "1231231231211",
    //         "sale": false,
    //         "importedAt": 0,
    //         "tax": 0,
    //         "purchasePrice": 5,
    //         "unitOfMeasure": "kg",
    //         "salePrice": 0,
    //         "availableItems": 10,
    //         "category": "Sun screen",
    //         "units": "tagged",
    //         "price": 30,
    //         "comparison_weight": 2,
    //         "stock": {
    //             "total_value": 150,
    //             "average": 5,
    //             "value": 115,
    //             "total_stock": 23,
    //             "isStock": true,
    //             "minStock": 0
    //         },
    //         "title": "sun screen 1",
    //         "wasted": 0,
    //         "soldItems": 0,
    //         "saleGroupRules": [],
    //         "updateVersion": 0,
    //         "ageRestriction": "",
    //         "quantity": 0,
    //         "isVending": true,
    //         "discount": 3,
    //         "priceDiff": 0,
    //         "originalPrice": 0,
    //         "noDepoPrice": 0,
    //         "promote": false,
    //         "isBagActive": false,
    //         "sku": "11212",
    //         "deposit": 5,
    //         "teaser": "",
    //         "picture": "",
    //         "isGS1": false,
    //         "expirationDate": "",
    //         "lastDeliveryDate": "",
    //         "isDiscount": true,
    //         "vendingDatas": [],
    //         "softDelete": false,
    //         "environment": "demo",
    //         "noneBarcode": false,
    //         "receiptName": "",
    //         "searchText": "sun screen 1#1231231231211#11212",
    //         "meta": {},
    //         "group": "general",
    //         "negative_stock": true,
    //         "isFridge": false,
    //         "productType": "vending",
    //         "created": "2025-02-10T06:27:03.069Z",
    //         "updated": "2025-02-10T06:27:03.069Z"
    //     }
    // ]
    //   const value = e.target.value.toLowerCase(); // Convert input to lowercase
    //   console.log(value);
    //   if(value==''){
    //     setProducts(response);
    //     return;
    //   }
    //   const searchedProducts = filteredProducts.filter((pro) =>
    //     pro.title.toLowerCase().includes(value) // Check if title includes input
    //   );

    //   setProducts(searchedProducts);


    if (e.target.value.toLowerCase() === '') {
      const response = await axios.get(
        `${apiUrl}/vms/getProducts/ab25680f-916c-4b25-98cf-02cba5d2c8fa`,
        {
          headers: {
            'Authorization': `Bearer ${accessToken}`,
            'accept': '*/*',
            'env': environment,
          },
        }
      );
      setProducts(response.data);
    }
    else {
      const response = await axios.get(
        `${apiUrl}/vms/getProducts/ab25680f-916c-4b25-98cf-02cba5d2c8fa?searchTxt=${value}`,
        {
          headers: {
            'Authorization': `Bearer ${accessToken}`,
            'accept': '*/*',
            'env': environment,
          },
        }
      );
      setProducts(response.data);
    }

    setSearchTerm(e.target.value.toLowerCase());
  };

  const handleCheckout = () => {
    if (totalPrice > 0) {
      navigate(`/checkout?storeID=${storeID}`);
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
  }

  return (
    <div className=" h-screen">

      {loading ? (
        <div className="h-screen flex items-center justify-center bg-red-100">
          <img src={loader} alt="" className="bg-buttonColor h-full" />
        </div>
      ) : (
        <div className="font-poppins h-full px-3">
          <div className=" px-3 h-40 flex flex-col fixed top-0 left-0 w-full z-10 bg-white">
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
            <div className="flex-1 flex flex-col justify-center items-center h-full w-full gap-2 ">
              <img src={noProductImage} alt="" className="h-52 w-52" />
              <button onClick={() => { navigate(`/stores`) }} className="bg-buttonColor text-white text-lg font-semibold px-10 py-3 rounded-full">Check other stores</button>
            </div>
          ) : (
            <div className="h-full flex flex-col items-center">
              {filteredProducts?.length > 0 ? (
                <div className="flex flex-col overflow-y-auto mb-5 gap-2 w-full py-16  mt-28">
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
                  {/* <h1 className="text-center text-black text-lg font-semibold">Product not matched</h1> */}
                </div>
              )}
            </div>
          )}

          {/* Checkout Bar - Conditionally Hidden */}
          <div className={`h-24 shadow-[0_0_20px_5px_rgba(255,255,255,0.5)] bg-buttonColor px-3 flex items-center justify-between rounded-t-lg py-5 fixed bottom-0 left-0 w-full z-10 ${isProductfetched ? 'hidden' : 'block'}`}>
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
        <div className="fixed inset-0 flex items-end justify-center bg-black bg-opacity-50 px-5 pb-5 font-poppins z-20">
          <div className="w-full max-h-[500px] bg-white rounded-2xl px-4 py-5 ">
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
                        <strong className="text-buttonColor font-semibold">{saleruleProduct.price} $</strong>
                      </div>
                    ) : (
                      <div className="flex items-center">
                        <strong className="font-semibold text-buttonColor">
                          {(saleruleProduct.price - (saleruleProduct.price * saleruleProduct.discount) / 100).toFixed(2)}
                          <span className="text-gray-400 ml-2 line-through decoration-red-500">{saleruleProduct.price} kr</span>
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
              {saleRule.map((rule, index) => (
                <div
                  key={index}
                  className={`flex border-2 border-gray-200 rounded-md items-center justify-center relative p-2 py-3 
                  ${rule.isSaleApplied ? 'bg-buttonColor text-white' : 'bg-white text-gray-400'}`} // Change background based on isSaleApplied
                >
                  <p className="text-lg">
                    BUY <span>{rule.count}</span> FOR <span className="font-semibold">{rule.price} Rs</span>
                  </p>
                  <img
                    src={tickMark}
                    alt=""
                    className={`h-7 w-7 rounded-full absolute right-2 ${rule.isSaleApplied ? 'block' : 'hidden'}`}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

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