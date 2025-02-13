import logo from "../../../assets/images/Logo(W).png";
import Ig from "../../../assets/icons/instagram.svg";
import facebook from "../../../assets/icons/facebook.svg";
import tiktok from "../../../assets/icons/tiktok.svg";
import twitter from "../../../assets/icons/twitter.svg";
import "./Footer.css";

const Footer = () => {
  return (
    <footer>
      <div>
        <div className="content">
          <div className="grid">
            <div className="colum">
              <h3>About</h3>
              <ul>
                <li>
                  <a href="">About</a>
                </li>
                <li>
                  <a href="">Team</a>
                </li>
                <li>
                  <a href="">Blog</a>
                </li>
              </ul>
            </div>
            <div className="colum">
              <h3>Support</h3>
              <ul>
                <li>
                  <a href="">Cancelation policy</a>
                </li>
                <li>
                  <a href="">FAQ</a>
                </li>
                <li>
                  <a href="">Contact us</a>
                </li>
              </ul>
            </div>
            <div className="colum">
              <h3>Legal</h3>
              <ul>
                <li>
                  <a href="">Terms</a>
                </li>
                <li>
                  <a href="">Privacy</a>
                </li>
              </ul>
            </div>
            <div className="colum">
              <h3>Random</h3>
              <ul>
                <li>
                  <a href="">Random</a>
                </li>
                <li>
                  <a href="">Random</a>
                </li>
                <li>
                  <a href="">Random</a>
                </li>
              </ul>
            </div>
          </div>
          <hr></hr>
          <div className="logo-and-media">
            <a href="/home">
              <img
                className="logo"
                loading="lazy"
                src={logo}
                alt="marketplace logo"
              />
            </a>
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
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
