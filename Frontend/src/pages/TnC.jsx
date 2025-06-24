import React from 'react';
import {
  FaFileContract,
  FaUserShield,
  FaInfoCircle,
  FaMoneyCheckAlt,
  FaShippingFast,
  FaUndoAlt,
  FaCopyright,
  FaExclamationTriangle,
  FaSyncAlt,
  FaEnvelope,
} from 'react-icons/fa';

const defaultCards = [
  {
    icon: FaUserShield,
    title: 'Use of Website',
    content: 'You must be at least 18 years old or have parental consent to use this site. All information you provide must be accurate, current, and complete.',
    borderColor: 'border-yellow-400',
    bgColor: 'bg-white',
    titleColor: 'text-yellow-700',
    textColor: 'text-yellow-600',
    iconColor: 'text-yellow-500',
  },
  {
    icon: FaInfoCircle,
    title: 'Product Information',
    content: 'We strive to ensure that all product descriptions, prices, and images are accurate. However, we do not guarantee that product details are error-free or complete at all times.',
    borderColor: 'border-blue-400',
    bgColor: 'bg-white',
    titleColor: 'text-blue-700',
    textColor: 'text-blue-500',
    iconColor: 'text-blue-400',
  },
  {
    icon: FaMoneyCheckAlt,
    title: 'Orders & Payment',
    content: 'All orders are subject to availability and confirmation. We reserve the right to refuse or cancel orders at our discretion. Payments are processed securely through trusted payment gateways.',
    borderColor: 'border-green-400',
    bgColor: 'bg-white',
    titleColor: 'text-green-700',
    textColor: 'text-green-600',
    iconColor: 'text-green-500',
  },
  {
    icon: FaShippingFast,
    title: 'Shipping & Delivery',
    content: 'Shipping times and charges vary based on your location. We are not liable for delays due to external factors (e.g., courier delays, natural disasters).',
    borderColor: 'border-purple-400',
    bgColor: 'bg-white',
    titleColor: 'text-purple-700',
    textColor: 'text-purple-600',
    iconColor: 'text-purple-500',
  },
  {
    icon: FaUndoAlt,
    title: 'Returns & Refunds',
    content: 'Our return policy allows eligible items to be returned within 7 days of delivery. Returned products must be unused and in original packaging.',
    borderColor: 'border-yellow-400',
    bgColor: 'bg-white',
    titleColor: 'text-yellow-700',
    textColor: 'text-yellow-600',
    iconColor: 'text-yellow-500',
  },
  {
    icon: FaCopyright,
    title: 'Intellectual Property',
    content: 'All content on this website is the property of SancoToys and protected by intellectual property laws. You may not copy, modify, or distribute any content without permission.',
    borderColor: 'border-green-400',
    bgColor: 'bg-white',
    titleColor: 'text-green-700',
    textColor: 'text-green-600',
    iconColor: 'text-green-500',
  },
  {
    icon: FaExclamationTriangle,
    title: 'Limitation of Liability',
    content: 'SancoToys shall not be liable for any direct or indirect damages arising from your use of our website or products. Use our services at your own risk.',
    borderColor: 'border-purple-400',
    bgColor: 'bg-white',
    titleColor: 'text-purple-700',
    textColor: 'text-purple-600',
    iconColor: 'text-purple-500',
  },
  {
    icon: FaSyncAlt,
    title: 'Changes to Terms',
    content: 'We reserve the right to modify these terms at any time. Continued use of the site after changes are posted constitutes your acceptance of those changes.',
    borderColor: 'border-blue-400',
    bgColor: 'bg-white',
    titleColor: 'text-blue-700',
    textColor: 'text-blue-500',
    iconColor: 'text-blue-500',
  },
  {
    icon: FaEnvelope,
    title: 'Contact Us',
    content: 'If you have any questions regarding these terms, please contact us at info@sancotoys.com.',
    borderColor: 'border-green-400',
    bgColor: 'bg-white',
    titleColor: 'text-green-700',
    textColor: 'text-green-600',
    iconColor: 'text-green-500',
    isContact: true,
  },
];

const TnC = ({ cards = defaultCards }) => {
  return (
    <div className="min-h-screen bg-white px-6 py-16 animate-fade-in-up">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-5xl font-bold text-red-500 mb-10 text-center flex items-center justify-center gap-4 animate-fade-in-up delay-[200ms]">
          <FaFileContract className="text-red-500" /> Terms & Conditions
        </h1>

        <p className="text-lg text-red-500 leading-8 mb-10 text-center animate-fade-in-up delay-[300ms]">
          By using <span className="font-semibold text-primary">SancoToys</span> services, you agree to the following terms and conditions.
        </p>

        <div className="grid md:grid-cols-2 gap-6">
          {cards.map((card, index) => {
            const Icon = card.icon;
            return (
              <div
                key={index}
                className={`border-t-4 ${card.borderColor} ${card.bgColor} rounded-xl shadow-md p-6 animate-fade-in-up hover:shadow-xl`}
              >
                <div className="flex items-center gap-3 mb-2">
                  <Icon className={`${card.iconColor} w-5 h-5`} />
                  <h2 className={`text-2xl font-semibold ${card.titleColor}`}>{card.title}</h2>
                </div>
                <p className={`text-base leading-relaxed ${card.textColor}`}>
                  {card.isContact ? (
                    <>
                      If you have any questions regarding these terms, please contact us at{' '}
                      <a href="mailto:info@sancotoys.com" className="text-blue-600 underline">
                        info@sancotoys.com
                      </a>.
                    </>
                  ) : (
                    card.content
                  )}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default TnC;
