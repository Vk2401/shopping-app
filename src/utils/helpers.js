import { Data } from '../Pages/r.js';
import axios from 'axios';

let currentLocation = {
  currentLatitude: '',
  currentLongitude: '',
};

export const updateDicsountProductInCart = (newProduct, action, setProducts, setTotalPrice) => {
  let cartProducts = JSON.parse(localStorage.getItem('cart')) || [];

  let dpOBJ = {
    productType: 'discountProduct',
    productID: newProduct._id,
    discountRate: newProduct.discount,
    originalAmount: newProduct.price,
    price: newProduct.price - (newProduct.price * newProduct.discount) / 100,
    productCount: 1
  };

  let newQuantity = action === '+' ? newProduct.quantity + 1 : newProduct.quantity - 1;

  if (cartProducts.length !== 0) {
    cartProducts = cartProducts.filter(pro => pro.productID !== newProduct._id);

    if (newQuantity !== 0) {
      dpOBJ.productCount = newQuantity;
      dpOBJ.price = parseFloat((newQuantity * (newProduct.price - (newProduct.price * newProduct.discount) / 100)).toFixed(2));
      cartProducts.push(dpOBJ);
    }
  } else {
    cartProducts.push(dpOBJ);
  }

  let total = findTotal(cartProducts, '+');
  setTotalPrice(total);


  setProducts(prevProducts =>
    prevProducts.map(pro => {
      if (pro._id === newProduct._id) {
        const updatedProduct = { ...pro, quantity: newQuantity };

        Data.forEach(proe => {
          if (proe._id === pro._id) {
            proe.quantity = newQuantity
          }
        })

        return updatedProduct;
      }
      return pro;
    })
  );

  localStorage.setItem('cart', JSON.stringify(cartProducts));
}

export const updateNormalProductIncart = (newProduct, action, setProducts, setTotalPrice) => {
  let npOBJ = {
    productType: 'NormalProduct',
    productID: newProduct._id,
    productCount: 1,
    price: newProduct.price
  }

  let cartProducts = JSON.parse(localStorage.getItem('cart')) || [];
  let newQuantity = action === '+' ? newProduct.quantity + 1 : newProduct.quantity - 1;

  if (cartProducts !== null) {
    cartProducts = cartProducts.filter(pro => pro.productID !== newProduct._id);
    if (newQuantity !== 0) {
      npOBJ.productCount = newQuantity;
      console.log((newQuantity * newProduct.price));
      npOBJ.price = (newQuantity * newProduct.price)
      cartProducts.push(npOBJ);
    }
  } else {
    cartProducts.push(npOBJ);
  }

  let total = findTotal(cartProducts, '+');
  setTotalPrice(total);

  setProducts(prevProducts =>
    prevProducts.map(pro => {
      if (pro._id === newProduct._id) {
        const updatedProduct = { ...pro, quantity: newQuantity };

        Data.forEach(proe => {
          if (proe._id === pro._id) {
            proe.quantity = newQuantity
          }
        })

        return updatedProduct;
      }
      return pro;
    })
  );
  localStorage.setItem('cart', JSON.stringify(cartProducts));
}

export const updateSaleRuleProductInCart = (Product, operation, setProducts, setTotalPrice, setSalerule) => {
  let cartProducts = JSON.parse(localStorage.getItem("cart")) || [];
  let updatedCartProducts = [];
  let resultArr = [];
  let newProductQuantity;

  const saleRuleProduct = {
    productType: 'saleRule',
    productID: Product._id,
    productPrice: Product.price,
    totalPrice: Product.price,
    totalCount: 1,
    saleRuleDetails: null,
  }

  newProductQuantity = operation === '-' ? --Product.quantity : ++Product.quantity;

  if (cartProducts.length === 0) {
    resultArr = findSaleRules(Product, newProductQuantity);
    saleRuleProduct.saleRuleDetails = resultArr;
    saleRuleProduct.totalPrice = findSaleRuleProductTOtal(saleRuleProduct, newProductQuantity);
    updatedCartProducts.push(saleRuleProduct);
  } else {

    updatedCartProducts = cartProducts.filter(pro => pro.productID !== Product._id);
    resultArr = findSaleRules(Product, newProductQuantity);
    saleRuleProduct.saleRuleDetails = resultArr;

    if (newProductQuantity !== 0) {
      resultArr = findSaleRules(Product, newProductQuantity);
      saleRuleProduct.saleRuleDetails = resultArr;
      saleRuleProduct.totalCount = newProductQuantity;
      saleRuleProduct.totalPrice = findSaleRuleProductTOtal(saleRuleProduct, newProductQuantity);
      updatedCartProducts.push(saleRuleProduct);
    }

  }

  Product.saleGroupRules = Product.saleGroupRules.map(rule => {
    let matchingRule = resultArr.find(res => res.saleRule.count === rule.count);

    if (matchingRule) {
      return {
        ...rule,
        isSaleApplied: matchingRule.isSaleApplied,
        isNearby: matchingRule.isNearby
      };
    }

    return rule; // If no match, return original object
  })

  setSalerule(Product.saleGroupRules);
  let total = findTotal(updatedCartProducts, '+');
  setTotalPrice(total);

  setProducts(prevProducts =>
    prevProducts.map(pro =>
      pro._id === Product._id
        ? { ...pro, quantity: newProductQuantity } // Creates a new object (safer for React state updates)
        : pro
    )
  );
  localStorage.setItem('cart', JSON.stringify(updatedCartProducts));
}

