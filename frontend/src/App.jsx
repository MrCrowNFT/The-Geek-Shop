import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/Home.jsx";
import ProductPage from "./pages/ProductPage.jsx";
import SearchPage from "./pages/SearchPage.jsx";
import AdminDashboard from "./pages/AdminDashboard.jsx";

function App() {
  return (
    <>
      <Routes>
        <Route path="/home" element={<HomePage />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/product" element={<ProductPage />} />
        <Route path="/admin" element={<AdminDashboard />} />
      </Routes>
    </>
  );
}

export default App;
