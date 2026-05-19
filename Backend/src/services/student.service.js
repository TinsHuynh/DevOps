const Student = require('../models/student.model');

const studentService = {
  listStudents: () => Student.find(),
  getStudentById: (id) => Student.findById(id),
  createStudent: (payload) => Student.create(payload),
  updateStudent: (id, payload) => Student.findByIdAndUpdate(id, payload, { new: true }),
  deleteStudent: (id) => Student.findByIdAndDelete(id),
};

module.exports = studentService;