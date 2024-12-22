import React, { useState } from "react";
import Sidebar from "../../components/Sidebar/Sidebar";
import Header from "../../components/Header/Header";
import AdminTable from "../../components/Table/Table";

const Classes = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

    const handleToggleSidebar = () => {
        setIsSidebarOpen((prev) => !prev); // Đảo ngược trạng thái Sidebar
    };

    const columns = [
        { field: "no", headerName: "No" },
        { field: "name", headerName: "Name" },
        { field: "email", headerName: "Email" },
        { field: "phone", headerName: "Phone" },
        { field: "classes", headerName: "Classes" },
        { field: "sessions", headerName: "Sessions" },
        { field: "feesPaid", headerName: "Fees Paid" },
    ];

    const rows = [
        { no: 1, name: "Brad Simmons", email: "abc@gmail.com", phone: "+84 12345678", classes: "Class 1, Class 2", sessions: "Session 1, Session 2", feesPaid: 342048 },
        // Add more rows as needed
    ];

    const actions = ["edit", "delete", "lock"];

    return (
        <div className="flex-1 transition-all duration-300 pl-0 ">
            <div className="p-6">
                <h1 className="text-3xl font-bold">Welcome to Classes</h1>
                <AdminTable rows={rows} columns={columns} actions={actions} />;
            </div>

        </div>
    );
};

export default Classes;
