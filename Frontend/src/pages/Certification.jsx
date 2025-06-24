import React, { useEffect, useRef, useState } from 'react';
import { Award, CheckCircle } from 'lucide-react';

const Certification = () => {
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

  return (
    <section
      ref={ref}
      className={`min-h-screen bg-white px-6 py-16 flex flex-col justify-center items-center transition-all duration-700 ${
        visible ? 'animate-fade-in-up' : 'opacity-0 translate-y-10'
      }`}
    >
      {/* Section Title */}
      <h1 className="text-5xl font-bold text-red-500 mb-12 text-center flex items-center gap-4 animate-fade-in-up delay-[200ms]">
        <Award className="w-10 h-10 text-red-500" />
        Our Certifications
      </h1>

      {/* Certification Card */}
      <div className="max-w-5xl w-full flex flex-col md:flex-row items-center bg-gray-100 rounded-xl shadow-lg border border-white/30 overflow-hidden">
        
        {/* Image Section */}
        <div className="w-full md:w-1/2">
          <img
            src="/BIS.jpg"
            alt="BIS Certification"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Text Section */}
        <div className="w-full md:w-1/2 p-8">
          <div className="flex items-center mb-4">
            <CheckCircle className="w-10 h-10 text-yellow-700 mr-3" />
            <h2 className="text-4xl font-bold text-yellow-600">BIS Certified</h2>
          </div>
          <p className="text-lg text-yellow-500">
            At <span className="font-semibold text-primary">SancoToys</span>, child safety is our top priority. Our products are BIS certified, ensuring they meet the highest standards of quality, safety, and durability as mandated by the Bureau of Indian Standards (BIS), under the Government of India.
            <br /><br />
            BIS certification guarantees that every toy we manufacture complies with rigorous testing and regulatory norms, giving parents peace of mind and children the freedom to play safely. It's a mark of trust, quality, and commitment to excellence.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Certification;
