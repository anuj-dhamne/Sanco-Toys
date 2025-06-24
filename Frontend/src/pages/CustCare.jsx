import React, { useEffect, useRef, useState } from 'react';
import { Headphones, Phone, Mail, Clock } from 'lucide-react';

// Animation wrapper
const AnimatedSection = ({ children }) => {
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
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out ${
        visible ? 'animate-flip-in' : 'opacity-0 translate-y-10'
      }`}
    >
      {children}
    </div>
  );
};

// Reusable section card
const SectionCard = ({ title, icon, color, children }) => {
  return (
    <AnimatedSection>
      <div
        className={`border-t-4 ${color.border} bg-white text-lg leading-8 p-6 mb-10 rounded-xl shadow-md hover:shadow-xl`}
      >
        <h2 className={`text-3xl font-semibold mb-4 flex items-center gap-2 ${color.text}`}>
          {icon} {title}
        </h2>
        <div className={`${color.text}`}>{children}</div>
      </div>
    </AnimatedSection>
  );
};

const sectionData = [
  {
    title: 'Experience First',
    icon: <Headphones className="w-6 h-6" />,
    color: { border: 'border-green-500', text: 'text-green-500' },
    content: (
      <p>
        At <span className="font-semibold text-primary">SancoToys</span>, we prioritize your satisfaction and aim to provide a seamless shopping experience from start to finish.
      </p>
    ),
  },
  {
    title: 'Contact Information',
    icon: <Phone className="w-6 h-6" />,
    color: { border: 'border-blue-600', text: 'text-blue-600' },
    content: (
      <ul className="space-y-4">
        <li className="flex items-center gap-2">
          <Phone className="w-5 h-5 text-blue-600" /> <span>+91 8446090922</span>
        </li>
        <li className="flex items-center gap-2">
          <Mail className="w-5 h-5 text-blue-600" /> <span>info@sancotoys.com</span>
        </li>
        <li className="flex items-center gap-2">
          <Clock className="w-5 h-5 text-blue-600" /> <span>Friday–Wednesday, 10 AM to 6 PM</span>
        </li>
      </ul>
    ),
  },
  {
    title: 'Returns & Refunds',
    icon: <Clock className="w-6 h-6" />,
    color: { border: 'border-red-500', text: 'text-red-500' },
    content: (
      <p>
        If you’re not completely satisfied with your purchase, you can return the product within 7 days of delivery.
        Please ensure the product is unused and in its original packaging. Refunds will be processed within 3–5 business days.
      </p>
    ),
  },
  {
    title: 'Feedback',
    icon: <Mail className="w-6 h-6" />,
    color: { border: 'border-purple-500', text: 'text-purple-500'},
    content: (
      <p>
        We love hearing from you! Your feedback helps us improve our products and services.
        Feel free to drop us a message anytime.
      </p>
    ),
  },
];

const CustomerCare = () => {
  return (
    <div className="min-h-screen bg-white px-6 py-16">
      <div className="max-w-6xl mx-auto">
        <AnimatedSection>
          <h1 className="text-5xl font-bold text-red-500 mb-10 text-center flex items-center justify-center gap-4">
            <Headphones className="w-12 h-12 text-red-500" />
            Customer Care
          </h1>
        </AnimatedSection>

        {sectionData.map((section, index) => (
          <SectionCard 
            key={index}
            title={section.title}
            icon={section.icon}
            color={section.color}
          >
            {section.content}
          </SectionCard>
        ))}
      </div>
    </div>
  );
};

export default CustomerCare;

