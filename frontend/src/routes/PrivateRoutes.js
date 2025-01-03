import React from "react";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
    const isAuthenticated = !!localStorage.getItem("authToken"); // Kiểm tra nếu có token
    console.log("TOken: ", !!localStorage.getItem("authToken"));

    if (!isAuthenticated) {
        // Nếu chưa đăng nhập, điều hướng về trang login
        return <Navigate to="/login" />;
    }

    return children || <Navigate to="/sesionss" />;
};

export default PrivateRoute;
