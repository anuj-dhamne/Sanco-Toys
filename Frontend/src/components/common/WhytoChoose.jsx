import React, { useEffect } from 'react';
import { FaCheckCircle, FaLeaf, FaChild, FaComments, FaShieldAlt } from 'react-icons/fa';
import AOS from 'aos';
import 'aos/dist/aos.css';
import ChooseImage from '/Chhose.jpg'; // adjust path

const features = [
  {
    icon: <FaCheckCircle className="text-green-600 text-2xl" />,
    title: 'Premium Quality with Virgin Food Grade Material',
    description: 'Crafted with top-grade, virgin food-safe materials ensuring durability and safety.',
  },
  {
    icon: <FaLeaf className="text-green-500 text-2xl" />,
    title: 'Ecofriendly Materials & Recyclable Products',
    description: 'Made from eco-friendly materials, our products are fully recyclable, promoting sustainability.',
  },
  {
    icon: <FaChild className="text-yellow-500 text-2xl" />,
    title: 'Age-appropriate Designs',
    description: 'Thoughtfully designed to meet the developmental needs of kids, tailored to their age group.',
  },
  {
    icon: <FaComments className="text-blue-500 text-2xl" />,
    title: 'Customer Focus & Feedback-driven Improvements',
    description: 'We prioritize customer feedback to continuously refine and improve our products.',
  },
  {
    icon: <FaShieldAlt className="text-red-500 text-2xl" />,
    title: 'Rigorous Testing',
    description: 'Each product undergoes thorough testing to meet the highest safety and quality standards.',
  },
];

const WhyChooseSanco = () => {
  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
    });
  }, []);

  return (
  <div className="bg-white p-8 rounded-lg max-w-6xl mx-auto my-10">
    {/* Title at the top center */}
    <h2
      className="text-3xl font-bold text-purple-600 mb-10 text-center"
      data-aos="fade-down"
    >
      Why To Choose Sanco :
    </h2>

    <div className="flex flex-col md:flex-row items-center">
      {/* Left: Image */}
      <div className="md:w-1/2 w-full flex justify-center mb-6 md:mb-0">
        <img
          src={ChooseImage}
          alt="Why Choose Sanco"
          className="w-full max-w-[900px] rounded-xl object-cover shadow-lg"
          data-aos="fade-right"
        />
      </div>

      {/* Right: Content */}
      <div className="md:w-1/2 w-full md:pl-8">
        <div className="space-y-6 text-gray-800 text-lg">
          {features.map((feature, index) => (
            <div
              key={index}
              className="flex items-start gap-4"
              data-aos="fade-up"
              data-aos-delay={index * 150}
            >
              {feature.icon}
              <div>
                <strong>{feature.title}:</strong><br />
                {feature.description}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);

};

export default WhyChooseSanco;
