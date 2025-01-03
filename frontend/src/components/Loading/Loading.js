import React from "react";
import "./Loading.css";  // Import CSS cho spinner

const Loading = () => {
    return (
        <div className="loading-container">
            <div className="spinner"></div>
        </div>
    );
};

export default Loading;
