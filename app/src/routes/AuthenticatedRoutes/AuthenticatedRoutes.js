import { lazy } from 'react';
import { Route } from 'react-router-dom';

const PaidTimeOff = lazy(() => import('./../../pages/PaidTimeOff'));
const Conference = lazy(() => import('../../pages/Conference'));
const ConferenceOverviewPage = lazy(() =>
  import('../../pages/ConferenceOverviewPage')
);
const ChangePassword = lazy(() => import('../../pages/Users/ChangePassword'));

const AuthenticatedRoutes = [
  <Route key="dashboard" path="/dashboard" element={<PaidTimeOff />} />,
  <Route key="conference" path="/conference" element={<Conference />} />,
  <Route
    key="conference-overview"
    path="/conference/overview"
    element={<ConferenceOverviewPage />}
  />,
  <Route
    key="change-password"
    path="/change-password"
    element={<ChangePassword />}
  />,
];

export default AuthenticatedRoutes;
