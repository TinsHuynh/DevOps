import React, { useState } from 'react';
import AdminLayout from '../../components/layout/AdminLayout';
import StudentsView from './StudentsView';
import AccountsView from './AccountsView';
import NotificationsView from './NotificationsView';

const AdminDashboard = () => {
	const [currentView, setCurrentView] = useState('students');


	const renderView = () => {
		switch (currentView) {
			case 'students':
				return <StudentsView />;
			case 'accounts':
				return <AccountsView />;
			case 'notifications':
				return <NotificationsView />;
			default:
				return <StudentsView />;
		}
	};

	return (
		<AdminLayout currentView={currentView} onViewChange={setCurrentView}>
			{renderView()}
		</AdminLayout>
	);
};

export default AdminDashboard;