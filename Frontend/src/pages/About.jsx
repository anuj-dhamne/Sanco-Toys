import React from 'react';

const About = () => {
  return (
    <div className="min-h-screen bg-gray-50 px-6 py-16">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-5xl font-bold text-gray-800 mb-10 text-center">About Us</h1>

        <div className="text-lg text-gray-700 leading-8 space-y-6">
          <p>
            Welcome to <span className="font-semibold text-primary">SancoToys</span> — where imagination meets play!
            We're committed to offering the most fun, safe, and creative toys for kids of all ages.
          </p>

          <p>
            Sanco Toys was founded with a passion for creating high-quality, safe, and fun
            ventures toys for children. Our journey began with a small team of dedicated toy
            enthusiasts who believed in the power of play to inspire creativity and adventure.
            Today, we are proud to offer a range of toys that bring joy to children."
          </p>
          <h2 className="text-3xl font-semibold text-gray-800 mb-6">Our Mission</h2>
          <p>
          "Our mission is to provide toys that spark imagination and promote adventure in
          children. We value safety, creativity, and quality in everything we do."
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
