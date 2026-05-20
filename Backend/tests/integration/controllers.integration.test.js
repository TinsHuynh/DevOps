const express = require('express');
const request = require('supertest');

jest.mock('../../src/services/user.service', () => ({
  authenticateUser: jest.fn(),
  listUsers: jest.fn(),
  getUserById: jest.fn(),
  createUser: jest.fn(),
  updateUser: jest.fn(),
  deleteUser: jest.fn(),
}));

jest.mock('../../src/services/student.service', () => ({
  listStudents: jest.fn(),
  getStudentById: jest.fn(),
  createStudent: jest.fn(),
  updateStudent: jest.fn(),
  deleteStudent: jest.fn(),
}));

jest.mock('../../src/services/teacher.service', () => ({
  listTeachers: jest.fn(),
  getTeacherById: jest.fn(),
  createTeacher: jest.fn(),
  updateTeacher: jest.fn(),
  deleteTeacher: jest.fn(),
}));

jest.mock('../../src/services/notification.service', () => ({
  listNotifications: jest.fn(),
  getPublishedNotifications: jest.fn(),
  getNotificationById: jest.fn(),
  createNotification: jest.fn(),
  updateNotification: jest.fn(),
  deleteNotification: jest.fn(),
}));

jest.mock('../../src/services/activitylog.service', () => ({
  listActivityLogs: jest.fn(),
  getRecentActivityLogs: jest.fn(),
  getActivityLogsByModule: jest.fn(),
  getActivityLogById: jest.fn(),
  createActivityLog: jest.fn(),
}));

jest.mock('../../src/models/category.model', () => ({
  find: jest.fn(),
  findById: jest.fn(),
  create: jest.fn(),
  findByIdAndUpdate: jest.fn(),
  findByIdAndDelete: jest.fn(),
  countDocuments: jest.fn(),
  insertMany: jest.fn(),
}));

const userService = require('../../src/services/user.service');
const studentService = require('../../src/services/student.service');
const teacherService = require('../../src/services/teacher.service');
const notificationService = require('../../src/services/notification.service');
const activityLogService = require('../../src/services/activitylog.service');
const Category = require('../../src/models/category.model');

const authRoutes = require('../../src/routes/auth.routes');
const userRoutes = require('../../src/routes/user.routes');
const studentRoutes = require('../../src/routes/student.routes');
const teacherRoutes = require('../../src/routes/teacher.routes');
const notificationRoutes = require('../../src/routes/notification.routes');
const activityLogRoutes = require('../../src/routes/activitylog.routes');
const categoryRoutes = require('../../src/routes/category.routes');

const buildApp = (route, options = {}) => {
  const app = express();
  app.use(express.json());

  if (options.withUser) {
    app.use((req, res, next) => {
      req.user = { _id: 'user-1' };
      next();
    });
  }

  app.use(route);
  return app;
};

