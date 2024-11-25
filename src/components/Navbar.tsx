import React from 'react';
import { Link } from 'react-router-dom';

const Navbar: React.FC = () => {
  return (
    <nav className="absolute top-0 right-0 w-full p-6 z-40">
      <div className="flex justify-end">
        <Link
          to="/app"
          className="px-6 py-2 bg-white bg-opacity-10 hover:bg-opacity-20 text-white rounded-full 
                   transition-all duration-300 border border-white border-opacity-20 
                   hover:border-opacity-40 backdrop-blur-sm flex items-center justify-center 
                   min-w-[80px] text-center"
        >
          APP
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;