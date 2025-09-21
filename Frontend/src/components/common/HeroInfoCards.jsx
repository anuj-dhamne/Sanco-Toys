import React, { useEffect, useRef, useState } from 'react';

// 🏎️ Extended heroData with dynamic gradient info
const heroData = [
  {
    id: 1,
    title: 'Power Tanker',
    description: 'Fuel up your playtime with our Power Tanker Truck!',
    image: '/PT.png',
    background: '/PT_bg.jpg',
    reverse: false,
    titleGradient: ['from-yellow-200', 'via-yellow-400', 'to-orange-700'],
  },
  {
    id: 2,
    title: 'Dump Truck',
    description:
      'Calling all junior builders! Our Dumper Truck is designed for kids who love to dig, haul, and dump.',
    image: '/DT.jpg',
    background: '/DT_bg.jpg',
    reverse: true,
    titleGradient: ['from-blue-200', 'via-blue-500', 'to-blue-700'],
  },
  {
    id: 3,
    title: 'Concrete Mixer',
    description: 'Mix up some construction fun with our Concrete Mixer Truck!',
    image: '/CM.png',
    background: '/CM_bg.jpg',
    reverse: false,
    titleGradient: ['from-orange-200', 'via-orange-400', 'to-orange-700'],
  },
];

const HeroCard = ({ title, description, image, background, reverse, titleGradient }) => {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { threshold: 0.2 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const gradientDirection = reverse ? 'to left' : 'to right';
  const animationClass = visible
    ? reverse
      ? 'animate-slide-in-right'
      : 'animate-slide-in-left'
    : 'opacity-0 translate-y-10';

  const gradientClasses = titleGradient.join(' ');

  return (
    <section
      ref={ref}
      className={`flex justify-center items-center py-12 px-4 bg-white transition-all duration-700 ${animationClass}`}
    >
      <div className="relative w-full max-w-5xl rounded-xl overflow-hidden border border-black shadow-[0_0_15px_rgba(0,0,0,0.1)] hover:shadow-[0_0_25px_5px_rgba(0,0,0,0.5)] transition-shadow duration-500">
        
        {/* Background Image */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url(${background})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />

        {/* Gradient Overlay */}
        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(${gradientDirection}, rgba(0,0,0,0.6), rgba(0,0,0,0.8))`,
          }}
        />

        {/* Content */}
        <div className={`relative z-10 flex flex-col md:flex-row ${reverse ? 'md:flex-row-reverse' : ''}`}>
          {/* Image Section */}
          <div className="w-full md:w-1/2 flex justify-center items-center p-4">
            <img
              src={image}
              alt={title}
              className="w-full h-auto max-w-[80%] md:max-w-[90%] object-contain"
            />
          </div>

          {/* Text Section */}
          <div className="w-full md:w-1/2 p-6 md:p-10 flex flex-col justify-center text-white text-center md:text-left">
            <h1
              className={`text-4xl md:text-5xl lg:text-6xl font-extrabold font-racing mb-4 text-transparent bg-clip-text bg-gradient-to-r ${gradientClasses} tracking-widest uppercase animate-pulse`}
            >
              {title}
            </h1>
            <p className="text-base md:text-2xl">{description}</p>
          </div>
        </div>
      </div>
    </section>
  );
};

const HeroSection = () => {
  return (
    <>
      {heroData.map((item) => (
        <HeroCard
          key={item.id}
          title={item.title}
          description={item.description}
          image={item.image}
          background={item.background}
          reverse={item.reverse}
          titleGradient={item.titleGradient}
        />
      ))}
    </>
  );
};

export default HeroSection;
