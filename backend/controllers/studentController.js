const supabase = require('../config/supabase');

// Lấy danh sách tất cả các học sinh
const getAllStudents = async (req, res) => {
    try {
        const { orderBy = 'id', orderDirection = 'desc' } = req.query;

        // Lấy danh sách student cùng số session họ đã tham gia
        const { data, error } = await supabase
            .from('users') // Bảng users
            .select(`
          *,
          session_count:users_sessions_joined(user_id)
        `)
            .eq('role', 'student')
            .order(orderBy, { ascending: orderDirection === 'desc' });

        if (error) throw error;

        res.status(200).json(data);
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

        // Kiểm tra xem bản ghi có tồn tại không
        const { data: existingStudent, error: findError } = await supabase
            .from('users')
            .select('id')
            .eq('id', id)
            .single();

        if (findError || !existingStudent) {
            return res.status(404).json({ error: 'Student not found' });
        }

        // Xóa bản ghi
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
