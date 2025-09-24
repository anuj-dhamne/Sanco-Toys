import React from 'react';
import { FaShippingFast, FaClock, FaMapMarkerAlt, FaTruck } from 'react-icons/fa';

const defaultCards = [
  {
    icon: FaClock,
    title: 'Delivery Time',
    content: 'Standard shipping usually takes 3-7 business days. Expedited shipping options are available at checkout.',
    borderColor: 'border-purple-400',
    bgColor: 'bg-white',
    titleColor: 'text-purple-700',
    textColor: 'text-purple-600',
    iconColor: 'text-purple-500',
  },
  {
    icon: FaMapMarkerAlt,
    title: 'Shipping Charges',
    content: 'Shipping charges are calculated based on your location and order size and are displayed at checkout.',
    borderColor: 'border-blue-400',
    bgColor: 'bg-white',
    titleColor: 'text-blue-700',
    textColor: 'text-blue-500',
    iconColor: 'text-blue-400',
  },
  {
    icon: FaTruck,
    title: 'Shipment Tracking',
    content: 'Once your order is shipped, you can track your status through MY ORDERS section or else can Contact our customer service \nEmail: info@sancotoys.com \nPhone: +91-8446090922.',
    borderColor: 'border-green-400',
    bgColor: 'bg-white',
    titleColor: 'text-green-700',
    textColor: 'text-green-600',
    iconColor: 'text-green-500',
  },
  {
    icon: FaShippingFast,
    title: 'Delays & Exceptions',
    content: 'Sanco Toys is not responsible for delays caused by courier services, customs, or unforeseen events like natural disasters.',
    borderColor: 'border-yellow-400',
    bgColor: 'bg-white',
    titleColor: 'text-yellow-700',
    textColor: 'text-yellow-600',
    iconColor: 'text-yellow-500',
  },
];

const ShippingPolicy = ({ cards = defaultCards }) => {
  return (
    <div className="min-h-screen bg-white px-6 py-16 animate-fade-in-up">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-5xl font-bold text-black mb-10 text-center flex items-center justify-center gap-4 animate-fade-in-up delay-[200ms]">
          <FaShippingFast className="text-black" /> Shipping Policy
        </h1>

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
                <p className={`whitespace-pre-line leading-relaxed ${card.textColor}`}>
                  {card.content}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ShippingPolicy;
