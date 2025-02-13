import "./Cart.css";
import cart from "../../../assets/icons/shopping-cart.svg";
import { useCart } from "../../../hooks/useCart.jsx";
import { useState } from "react";

const Cart = () => {
  //get the methods from the useCart Hook
  //the addToCart will be on the product button
  const { cartItems, removeFromCart, clearCart } = useCart();
  const [isOpen, setIsOpen] = useState(false);

  const [productCounter, setProductCounter] = useState(1);

  const addCount = () => {
    setProductCounter(productCounter + 1);
  };

  const reduceCount = (id) => {
    if (productCounter < 1) {
      removeFromCart(id); //remove the item if count is 0
    } else {
      setProductCounter(productCounter - 1);
    }
  };

  const toggleCart = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <div className="cart">
        <button type="button" className="cart-button" onClick={toggleCart}>
          <img className="cart-icon" src={cart} alt="Shopping Cart"></img>
          <div className="product-amount">{cartItems.length}</div>
        </button>
      </div>
      <div className={`cart-sidebar ${isOpen ? "open" : ""}`}>
        <h2>Your Cart</h2>
        <button className="close-btn" onClick={toggleCart}>
          X
        </button>
        {cartItems.length === 0 ? (
          <p>Your cart is empty</p>
        ) : (
          <ul>
            {cartItems.map((item) => (
              <li key={item.id}>
                {item.name} - ${item.price}
                <button className="count-setter" onClick={reduceCount}>
                  -
                </button>
                <p className="count-display">{productCounter}</p>
                <button className="count-setter" onClick={addCount}>
                  +
                </button>
                <button onClick={() => removeFromCart(item.id)}>Remove</button>
              </li>
            ))}
          </ul>
        )}
        <button onClick={clearCart}>Empty Cart</button>
      </div>
    </>
  );
};

export default Cart;
