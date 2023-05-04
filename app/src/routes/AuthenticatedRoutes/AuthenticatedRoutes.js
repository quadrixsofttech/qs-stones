import { lazy } from 'react';
import { Route } from 'react-router-dom';

const PTO = lazy(() => import('../../pages/PTO'));
const Account = lazy(() => import('../../pages/Account'));

const AuthenticatedRoutes = [
  <Route key="dashboard" path="/dashboard" element={<PTO />} />,
  <Route key="account" path="/account" element={<Account />} />,
];

export default AuthenticatedRoutes;
