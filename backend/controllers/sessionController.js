const supabase = require('../config/supabase');

// Lấy danh sách tất cả các sessions
const getAllSessions = async (req, res) => {
    try {
        const { orderBy = 'id', orderDirection = 'desc' } = req.query; // Lấy giá trị order từ query params
        const { data, error } = await supabase
            .from('sessions')
            .select('*')
            .neq('status', 'deleted')
            .order(orderBy, { ascending: orderDirection === 'desc' }); // Sử dụng order

        if (error) throw error;

        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


// Lấy danh sách sessions theo `status`
const getSessionsByStatus = async (req, res) => {
    try {
        const { status } = req.params;
        const { data, error } = await supabase.from('sessions').select('*').eq('status', status);
        if (error) throw error;
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Lấy chi tiết session theo ID
const getSessionById = async (req, res) => {
    try {
        const { id } = req.params;
        const { data, error } = await supabase.from('sessions').select('*').eq('id', id).single();
        if (error) throw error;
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Tạo session mới
const createSession = async (req, res) => {
    try {
        const { session_name, level, genre, video_url, thumbnail_url, duration, class_id, price, instructor_id, status } = req.body;
        const { data, error } = await supabase.from('sessions').insert([
            { session_name, level, genre, video_url, thumbnail_url, duration, class_id, price, instructor_id, status },
        ]);
        if (error) throw error;
        res.status(201).json(data);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Cập nhật thông tin session
const updateSession = async (req, res) => {
    try {
        const { id } = req.params;
        const updates = req.body;
        const { data, error } = await supabase.from('sessions').update(updates).eq('id', id);
        if (error) throw error;
        res.status(200).json(data);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Xóa session
const deleteSession = async (req, res) => {
    try {
        const { id } = req.params;
        const { data, error } = await supabase.from('sessions').delete().eq('id', id);
        if (error) throw error;
        res.status(200).json({ message: 'Session deleted successfully', data });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

module.exports = {
    getAllSessions,
    getSessionsByStatus,
    getSessionById,
    createSession,
    updateSession,
    deleteSession,
};
