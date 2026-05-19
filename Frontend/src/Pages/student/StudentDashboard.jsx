import React, { useState, useEffect } from 'react';
import StudentLayout from '../../Components/layout/StudentLayout';
import studentService from '../../features/student/services/studentService';
import notificationService from '../../services/notificationService';
import { useAuth } from '../../contexts/AuthContext';
import {
  StudentOverviewView,
  StudentProfileView,
  StudentCoursesView,
  StudentScheduleView,
  StudentAnnouncementsView,
  StudentPasswordView,
} from './StudentViews';

const StudentDashboard = () => {
  const [currentView, setCurrentView] = useState('overview');
  const { currentUser } = useAuth();
  const [profile, setProfile] = useState(null);
  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadData = async () => {
    try {
      setLoading(true);
      // Nạp hồ sơ sinh viên dựa trên username (MSSV) của tài khoản đang đăng nhập
      const studentsData = await studentService.fetchStudents();
      const found = studentsData.find((s) => s.studentId === currentUser?.username);
      
      if (found) {
        setProfile(found);
      } else {
        // Dự phòng nếu chưa có hồ sơ tương ứng
        setProfile({
          studentId: currentUser?.username || 'SV00001',
          name: currentUser?.fullName || 'Học viên',
          dob: '2004-01-01',
          gender: 'Nam',
          studentClass: 'Chưa phân lớp',
          major: 'Công nghệ thông tin',
          department: 'Khoa Công nghệ thông tin',
          gpa: 8.5,
          attendanceRate: 95,
          status: 'Hoạt động',
        });
      }

      // Nạp thông báo
      const notices = await notificationService.fetchNotifications();
      // Lọc các thông báo liên quan đến lớp của sinh viên hoặc thông báo toàn trường
      setAnnouncements(notices);
    } catch (error) {
      console.error('Lỗi khi tải dữ liệu sinh viên từ API:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (currentUser) {
      loadData();
    }
  }, [currentUser]);

  const handleProfileUpdate = async (updatedFields) => {
    if (!profile?._id) return;
    try {
      const response = await studentService.updateStudent(profile._id, updatedFields);
      setProfile(response);
      return response;
    } catch (error) {
      console.error('Lỗi khi cập nhật hồ sơ sinh viên:', error);
      throw error;
    }
  };

  const renderView = () => {
    if (loading) {
      return (
        <div className="flex h-[60vh] items-center justify-center">
          <div className="flex flex-col items-center space-y-4">
            <div className="h-12 w-12 animate-spin rounded-full border-4 border-indigo-600 border-t-transparent"></div>
            <p className="text-sm font-semibold text-slate-500">Đang tải thông tin cá nhân...</p>
          </div>
        </div>
      );
    }

    switch (currentView) {
      case 'overview':
        return <StudentOverviewView profile={profile} announcements={announcements} />;
      case 'profile':
        return <StudentProfileView profile={profile} onUpdate={handleProfileUpdate} />;
      case 'courses':
        return <StudentCoursesView profile={profile} />;
      case 'schedule':
        return <StudentScheduleView profile={profile} />;
      case 'announcements':
        return <StudentAnnouncementsView announcements={announcements} />;
      case 'password':
        return <StudentPasswordView />;
      default:
        return <StudentOverviewView profile={profile} announcements={announcements} />;
    }
  };

  return (
    <StudentLayout currentView={currentView} onViewChange={setCurrentView}>
      {renderView()}
    </StudentLayout>
  );
};

export default StudentDashboard;