import { lazy } from 'react';
import { Route } from 'react-router-dom';

const Conference = lazy(() => import('../../pages/Conference'));
const ConferenceOverviewPage = lazy(() =>
  import('../../pages/ConferenceOverviewPage')
);

const AuthenticatedNovelicUserRoutes = [
  <Route key="conference" path="/conference" element={<Conference />} />,
  <Route
    key="conference-overview"
    path="/conference/overview"
    element={<ConferenceOverviewPage />}
  />,
];

export default AuthenticatedNovelicUserRoutes;
