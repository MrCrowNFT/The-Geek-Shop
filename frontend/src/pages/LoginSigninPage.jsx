import "./LoginSigninPage.css";
import LoginSigninTabs from "../components/common/LoginSigninTabs/LoginSigninTabs.jsx";
import Header from "../components/common/Header/Header.jsx";
import Navbar from "../components/common/NavBar/NavBar.jsx";
import Footer from "../components/common/Footer/Footer.jsx";

const LoginSigninPage = () => {
  return (
    <>
      <Header />
      <Navbar />
      <LoginSigninTabs />
      <Footer />
    </>
  );
};

export default LoginSigninPage;
