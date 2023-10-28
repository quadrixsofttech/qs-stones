import { lazy } from 'react';
import { Route } from 'react-router-dom';

const PayedTimeOff = lazy(() => import('./../../pages/PayedTimeOff'));
const Kitchen = lazy(() => import('../../pages/Kitchen'));
const Conference = lazy(() => import('../../pages/Conference'));
const ConferenceOverviewPage = lazy(() =>
  import('../../pages/ConferenceOverviewPage')
);

const AuthenticatedRoutes = [
  <Route key="dashboard" path="/dashboard" element={<PayedTimeOff />} />,
  <Route key="kitchen" path="/kitchen" element={<Kitchen />} />,
  <Route key="conference" path="/conference" element={<Conference />} />,
  <Route
    key="conference-overview"
    path="/conference/overview"
    element={<ConferenceOverviewPage />}
  />,
];

export default AuthenticatedRoutes;
