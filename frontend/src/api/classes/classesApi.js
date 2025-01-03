// Import necessary modules
import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000'; // Thay bằng URL backend của bạn

// Cập nhật thông tin của một lớp học
export const updateClass = async (id, classDetails) => {
    return axios.put(`${API_BASE_URL}/classes/${id}`, classDetails);
};

// Xóa session
export const deleteClass = async (id) => {
    return axios.delete(`${API_BASE_URL}/classes/${id}`);
};

