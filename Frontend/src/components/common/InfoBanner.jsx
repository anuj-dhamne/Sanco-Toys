import React, { useEffect, useRef, useState } from "react";
import {
  Phone,
  PackageCheck,
  Smile,
  ShieldCheck,
  Baby,
} from "lucide-react";

const AnimatedItem = ({ children }) => {
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
        visible ? "animate-fade-in-up" : "opacity-0 translate-y-6"
      }`}
    >
      {children}
    </div>
  );
};

const InfoBanner = () => {
  const items = [
    {
      icon: <Baby size={36} className="text-red-600 hover:scale-150 transition" />,
      title: "For Ages 3+",
      description: "Safe for children 3 years and above",
    },
    {
      icon: <Phone size={36} className="text-blue-500 hover:scale-150 transition" />,
      title: "Give Us A Call",
      description: "+91 8446090922",
    },
    {
      icon: <PackageCheck size={36} className="text-green-600 hover:scale-150 transition" />,
      title: "Bulk Inquiry",
      description: "info@sancotoys.com",
    },
    {
      icon: <Smile size={36} className="text-yellow-600 hover:scale-150 transition" />,
      title: "Sanco Quality",
      description: "High Quality Toys",
    },
    {
      icon: <ShieldCheck size={36} className="text-purple-600 hover:scale-150 transition" />,
      title: "BIS Certified",
      description: "Meets Safety Standards",
    },
  ];

  return (
    <section className="w-full py-8 px-4 bg-white">
      <div className="max-w-7xl mx-auto flex flex-wrap justify-around gap-y-6 text-center ">
        {items.map((item, index) => (
          <AnimatedItem key={index}>
            <div className="flex flex-col items-center space-y-1 px-2 ">
              {item.icon}
              <span className="text-base font-semibold text-gray-800 normal-font">{item.title}</span>
              <span className="text-sm text-gray-600">{item.description}</span>
            </div>
          </AnimatedItem>
        ))}
      </div>
    </section>
  );
};

export default InfoBanner;
