  export const updateDicsountProductInCart = (newProduct, action,setProducts,setTotalPrice) => {
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

    if (cartProducts.length!=0) {
      cartProducts = cartProducts.filter(pro => pro.productID !== newProduct._id);

      if (newQuantity != 0) {
        dpOBJ.productCount = newQuantity;
        dpOBJ.price = newQuantity * (newProduct.price - (newProduct.price * newProduct.discount) / 100);
        cartProducts.push(dpOBJ);
      }
    }else{
      cartProducts.push(dpOBJ);
    }
    
    let total = findTotal(cartProducts, '+');
    setTotalPrice(total);
    localStorage.setItem('total', total);
    localStorage.setItem('cart', JSON.stringify(cartProducts));

    setProducts(prevProducts =>
      prevProducts.map(pro =>
        pro._id === newProduct._id
          ? { ...pro, quantity: newQuantity }
          : pro
      )
    );

  }

  export const updateNormalProductIncart = (newProduct, action,setProducts,setTotalPrice) => {
    let npOBJ = {
      productType: 'NormalProduct',
      productID: newProduct._id,
      productCount: 1,
      price: newProduct.price
    }

    let cartProducts = JSON.parse(localStorage.getItem('cart')) || [];
    let newQuantity = action === '+' ? newProduct.quantity + 1 : newProduct.quantity - 1;

    if (cartProducts != null) {
      cartProducts = cartProducts.filter(pro => pro.productID !== newProduct._id);
      if (newQuantity != 0) {
        npOBJ.productCount = newQuantity;
        npOBJ.price = (newQuantity * newProduct.price)
        cartProducts.push(npOBJ);
      }
    } else {
      cartProducts.push(npOBJ);
    }

    let total = findTotal(cartProducts, '+');
    setTotalPrice(total);
    localStorage.setItem('total', total);
    localStorage.setItem('cart', JSON.stringify(cartProducts));

    setProducts(prevProducts =>
      prevProducts.map(pro =>
        pro._id === newProduct._id
          ? { ...pro, quantity: newQuantity } // Creates a new object (safer for React state updates)
          : pro
      )
    );

  }

  export const updateSaleRuleProductInCart = (Product, operation,setProducts,setTotalPrice,setSalerule) => {
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

    if (cartProducts.length == 0) {
      resultArr = findSaleRules(Product, newProductQuantity);
      saleRuleProduct.saleRuleDetails = resultArr;
      saleRuleProduct.totalPrice = findSaleRuleProductTOtal(saleRuleProduct, newProductQuantity);
      updatedCartProducts.push(saleRuleProduct);
    } else {

      updatedCartProducts = cartProducts.filter(pro => pro.productID !== Product._id);
      resultArr = findSaleRules(Product, newProductQuantity);
      saleRuleProduct.saleRuleDetails = resultArr;

      if (newProductQuantity != 0) {
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

    localStorage.setItem('total', total);
    localStorage.setItem('cart', JSON.stringify(updatedCartProducts));
  }

  export const findSaleRules = (Product, quantity) => {
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

      if ((tempQuantity + 1) % rule.count == 0 && flag == 0) {
        tempObj.isNearby = true;
        flag = 1;
      }

      if (rule.status == 'Active' && rule.count <= tempQuantity) {

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
    let totalCount = 0;

    if (cartProducts.length == 0) {
      return totalPrice;
    }

    cartProducts.forEach((pro) => {
      if (pro.productType == 'saleRule') {
        totalPrice += pro.totalPrice;
      }
      else {
        totalPrice += pro.price;
      }
    })
    return totalPrice.toFixed(1);
  }