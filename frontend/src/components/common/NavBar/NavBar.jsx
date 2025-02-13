import logo from "../../../assets/images/Logo(W).png";
import search from "../../../assets/icons/search.png";
import SearchBar from "../SearchBar/SearchBar.jsx";
import CartButton from "../CartButton/CartButton.jsx";
import "./NavBar.css";

const Navbar = () => {
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
            <SearchBar />
          </div>
          <CartButton />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
