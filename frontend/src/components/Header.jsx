import logo from "../assets/Logo(B).png"
import Ig from "../assets/instagram.png"
import facebook from "../assets/facebook.png"
import tiktok from "../assets/tik-tok.png"
import twitter from "../assets/twitter.png"
import gmail from "../assets/gmail.png"
import user from "../assets/user.png"
import plus from "../assets/plus.png"
import heart from "../assets/heart.png"
import cart from "../assets/shopping-cart.png"

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
      <img id="logo" src={logo} alt="Marketplace Logo"></img>
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