import React from 'react';
import Navbar from '../components/Navbar';

const AppPage: React.FC = () => {
  return (
    <div className="min-h-screen w-full bg-black relative flex items-center justify-center">
      {/* Navbar */}
      <Navbar />
    </div>
  );
};

export default AppPage;