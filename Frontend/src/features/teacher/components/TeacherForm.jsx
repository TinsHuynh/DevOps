import React, { useEffect, useState } from 'react';

const TeacherForm = ({ initialData, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    teacherId: '',
    name: '',
    dob: '',
    gender: 'Nam',
    department: '',
    email: '',
    phone: '',
    specialization: '',
    status: 'active',
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        ...initialData,
        dob: initialData.dob ? new Date(initialData.dob).toISOString().split('T')[0] : '',
      });
    }
  }, [initialData]);

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
            Mã GV <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="teacherId"
            value={formData.teacherId}
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
            Email <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 text-sm"
          />
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
            Khoa <span className="text-red-500">*</span>
          </label>
          <select
            name="department"
            value={formData.department}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 text-sm"
          >
            <option value="">Chọn khoa</option>
            <option value="Công nghệ thông tin">Công nghệ thông tin</option>
            <option value="Kinh tế">Kinh tế</option>
            <option value="Khoa học cơ bản">Khoa học cơ bản</option>
            <option value="Ngoại ngữ">Ngoại ngữ</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Chuyên ngành
          </label>
          <input
            type="text"
            name="specialization"
            value={formData.specialization}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 text-sm"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Trạng thái <span className="text-red-500">*</span>
          </label>
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 text-sm"
          >
            <option value="active">Hoạt động</option>
            <option value="inactive">Đã nghỉ</option>
          </select>
        </div>
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
          {initialData ? 'Cập nhật' : 'Thêm mới'}
        </button>
      </div>
    </form>
  );
};

export default TeacherForm;
