const express = require('express');
const router = express.Router();

// Mock data
const users = [
    { id: 1, name: 'User 1', role: 'admin' },
    { id: 2, name: 'User 2', role: 'editor' },
];

// Get all users
router.get('/users', (req, res) => {
    res.json(users);
});

// Add a new user
router.post('/users', (req, res) => {
    const newUser = req.body;
    users.push(newUser);
    res.status(201).json({ message: 'User added', newUser });
});

module.exports = router;
