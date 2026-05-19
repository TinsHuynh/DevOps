import React, { useState } from 'react';
import TeacherLayout from '../../Components/layout/TeacherLayout';
import {
  TeacherOverviewView,
  TeacherClassesView,
  TeacherStudentsView,
  TeacherAttendanceView,
  TeacherAnnouncementsView,
  TeacherTasksView,
} from './TeacherViews';

const TeacherDashboard = () => {
  const [currentView, setCurrentView] = useState('overview');

  const renderView = () => {
    switch (currentView) {
      case 'overview':
        return <TeacherOverviewView />;
      case 'classes':
        return <TeacherClassesView />;
      case 'students':
        return <TeacherStudentsView />;
      case 'attendance':
        return <TeacherAttendanceView />;
      case 'announcements':
        return <TeacherAnnouncementsView />;
      case 'tasks':
        return <TeacherTasksView />;
      default:
        return <TeacherOverviewView />;
    }
  };

  return (
    <TeacherLayout currentView={currentView} onViewChange={setCurrentView}>
      {renderView()}
    </TeacherLayout>
  );
};

export default TeacherDashboard;