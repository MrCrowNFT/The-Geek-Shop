import "./Checkout.css";
import { useCart } from "../../../hooks/useCart.jsx";

const SummaryTab = () => {
  const { cartItems, addToCart, removeFromCart, reduceQuantity } = useCart();

  // Calculate the total amount
  const totalAmount = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  return (
    <>
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
                  onClick={() => reduceQuantity(item.id)}
                >
                  -
                </button>
                {item.quantity}
                <button
                  className="count-setter"
                  onClick={() => addToCart(item)}
                >
                  +
                </button>
              </div>
              <button onClick={() => removeFromCart(item.id)}>Remove</button>
            </li>
          ))}
        </ul>
      )}
      <hr></hr>
      <p>Total: ${totalAmount.toFixed(2)}</p>
      <button>Next</button>
    </>
  );
};
export default SummaryTab;
