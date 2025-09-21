import React, { useEffect, useRef, useState } from 'react';
import {
  Leaf,
  ShieldCheck,
  Globe,
  Star,
  Wind,
  RefreshCcw,
  Eye,
  Target,
  HeartHandshake,
  FileQuestionIcon,
} from 'lucide-react';

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
      className={`transition-all duration-700 ease-out ${visible ? 'animate-flip-out' : 'opacity-0 translate-y-10'
        }`}
    >
      {children}
    </div>
  );
};

const About = () => {
  const colorMap = {
    red: { border: 'border-red-700', text: 'text-red-500', bg: 'bg-red-50' },
    green: { border: 'border-green-700', text: 'text-green-500', bg: 'bg-green-50' },
    blue: { border: 'border-blue-700', text: 'text-blue-500', bg: 'bg-blue-50' },
    purple: { border: 'border-purple-500', text: 'text-purple-500', bg: 'bg-purple-50' },
    yellow: { border: 'border-yellow-500', text: 'text-yellow-500', bg: 'bg-yellow-50' },
    orange: { border: 'border-orange-500', text: 'text-orange-500', bg: 'bg-orange-50' },
  };

  const coreValues = [
    { icon: <Leaf />, label: 'Sustainable Products' },
    { icon: <ShieldCheck />, label: 'Virgin Food Grade Material' },
    { icon: <Globe />, label: 'Environment Friendly' },
    { icon: <Star />, label: 'Quality' },
    { icon: <Wind />, label: 'Dust Prevented' },
    { icon: <RefreshCcw />, label: 'Recyclable Products' },
  ];

  const sections = [
    {
      title: 'Our Story',
      text: 'Sanco Toys was founded with a passion for creating high-quality, safe, and fun ventures toys for children. Our journey began with a small team of dedicated toy enthusiasts who believed in the power of play to inspire creativity and adventure. Today, we are proud to offer a range of toys that bring joy to children.',
      img: 'story.jpg',
      icon: <Star />,
      color: 'red',
    },
    {
      title: 'Core Values',
      text: 'Our commitment to quality, safety, and innovation forms the cornerstone of our values. We believe in:',
      img: '/core.jpg',
      icon: <ShieldCheck />,
      color: 'green',
      reverse: true,
      list: coreValues,
    },
    {
      title: 'Vision',
      text: 'Founded by passionate toy creators, SancoToys started with a mission to ignite imagination...',
      img: '/vision.jpg',
      icon: <Eye />,
      color: 'blue',
    },
    {
      title: 'Mission',
      text: 'Our mission is to provide toys that spark imagination and promote adventure in children.We value safety, creativity, and quality in everything we do. ',
      img: '/mission2.jpg',
      icon: <Target />,
      color: 'purple',
      reverse: true,
    },
    {
      title: 'SANCO CSR',
      text: 'We welcome all good working toys (Sanco & Non-Sanco) as part of TAKEBACK PROGRAMME& encourage you to donate toys for local charity so that underprivileged children can also enjoy &share fun as long as possible',
      img: '/CSR.jpg',
      icon: <HeartHandshake />,
      color: 'yellow',
    },
    {
      title: 'The Sanco PlayBack',
      text: 'Sanco Playback is your chance to help keep out grown, unusable & own out toys. Rather than throwing out toys when you & your children are done with them, sent them to us & through our programme & our recycling partner, we will try to convert their material from waste to energy or to transform the materials into post use recycle content.At Sanco our purpose is to empower the next generation to explore the wonder of childhood & reach their full potential, and we want that our next generation inherit it a world a full of sustainable green energy by working together to reclaim & recycle materials, it helps reduce the number of toys that become waste.',
      img: '/playback.jpg',
      icon: <FileQuestionIcon />,
      color: 'orange',
      reverse: true,
    },
  ];

  return (
    <div className="min-h-screen bg-white px-4 md:px-6 py-12">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold text-black mb-10 text-center">
          About Us
        </h1>

        {sections.map((sec, idx) => {
          const color = colorMap[sec.color];
          return (
            <AnimatedSection key={idx}>
              <div
                className={`border-t-4 ${color.border} ${color.bg} text-lg leading-8 p-6 mb-10 rounded-xl shadow-md hover:shadow-xl`}
              >
                {/* Title ABOVE the whole card */}
                <h2
                  className={`text-2xl md:text-3xl font-semibold mb-6 flex items-center justify-center gap-2 text-center ${color.text}`}
                >
                  <span>{sec.icon}</span>
                  <span>{sec.title}</span>
                </h2>

                {/* Content Section */}
                <div
                  className={`flex flex-col md:flex-row ${sec.reverse ? 'md:flex-row-reverse' : ''
                    } items-center`}
                >
                  {/* Image */}
                  <div className="md:w-1/2 w-full px-4 flex justify-center items-center">
                    <img
                      src={sec.img}
                      alt={sec.title}
                      className="w-full h-full max-w-[500px] max-h-[400px] my-0 rounded-3xl object-cover transition-transform duration-500 hover:scale-105"
                    />
                  </div>

                  {/* Text */}
                  <div className="md:w-1/2 w-full p-4">
                    <p className={`text-xl ${color.text}`}>{sec.text}</p>
                    {sec.list && (
                      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4 text-green-700">
                        {sec.list.map((item, i) => (
                          <li
                            key={i}
                            className="flex items-center space-x-3 bg-green-100 p-3 rounded-lg shadow-sm hover:bg-green-200 transition"
                          >
                            <span>{item.icon}</span>
                            <span>{item.label}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
              </div>
            </AnimatedSection>

          );
        })}
      </div>
    </div>
  );
};

export default About;