describe('controller integration routes', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('auth routes', () => {
    test('POST /login returns authenticated user', async () => {
      userService.authenticateUser.mockResolvedValue({ username: 'admin', role: 'admin' });
      const app = buildApp(authRoutes);

      await request(app)
        .post('/login')
        .send({ username: 'admin', password: 'admin123' })
        .expect(200)
        .expect(({ body }) => {
          expect(body).toEqual({ user: { username: 'admin', role: 'admin' } });
        });
    });

    test('POST /login rejects missing credentials', async () => {
      const app = buildApp(authRoutes);

      await request(app)
        .post('/login')
        .send({ username: 'admin' })
        .expect(400)
        .expect(({ body }) => {
          expect(body.message).toBe('Username and password are required.');
        });
    });
  });

  describe('user routes', () => {
    test('GET / returns user list', async () => {
      userService.listUsers.mockResolvedValue([{ username: 'sv001' }]);
      const app = buildApp(userRoutes);

      await request(app)
        .get('/')
        .expect(200)
        .expect(({ body }) => {
          expect(body).toEqual([{ username: 'sv001' }]);
        });
    });

    test('POST / creates user', async () => {
      userService.createUser.mockResolvedValue({ username: 'sv002', role: 'student' });
      const app = buildApp(userRoutes);

      await request(app)
        .post('/')
        .send({ username: 'sv002', fullName: 'Tran Thi B', role: 'student' })
        .expect(201)
        .expect(({ body }) => {
          expect(body).toEqual({ username: 'sv002', role: 'student' });
        });
    });
  });

  describe('student routes', () => {
    test('POST / creates student and returns 201', async () => {
      studentService.createStudent.mockResolvedValue({ studentId: 'sv001', name: 'Nguyen Van A' });
      const app = buildApp(studentRoutes);

      await request(app)
        .post('/')
        .send({ studentId: 'sv001', name: 'Nguyen Van A' })
        .expect(201)
        .expect(({ body }) => {
          expect(body).toEqual({ studentId: 'sv001', name: 'Nguyen Van A' });
        });
    });

    test('GET /:id returns a student', async () => {
      studentService.getStudentById.mockResolvedValue({ studentId: 'sv001' });
      const app = buildApp(studentRoutes);

      await request(app)
        .get('/abc123')
        .expect(200)
        .expect(({ body }) => {
          expect(body).toEqual({ studentId: 'sv001' });
        });
    });
  });

  describe('teacher routes', () => {
    test('POST / creates teacher and writes activity log', async () => {
      teacherService.createTeacher.mockResolvedValue({ _id: 'teacher-1', name: 'Le Van C' });
      activityLogService.createActivityLog.mockResolvedValue({});
      const app = buildApp(teacherRoutes, { withUser: true });

      await request(app)
        .post('/')
        .send({ teacherId: 'GV00001', name: 'Le Van C' })
        .expect(201)
        .expect(({ body }) => {
          expect(body).toEqual({ _id: 'teacher-1', name: 'Le Van C' });
        });

      expect(activityLogService.createActivityLog).toHaveBeenCalledWith(
        expect.objectContaining({ action: 'CREATE', module: 'teacher', userId: 'user-1', targetId: 'teacher-1' }),
      );
    });
  });

  describe('notification routes', () => {
    test('GET /published returns published notifications', async () => {
      notificationService.getPublishedNotifications.mockResolvedValue([{ title: 'Notice' }]);
      const app = buildApp(notificationRoutes);

      await request(app)
        .get('/published')
        .expect(200)
        .expect(({ body }) => {
          expect(body).toEqual([{ title: 'Notice' }]);
        });
    });

    test('POST / creates notification with user context and activity log', async () => {
      notificationService.createNotification.mockResolvedValue({ _id: 'notice-1', title: 'Notice' });
      activityLogService.createActivityLog.mockResolvedValue({});
      const app = buildApp(notificationRoutes, { withUser: true });

      await request(app)
        .post('/')
        .send({ title: 'Notice', content: 'Hello' })
        .expect(201)
        .expect(({ body }) => {
          expect(body).toEqual({ _id: 'notice-1', title: 'Notice' });
        });

      expect(notificationService.createNotification).toHaveBeenCalledWith(
        expect.objectContaining({ title: 'Notice', content: 'Hello', createdBy: 'user-1' }),
      );
    });
  });

  describe('activity log routes', () => {
    test('GET /recent returns recent logs', async () => {
      activityLogService.getRecentActivityLogs.mockResolvedValue([{ action: 'CREATE' }]);
      const app = buildApp(activityLogRoutes);

      await request(app)
        .get('/recent?limit=5')
        .expect(200)
        .expect(({ body }) => {
          expect(body).toEqual([{ action: 'CREATE' }]);
        });

      expect(activityLogService.getRecentActivityLogs).toHaveBeenCalledWith('5');
    });
  });

  describe('category routes', () => {
    test('GET / returns categories through controller', async () => {
      Category.find.mockReturnValue({ sort: jest.fn().mockResolvedValue([{ name: 'CNTT' }]) });
      const app = buildApp(categoryRoutes);

      await request(app)
        .get('/')
        .expect(200)
        .expect(({ body }) => {
          expect(body).toEqual([{ name: 'CNTT' }]);
        });
    });

    test('GET /:id returns 404 when category missing', async () => {
      Category.findById.mockResolvedValue(null);
      const app = buildApp(categoryRoutes);

      await request(app)
        .get('/missing-id')
        .expect(404)
        .expect(({ body }) => {
          expect(body.message).toBe('Category not found');
        });
    });
  });
});