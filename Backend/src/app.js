const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

const studentRoutes = require('./routes/student.routes');
const teacherRoutes = require('./routes/teacher.routes');
const notificationRoutes = require('./routes/notification.routes');
const activityLogRoutes = require('./routes/activitylog.routes');
const authRoutes = require('./routes/auth.routes');
const userRoutes = require('./routes/user.routes');
const categoryRoutes = require('./routes/category.routes');

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/students', studentRoutes);
app.use('/api/teachers', teacherRoutes);
app.use('/api/notifications', notificationRoutes);
app.use('/api/logs', activityLogRoutes);
app.use('/api/categories', categoryRoutes);

module.exports = app;