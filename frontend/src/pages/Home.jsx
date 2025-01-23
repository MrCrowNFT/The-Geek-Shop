import Header from "../components/Header/Header.jsx"
import Navbar from "../components/NavBar/NavBar.jsx";

const HomePage = () => {
  return (
    <>
      <Header />
      <Navbar></Navbar>
      <div className="p-4">Welcome to the Marketplace!</div>
    </>
  );
};

export default HomePage;