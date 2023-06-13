import { lazy } from 'react';
import { Route } from 'react-router-dom';

const PayedTimeOff = lazy(() => import('./../../pages/PayedTimeOff'));
const Account = lazy(() => import('../../pages/Account'));
const Conference = lazy(() => import('../../pages/Conference'));

const AuthenticatedRoutes = [
  <Route key="dashboard" path="/dashboard" element={<PayedTimeOff />} />,
  <Route key="account" path="/account" element={<Account />} />,
  <Route key="conference" path="/conference" element={<Conference />} />,
];

export default AuthenticatedRoutes;
