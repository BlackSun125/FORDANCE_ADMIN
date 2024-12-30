const express = require('express');
const router = express.Router();
const {
    getAllClasses,
    getClassById,
    createClass,
    updateClass,
    deleteClass,
} = require('../controllers/classController');

// Lấy tất cả lớp học
router.get('/', getAllClasses);

// Lấy lớp học theo ID
router.get('/:id', getClassById);

// Tạo lớp học mới
router.post('/', createClass);

// Cập nhật lớp học
router.put('/:id', updateClass);

// Xóa lớp học
router.delete('/:id', deleteClass);

module.exports = router;
