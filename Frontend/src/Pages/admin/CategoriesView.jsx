import React, { useState } from 'react';
import Modal from '../../components/common/Modal';
import { useToast } from '../../components/common/ToastNotification';

const CategoriesView = () => {
  const [categories, setCategories] = useState([
    { id: 1, name: 'Công nghệ thông tin', type: 'Khoa', description: 'Khoa CNTT', status: 'active' },
    { id: 2, name: 'Lập trình Web', type: 'Môn học', description: 'Môn học chuyên ngành', status: 'active' },
    { id: 3, name: 'CNTT-K62', type: 'Lớp học', description: 'Lớp sinh viên khóa 62', status: 'active' },
  ]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [formData, setFormData] = useState({ name: '', type: 'Khoa', description: '', status: 'active' });

  const toast = useToast();

  const handleOpenModal = (category = null) => {
    setEditingCategory(category);
    if (category) {
      setFormData(category);
    } else {
      setFormData({ name: '', type: 'Khoa', description: '', status: 'active' });
    }
    setIsModalOpen(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingCategory) {
      setCategories((prev) => prev.map((cat) => (cat.id === editingCategory.id ? { ...formData, id: cat.id } : cat)));
      toast('Cập nhật danh mục thành công!');
    } else {
      setCategories((prev) => [...prev, { ...formData, id: Date.now() }]);
      toast('Thêm mới danh mục thành công!');
    }
    setIsModalOpen(false);
  };

  const handleDelete = (id) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa danh mục này?')) {
      setCategories((prev) => prev.filter((cat) => cat.id !== id));
      toast('Đã xóa danh mục.');
    }
  };

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,_rgba(236,72,153,0.12),_transparent_28%),linear-gradient(180deg,_#f8fafc_0%,_#ffffff_100%)] text-slate-900">
      <div className="mx-auto max-w-7xl px-4 py-6 md:px-8">
        <header className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-[0_20px_60px_rgba(15,23,42,0.08)] flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#3F51B5]">Hệ Thống</p>
            <h1 className="mt-2 text-3xl font-black">Quản Lý Danh Mục</h1>
            <p className="mt-2 text-sm text-slate-500">Quản lý các khoa, lớp học, môn học trong hệ thống.</p>
          </div>
          <button
            onClick={() => handleOpenModal()}
            className="rounded-xl bg-[#3F51B5] px-4 py-3 text-sm font-semibold text-white transition hover:bg-indigo-700"
          >
            + Thêm Danh Mục
          </button>
        </header>

        <section className="mt-6">
          <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-[0_20px_60px_rgba(15,23,42,0.06)] overflow-hidden">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-50 text-slate-500">
                <tr>
                  <th className="px-6 py-4 font-semibold">Tên Danh Mục</th>
                  <th className="px-6 py-4 font-semibold">Loại</th>
                  <th className="px-6 py-4 font-semibold">Mô Tả</th>
                  <th className="px-6 py-4 font-semibold">Trạng Thái</th>
                  <th className="px-6 py-4 font-semibold text-right">Thao Tác</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {categories.map((cat) => (
                  <tr key={cat.id} className="hover:bg-slate-50/50 transition">
                    <td className="px-6 py-4 font-medium text-indigo-600">{cat.name}</td>
                    <td className="px-6 py-4">
                      <span className="bg-blue-50 text-blue-700 px-2.5 py-1 rounded-full text-xs font-semibold">
                        {cat.type}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-slate-600">{cat.description}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${cat.status === 'active' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
                        {cat.status === 'active' ? 'Hoạt động' : 'Tạm ẩn'}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button onClick={() => handleOpenModal(cat)} className="text-indigo-500 hover:text-indigo-700 mr-3">
                        <i className="fas fa-pen"></i>
                      </button>
                      <button onClick={() => handleDelete(cat.id)} className="text-red-400 hover:text-red-600">
                        <i className="fas fa-trash"></i>
                      </button>
                    </td>
                  </tr>
                ))}
                {categories.length === 0 && (
                  <tr>
                    <td colSpan="5" className="px-6 py-12 text-center text-slate-500">
                      Chưa có danh mục nào
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={editingCategory ? 'Sửa Danh Mục' : 'Thêm Danh Mục'}>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Tên Danh Mục</label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-3 py-2 border rounded-xl focus:outline-none focus:border-indigo-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Loại</label>
            <select
              value={formData.type}
              onChange={(e) => setFormData({ ...formData, type: e.target.value })}
              className="w-full px-3 py-2 border rounded-xl focus:outline-none focus:border-indigo-500"
            >
              <option value="Khoa">Khoa</option>
              <option value="Môn học">Môn học</option>
              <option value="Lớp học">Lớp học</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Mô Tả</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full px-3 py-2 border rounded-xl focus:outline-none focus:border-indigo-500"
              rows="3"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Trạng Thái</label>
            <select
              value={formData.status}
              onChange={(e) => setFormData({ ...formData, status: e.target.value })}
              className="w-full px-3 py-2 border rounded-xl focus:outline-none focus:border-indigo-500"
            >
              <option value="active">Hoạt động</option>
              <option value="inactive">Tạm ẩn</option>
            </select>
          </div>
          <div className="flex justify-end gap-3 pt-4 border-t">
            <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 border rounded-xl text-slate-700">
              Hủy
            </button>
            <button type="submit" className="px-4 py-2 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700">
              {editingCategory ? 'Lưu Thay Đổi' : 'Thêm Mới'}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default CategoriesView;
