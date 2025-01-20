import Header from "../components/Header";
import Navbar from "../components/NavBar";

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