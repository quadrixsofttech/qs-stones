import React from 'react';
import DashboardLayout from '../../layout/DashboardLayout';
import ListOfEmployees from '../../components/ListOfEmployees/ListOfEmployees';

const AdminPanel = () => {
  return (
    <DashboardLayout>
      <ListOfEmployees />
    </DashboardLayout>
  );
};

export default AdminPanel;
