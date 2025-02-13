import Ig from "../../../assets/icons/instagram.svg";
import facebook from "../../../assets/icons/facebook.svg";
import tiktok from "../../../assets/icons/tiktok.svg";
import twitter from "../../../assets/icons/twitter.svg";
import gmail from "../../../assets/icons/gmail.svg";
import user from "../../../assets/icons/user.svg";
import plus from "../../../assets/icons/plus.svg";
import heart from "../../../assets/icons/heart.svg";
import cart from "../../../assets/icons/shopping-cart.svg";
import "./Header.css";

const Header = () => {
  return (
    <header>
      <div className="social-media">
        <a href="" target="_blank" rel="noreferrer">
          <img
            loading="lazy"
            height={25}
            width={25}
            src={Ig}
            alt="Istagram link"
          />
        </a>
        <a href="" target="_blank" rel="noreferrer">
          <img
            loading="lazy"
            height={25}
            width={25}
            src={facebook}
            alt="facebook link"
          />
        </a>
        <a href="" target="_blank" rel="noreferrer">
          <img
            loading="lazy"
            height={25}
            width={25}
            src={twitter}
            alt="twitter link"
          />
        </a>
        <a href="" target="_blank" rel="noreferrer">
          <img
            loading="lazy"
            height={25}
            width={25}
            src={tiktok}
            alt="tiktok link"
          />
        </a>
        <span className="header_separator"></span>
        <a href="mailto:marketplace@gmail.com">
          <img
            loading="lazy"
            height={25}
            width={25}
            src={gmail}
            alt="gmail link"
          />
          marketplace@gmail.com
        </a>
      </div>
      <div className="user-interactions">
        <a href="">
          <img
            loading="lazy"
            height={25}
            width={25}
            src={user}
            alt="user login"
          />
          <p>Login</p>
        </a>
        <span className="header_separator"></span>
        <a href="">
          <img
            loading="lazy"
            height={25}
            width={25}
            src={plus}
            alt="Create User"
          />
          <p>Create Account</p>
        </a>
        <span className="header_separator"></span>
        <a href="">
          <img
            loading="lazy"
            height={25}
            width={25}
            src={heart}
            alt="Liked products"
          />
        </a>
        <span className="header_separator"></span>
        <a href="">
          <img
            loading="lazy"
            height={25}
            width={25}
            src={cart}
            alt="Shopping cart"
          />
        </a>
      </div>
    </header>
  );
};

export default Header;
