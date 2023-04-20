import { lazy } from 'react';
import { Route } from 'react-router-dom';

const Users = lazy(() => import('../../pages/Users'));

const AdminRoutes = [<Route key="users" path="/users" element={<Users />} />];

export default AdminRoutes;
