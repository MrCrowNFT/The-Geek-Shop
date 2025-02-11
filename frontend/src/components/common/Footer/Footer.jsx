import logo from "../../assets/images/Logo(W).png";
import Ig from "../../assets/icons/instagram.png";
import facebook from "../../assets/icons/facebook.png";
import tiktok from "../../assets/icons/tik-tok.png";
import twitter from "../../assets/icons/twitter.png";
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
                  height={20}
                  width={20}
                  src={Ig}
                  alt="Istagram link"
                />
              </a>
              <a href="" target="_blank" rel="noreferrer">
                <img
                  loading="lazy"
                  height={20}
                  width={20}
                  src={facebook}
                  alt="facebook link"
                />
              </a>
              <a href="" target="_blank" rel="noreferrer">
                <img
                  loading="lazy"
                  height={20}
                  width={20}
                  src={twitter}
                  alt="twitter link"
                />
              </a>
              <a href="" target="_blank" rel="noreferrer">
                <img
                  loading="lazy"
                  height={20}
                  width={20}
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
