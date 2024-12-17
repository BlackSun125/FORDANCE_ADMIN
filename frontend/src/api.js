import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:5000/api/admin' });

// API Methods
export const fetchUsers = () => API.get('/users');
export const addUser = (user) => API.post('/users', user);
