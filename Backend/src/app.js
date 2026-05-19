const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

const studentRoutes = require('./routes/student.routes');
const authRoutes = require('./routes/auth.routes');
const userRoutes = require('./routes/user.routes');

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/students', studentRoutes);

module.exports = app;