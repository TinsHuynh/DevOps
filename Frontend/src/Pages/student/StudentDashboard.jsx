import React, { useState } from 'react';
import StudentLayout from '../../Components/layout/StudentLayout';
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

  const renderView = () => {
    switch (currentView) {
      case 'overview':
        return <StudentOverviewView />;
      case 'profile':
        return <StudentProfileView />;
      case 'courses':
        return <StudentCoursesView />;
      case 'schedule':
        return <StudentScheduleView />;
      case 'announcements':
        return <StudentAnnouncementsView />;
      case 'password':
        return <StudentPasswordView />;
      default:
        return <StudentOverviewView />;
    }
  };

  return (
    <StudentLayout currentView={currentView} onViewChange={setCurrentView}>
      {renderView()}
    </StudentLayout>
  );
};

export default StudentDashboard;