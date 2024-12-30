import React, { useEffect, useState } from "react";
import AdminTable from "../../components/Table/Table";
import axios from "axios";
import { updateSession } from "../../api/session";

const Sessions = () => {

    const [rows, setRows] = useState([]);
    const [loading, setLoading] = useState(true);
    const [sessions, setSessions] = useState([]);

    const columns = [
        { field: "id", headerName: "ID" },
        { field: "session_name", headerName: "Session Name" },
        { field: "level", headerName: "Level" },
        { field: "genre", headerName: "Genre" },
        { field: "duration", headerName: "Duration (mins)" },
        { field: "price", headerName: "Price (USD)" },
        { field: "status", headerName: "Status" },
    ];

    // const actions = ["edit", "delete", "approve", "reject"];

    const fetchSessions = async () => {
        try {
            const response = await axios.get("http://localhost:5000/sessions");
            setRows(response.data);
        } catch (error) {
            console.error("Error fetching sessions:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchSessions();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    const getActionsForStatus = (status) => {
        if (status === "waiting") {
            return ["approve", "reject"]; // Hiển thị approve/reject cho status 'waiting'
        }
        return ["delete"]; // Hành động mặc định
    };

    const rowsWithActions = rows.map((row) => ({
        ...row,
        // actions: getActionsForStatus(row.status), // Thêm danh sách hành động cho từng hàng
    }));

    const handleApprove = async (row) => {
        const updatedSession = { ...row, status: "approved" }; // Thay đổi trạng thái
        console.log("Updating session:", updatedSession); // Log dữ liệu gửi đi
        try {
            await updateSession(row.id, updatedSession); // Gọi API
            alert("Session updated successfully!");
            fetchSessions(); // Làm mới dữ liệu bảng
        } catch (error) {
            console.error("Error updating session:", error.response || error);
        }
    };


    const handleReject = async (row) => {
        const updatedSession = { ...row, status: 'rejected' }; // Ví dụ: thay đổi trạng thái
        try {
            await updateSession(row.id, updatedSession);
            setSessions((prevSessions) =>
                prevSessions.map((s) => (s.id === row.id ? updatedSession : s))
            );
            alert('Session updated successfully!');
            fetchSessions();
        } catch (error) {
            console.error('Error updating session:', error);
        }
    }

    const handleDelete = async (row) => {
        if (window.confirm(`Are you sure you want to delete session ${row.session_name}?`)) {
            const updatedSession = { ...row, status: 'deleted' }; // Ví dụ: thay đổi trạng thái
            try {
                await updateSession(row.id, updatedSession);
                setSessions((prevSessions) =>
                    prevSessions.map((s) => (s.id === row.id ? updatedSession : s))
                );
                alert('Session updated successfully!');
                fetchSessions();
            } catch (error) {
                console.error('Error updating session:', error);
            }
        }
    }

    const actionHandlers = {
        approve: handleApprove,
        reject: handleReject,
        delete: handleDelete,

    };

    // const handleDelete = async (row) => {
    //     if (window.confirm(`Are you sure you want to delete session ${row.session_name}?`)) {
    //         try {
    //             await deleteSession(row.id);
    //             setSessions((prevSessions) => prevSessions.filter((s) => s.id !== row.id));
    //             alert('Session deleted successfully!');
    //         } catch (error) {
    //             console.error('Error deleting session:', error);
    //         }
    //     }
    // };

    return (
        <div className="dashboard-page flex">
            {/* Main Content */}
            <div className="flex-1 transition-all duration-300 pl-0">
                <div className="p-6">
                    <h1 className="text-3xl font-bold">Sessions Management</h1>
                    <AdminTable
                        rows={rowsWithActions} // Truyền các hàng có hành động động
                        columns={columns}
                        actions={null} // Không sử dụng actions chung
                        actionHandlers={actionHandlers}
                    />
                </div>
            </div>
        </div>
    );
};

export default Sessions;
