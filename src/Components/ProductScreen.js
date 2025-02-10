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
import { p } from "framer-motion/client";

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

         console.log(response);

   
          let fetchProduct=response;
          console.log(fetchProduct);
          let cart = JSON.parse(localStorage.getItem("cart"))|| [];
 
          if(cart.length>0){

            response.forEach(fPro=>{
              cart.forEach(cartPRO=>{
                if(cartPRO.productID==fPro._id){
                  console.log(typeof(cartPRO.totalCount))
                  console.log(fPro.quantity);
                  
                  fPro.quantity = (fPro.quantity ?? 0) + cartPRO.totalCount;
                }
              })
            })

            let total=0;

            cart.forEach((pro)=>{
              if(pro.type=='saleRule'){
                total+=pro.salePrice+pro.notSaleRulePrice;
              }
              else{
                total+=pro.price;
              }
            })

            setTotalPrice(total);
            setProducts(fetchProduct);
            
          }else{
            console.log(response);
            console.log('lok');
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
  }, [])


  const addnewSaleruleProduct=(cartProducts,Product)=>{
    let flag=0;
    let rules=Product.saleGroupRules;
    console.log(rules);

    rules.forEach((rule)=>{
      if(rule.status=='Active' && rule.count==1){
        let srOBJ={
          productType: 'sale rule',
          productID: Product._id,
          totalCount: 1,
          saleAppliedCount: 1,
          saleRuleNotAppliedCount: 0,
          salePrice: rule.price,
          notSaleRulePrice: 0
        }
    
        cartProducts.push(srOBJ);
        flag=1;
      }
    })
    if(flag==0){
      let srOBJ={
        productType: 'sale rule',
        productID: Product._id,
        totalCount: 1,
        saleAppliedCount: 0,
        saleRuleNotAppliedCount: 1,
        salePrice: Product.price,
        notSaleRulePrice: 1
      }

      cartProducts.push(srOBJ);
    }
  

    localStorage.setItem('cart',JSON.stringify(cartProducts));
  }
  const findTotal=(cartProducts,op)=>{
    console.log(cartProducts);

    let totalPrice = 0;
    let totalCount=0;

    if(cartProducts.length==0){
      return totalPrice;
    }

    cartProducts.forEach((pro)=>{
      console.log(pro);
      if(pro.productType=='saleRule'){
        console.log(pro);
          totalPrice+=(pro.notSaleRulePrice+pro.salePrice)
      }
      else{
          console.log(pro);
          totalPrice+=pro.price;
      }
    })

    return totalPrice;
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
  
    let total=findTotal(cartProduct,'+');
    setTotalPrice(total);
    localStorage.setItem('total',total);
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

  const addSaleRuleProduct = (newProduct) => {
    let cartProduct = JSON.parse(localStorage.getItem("cart")) || [];
    let ruleAppliedArr=[];
    let flag=0;
  
    if (cartProduct.length > 0) {
     
      cartProduct.forEach((cartItem) => {
      
        if (cartItem.productID == newProduct._id) {
          const rules = newProduct.saleGroupRules;
          let count = (newProduct.quantity) + 1

          rules.forEach((rule) => {
            if (rule.status === "Active" && (count % rule.count) == 0) {
                let remainder = count % rule.count;
                let appliedCount = Math.floor(count / rule.count);
                let notAppliedPrice = remainder * newProduct.price;
                let appliedPrice = appliedCount * rule.price;

                let saleobj=
                  {
                    productType: 'saleRule',
                    productID: newProduct._id,
                    totalCount: count,
                    saleAppliedCount: appliedCount,
                    saleRuleNotAppliedCount: remainder,
                    salePrice: appliedPrice,
                    notSaleRulePrice: notAppliedPrice
                  }
                ruleAppliedArr.push(saleobj);
            }
          });
        }
      });
    
      if(ruleAppliedArr.length>0){
        console.log('lkjkj990');
        ruleAppliedArr.sort((a, b) => a.saleAppliedCount - b.saleAppliedCount);
        cartProduct = cartProduct.map(product =>
          product.productID === ruleAppliedArr[0].productID ? ruleAppliedArr[0] : product
        );
        localStorage.setItem('cart',JSON.stringify(cartProduct));
        flag=1;
      }
    }

    if(flag==0){
      console.log('hh');
      addnewSaleruleProduct(cartProduct,newProduct);
    }

    let total=findTotal(cartProduct,'+');
    setTotalPrice(total);
    localStorage.setItem('total',total);
    localStorage.setItem("cart", JSON.stringify(cartProduct));

    setProducts(prevProducts =>
      prevProducts.map(pro =>
        pro._id === newProduct._id
          ? { ...pro, quantity: pro.quantity + 1 } // Creates a new object (safer for React state updates)
          : pro
      )
    );    
  }

  const addNormalProduct=(newProduct)=>{
    let flag=0;

    let cartProducts=JSON.parse(localStorage.getItem('cart')) || [];

    if(cartProducts.length>0){
      cartProducts.forEach(cartproduct=>{
        if(cartproduct.productID==newProduct._id){
          cartproduct.productCount++;
        
          cartproduct.price+= newProduct.price;
          flag=1;
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

    if(flag==1){
      let total=findTotal(cartProducts,'+');
      setTotalPrice(total);
      localStorage.setItem('total',total);
      localStorage.setItem('cart',JSON.stringify(cartProducts));
      return;
    }

    let npOBJ={
      productType: 'NormalProduct',
      productID: newProduct._id,
      productCount: 1,
      price: newProduct.price
    }

    cartProducts.push(npOBJ);
    let total=findTotal(cartProducts,'+');
    setTotalPrice(total);
    localStorage.setItem('total',total);
    localStorage.setItem('cart',JSON.stringify(cartProducts));
  }

  const decrementSaleRuleProduct=(newProduct)=>{
 
    let cartProduct = JSON.parse(localStorage.getItem("cart")) || [];
 
    if ((newProduct.quantity - 1) == 0) {
      // Remove the object by filtering out the one with matching productID
      cartProduct = cartProduct.filter(product => product.productID !== newProduct._id);

      console.log(cartProduct);
      let total=findTotal(cartProduct,'-');
      setTotalPrice(total);
      localStorage.setItem('total',total);
      localStorage.setItem("cart", JSON.stringify(cartProduct));
      console.log('lok');

      setProducts(prevProducts =>
        prevProducts.map(pro =>
          pro._id === newProduct._id
            ? { ...pro, quantity: pro.quantity - 1 } // Creates a new object (safer for React state updates)
            : pro
        )
      );    
      return;
    }
    let ruleAppliedArr=[];
    console.log('jjj');
 
    if (cartProduct.length > 0) {
     
      cartProduct.forEach((cartItem) => {
        if (cartItem.productID == newProduct._id) {
         
          const rules = newProduct.saleGroupRules;
          let count = (newProduct.quantity) - 1

          rules.some((rule) => {
            if (rule.status === "Active" && !rule.count<count && !rule.count==0 && ( Math.floor(count / rule.count))!=0) {
            
                let remainder = count % rule.count;
                let appliedCount = Math.floor(count / rule.count);
                let notAppliedPrice = remainder * newProduct.price;
                let appliedPrice = appliedCount * rule.price;


                let saleobj=
                  {
                    productType: 'saleRule',
                    productID: newProduct._id,
                    totalCount: count,
                    saleAppliedCount: appliedCount,
                    saleRuleNotAppliedCount: remainder,
                    salePrice: appliedPrice,
                    notSaleRulePrice: notAppliedPrice
                  }
                ruleAppliedArr.push(saleobj);
            }
          });
        }
      });

    
      if(ruleAppliedArr.length==0){
        const rules = newProduct.saleGroupRules;
      
        rules.forEach((rule)=>{
          if(rule.count==1 && rule.status=='Active'){

            let saleOBJ=(
              {
                productType: 'saleRule',
                productID: newProduct._id,
                totalCount: 1,
                saleAppliedCount: 1,
                saleRuleNotAppliedCount: 0,
                salePrice: rule.price,
                notSaleRulePrice: 0
              }
            );

            ruleAppliedArr.push(saleOBJ);

          }
        });
      }  
   
      let isReplaced = false;
      console.log(ruleAppliedArr);

      if(ruleAppliedArr.length==0){
        
      let total=findTotal(cartProduct,'-');
      setTotalPrice(total);
      localStorage.setItem('total',total);
      localStorage.setItem("cart", JSON.stringify(cartProduct));

      setProducts(prevProducts =>
        prevProducts.map(pro =>
          pro._id === newProduct._id
            ? { ...pro, quantity: pro.quantity - 1 } // Creates a new object (safer for React state updates)
            : pro
        )
      );  
        return;
      }
      const filteredArr = ruleAppliedArr.filter(obj => obj.saleAppliedCount !== 0);

      const lowestSaleApplied = filteredArr.length > 0 
        ? filteredArr.reduce((min, obj) => obj.saleAppliedCount < min.saleAppliedCount ? obj : min, filteredArr[0]) 
        : null;

      cartProduct = cartProduct.map(product => {
        if (String(product.productID) === String(lowestSaleApplied.productID)) {
  
          isReplaced = true; // Mark that we found a match
          return lowestSaleApplied;
        }
        return product;
      });

      if(!isReplaced){
        cartProduct.push(lowestSaleApplied);
      }
    }


    let total=findTotal(cartProduct,'-');
    setTotalPrice(total);
    localStorage.setItem('total',total);
    localStorage.setItem("cart", JSON.stringify(cartProduct));

    setProducts(prevProducts =>
      prevProducts.map(pro =>
        pro._id === newProduct._id
          ? { ...pro, quantity: pro.quantity - 1 } // Creates a new object (safer for React state updates)
          : pro
      )
    );    
  }

  const decrementProduct=(product)=>{
  
    let cartProducts=JSON.parse(localStorage.getItem('cart')||[]);
    console.log(cartProducts);

    cartProducts = cartProducts.filter(cartproduct => {
      if (cartproduct.productID === product._id) {
        cartproduct.productCount--;
        let finalPrice=cartproduct.price - product.price;

        if(product.isDiscount ){
          finalPrice=product.price - (product.price * product.discount) / 100;
        }

        cartproduct.price =  finalPrice; 
        product.quantity--;
    
        return product.quantity !== 0;
      }
      return true; // Keep all other products in the array
    });
    
    // Update localStorage if needed
    let total=findTotal(cartProducts,'-');
    setTotalPrice(total);
    localStorage.setItem('total',total);
    localStorage.setItem("cart", JSON.stringify(cartProducts));
    
  }
  
  const handleAddClick = (product)=>{
    if(product.isDiscount){
      addDiscountProduct(product);
    }
    else if(product.sale && product.salePrice==0 && product.saleGroupRules.length>0){
      addSaleRuleProduct(product);
    }
    else{
      addNormalProduct(product);
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
      addNormalProduct(Product);
    }
   }

  const handleDecrement = (Product)=>{
    if(Product.sale && Product.salePrice==0 && Product.saleGroupRules.length>0){
      decrementSaleRuleProduct(Product);
    }
    else{
      decrementProduct(Product)
    }
   
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
        navigate(`/checkout?storeID=${storeID}`);
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