const express = require('express');
const router = express.Router();
const {
    getAllSessions,
    getSessionsByStatus,
    getSessionById,
    createSession,
    updateSession,
    deleteSession,
} = require('../controllers/sessionController');

// Lấy tất cả sessions
router.get('/', getAllSessions);

// Lấy sessions theo status
router.get('/status/:status', getSessionsByStatus);

// Lấy session theo ID
router.get('/:id', getSessionById);

// Tạo session mới
router.post('/', createSession);

// Cập nhật session
router.put('/:id', updateSession);

// Xóa session
router.delete('/:id', deleteSession);

module.exports = router;
