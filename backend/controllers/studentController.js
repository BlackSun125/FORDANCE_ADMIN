const supabase = require('../config/supabase');

// Lấy danh sách tất cả các học sinh
const getAllStudents = async (req, res) => {
    try {
        const { orderBy = 'session_count', orderDirection = 'desc' } = req.query;

        // Truy vấn thông tin students cùng số lượng sessions đã tham gia
        const { data, error } = await supabase
            .from('users')
            .select(`
                id,
                name,
                email,
                role,
                sessions_joined:users_sessions_joined!inner (session_id)
            `)
            .eq('role', 'student') // Chỉ lấy users có role là "student"
            .order(orderBy, { ascending: orderDirection === 'asc' });

        if (error) throw error;

        // Tính số lượng sessions mỗi student tham gia
        const result = data.map(student => ({
            id: student.id,
            name: student.name,
            email: student.email,
            session_count: student.sessions_joined.length || 0, // Đếm số lượng sessions
        }));

        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};



const getStudentSessions = async (req, res) => {
    try {
        const { userId, sessionId, orderBy = 'created_at', orderDirection = 'desc' } = req.query;

        let query = supabase.from('users_sessions_joined').select('*');

        // Thêm điều kiện lọc nếu có
        if (userId) {
            query = query.eq('user_id', userId);
        }
        if (sessionId) {
            query = query.eq('session_id', sessionId);
        }

        // Sắp xếp kết quả
        query = query.order(orderBy, { ascending: orderDirection === 'asc' });

        const { data, error } = await query;

        if (error) throw error;

        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


// Lấy chi tiết học sinh theo ID
const getStudentById = async (req, res) => {
    try {
        const { id } = req.params;
        const { data, error } = await supabase.from('users').select('*').eq('id', id).single();
        if (error) throw error;
        res.status(404).json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Tạo học sinh mới
const createStudent = async (req, res) => {
    try {
        const { name, email, phone, address, role } = req.body;
        const { data, error } = await supabase.from('users').insert([
            { name, email, phone, address, role },
        ]);
        if (error) throw error;
        res.status(201).json(data);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Cập nhật thông tin học sinh
const updateStudent = async (req, res) => {
    try {
        const { id } = req.params;
        const updates = req.body;
        const { data, error } = await supabase.from('users').update(updates).eq('id', id);
        if (error) throw error;
        res.status(200).json(data);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Xóa học sinh
const deleteStudent = async (req, res) => {
    try {
        const { id } = req.params;
        const { data, error } = await supabase.from('users').delete().eq('id', id);
        if (error) throw error;
        res.status(200).json({ message: 'Student deleted successfully', data });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

module.exports = {
    getAllStudents,
    getStudentById,
    createStudent,
    updateStudent,
    deleteStudent,
    getStudentSessions
};
