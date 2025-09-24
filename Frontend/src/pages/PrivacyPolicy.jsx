import React, { useEffect, useRef, useState } from 'react';
import {
  ShieldCheck,
  User,
  ShoppingCart,
  Lock,
  Cookie,
  BadgeCheck,
  RefreshCcw,
} from 'lucide-react';

// Animation wrapper component
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

// Default privacy sections
const defaultSections = [
  {
    icon: User,
    heading: 'Information We Collect',
    content:
      'We may collect your name, contact details, shipping address, payment information, order history, and device/browser data to help process orders and improve your shopping experience.',
    borderColor: 'border-yellow-500',
    headingColor: 'text-yellow-600',
    textColor: 'text-yellow-600',
    iconColor: 'text-yellow-500',
  },
  {
    icon: ShoppingCart,
    heading: 'How We Use Your Information',
    content:
      'Your information is used to process orders, personalize your experience, communicate with you, and improve our services. We do not sell your personal data.',
    borderColor: 'border-red-500',
    headingColor: 'text-red-600',
    textColor: 'text-red-600',
    iconColor: 'text-red-500',
  },
  {
    icon: Lock,
    heading: 'Data Security',
    content:
      'We use secure servers, encryption, and limited access to protect your data. Payment processing is handled through trusted third-party gateways.',
    borderColor: 'border-purple-500',
    headingColor: 'text-purple-600',
    textColor: 'text-purple-600',
    iconColor: 'text-purple-500',
  },
  {
    icon: Cookie,
    heading: 'Cookies & Tracking',
    content:
      'We use cookies to analyze traffic, enhance functionality, and personalize content. You can manage your cookie preferences in your browser settings.',
    borderColor: 'border-green-500',
    headingColor: 'text-green-600',
    textColor: 'text-green-600',
    iconColor: 'text-green-500',
  },
  {
    icon: BadgeCheck,
    heading: 'Your Rights',
    content:
      'You have the right to access, correct, or delete your personal information. To exercise these rights, please contact us at info@sancotoys.com.',
    borderColor: 'border-blue-500',
    headingColor: 'text-blue-600',
    textColor: 'text-blue-600',
    iconColor: 'text-blue-500',
  },
  {
    icon: RefreshCcw,
    heading: 'Policy Updates',
    content:
      'We may update this privacy policy periodically. Please check this page regularly to stay informed.',
    borderColor: 'border-orange-500',
    headingColor: 'text-orange-600',
    textColor: 'text-orange-600',
    iconColor: 'text-orange-500',
  },
  {
  icon: ShieldCheck,
  heading: 'Contact Us',
  content:
    'If you have any questions about this Privacy Policy or our practices, please contact us at: \n Plot No.A, 106 - 107, 1st Floor, H-Block, MIDC, Pimpri, Pune, Maharashtra, India - 411018 \n Email: info@sancotoys.com \n Phone: +91-8446090922',
  borderColor: 'border-pink-500',
  headingColor: 'text-pink-600',
  textColor: 'text-pink-600',
  iconColor: 'text-pink-500',
}

];

const PrivacyPolicy = ({
  sections = defaultSections,
  title = 'Privacy Policy',
  titleIcon: TitleIcon = ShieldCheck,
}) => {
  return (
    <div className="min-h-screen bg-white px-6 py-16">
      <div className="max-w-7xl mx-auto">
        {/* Title */}
        
          <div className="flex items-center justify-center gap-4 mb-12 ">
            <TitleIcon className="text-black w-10 h-10" />
            <h1 className="text-5xl font-bold text-black">{title}</h1>
          </div>
        

        {/* Policy Sections */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {sections.map((section, index) => {
            const Icon = section.icon;
            return (
              
                <div
                  className={`bg-white rounded-xl shadow-md p-6 border-t-4 ${section.borderColor}  animate-fade-in-up hover:shadow-xl`}
                >
                  <div className="flex items-center gap-3 mb-3">
                    <Icon className={`w-6 h-6 ${section.iconColor}`} />
                    <h2 className={`text-xl font-semibold ${section.headingColor}`}>
                      {section.heading}
                    </h2>
                  </div>
                  <p className={`leading-relaxed whitespace-pre-line ${section.textColor}`}>{section.content}</p>
                </div>
              
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
