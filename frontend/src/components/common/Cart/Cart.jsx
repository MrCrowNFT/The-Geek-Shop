import "./Cart.css"
import {useCart} from "../../../hooks/useCart.js"

const Cart = ()=>{

    //get the methods from the useCart Hook
    //the addToCart will be on the product button
    const { cartItems, removeFromCart, clearCart} = useCart;
    
    return (
        <div className="cart-container">
          <h2>Your Cart</h2>
          {cartItems.length === 0 ? (
            <p>Your cart is empty</p>
          ) : (
            <ul>
              {cartItems.map((item) => (
                <li key={item.id}>
                  {item.name} - ${item.price}
                  <button onClick={() => removeFromCart(item.id)}>Remove</button>
                </li>
              ))}
            </ul>
          )}
          <button onClick={clearCart}>Clear Cart</button>
        </div>
      );
    };

}

export default Cart;