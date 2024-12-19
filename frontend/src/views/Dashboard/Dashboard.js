import React, { useState } from "react";
import Sidebar from "../../components/Sidebar/Sidebar";
import Header from "../../components/Header/Header";

const Dashboard = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

    const handleToggleSidebar = () => {
        setIsSidebarOpen((prev) => !prev); // Đảo ngược trạng thái Sidebar
    };

    return (
        <div className="dashboard-page flex">
            {/* Sidebar */}
            {isSidebarOpen && <Sidebar onToggleSidebar={handleToggleSidebar} />}

            {/* Main Content */}
            <div className="flex-1 transition-all duration-300 pl-0 ">
                <Header onToggleSidebar={handleToggleSidebar} />
                <div className="p-6">
                    <h1 className="text-3xl font-bold">Welcome to Admin Dashboard</h1>
                </div>
            </div>

        </div>
    );
};

export default Dashboard;
