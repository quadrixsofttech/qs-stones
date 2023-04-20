import { lazy } from 'react';
import { Route } from 'react-router-dom';

const Dashboard = lazy(() => import('../../pages/Dashboard'));
const Account = lazy(() => import('../../pages/Account'));

const AuthenticatedRoutes = [
  <Route key="dashboard" path="/dashboard" element={<Dashboard />} />,
  <Route key="account" path="/account" element={<Account />} />,
];

export default AuthenticatedRoutes;
