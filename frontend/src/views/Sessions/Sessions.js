import React, { useEffect, useState } from "react";
import AdminTable from "../../components/Table/Table";
import axios from "axios";
import { updateSession } from "../../api/session";
import { Modal, Box, Typography, Button, Stack } from "@mui/material";
import Loading from "../../components/Loading/Loading";

const Sessions = () => {
    const [rows, setRows] = useState([]);
    const [loading, setLoading] = useState(true);
    const [sessions, setSessions] = useState([]);
    const [selectedSession, setSelectedSession] = useState(null);
    const [openModal, setOpenModal] = useState(false);

    const columns = [
        { field: "id", headerName: "ID" },
        { field: "session_name", headerName: "Session Name" },
        { field: "level", headerName: "Level" },
        { field: "genre", headerName: "Genre" },
        { field: "duration", headerName: "Duration (mins)" },
        { field: "price", headerName: "Price (USD)" },
        { field: "status", headerName: "Status" },
    ];

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
        return <Loading />;
    }

    const handleEdit = (row) => {
        setSelectedSession(row);
        setOpenModal(true);
    };

    const handleApprove = async () => {
        if (!selectedSession) return;
        const updatedSession = { ...selectedSession, status: "approved" };
        try {
            await updateSession(selectedSession.id, updatedSession);
            alert("Session approved successfully!");
            fetchSessions();
            setOpenModal(false);
        } catch (error) {
            console.error("Error approving session:", error);
        }
    };

    const handleReject = async () => {
        if (!selectedSession) return;
        const updatedSession = { ...selectedSession, status: "rejected" };
        try {
            await updateSession(selectedSession.id, updatedSession);
            alert("Session rejected successfully!");
            fetchSessions();
            setOpenModal(false);
        } catch (error) {
            console.error("Error rejecting session:", error);
        }
    };

    const handleCloseModal = () => {
        setOpenModal(false);
    };

    const actionHandlers = {
        edit: handleEdit,
        approve: handleApprove,
        reject: handleReject,
        // delete: handleDelete,

    };
    return (
        <div className="dashboard-page flex">
            <div className="flex-1 transition-all duration-300 pl-0">
                <div className="p-6">
                    <h1 className="text-3xl font-bold">Sessions Management</h1>
                    <AdminTable
                        rows={rows}
                        columns={columns}
                        actions={null}
                        actionHandlers={actionHandlers}
                    />
                </div>
            </div>

            {/* Modal */}
            <Modal open={openModal} onClose={handleCloseModal}>
                <Box
                    sx={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        width: "90%",
                        maxWidth: "800px",
                        height: "80vh",
                        bgcolor: "background.paper",
                        borderRadius: "12px",
                        boxShadow: 24,
                        overflowY: "auto",
                        p: 4,
                    }}
                >
                    {selectedSession && (
                        <div>
                            <Typography variant="h5" gutterBottom
                                sx={{
                                    textAlign: "center",
                                }}>
                                Session Details
                            </Typography>
                            <Stack spacing={2}>
                                {selectedSession.thumbnail_url && (
                                    <div
                                        style={{
                                            width: "100%",
                                            maxWidth: "600px",
                                            margin: "0 auto",
                                        }}
                                    >
                                        <Typography variant="h6" gutterBottom>
                                            Thumbnail Preview:
                                        </Typography>
                                        <img
                                            src={selectedSession.thumbnail_url}
                                            alt="Session Thumbnail"
                                            style={{
                                                width: "100%",
                                                height: "auto",
                                                borderRadius: "8px",
                                                objectFit: "cover",
                                            }}
                                        />
                                    </div>
                                )}
                                <Typography><strong>ID:</strong> {selectedSession.id}</Typography>
                                <Typography><strong>Name:</strong> {selectedSession.session_name}</Typography>
                                <Typography><strong>Level:</strong> {selectedSession.level}</Typography>
                                <Typography><strong>Genre:</strong> {selectedSession.genre}</Typography>
                                <Typography><strong>Duration:</strong> {selectedSession.duration} mins</Typography>
                                <Typography><strong>Price:</strong> ${selectedSession.price}</Typography>
                                <Typography><strong>Status:</strong> {selectedSession.status}</Typography>

                                {selectedSession.video_url && (
                                    <div>
                                        <Typography variant="h6" gutterBottom>
                                            Video Preview:
                                        </Typography>
                                        <div
                                            style={{
                                                width: "100%",
                                                maxWidth: "600px",
                                                margin: "20px auto", // Căn giữa và thêm khoảng cách
                                                position: "relative",
                                                paddingTop: "56.25%", // 16:9 aspect ratio
                                            }}
                                        >
                                            <video
                                                controls
                                                style={{
                                                    position: "absolute",
                                                    top: 0,
                                                    left: 0,
                                                    width: "100%",
                                                    height: "100%",
                                                    borderRadius: "8px",
                                                    objectFit: "contain",
                                                    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                                                }}
                                            >
                                                <source src={selectedSession.video_url} type="video/mp4" />
                                                Your browser does not support the video tag.
                                            </video>
                                        </div>
                                    </div>

                                )}
                            </Stack>

                            <Stack direction="row" spacing={2} justifyContent="flex-end" mt={4}>
                                <Button variant="outlined" color="error" onClick={handleReject}>
                                    Reject
                                </Button>
                                <Button variant="contained" color="primary" onClick={handleApprove}>
                                    Approve
                                </Button>
                                <Button variant="text" onClick={handleCloseModal}>
                                    Close
                                </Button>
                            </Stack>
                        </div>
                    )}
                </Box>
            </Modal>
        </div>
    );
};

export default Sessions;
