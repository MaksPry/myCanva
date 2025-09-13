
import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="py-6 bg-black/20 backdrop-blur-sm">
      <div className="container mx-auto px-4 text-center">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">
          AI Image Canvas
        </h1>
        <p className="mt-2 text-lg text-gray-400">Powered by Gemini</p>
      </div>
    </header>
  );
};

export default Header;
