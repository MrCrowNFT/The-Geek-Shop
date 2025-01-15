import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/Home.jsx";

function App() {
  return (
    <>
      <Routes>
				<Route path='/home' element={<HomePage></HomePage>} />
				<Route path='/admin' element={} />
			</Routes>
    </>
  )
}

export default App
