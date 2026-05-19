const Teacher = require('../models/teacher.model');

const teacherService = {
  listTeachers: () => Teacher.find(),
  getTeacherById: (id) => Teacher.findById(id),
  getTeacherByTeacherId: (teacherId) => Teacher.findOne({ teacherId }),
  createTeacher: (payload) => Teacher.create(payload),
  updateTeacher: (id, payload) => Teacher.findByIdAndUpdate(id, payload, { new: true }),
  deleteTeacher: (id) => Teacher.findByIdAndDelete(id),
};

module.exports = teacherService;
