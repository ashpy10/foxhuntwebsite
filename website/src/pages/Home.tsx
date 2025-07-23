import React from 'react';
import Hero from '../components/home/hero';
import HeroText from '../components/home/heroText';

const Home: React.FC = () => {
  return (
    <div className="home-page">
      <HeroText />
      <Hero />
    </div>
  );
};

export default Home;
