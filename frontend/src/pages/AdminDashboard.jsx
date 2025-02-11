import "./AdminDashboard.css"
import { useState, useEffect } from "react";
import LoginModal from "../components/admin/LoginModal/LoginModal.jsx";
import BasicTabs from "../components/admin/Tabs/Tabs.jsx"

const AdminDashboard = ()=>{
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
      const token = localStorage.getItem("jwt");
      if (token) {
        // Optionally, validate token with an API call
        setIsAuthenticated(true);
      }
    }, []);

    return (
        <>
        {
            isAuthenticated ? (
            <div >
                <BasicTabs />
                {/* bascially a callback function to be executed once the login happens */}
                </div>):(<LoginModal onLoginSuccess={() => setIsAuthenticated(true)} />)
        }
        
        </>

    )
}

export default AdminDashboard;