export const findSaleRules = (Product, quantity) => {
  console.log(Product.saleGroupRules);
  let flag = 0;
  let rules = Product.saleGroupRules;
  rules.sort((a, b) => b.count - a.count);
  let tempArr = [];
  let tempQuantity = quantity;

  rules.forEach(rule => {

    let tempObj = {
      productQuantiy: 0,
      saleRule: rule,
      isNearby: false,
      isSaleApplied: false,
    }

    if ((tempQuantity + 1) % rule.count === 0 && flag === 0) {
      tempObj.isNearby = true;
      flag = 1;
    }

    if (rule.status === 'Active' && rule.count <= tempQuantity) {


      let saleAppliedQuantiy = Math.floor(tempQuantity / rule.count);
      let saleNotAppliedQuantity = tempQuantity % rule.count;
      tempObj.productQuantiy = saleAppliedQuantiy;
      tempObj.isSaleApplied = true;

      saleNotAppliedQuantity = saleNotAppliedQuantity + 1;
      tempQuantity = tempQuantity - (saleAppliedQuantiy * rule.count);
    }

    tempArr.push(tempObj);
  })

  return tempArr;
}

export const findSaleRuleProductTOtal = (Product,) => {
  // Calculate total count and total price
  const { totalCount, totalPrice } = Product.saleRuleDetails.reduce((acc, detail) => {
    if (detail.productQuantiy !== 0) {
      acc.totalCount += detail.productQuantiy * detail.saleRule.count;
      acc.totalPrice += detail.productQuantiy * detail.saleRule.price;
    }
    return acc;
  }, { totalCount: 0, totalPrice: 0 });


  let a = Product.totalCount - totalCount;
  a = a * Product.productPrice;
  a = a + totalPrice;

  return a;

}

export const findTotal = (cartProducts, op) => {
  let totalPrice = 0;
  if (cartProducts.length === 0) {
    return totalPrice;
  }

  cartProducts.forEach((pro) => {
    if (pro.productType === 'saleRule') {
      totalPrice += pro.totalPrice;
    }
    else {
      totalPrice += pro.price;
    }
  })
  return totalPrice.toFixed(1);
}

export const findTotal2 = (cartProducts, allProducts) => {
  let totalPrice = 0;

  if (cartProducts.length === 0) {
    return totalPrice;
  }

  cartProducts.forEach((pro) => {
    if (pro.productType === 'saleRule') {
      let matchingProduct = allProducts.filter(pro => pro._id === pro.productID);
      let allRules = matchingProduct.saleGroupRules;
      let tempCOUNT = pro.totalCount;
      let v = 0;

      pro.saleRuleDetails.forEach(temp => {
        if (temp.isSaleApplied) {
          allRules.forEach(ruleT => {
            if (temp.saleRule.count === ruleT.count && temp.saleRule.price === ruleT.price) {
              tempCOUNT -= temp.saleRule.count;
              let a = temp.saleRule.count * temp.saleRule.price;
              v += a;
            }
          })
        }
      })

      v += matchingProduct.price;
      totalPrice = v;;
    }
    else {
      totalPrice += pro.price;
    }
  })
  return totalPrice.toFixed(1);
}

export const changeProductQuantity = (fetchedProducts) => {

  const cartProducts = JSON.parse(localStorage.getItem('cart'));

  if (cartProducts.length > 0) {

    fetchedProducts.forEach(fPro => {

      cartProducts.forEach(cartPRO => {
        if (cartPRO.productID === fPro._id) {
          if (cartPRO.productType === 'saleRule') {
            fPro.quantity = cartPRO.totalCount;
          }
          else {
            fPro.quantity = cartPRO.productCount
          }
        }
      })

    })

  }
  return fetchedProducts;
}

export const getCurrectLocation = () => {

  navigator.geolocation.getCurrentPosition(
    (position) => {
      const { latitude, longitude } = position.coords;
      currentLocation.currentLatitude = latitude;
      currentLocation.currentLongitude = longitude;
    },
    (err) => {
      if (err.code === err.PERMISSION_DENIED) {
      }
    }
  );
};

// export const haversineDistance = (lat1, lon1, lat2, lon2) => {z
//   const toRadians = (deg) => (deg * Math.PI) / 180;
//   const R = 6371; // Earth's radius in km
//   const dLat = toRadians(lat2 - lat1);
//   const dLon = toRadians(lon2 - lon1);

//   const a =
//     Math.sin(dLat / 2) * Math.sin(dLat / 2) +
//     Math.cos(toRadians(lat1)) * Math.cos(toRadians(lat2)) *
//     Math.sin(dLon / 2) * Math.sin(dLon / 2);

//   const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
//   return R * c * 1000; // Convert km to meters
// };

// export const findNearbyStores = (currentLat, currentLon, stores, maxDistance = 15000) => {
//   const nearbyStores = stores.filter((store) => {
//     const storeLat = parseFloat(store.location.lat);
//     const storeLon = parseFloat(store.location.lon);

//     if (!storeLat || !storeLon) return false;

//     const distance = haversineDistance(currentLat, currentLon, storeLat, storeLon);
//     console.log(maxDistance);
//     return distance <= maxDistance;
//   });

//   return nearbyStores.length > 0 ? nearbyStores : [];
// };

// export const fetchStores = async () => {
//   const aToken = sessionStorage.getItem('accessToken');

//   const response = await axios.get(`${apiUrl}/shops/getshops?limit=50&page=1`, {
//     headers: {
//       'Authorization': `Bearer ${aToken}`,
//       'accept': 'application/json',
//       'env': environment,
//     },
//   });

//   const allStores = response.data.data;
//   const nearbyStores = await findNearbyStores(currentLocation.currentLatitude, currentLocation.currentLongitude, allStores, Distance);
//   return nearbyStores;
// };