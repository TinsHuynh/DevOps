import React, { useEffect, useState } from 'react';
import categoryService from '../../../services/categoryService';

const StudentForm = ({ student, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    studentId: '',
    name: '',
    dob: '',
    gender: 'Nam',
    studentClass: '',
    major: '',
    department: '',
  });

  const [categories, setCategories] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [majors, setMajors] = useState([]);
  const [classes, setClasses] = useState([]);

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const data = await categoryService.fetchCategories();
        const activeData = data.filter((c) => c.status === 'active');
        setCategories(activeData);

        const depts = activeData.filter((c) => c.type === 'Khoa');
        const mjs = activeData.filter((c) => c.type === 'Ngành học');
        const cls = activeData.filter((c) => c.type === 'Lớp học');

        setDepartments(depts);
        setMajors(mjs);
        setClasses(cls);

        // Prepopulate default selection if creating new
        if (!student) {
          setFormData((prev) => ({
            ...prev,
            department: depts[0]?.name || '',
            major: mjs[0]?.name || '',
            studentClass: cls[0]?.name || '',
          }));
        }
      } catch (error) {
        console.error('Lỗi khi tải danh mục:', error);
      }
    };

    loadCategories();
  }, [student]);

  useEffect(() => {
    if (student) {
      setFormData({
        studentId: student.studentId || '',
        name: student.name || '',
        dob: student.dob ? new Date(student.dob).toISOString().split('T')[0] : '',
        gender: student.gender || 'Nam',
        studentClass: student.studentClass || '',
        major: student.major || '',
        department: student.department || '',
      });
    }
  }, [student]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            MSSV <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="studentId"
            value={formData.studentId}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 text-sm"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Họ và Tên <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 text-sm"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Ngày sinh <span className="text-red-500">*</span>
          </label>
          <input
            type="date"
            name="dob"
            value={formData.dob}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 text-sm"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Lớp Lớp Học <span className="text-red-500">*</span>
          </label>
          <select
            name="studentClass"
            value={formData.studentClass}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 text-sm"
          >
            {classes.length === 0 ? (
              <option value="">-- Chưa có lớp học nào trong danh mục --</option>
            ) : (
              classes.map((c) => (
                <option key={c._id || c.id} value={c.name}>
                  {c.name}
                </option>
              ))
            )}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Giới tính <span className="text-red-500">*</span>
          </label>
          <div className="flex items-center space-x-4 mt-2">
            <label className="inline-flex items-center">
              <input
                type="radio"
                name="gender"
                value="Nam"
                checked={formData.gender === 'Nam'}
                onChange={handleChange}
                className="text-indigo-600 focus:ring-indigo-500 h-4 w-4"
              />
              <span className="ml-2 text-sm text-gray-700">Nam</span>
            </label>
            <label className="inline-flex items-center">
              <input
                type="radio"
                name="gender"
                value="Nữ"
                checked={formData.gender === 'Nữ'}
                onChange={handleChange}
                className="text-indigo-600 focus:ring-indigo-500 h-4 w-4"
              />
              <span className="ml-2 text-sm text-gray-700">Nữ</span>
            </label>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Ngành học <span className="text-red-500">*</span>
          </label>
          <select
            name="major"
            value={formData.major}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 text-sm"
          >
            {majors.length === 0 ? (
              <option value="">-- Chưa có ngành học nào trong danh mục --</option>
            ) : (
              majors.map((c) => (
                <option key={c._id || c.id} value={c.name}>
                  {c.name}
                </option>
              ))
            )}
          </select>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Khoa quản lý <span className="text-red-500">*</span>
        </label>
        <select
          name="department"
          value={formData.department}
          onChange={handleChange}
          required
          className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 text-sm"
        >
          {departments.length === 0 ? (
            <option value="">-- Chưa có khoa nào trong danh mục --</option>
          ) : (
            departments.map((c) => (
              <option key={c._id || c.id} value={c.name}>
                {c.name}
              </option>
            ))
          )}
        </select>
      </div>

      <div className="flex justify-end space-x-3 pt-4 border-t mt-6">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Hủy
        </button>
        <button
          type="submit"
          className="px-4 py-2 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          {student ? 'Cập nhật' : 'Thêm mới'}
        </button>
      </div>
    </form>
  );
};

export default StudentForm;