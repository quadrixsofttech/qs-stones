import React, { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import PublicLayout from '../../layout/PublicLayout/PublicLayout';
import Hero from '../../components/Hero';

const Home = () => {
  const auth = useContext(AuthContext);
  return (
    <PublicLayout>
      <Hero
        title="Welcome to our homepage, we hope you like it!"
        buttonTitle="Get Started"
        buttonLink={auth?.isAuthenticated() ? '/dashboard' : '/login'}
      />
    </PublicLayout>
  );
};

export default Home;
