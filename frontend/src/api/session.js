import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000'; // Thay bằng URL backend của bạn

// Lấy tất cả sessions
export const getAllSessions = async () => {
    return axios.get(`${API_BASE_URL}/sessions`);
};

// Lấy sessions theo status
export const getSessionsByStatus = async (status) => {
    return axios.get(`${API_BASE_URL}/sessions/status/${status}`);
};

// Lấy session theo ID
export const getSessionById = async (id) => {
    return axios.get(`${API_BASE_URL}/sessions/${id}`);
};

// Tạo session mới
export const createSession = async (sessionData) => {
    return axios.post(`${API_BASE_URL}/sessions`, sessionData);
};

// Cập nhật session
export const updateSession = async (id, sessionData) => {
    return axios.put(`${API_BASE_URL}/sessions/${id}`, sessionData);
};

// Xóa session
export const deleteSession = async (id) => {
    return axios.delete(`${API_BASE_URL}/sessions/${id}`);
};
