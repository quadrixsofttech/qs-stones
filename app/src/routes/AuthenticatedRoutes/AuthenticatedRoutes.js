import { lazy } from 'react';
import { Route } from 'react-router-dom';

const PaidTimeOff = lazy(() => import('./../../pages/PaidTimeOff'));
const Account = lazy(() => import('../../pages/Account'));
const Conference = lazy(() => import('../../pages/Conference'));
const ConferenceOverviewPage = lazy(() =>
  import('../../pages/ConferenceOverviewPage')
);

const AuthenticatedRoutes = [
  <Route key="dashboard" path="/dashboard" element={<PaidTimeOff />} />,
  <Route key="account" path="/account" element={<Account />} />,
  <Route key="conference" path="/conference" element={<Conference />} />,
  <Route
    key="conference-overview"
    path="/conference/overview"
    element={<ConferenceOverviewPage />}
  />,
];

export default AuthenticatedRoutes;
