import React from 'react';

const heroData = [
  {
    id: 1,
    title: 'Power Tanker',
    description:
      'Fuel up your playtime with our Power Tanker Truck!',
    image: '/public/PT.png',
    background: '/public/PT_bg.jpg',
    reverse: false,
  },
  {
    id: 2,
    title: 'Dumper Truck',
    description: 'Calling all junior builders! Our Dumper Truck is designed for kids who love to dig, haul, and dump.',
    image: '/public/DT.jpg',
    background: '/public/DT_bg.jpg',
    reverse: true,
  },
  {
    id: 3,
    title: 'Concrete Mixer',
    description: 'Mix up some construction fun with our Concrete Mixer Truck! ',
    image: '/public/CM.png',
    background: '/public/CM_bg.jpg',
    reverse: false,
  },
  // {
  //   id: 4,
  //   title: 'Augmented Reality Games',
  //   description: 'Bring toys to life with our AR-enhanced experiences.',
  //   image: '/public/ML.png',
  //   background: '/public/ML_bg.jpeg',
  //   reverse: true,
  // },
  // {
  //   id: 5,
  //   title: 'Eco-Friendly Smart Toys',
  //   description: 'Sustainability meets innovation in our eco-smart toy line.',
  //   image: '/public/FF.png',
  //   background: '/public/FF_bg.jpeg',
  //   reverse: false,
  // },
];

const HeroCard = ({ title, description, image, background, reverse }) => {
  const gradientDirection = reverse ? 'to left' : 'to right';

  return (
    <section className="flex justify-center items-center py-12 px-4">
      <div className="relative w-full max-w-5xl rounded-xl overflow-hidden shadow-[0_10px_30px_rgba(0,0,0,0.9)]">
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
        <div
          className={`relative z-10 flex flex-col md:flex-row ${
            reverse ? 'md:flex-row-reverse' : ''
          }`}
        >
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
            <h1 className="text-3xl md:text-4xl font-extrabold mb-4">{title}</h1>
            <p className="text-base md:text-lg">{description}</p>
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
        />
      ))}
    </>
  );
};

export default HeroSection;