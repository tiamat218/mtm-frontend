import React from 'react';
import Navbar from '../components/Navbar';

const Home: React.FC = () => {
  return (
    <div className="min-h-screen w-full bg-black relative flex items-center justify-center overflow-hidden">
      {/* Background Image Layer */}
      <div className="absolute inset-0 z-10">
        <img 
          src="/mtm_bg.png"
          alt="Background"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Content Layer */}
      <h1 className="text-black text-4xl font-light tracking-wider z-30 relative">
        Mark assets to market value.
      </h1>

      {/* Navbar */}
      <Navbar />
    </div>
  );
};

export default Home;