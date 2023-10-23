import { lazy } from 'react';
import { Route } from 'react-router-dom';

const PayedTimeOff = lazy(() => import('./../../pages/PayedTimeOff'));
const Account = lazy(() => import('../../pages/Account'));
//const Kitchen = lazy(() => import('../../components/KitchenOverview/KitchenMealModal'));
const Conference = lazy(() => import('../../pages/Conference'));
const ConferenceOverviewPage = lazy(() =>
  import('../../pages/ConferenceOverviewPage')
);

const AuthenticatedRoutes = [
  <Route key="dashboard" path="/dashboard" element={<PayedTimeOff />} />,
  <Route key="kitchen" path="/kitchen" element={<Account />} />,
  <Route key="conference" path="/conference" element={<Conference />} />,
  <Route
    key="conference-overview"
    path="/conference/overview"
    element={<ConferenceOverviewPage />}
  />,
];

export default AuthenticatedRoutes;
