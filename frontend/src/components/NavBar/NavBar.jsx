import logo from "../../assets/images/Logo(W).png";
import search from "../../assets/icons/search.png";
import cart from "../../assets/icons/shopping-cart.png";
import { useEffect } from "react";
import "./NavBar.css";

const Navbar = () => {
  useEffect(() => {
    const handleScroll = () => {
      //after 50 pixels, might need to adjust**
      if (window.scrollY > 50) {
        document.body.classList.add("scrolled");
      } else {
        document.body.classList.remove("scrolled");
      }
    };

    window.addEventListener("scroll", handleScroll);

    //cleanup
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="navbar">
      <div className="navbar-content">
        <div className="navbar-content-left">
          <div className="logo-wrapper">
            <a href="/home">
              <img
                className="logo"
                loading="lazy"
                src={logo}
                alt="marketplace logo"
              />
            </a>
          </div>
          <div className="nav-links">
            <nav>
              <ul>
                <li>
                  <a href="" className="nav-link">
                    Figures
                  </a>
                </li>
                <li>
                  <a href="" className="nav-link">
                    Plushies
                  </a>
                </li>
                <li>
                  <a href="" className="nav-link">
                    Trading Cards
                  </a>
                </li>
                <li>
                  <a href="" className="nav-link">
                    Retro
                  </a>
                </li>
                <li>
                  <a href="" className="nav-link">
                    Goods
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
        <div className="navbar-content-right">
          <div className="navbar-search-bar">
            <span className="search-icon-wrap">
              <img className="search-icon" src={search}></img>
            </span>
            <div className="search-bar">
              <form>
                <input
                  className="search-query"
                  type="text"
                  placeholder="Search products"
                  autoComplete="off"
                  autoCapitalize="off"
                ></input>
              </form>
            </div>
          </div>
          <div className="cart">
            <button type="button" className="cart-button">
              <img className="cart-icon" src={cart}></img>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
