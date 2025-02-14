import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/Home.jsx";
import ProductPage from "./pages/ProductPage.jsx";
import SearchPage from "./pages/SearchPage.jsx";
import AdminDashboard from "./pages/AdminDashboard.jsx";
import LoginSigninPage from "./pages/LoginSigninPage.jsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Routes>
          <Route path="/home" element={<HomePage />} />
          <Route path="/loginsingup" element={<LoginSigninPage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/product" element={<ProductPage />} />
          <Route path="/admin" element={<AdminDashboard />} />
        </Routes>
      </QueryClientProvider>
    </>
  );
}

export default App;
