import { lazy } from 'react';
import { Route } from 'react-router-dom';
import PayedTimeOff from './../../pages/PayedTimeOff/PayedTimeOff';

const Account = lazy(() => import('../../pages/Account'));

const AuthenticatedRoutes = [
  <Route key="dashboard" path="/dashboard" element={<PayedTimeOff/>} />,
  <Route key="account" path="/account" element={<Account />} />,
];

export default AuthenticatedRoutes;
