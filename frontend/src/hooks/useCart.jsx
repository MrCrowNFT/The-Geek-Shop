import { createContext, useContext, useState } from "react";
import PropTypes from "prop-types";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  //adding product object into the cart Items
  const addToCart = (product) => {
    setCartItems((prevItems) => {
      //check if the product is in the cart
      const existingItem = prevItems.find((item) => item.id === product.id);
      if (existingItem) {
        //if exists we just add to its counter
        return prevItems.map((item) =>
          //add only to the corresponding item
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prevItems, { ...product, quantity: 1 }];
      }
    });
  };

  //removing items by id
  const removeFromCart = (productId) => {
    setCartItems((prevItems) =>
      prevItems.filter((item) => item.id !== productId)
    );
  };

  // reduce the quantity of a product by its ID
  const reduceQuantity = (productId) => {
    setCartItems(
      (prevItems) =>
        prevItems
          .map((item) =>
            item.id === productId
              ? { ...item, quantity: item.quantity - 1 } //decrease quantity
              : item
          )
          .filter((item) => item.quantity > 0) //remove if quantity reaches 0
    );
  };

  const clearCart = () => setCartItems([]);

  return (
    <CartContext.Provider
      value={{ cartItems, addToCart, removeFromCart, reduceQuantity, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
};

CartProvider.propTypes = {
  //this means children must be anything renderable in React
  children: PropTypes.node.isRequired,
};

export const useCart = () => useContext(CartContext);
