const supabase = require('../config/supabase');

// Lấy danh sách tất cả các lớp
const getAllClasses = async (req, res) => {
    try {
        const { orderBy = 'id', orderDirection = 'desc' } = req.query;
        const { data, error } = await supabase
            .from('classes')
            .select('*')
            .order(orderBy, { ascending: orderDirection === 'desc' }); // Sử dụng order
        if (error) throw error;
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Lấy chi tiết lớp học theo ID
const getClassById = async (req, res) => {
    try {
        const { id } = req.params;
        const { data, error } = await supabase.from('classes').select('*').eq('id', id).single();
        if (error) throw error;
        res.status(404).json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Tạo lớp học mới
const createClass = async (req, res) => {
    try {
        const { class_name, what_learn, what_prepare, level, genre } = req.body;
        const { data, error } = await supabase.from('classes').insert([
            { class_name, what_learn, what_prepare, level, genre },
        ]);
        if (error) throw error;
        res.status(201).json(data);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Cập nhật thông tin lớp học
const updateClass = async (req, res) => {
    try {
        const { id } = req.params;
        const updates = req.body;
        const { data, error } = await supabase.from('classes').update(updates).eq('id', id);
        if (error) throw error;
        res.status(200).json(data);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Xóa lớp học
const deleteClass = async (req, res) => {
    try {
        const { id } = req.params;
        const { data, error } = await supabase.from('classes').delete().eq('id', id);
        if (error) throw error;
        res.status(200).json({ message: 'Class deleted successfully', data });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

module.exports = {
    getAllClasses,
    getClassById,
    createClass,
    updateClass,
    deleteClass,
};
