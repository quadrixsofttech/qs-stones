import { lazy } from 'react';
import { Route } from 'react-router-dom';

const Users = lazy(() => import('../../pages/Users'));
const AdminPanel = lazy(() => import('../../pages/AdminPanel'));
const Signup = lazy(() => import('../../pages/Signup'));

const AdminRoutes = [
  <Route key="users" path="/users" element={<Users />} />,
  <Route key="adminPanel" path="/admin" element={<AdminPanel />} />,
  <Route key="signup" path="/signup" element={<Signup />} />,
];

export default AdminRoutes;
