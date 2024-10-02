import { Route } from "react-router-dom";

import Home from "../../pages/Home";
import Login from "../../pages/Login";
import NotFound from "../../pages/NotFound";

const PublicRoutes = [
  <Route key="login" path="/login" element={<Login />} />,
  <Route key="home" exact path="/" element={<Home />} />,
  <Route key="404" path="*" element={<NotFound />} />,
];

export default PublicRoutes;
