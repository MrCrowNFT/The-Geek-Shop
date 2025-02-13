import "./CartButton.css";
import cart from "../../../assets/icons/shopping-cart.svg";

const Cart = () => {
  return (
    <div className="cart">
      <button type="button" className="cart-button">
        <img className="cart-icon" src={cart} alt="Shopping Cart"></img>
        <div className="product-amount">3</div>
      </button>
    </div>
  );
};

export default Cart;
