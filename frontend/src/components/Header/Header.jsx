import Ig from "../../assets/icons/instagram.png"
import facebook from "../../assets/icons/facebook.png"
import tiktok from "../../assets/icons/tik-tok.png"
import twitter from "../../assets/icons/twitter.png"
import gmail from "../../assets/icons/gmail.png"
import user from "../../assets/icons/user.png"
import plus from "../../assets/icons/plus.png"
import heart from "../../assets/icons/heart.png"
import cart from "../../assets/icons/shopping-cart.png"
import "./Header.css"

const Header = () => {

  return (
    <header>
      <div className="social-media">
        <a href="" target="_blank" rel="noreferrer">
          <img loading="lazy" height={20} width={20} src={Ig} alt="Istagram link" />
          </a>
        <a href="" target="_blank" rel="noreferrer">
          <img loading="lazy" height={20} width={20} src={facebook} alt="facebook link" />
          </a> 
        <a href="" target="_blank" rel="noreferrer">
          <img loading="lazy" height={20} width={20} src={twitter} alt="twitter link" />
          </a> 
        <a href="" target="_blank" rel="noreferrer">
          <img loading="lazy" height={20} width={20} src={tiktok} alt="tiktok link" />
          </a> 
        <span className="header_separator"></span>
        <a href="mailto:marketplace@gmail.com">
        <img loading="lazy" height={20} width={20} src={gmail} alt="gmail link" />
        marketplace@gmail.com</a>
      </div>
      <div className="user-interactions">
      <a href="">
          <img loading="lazy" height={20} width={20} src={user} alt="user login" />
          <p>Login</p>
          </a> 
        <span className="header_separator"></span>
        <a href="">
          <img loading="lazy" height={20} width={20} src={plus} alt="Create User" />
          <p>Create Account</p>
          </a>
        <span className="header_separator"></span>
        <a href="">
          <img loading="lazy" height={20} width={20} src={heart} alt="Liked products" />
          </a>
        <span className="header_separator"></span>
        <a href="">
          <img loading="lazy" height={20} width={20} src={cart} alt="Shopping cart" />
          </a>
      </div>
    </header>
  )}
    

export default Header;