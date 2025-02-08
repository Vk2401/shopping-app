import { createContext, useContext, useEffect, useState } from "react";

// Create Cart Context
const CartContext = createContext();

// Custom hook for easy access
export const useCart = () => useContext(CartContext);

// Cart Provider Component
export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0); // State to store the total cart value

  // Load cart from localStorage when the app starts
  useEffect(() => {
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      setCart(JSON.parse(storedCart));
    }
  }, []);

  // Save cart to localStorage whenever it changes
  // useEffect(() => {
  //   if (cart.length > 0) {
  //     localStorage.setItem("cart", JSON.stringify(cart));
  //   } else {
  //     localStorage.removeItem("cart"); // Clear storage if cart is empty
  //   }
  // }, [cart]);

  // Update total whenever the cart changes
  
  useEffect(() => {
    if (cart.length > 0) {
      localStorage.setItem("cart", JSON.stringify(cart));
    } else {
      localStorage.removeItem("cart"); // Clear storage if cart is empty
    }


    const newTotal = cart.reduce((acc, item) => {

      const priceAfterDiscount = item.discount
        ? item.price - (item.price * item.discount) / 100 // Apply discount
        : item.price;
        console.log(priceAfterDiscount);
        console.log(item.quantity);
        console.log( priceAfterDiscount * item.quantity);
      return acc + priceAfterDiscount * item.quantity;
    }, 0);

    setTotal(newTotal.toFixed(2)); // Set total with 2 decimal points
  }, [cart]);

  // Function to add item to cart
  const addToCart = (product) => {
    setCart((prevCart) => {
      const existingProduct = prevCart.find((item) => item._id === product._id);

      if (existingProduct) {
        return prevCart.map((item) =>
          item._id === product._id
            ? { ...item, quantity: item.quantity + product.quantity } // Increment quantity
            : item
        );
      } else {
        return [...prevCart, product]; // Add new product
      }
    });
  };


  // Function to remove item from cart
  const removeFromCart = (productId) => {
    setCart((prevCart) => prevCart.filter((item) => item._id !== productId));
  };

  // Function to clear the cart
  const clearCart = () => {
    setCart([]);
  };

  return (
    <CartContext.Provider value={{ cart, total, addToCart, removeFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};
