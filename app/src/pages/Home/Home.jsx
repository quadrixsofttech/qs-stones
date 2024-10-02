import React, { useContext, useEffect } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const auth = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (auth?.isAuthenticated()) {
      navigate("/dashboard");
    } else {
      navigate("/login");
    }
  }, [auth, navigate]);
  return (
    <div></div>
    // <PublicLayout>
    //   <Hero />
    // </PublicLayout>
  );
};

export default Home;
