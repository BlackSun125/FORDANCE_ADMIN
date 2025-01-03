import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000'; // Thay bằng URL backend của bạn

// Lấy danh sách tất cả học sinh
export const getAllStudents = async (orderBy = 'id', orderDirection = 'desc') => {
    return axios.get(`${API_BASE_URL}/students`, { params: { orderBy, orderDirection } });
};

// Lấy chi tiết học sinh theo ID
export const getStudentById = async (id) => {
    return axios.get(`${API_BASE_URL}/students/${id}`);
};

// Tạo học sinh mới
export const createStudent = async (studentData) => {
    return axios.post(`${API_BASE_URL}/students`, studentData);
};

// Cập nhật thông tin học sinh
export const updateStudent = async (id, studentData) => {
    return axios.put(`${API_BASE_URL}/students/${id}`, studentData);
};

// Xóa học sinh
export const deleteStudent = async (id) => {
    return axios.delete(`${API_BASE_URL}/students/${id}`);
};

// Lấy danh sách các phiên học của học sinh
export const getStudentSessions = async (userId, sessionId, orderBy = 'created_at', orderDirection = 'desc') => {
    return axios.get(`${API_BASE_URL}/students/sessions`, { params: { userId, sessionId, orderBy, orderDirection } });
};
