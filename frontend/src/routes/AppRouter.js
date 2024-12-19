import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// import LoginPage from "../pages/Auth/LoginPage";
import Dashboard from "../views/Dashboard/Dashboard";

const AppRouter = () => {
    return (
        <Router>
            <Routes>
                {/* Route cho màn hình Authentication */}
                {/* <Route path="/login" element={<LoginPage />} /> */}

                {/* Route cho Dashboard */}
                <Route path="/dashboard" element={<Dashboard />} />

                {/* Redirect mặc định */}
                {/* <Route path="*" element={<LoginPage />} /> */}
            </Routes>
        </Router>
    );
};

export default AppRouter;
