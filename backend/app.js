const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
app.get('/', (req, res) => {
    res.send('Admin API is running!');
});

// Import custom routes
const adminRoutes = require('./routes/admin');
app.use('/api/admin', adminRoutes);

// Start server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
