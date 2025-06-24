import React from 'react';

function HeroSection() {
  return (
    <div className="w-full overflow-hidden ">
      <img
        src="/4.jpg"
        alt="Hero"
        className="w-full h-full object-cover transition-transform duration-700 ease-in-out transform hover:scale-105"
      />
    </div>
  );
}

export default HeroSection;
