import React from 'react';
import myicon from '../assets/my=icon.svg'; 

const WelcomeScreen = () => {
  return (
    <div className="fixed inset-0 bg-gradient-to-br from-emerald-500 to-teal-600 flex flex-col items-center justify-center z-50">
      {/* Logo */}
      <div className="mb-8">
        <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center shadow-lg animate-pulse">
          <img src={myicon} alt="" />
        </div>
      </div>

      {/* Welcome Text */}
      <h1 className="text-4xl font-bold text-white mb-4 animate-fade-in">
        Welcome to Triora
      </h1>

      {/* Round Animations */}
      <div className="flex space-x-4 mt-8">
        <div className="w-4 h-4 bg-white rounded-full animate-bounce" style={{ animationDelay: '0s' }}></div>
        <div className="w-4 h-4 bg-white rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
        <div className="w-4 h-4 bg-white rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
      </div>
    </div>
  );
};

export default WelcomeScreen;
