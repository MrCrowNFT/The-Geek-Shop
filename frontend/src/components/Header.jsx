import { FaFacebook, FaTwitter, FaInstagram, FaEnvelope, FaUser, FaHeart, FaShoppingCart } from "react-icons/fa";
import logo from "../assets/Logo(B).png"

const Header = () => {

  return (
    <header>
      <div className="social-media">
        <FaFacebook></FaFacebook><FaTwitter></FaTwitter><FaInstagram></FaInstagram>
        <p> | </p><FaEnvelope></FaEnvelope><a href="">marketplace@gmail.com</a>
      </div>
      <img src={logo} alt=""></img>
      <div className="user-interactions">
        <FaUser></FaUser>
        <p>Login</p>
        <p> | </p>
        <p>+ Create</p>
        <p> | </p>
        <FaHeart></FaHeart>
        <p> | </p>
        <FaShoppingCart></FaShoppingCart>
      </div>
    </header>
  )}
    

export default Header;