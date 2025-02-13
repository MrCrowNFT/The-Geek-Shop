import "./Cart.css";
import cart from "../../../assets/icons/shopping-cart.svg";
import { useCart } from "../../../hooks/useCart.jsx";
import { useState } from "react";

const Cart = () => {
  //get the methods from the useCart Hook
  //the addToCart will be on the product button
  const { cartItems, addToCart, removeFromCart, reduceQuantity, clearCart } =
    useCart();
  const [isOpen, setIsOpen] = useState(false);

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
          <ul className="cart-item-ulist">
            {cartItems.map((item) => (
              <li className="cart-item-list" key={item.id}>
                <img
                  className="product-item-image"
                  src={item.images[1]}
                  alt={item.name}
                />
                <p>{item.name}</p>
                <p>${item.price}</p>
                <div className="quantity-controllers"> 
                <button
                  className="count-setter"
                  onClick={() => reduceQuantity(item.id)} // Decrease quantity
                >
                  -
                </button>
                {item.quantity}
                <button
                  className="count-setter"
                  onClick={() => addToCart(item)} // Increase quantity
                >
                  +
                </button>
                </div>
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
