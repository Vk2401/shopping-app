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
  const [saleRUle, setSaleRULE] = useState('');
  let tempARR = [];

  const saleRuleProduct={
    productType:'saleRule',
    productId:'',
    productPrice:'',
    totalPrice:'',
    totalCount:'',
    saleRuleDetails:'',
  }

  // const [saleRuleProduct, setSaleRuleProduct] = useState(
  //   {
  //     productType: '',
  //     productID: '',
  //     totalCount: '',
  //     saleAppliedCount: '',
  //     saleRuleNotAppliedCount: '',
  //     salePrice: 0,
  //     notSaleRulePrice: 0
  //   }
  // );

  const [discountProduct, setDiscountProduct] = useState(
    {
      productType: '',
      productID: '',
      discountRate: '',
      originalAmount: 0,
      price: 0,
      productCount: 0
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

  const findActiveRule = (saleRules) => {

    saleRules.forEach((rule) => {

      if (rule.status === 'Active' && saleruleProduct.quantity >= rule.count) {
        const roundedUp = saleruleProduct.quantity / rule.count;

        const temp = {
          ruleCOUNT: rule.count,
          ans: roundedUp,
        };
        tempARR.push(temp);

      }
    })

    tempARR.sort((a, b) => a.ans.toString().localeCompare(b.ans.toString()));
  }

  useEffect(() => {

    if (!isAuthenticated) {
      navigate("/");
    }
    else {
      getCurrectLocation();

      const addedProducts = JSON.parse(localStorage.getItem("cart")) || [];
      const tokens = JSON.parse(localStorage.getItem('authToken'));
      // const storeID=localStorage.getItem('storeID');
      const storeID = 'ab25680f-916c-4b25-98cf-02cba5d2c8fa';
      setStoreid(storeID);
      setTotalCount(addedProducts.length);

      let addedTotal = 0;
      addedProducts.forEach(product => {
        addedTotal = addedTotal + product.price;
      })
      setTotalPrice(addedTotal);

      const fetchProducts = async () => {
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

          const response = [
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
                  "count": 8,
                  "price": 10,
                  "status": "Active"
                },
                // {
                //       "count": 2,
                //       "price": 7,
                //       "status": "Active"
                // },
                {
                      "count": 4,
                      "price": 9,
                      "status": "Active"
                },
                // {
                //     "count": 1,
                //     "price": 3,
                //     "status": "Active"
                // }
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
                }, ,
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

          response.forEach((prod) => {
            if (prod.quantity === undefined) {
              prod.quantity = 0; // Set quantity to 0 if undefined
            }
          })

          let fetchProduct = response;
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

            let total = 0;

            cart.forEach((pro) => {
              if (pro.productType == 'saleRule') {
                total += pro.salePrice + pro.notSaleRulePrice;
              }
              else {
                total += pro.price;
              }
            })

            setTotalPrice(total);
            setProducts(fetchProduct);

          } else {
            setProducts(response);
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
              'Authorization': `Bearer ${tokens.accessToke}`,
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

  const findSaleRules=(Product,quantity)=>{
    let rules = Product.saleGroupRules;
    let tempArr=[];
    let tempQuantity=quantity;

    rules.forEach(rule=>{
      let tempObj={
        productQuantiy:0,
        saleRule:rule,
        isNearby:false,
        isSaleApplied:false,
      }

      if(rule.status=='Active' && rule.count<=tempQuantity){
        let saleAppliedQuantiy=tempQuantity/rule.count;
        let saleNotAppliedQuantity=tempQuantity%rule.count;
        tempObj.productQuantiy=saleAppliedQuantiy;
        tempObj.isSaleApplied=true;

        saleNotAppliedQuantity=saleNotAppliedQuantity+1;
        if(saleNotAppliedQuantity%rule.count==0){
          tempObj.isNearby=true;
        }

        tempQuantity=tempQuantity-saleAppliedQuantiy;

      }
      tempArr.push(tempObj);
    })

    return tempArr;
  }

  const findSaleRuleProductTOtal=(Product,Quantity)=>{
    // Calculate total count and total price
    const { totalCount, totalPrice } = Product.saleRuleDetails.reduce((acc, detail) => {
      if (detail.productQuantiy !== 0) {
          acc.totalCount += detail.productQuantiy * detail.saleRule.count;
          acc.totalPrice += detail.productQuantiy * detail.saleRule.price;
      }
      return acc;
    }, { totalCount: 0, totalPrice: 0 });


    let a=Product.totalCount - totalCount;
    a=a*Product.productPrice;
    a=a+totalPrice;

    return a;

  }

  const addSaleRuleProduct = (Product,operation) => {

    let cartProducts = JSON.parse(localStorage.getItem("cart")) || [];
    let matchingProduct = cartProducts.find(product => product.productID === Product._id) ?? null;
    let updatedCartProducts =[];

    let newProductQuantity;

    const saleRuleProduct={
      productType:'saleRule',
      productID:Product._id,
      productPrice:Product.price,
      totalPrice:Product.price,
      totalCount:1,
      saleRuleDetails:null,
    }

    newProductQuantity = operation === '-' ? --Product.quantity : ++Product.quantity;

    if(matchingProduct==null){
      let resultArr = findSaleRules(Product,newProductQuantity);
      saleRuleProduct.saleRuleDetails=resultArr;
      saleRuleProduct.totalPrice=findSaleRuleProductTOtal(saleRuleProduct,newProductQuantity);
      updatedCartProducts.push(saleRuleProduct);
    }else{
       updatedCartProducts = cartProducts.filter(pro => pro.productID !== Product._id);
       let resultArr = findSaleRules(Product,newProductQuantity);
       saleRuleProduct.saleRuleDetails=resultArr;
       saleRuleProduct.totalCount=newProductQuantity;
       saleRuleProduct.totalPrice=findSaleRuleProductTOtal(saleRuleProduct,newProductQuantity);
       updatedCartProducts.push(saleRuleProduct);
    }
    
    // let total = findTotal(updatedCartProducts);
    //   setTotalPrice(total);
    //   localStorage.setItem('total', total);
  
      setProducts(prevProducts =>
        prevProducts.map(pro =>
          pro._id === Product._id
            ? { ...pro, quantity: newProductQuantity } // Creates a new object (safer for React state updates)
            : pro
        )
      );
      
    localStorage.setItem('cart',JSON.stringify(updatedCartProducts));
  }


  const findTotal = (cartProducts, op) => {
    let totalPrice = 0;
    let totalCount = 0;

    if (cartProducts.length == 0) {
      return totalPrice;
    }

    cartProducts.forEach((pro) => {
      if (pro.productType == 'saleRule') {
        const values = pro.Rules;

        Object.values(values).forEach(value => {
          totalPrice += value.salePrice;

          // Check if saleRuleNotAppliedCount is not zero
          if (value.saleRuleNotAppliedCount !== 0) {
            totalPrice += value.saleRuleNotAppliedCount * value.notSaleRulePrice;
          }
        });

      }
      else {
        totalPrice += pro.price;
      }
    })
    return totalPrice.toFixed(1);
  }

  const addDiscountProduct = (newProduct) => {
    let cartProduct = JSON.parse(localStorage.getItem('cart')) || [];
    let updatedProduct = null;

    for (let pro of cartProduct) {
      if (pro.productID === newProduct._id) {
        pro.price += newProduct.price - (newProduct.price * newProduct.discount) / 100;
        pro.productCount += 1; // Increase count
        updatedProduct = pro;

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

        let total = findTotal(cartProduct, '+');
        setTotalPrice(total);
        localStorage.setItem('total', total);
        localStorage.setItem('cart', JSON.stringify(cartProduct));
        setProducts(prevProducts =>
          prevProducts.map(pro =>
            pro._id === newProduct._id
              ? { ...pro, quantity: pro.quantity + 1 } // Creates a new object (safer for React state updates)
              : pro
          )
        );
        return;
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

    let total = findTotal(cartProduct, '+');
    setTotalPrice(total);
    localStorage.setItem('total', total);
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
          ? { ...pro, quantity: pro.quantity + 1 } // Creates a new object (safer for React state updates)
          : pro
      )
    );

  }

  function modifyRuleAppliedArr(ruleAppliedArr) {
    return ruleAppliedArr.map((item, index, arr) => {
        let newItem = { ...item };

        // Apply changes to all objects except the last one
        if (index !== arr.length - 1) {
            newItem.notSaleRulePrice = 0;
            newItem.totalCount = newItem.saleAppliedCount * newItem.saleRulecount;
        } else {
            // Last object keeps its original values
            newItem.totalCount = newItem.saleAppliedCount * newItem.saleRulecount + newItem.saleRuleNotAppliedCount;
        }

        return newItem;
    });
}

  function updateRules(Rules, ruleAppliedArr) {
    // Get all rule keys
  
    let ruleKeys = Object.keys(Rules);
    console.log(ruleKeys);

    // Remove the last rule
    if (ruleKeys.length > 0) {
        delete Rules[ruleKeys.pop()];
    }

    // Find the next available rule number
    let nextRuleNumber = Object.keys(Rules).length + 1;

    // Add all objects from ruleAppliedArr to Rules
    ruleAppliedArr.forEach((saleObj) => {
        Rules[`rule ${nextRuleNumber}`] = saleObj;
        nextRuleNumber++;
    });

    return Rules;
  }

  const findSaleRuleforSomeProduct = (productQuatity, product) => {
    let ruleAppliedArr = [];
    let rules = product.saleGroupRules;
    rules.sort((a, b) => b.count - a.count);
    let count = productQuatity - 1;

    if(rules.length==1){
      return false;
    }
    rules.forEach((rule) => {

      if (rule.status === "Active" && rule.count <= count) {
        let remainder = count % rule.count;
        let appliedCount = Math.floor(count / rule.count);
        let notAppliedPrice = remainder * product.price;
        let appliedPrice = appliedCount * rule.price;

        let saleobj =
        {
          saleAppliedCount: appliedCount,
          salePrice: appliedPrice,
          saleRuleNotAppliedCount: remainder,
          notSaleRulePrice: notAppliedPrice,
          saleRulecount: rule.count,
          totalCount: appliedCount + remainder,
          // issaleApplied: true
        }

        ruleAppliedArr.push(saleobj);
        count = remainder;
      }
    });

    if (ruleAppliedArr.length == 0) {
     
      let saleobj =[
        {
          saleAppliedCount: 0,
          salePrice: 0,
          saleRuleNotAppliedCount: 0,
          notSaleRulePrice: 0,
          saleRulecount: 0,
          totalCount: 0,
          // isApplied:false
        }
      ]
      
      return saleobj;
    }
    else {
      
      return modifyRuleAppliedArr(ruleAppliedArr);
      // const updatedArr = ruleAppliedArr.map((item, index, arr) => {
      //   let newItem;
      //   if (ruleAppliedArr.length == 1) {
      //     newItem = { ...item, totalCount: (item.saleRulecount * item.saleAppliedCount) + item.saleRuleNotAppliedCount };
      //   } else {
      //     newItem = { ...item, totalCount: item.saleRulecount * item.saleAppliedCount };
      //   }

      //   if (arr[index + 1] && arr[index + 1].issaleApplied) {
      //     newItem.notSaleRulePrice = 0;
      //     newItem.saleRuleNotAppliedCount = 0; // Updated this property
      //   }
      //   return newItem;
      // });

      // const transformedData = updatedArr.reduce((acc, item, index) => {
      //   if (!acc.productID) {
      //     acc.productID = item.productID;
      //     acc.productType = item.productType;
      //     acc.totalCount = 0;
      //     acc.Rules = {};
      //   }

      //   acc.totalCount += item.totalCount; // Summing up totalCount from all items

      //   acc.Rules[`rule ${index + 1}`] = {
      //     saleAppliedCount: item.saleAppliedCount,
      //     salePrice: item.salePrice,
      //     saleRuleNotAppliedCount: item.saleRuleNotAppliedCount,
      //     notSaleRulePrice: item.notSaleRulePrice,
      //     saleRulecount: item.saleRulecount, // Added saleRulecount
      //     totalCount: item.totalCount // Each rule's specific totalCount
      //   };

      //   return acc;
      // }, {});

      // return transformedData;
    }

  }


  const addNormalProduct = (newProduct) => {
    let flag = 0;

    let cartProducts = JSON.parse(localStorage.getItem('cart')) || [];

    if (cartProducts.length > 0) {
      cartProducts.forEach(cartproduct => {
        if (cartproduct.productID == newProduct._id) {
          cartproduct.productCount++;

          cartproduct.price += newProduct.price;
          flag = 1;
        }
      });
    }

    setProducts(prevProducts =>
      prevProducts.map(pro =>
        pro._id === newProduct._id
          ? { ...pro, quantity: pro.quantity + 1 } // Creates a new object (safer for React state updates)
          : pro
      )
    );

    if (flag == 1) {
      let total = findTotal(cartProducts, '+');
      setTotalPrice(total);
      localStorage.setItem('total', total);
      localStorage.setItem('cart', JSON.stringify(cartProducts));
      return;
    }

    let npOBJ = {
      productType: 'NormalProduct',
      productID: newProduct._id,
      productCount: 1,
      price: newProduct.price
    }

    cartProducts.push(npOBJ);
    let total = findTotal(cartProducts, '+');
    setTotalPrice(total);
    localStorage.setItem('total', total);
    localStorage.setItem('cart', JSON.stringify(cartProducts));
  }

  const decrementSaleRuleProduct = (newProduct) => {
    let cartProduct = JSON.parse(localStorage.getItem("cart")) || [];
    let quantityBecome = newProduct.quantity - 1;
  

    // if (quantityBecome != 0) {
    //   let matchingProduct = cartProduct.find(product => product.productID === newProduct._id) ?? null;
    //   const appliedRules = matchingProduct.Rules;
    //   const objectCount = Object.keys(appliedRules).length;
    
    //   if (objectCount <= 1) {
       
    //     matchingProduct.totalCount -= 1;
    //     let rule = matchingProduct.Rules["rule"];
    //     if (rule == undefined) {
    //       rule = matchingProduct.Rules["rule 1"]
    //     }
  
    //     let result = findSaleRuleforSomeProduct(rule.totalCount, newProduct);
      
    //     if(!result){
         
    //       // Access the "Rules" object
    //       let rules = matchingProduct.Rules;

    //       // Get the first rule key dynamically
    //       let firstRuleKey = Object.keys(rules)[0];

    //       // Get the rule object
    //       let rule = rules[firstRuleKey];

    //       // Check condition and update values
    //       if (rule.saleRuleNotAppliedCount > 0) {
    //           rule.saleRuleNotAppliedCount -= 1;  // Increment saleRuleNotAppliedCount by 1
    //           rule.totalCount -=1;
    //       } else {
    //           let updatedSalePrice=rule.salePrice/rule.saleAppliedCount;
    //           updatedSalePrice=updatedSalePrice*(rule.saleAppliedCount-1)
    //           rule.salePrice=updatedSalePrice;
    //           rule.saleAppliedCount -= 1;  // Reduce saleAppliedCount by 1
    //           rule.saleRuleNotAppliedCount = rule.saleRulecount - 1;
    //           rule.totalCount-=1;  // Set saleRuleNotAppliedCount to saleRulecount - 1
    //       }

    //     }else{
          
    //      let returnedType = identifyResponseType(result);
    //       if (returnedType == 'Type 1') {
    //         let tesmpV=appliedRules;
    //         // let rules = appliedRules.Rules; // Get the "Rules" object
    //         let rules = appliedRules; 
    //         let firstRuleKey = Object.keys(rules)[0]; // Get the first rule key (e.g., "rule 1")
    //         let saleAppliedCount = rules[firstRuleKey].saleAppliedCount; // Get saleAppliedCount
    //         let saleRuleNotAppliedCount = rules[firstRuleKey].saleRuleNotAppliedCount;
  
    //         if(saleAppliedCount==1 && saleRuleNotAppliedCount>1){
    //           // Access the "Rules" object
    //           let rules = appliedRules[0].Rules;
    //           // Get the first rule key dynamically (since it might be "rule 1", "rule 2", etc.)
    //           let firstRuleKey = Object.keys(rules)[0];
  
    //           // Decrement saleRuleNotAppliedCount by 1, ensuring it doesn't go negative
    //           if (rules[firstRuleKey].saleRuleNotAppliedCount > 0) {
    //               rules[firstRuleKey].saleRuleNotAppliedCount -= 1;
    //           }
  
    //         }else{
    //           console.log('lkkm');
    //           console.log(result);
    //           let existingKeys = Object.keys(appliedRules);
    //           let newRuleData = result.Rules;
    //           let rulesToRemove = Object.keys(newRuleData).length;
    
    //           for (let i = 0; i < rulesToRemove; i++) {
    //             if (existingKeys.length > 0) {
    //               delete appliedRules[existingKeys.pop()];
    //             }
    //           }
    
    //           // Get the next available rule number
    //           let nextRuleNumber = Object.keys(appliedRules).length + 1;
    //           // Add new rules with continuous numbering
    //           for (const ruleKey in newRuleData) {
    //             appliedRules[`rule ${nextRuleNumber}`] = newRuleData[ruleKey];
    //             nextRuleNumber++;
    //           }
    //         }
    
    //       } else {
    //         if(rule.saleAppliedCount>1){
  
    //           if(rule.saleAppliedCount>1 && rule.saleRuleNotAppliedCount==0){
    //             let newSaleRuleNotAppliedCount=rule.saleRulecount-1;
    //             let newSalePrice=rule.salePrice-(rule.salePrice/rule.saleAppliedCount);
    //             let newSaleAppliedCount= rule.saleAppliedCount-1;
    //             let newTotalCount= rule.totalCount-1;
    //             let newNotSaleRulePrice=newProduct.price;

  
    //             rule.totalCount = newTotalCount;
    //             rule.saleAppliedCount = newSaleAppliedCount;  // Reset saleAppliedCount
    //             rule.salePrice = newSalePrice;  // Reset salePrice
    //             rule.saleRuleNotAppliedCount = newSaleRuleNotAppliedCount;
    //             rule.notSaleRulePrice = newNotSaleRulePrice;
    //           }else{
    //             rule.saleRuleNotAppliedCount -= 1;
    //           }
    //         }else{
 
    //           rule.saleAppliedCount = 0;  // Reset saleAppliedCount
    //           rule.salePrice = 0;  // Reset salePrice
    //           rule.totalCount -= 1;
    //           rule.saleRuleNotAppliedCount = rule.totalCount;
    //           rule.notSaleRulePrice = newProduct.price;
    //           rule.saleRulecount = 0;
    //         }
    //       }
    //     }
       
    //   }
    //   else {
    //     matchingProduct.totalCount--;
    //     const lastKey = Object.keys(appliedRules).pop();
    //     const lastObject = appliedRules[lastKey];
    //     console.log(lastObject);
    //     console.log(lastObject.totalCount);

    //     let result = findSaleRuleforSomeProduct(lastObject.totalCount, newProduct);
    //     let returnedType = identifyResponseType(result);

    //     if (returnedType == 'Type 1') {
    //       console.log(appliedRules);
    //       let newRuleData = result.Rules;
    //       // Step 1: Convert appliedRules keys to an array and sort them numerically
    //       let existingKeys = Object.keys(appliedRules).sort((a, b) => {
    //         return parseInt(a.split(" ")[1]) - parseInt(b.split(" ")[1]);
    //       });

    //       // Step 2: Remove the last rule from appliedRules
    //       if (existingKeys.length > 0) {
    //         delete appliedRules[existingKeys.pop()];
    //       }

    //       // Step 3: Find the next rule number after removing the last rule
    //       let nextRuleNumber = Math.max(...Object.keys(appliedRules).map(r => parseInt(r.split(" ")[1]))) + 1 || 1;

    //       // Step 4: Add new rules sequentially with continuous numbering
    //       for (const ruleKey in newRuleData) {
    //         appliedRules[`rule ${nextRuleNumber}`] = newRuleData[ruleKey];
    //         nextRuleNumber++;
    //       }

    //       // let existingKeys = Object.keys(appliedRules);
    //       // console.log(existingKeys);
        
    //       // let newRuleData = result.Rules;
    //       // let rulesToRemove = Object.keys(newRuleData).length;
    //       // console.log(newRuleData);

    //       // for (let i = 0; i < rulesToRemove; i++) {
    //       //   if (existingKeys.length > 0) {
    //       //     delete appliedRules[existingKeys.pop()];
    //       //   }
    //       // }

    //       // // Get the next available rule number
    //       // let nextRuleNumber = Object.keys(appliedRules).length + 1;
    //       // // Add new rules with continuous numbering
    //       // for (const ruleKey in newRuleData) {
    //       //   appliedRules[`rule ${nextRuleNumber}`] = newRuleData[ruleKey];
    //       //   nextRuleNumber++;
    //       // }

    //     } else {
    //       // Get all rule keys
    //       let ruleKeys = Object.keys(appliedRules);

    //       if (ruleKeys.length >= 2) {
    //         let secondLastKey = ruleKeys[ruleKeys.length - 2]; // Get second-to-last key
    //         let lastKey = ruleKeys[ruleKeys.length - 1]; // Get last key

    //         // Modify the second-to-last object
    //         appliedRules[secondLastKey].saleRuleNotAppliedCount = lastObject.totalCount - 1; // Change value as needed
    //         appliedRules[secondLastKey].notSaleRulePrice = newProduct.price; // Change value as needed

    //         // Remove the last object
    //         delete appliedRules[lastKey];
    //       }
    //     }
    //   }
    //   cartProduct = cartProduct.map(product =>
    //     product.productID === matchingProduct.productID ? matchingProduct : product
    //   );
    // }
    if(quantityBecome!=0){
      let matchingProduct = cartProduct.find(product => product.productID === newProduct._id) ?? null;
      const appliedRules = matchingProduct.Rules;
      const objectCount = Object.keys(appliedRules).length;
      matchingProduct.totalCount-=1;

      if(matchingProduct.Rules.rule==undefined){
        let Rules=matchingProduct.Rules;
        const lastKey= Object.keys(Rules).pop(); 
        const lastRule = Rules[lastKey];

        if(lastRule.saleRuleNotAppliedCount==0){
          let count=lastRule.saleRulecount*lastRule.saleAppliedCount;
          count=count-lastRule.saleRulecount;

          if(lastRule.saleAppliedCount>1){
            let result=findSaleRuleforSomeProduct(count,newProduct);
            if(result.length>1){
              Rules=updateRules(Rules,result)
            }else{
              Rules=updateRules2(Rules,newProduct)
            }

          }else{
            let result=findSaleRuleforSomeProduct(count,newProduct);
            
            if(result.length>1){

              Rules=updateRules(Rules,result)
            }else{
              Rules= updateRules2(Rules,newProduct)
            }
          }
          
        }else{
          lastRule.totalCount-=1;
          lastRule.saleRuleNotAppliedCount-=1;
        }

      }else{
        let rule=matchingProduct.Rules;
        if(rule.saleAppliedCount>0){
        }else{
          rule.totalCount-=1;
          rule.saleRuleNotAppliedCount-=1;
        }
      }
    }
    else {
      cartProduct = cartProduct.filter(product => product.productID !== newProduct._id);
    }

    findTotal(cartProduct, '+');
    let total = findTotal(cartProduct, '-');
    setTotalPrice(total);
    localStorage.setItem('total', total);
    localStorage.setItem("cart", JSON.stringify(cartProduct));

    setProducts(prevProducts =>
      prevProducts.map(pro =>
        pro._id === newProduct._id
          ? { ...pro, quantity: pro.quantity - 1 } // Creates a new object (safer for React state updates)
          : pro
      )
    );

    setSaleruleProduct((prevProduct) => ({
      ...prevProduct,
      quantity: Math.max(prevProduct.quantity - 1, 0), // Prevent negative values
    }));
  }

  function identifyResponseType(response) {
    console.log(response);
    if (response.hasOwnProperty("Rules")) {
      return "Type 1";
    } else {
      return "Type 2";
    }
  }

  const decrementProduct = (product) => {
    let cartProducts = JSON.parse(localStorage.getItem('cart') || []);
    let productQuantitybecome = product.quantity - 1;

    if (productQuantitybecome == 0) {
      cartProducts = cartProducts.filter(cartProduct => cartProduct.productID !== product._id);
    } else {
      cartProducts.forEach((cartProduct) => {
        if (cartProduct.productID == product._id) {
          cartProduct.productCount--;
          if (cartProduct.productType != 'discountProduct') {
            cartProduct.price = cartProduct.price - product.price;
          } else {
            cartProduct.price = cartProduct.price - (product.price - ((product.price * product.discount) / 100));
          }
        }
      })
    }

    // Update localStorage if needed
    let total = findTotal(cartProducts, '-');
    setTotalPrice(total);
    localStorage.setItem('total', total);
    localStorage.setItem("cart", JSON.stringify(cartProducts));

    setProducts(prevProducts =>
      prevProducts.map(pro =>
        pro._id === product._id
          ? { ...pro, quantity: pro.quantity - 1 } // Creates a new object (safer for React state updates)
          : pro
      )
    );

  }

  const handleAddClick = (product) => {
    product.quantity = 0;
    if (product.isDiscount) {
      addDiscountProduct(product);
    }
    else if (product.sale && product.salePrice == 0 && product.saleGroupRules.length > 0) {
      addSaleRuleProduct(product,'+');
    }
    else {
      addNormalProduct(product);
    }
  }

  const handleIncrement = (Product) => {
    if (Product.isDiscount) {
      addDiscountProduct(Product);
    }
    else if (Product.sale && Product.salePrice == 0 && Product.saleGroupRules.length > 0) {
      addSaleRuleProduct(Product,'+');
    }
    else {
      addNormalProduct(Product);
    }
  }

  const handleDecrement = (Product) => {
    if (Product.sale && Product.salePrice == 0 && Product.saleGroupRules.length > 0) {
      addSaleRuleProduct(Product,'-');
      // decrementSaleRuleProduct(Product);
    }
    else {
      decrementProduct(Product)
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

  const checkSaleRule=(Product,quantity)=>{
    const saleRules=Product.saleGroupRules;
    const tempArr=[];

    let ans={
      productQuantity:'',
      SaleRule:'',
    };


    saleRules.forEach(rule=>{
      if(rule.status=='Active' && rule.count<=quantity){
        ans.productQuantity=quantity/rule.count;
        ans.SaleRule=rule;
        tempArr.push(ans);

        quantity = quantity % rule.count;
      }
    })

    return tempArr;
  }

  const filteredProducts = Products?.filter((product) =>
    product.title.toLowerCase().includes(searchTerm) && product.isVending
  );

  const showSalePopup = (productID) => {

    const saleGroupRules = [
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
    setSalerule(foundProduct.saleGroupRules);
    setShowPopup(true);
  }

  function updateRules2(Rules, newProduct) {
    let ruleKeys = Object.keys(Rules);

    if (ruleKeys.length < 2) {
        console.log("Not enough rules to modify.");
        return Rules; // Ensure we have at least 2 rules
    }

    // Get last rule key and remove it
    let lastKey = ruleKeys.pop();
    delete Rules[lastKey];

    // Get second-last rule key
    let secondLastKey = ruleKeys[ruleKeys.length - 1];
    let rule = Rules[secondLastKey];

    // Update second-last rule
    rule.salePrice = (rule.salePrice / rule.saleAppliedCount) * (rule.saleAppliedCount - 1);
    rule.notSaleRulePrice = newProduct.price;
    rule.saleAppliedCount -= 1;
    rule.totalCount -= 1;

    return Rules;
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
              {/* {saleRule
                .filter(rule => rule.status === 'Active') // Filter only active rules
                .map((rule, index) => {
                  const isActive = saleruleProduct.quantity >= rule.count && saleruleProduct.quantity !=rule.count; // Check condition

                  return (
                    <div
                      key={index}
                      className={`flex border-2 border-gray-200 rounded-md items-center justify-center relative p-2 py-3 
                      ${isActive ? 'bg-buttonColor text-white' : 'text-gray-400'}`} // Apply conditional styles
                    >
                      <p className="text-lg">BUY <span>{rule.count}</span> FOR <span className="font-semibold">{rule.price} Rs</span></p>
                      <img src={tickMark} alt="" className={` h-7 w-7 rounded-full absolute right-2 ${isActive ? 'block' : 'hidden'}`} />
                    </div>
                  );
                })
              } */}

              {findActiveRule(saleRule)}

              {saleRule
                .filter(rule => rule.status === 'Active') // Filter only active rules
                .map((rule, index) => {

                  // Check if saleruleProduct.quantity matches any other rule.count (excluding current rule)
                  const isQuantityInOtherRules = saleRule.some(
                    otherRule => otherRule.count === saleruleProduct.quantity && otherRule !== rule
                  );

                  // Condition: quantity must be >= rule.count AND must not match any other rule.count
                  //  const isActive =saleruleProduct.quantity  >= rule.count && !isQuantityInOtherRules ;
                  let isActive = false;
                  if (tempARR.length > 0) {
                    isActive = tempARR[0].ruleCOUNT == rule.count;
                  }

                  return (
                    <div
                      key={index}
                      className={`flex border-2 border-gray-200 rounded-md items-center justify-center relative p-2 py-3 
                    ${isActive ? 'bg-buttonColor text-white' : 'text-gray-400'}`} // Apply conditional styles
                    >
                      <p className="text-lg">BUY <span>{rule.count}</span> FOR <span className="font-semibold">{rule.price} Rs</span></p>
                      <img src={tickMark} alt="" className={`h-7 w-7 rounded-full absolute right-2 ${isActive ? 'block' : 'hidden'}`} />
                    </div>
                  );
                })
              }

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