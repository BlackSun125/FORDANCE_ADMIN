import React, { useState, useEffect } from 'react';
import { fetchUsers, addUser } from './api';

const AdminDashboard = () => {
    const [users, setUsers] = useState([]);
    const [newUser, setNewUser] = useState({ name: '', role: '' });

    useEffect(() => {
        fetchUsers().then((response) => setUsers(response.data));
    }, []);

    const handleAddUser = () => {
        addUser(newUser).then((response) => {
            setUsers([...users, response.data.newUser]);
        });
    };

    return (
        <div>
            <h1>Admin Dashboard</h1>
            <div>
                <h2>Users</h2>
                <ul>
                    {users.map((user) => (
                        <li key={user.id}>
                            {user.name} - {user.role}
                        </li>
                    ))}
                </ul>
            </div>
            <div>
                <h2>Add New User</h2>
                <input
                    type="text"
                    placeholder="Name"
                    value={newUser.name}
                    onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                />
                <input
                    type="text"
                    placeholder="Role"
                    value={newUser.role}
                    onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
                />
                <button onClick={handleAddUser}>Add User</button>
            </div>
        </div>
    );
};

export default AdminDashboard;
