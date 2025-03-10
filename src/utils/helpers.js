import { Data } from '../Pages/r.js';
import axios, { all } from 'axios';

const apiUrl = process.env.REACT_APP_API_URL
const environment = process.env.REACT_APP_ENVIRONMENT

let currentLocation = {
  latitude: 0,
  longitude: 0
}

export const getCurrectLocation = async () => {

  return new Promise((resolve, reject) => {
    if (navigator.geolocation) {
      // Use watchPosition for quicker updates
      const watchId = navigator.geolocation.watchPosition(
        (position) => {
          const curentLocation = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          };

          resolve(curentLocation);

          // Stop watching after getting the location
          navigator.geolocation.clearWatch(watchId);
        },
        (error) => {
          console.error("Error getting location:", error);
          reject(error);
        },
        { enableHighAccuracy: true, timeout: 5000, maximumAge: 0 } // Optimized options
      );
    } else {
      reject("Geolocation is not supported by this browser.");
    }
  });
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

const sortStoresByDistance = (storesData, location) => {
  // First, calculate the distance for each store

  const storesWithDistance = storesData.map((store) => {
    const lat = parseFloat(store.location.lat);
    const lon = parseFloat(store.location.lon);

    // Calculate the distance between current location and the store's location
    const distanceInKm = calculateDistance(location.latitude, location.longitude, lat, lon);
    const formattedDistance = formatDistance(distanceInKm);  // format the distance (e.g., 2.3 km)

    // Add the distance to the store object
    return { ...store, distance: formattedDistance, distanceInKm };  // Include raw distanceInKm for sorting
  });

  // Then, sort the stores based on the distanceInKm (which is the raw distance)

  storesWithDistance.sort((a, b) => a.distanceInKm - b.distanceInKm);  // Sorting by distance in ascending order

  // After sorting, return the stores with the calculated distance
  return storesWithDistance;
};

const calculateDistance = (lat1, lon1, lat2, lon2) => {

  const toRadians = (degrees) => degrees * (Math.PI / 180);
  const R = 6371; // Earth's radius in km

  const dLat = toRadians(lat2 - lat1);
  const dLon = toRadians(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRadians(lat1)) * Math.cos(toRadians(lat2)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c * 1000; // Convert km to meters
};

function formatDistance(distanceInMeters) {
  return distanceInMeters >= 1000
    ? `${(distanceInMeters / 1000).toFixed(1)} km`
    : `${Math.round(distanceInMeters)} m`;
}

// export const getCurrectLocation = async () => {
//   return new Promise((resolve, reject) => {
//     if (navigator.geolocation) {
//       navigator.geolocation.getCurrentPosition(
//         (position) => {
//           const curentLocation = {
//             latitude: position.coords.latitude,
//             longitude: position.coords.longitude, // Fix typo from "laontitude"
//           };
//           console.log("Fetched Location:", curentLocation);
//           resolve(curentLocation); // Return the fetched location
//         },
//         (error) => {
//           console.error("Error getting location:", error);
//           reject(error);
//         }
//       );
//     } else {
//       reject("Geolocation is not supported by this browser.");
//     }
//   });
// };

export const haversineDistance = (lat1, lon1, lat2, lon2) => {
  const toRadians = (deg) => (deg * Math.PI) / 180;
  const R = 6371; // Earth's radius in km
  const dLat = toRadians(lat2 - lat1);
  const dLon = toRadians(lon2 - lon1);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRadians(lat1)) * Math.cos(toRadians(lat2)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c * 1000; // Convert km to meters
};

export const findNearbyStores = (currentLat, currentLon, stores, maxDistance = 15000) => {
  const nearbyStores = stores.filter((store) => {
    const storeLat = parseFloat(store.location.lat);
    const storeLon = parseFloat(store.location.lon);

    if (!storeLat || !storeLon) return false;

    const distance = haversineDistance(currentLat, currentLon, storeLat, storeLon);
    return distance <= maxDistance;
  });

  return nearbyStores.length > 0 ? nearbyStores : [];
};

export const fetchStoresUtils = async () => {
  // {latitude: 13.0220032, longitude: 80.2422784}
  let location = await getCurrectLocation();
  const aToken = localStorage.getItem('accessToken');
  const response = await axios.get(`${apiUrl}/shops/getshops?limit=50&page=1`, {
    headers: {
      'Authorization': `Bearer ${aToken}`,
      'accept': 'application/json',
      'env': environment,
    },
  });

  const allStores = response.data.data;
  const sortedStores = sortStoresByDistance(allStores, location);

  return sortedStores;
};

export const fetchProducts = async (storeID, setLoading, setProducts, accessToken, setisProductfetched, addedProducts, refreshAccessToken) => {
  try {

    const response = await axios.get(
      `${apiUrl}/vms/getProducts/${storeID}`,
      {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'accept': '*/*',
          'env': environment,
        },
      }
    );

    let responsew = response.data;

    responsew.forEach((prod) => {
      if (prod.availableItems === 0) {
        return;
      }

      if (prod.quantity === undefined) {
        prod.quantity = 0;
      }
    });

    let fetchProduct = responsew;
    if (fetchProduct.length == 0) {
      setisProductfetched(true);
    }

    if (addedProducts.length > 0) {
      fetchProduct = changeProductQuantity(fetchProduct);
      setProducts(fetchProduct);
    } else {
      setProducts(fetchProduct);
    }

  } catch (error) {

    if (error.status == 401) {
      const newToken = await refreshAccessToken();
      if (newToken) {
        fetchProducts();
      }
    }

    console.error('Error fetching products:', error);
  }
  finally {
    setLoading(false);
  }
};

export const fetchCurrence = async (storeID, setCurrence, refreshAccessToken) => {
  let accessToken = localStorage.getItem('accessToken');
  try {
    // Make the API request to fetch currency data
    const corrence = await axios.get(`${apiUrl}/settings/${storeID}/preferences`, {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'accept': '*/*',
        'env': environment,
      },
    });

    // Check if 'currency' exists in the response data
    const currencyExists = corrence.data.value.hasOwnProperty('currency');
    if (currencyExists) {
      if (corrence.data.value !== '') {
        setCurrence(corrence.data.value.currency); // Set the currency state
      }
    }

    localStorage.setItem('currence', corrence.data.value.currency);

  } catch (error) {
    if (error.status == 401) {

      const newToken = await refreshAccessToken();
      if (newToken) {
        fetchCurrence();
      }

    }
    console.error('Error fetching currency:', error);
    // Handle error (e.g., show an error message, or fallback behavior)
  }
};