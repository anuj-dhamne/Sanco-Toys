import React, { useState, useEffect } from "react";

const images = [
  "/4.jpg",
  "/14.jpg" // add your second image path here
];

function HeroSection() {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto-slide every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full overflow-hidden relative">
      <img
        src={images[currentIndex]}
        alt="Hero"
        className="w-full h-full object-cover transition-transform duration-700 ease-in-out transform hover:scale-105"
      />

      {/* Dots for navigation */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-3 h-3 rounded-full ${
              currentIndex === index ? "bg-white" : "bg-gray-400"
            }`}
          />
        ))}
      </div>
    </div>
  );
}

export default HeroSection;
