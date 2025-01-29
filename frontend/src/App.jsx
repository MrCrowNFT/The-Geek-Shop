import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/Home.jsx";
import ProductPage from "./pages/ProductPage.jsx";
import SearchPage from "./pages/SearchPage.jsx";

function App() {
  return (
    <>
      <Routes>
        <Route path="/home" element={<HomePage />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/product" element={<ProductPage/>}/>
      </Routes>
    </>
  );
}

export default App;
