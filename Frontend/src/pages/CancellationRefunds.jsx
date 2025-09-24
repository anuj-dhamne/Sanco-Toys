import React from 'react';
import { FaUndoAlt, FaClock, FaBoxOpen, FaMoneyCheckAlt } from 'react-icons/fa';

const defaultCards = [
  {
    icon: FaClock,
    title: 'Order Cancellation',
    content: 'Orders can be cancelled within 24 hours of placing them. Once shipped, cancellation is not possible.',
    borderColor: 'border-purple-400',
    bgColor: 'bg-white',
    titleColor: 'text-purple-700',
    textColor: 'text-purple-600',
    iconColor: 'text-purple-500',
  },
  {
    icon: FaBoxOpen,
    title: 'Returns Policy',
    content: 'Returns are accepted within 7 days of delivery for unused products in original packaging.',
    borderColor: 'border-blue-400',
    bgColor: 'bg-white',
    titleColor: 'text-blue-700',
    textColor: 'text-blue-500',
    iconColor: 'text-blue-400',
  },
  {
    icon: FaMoneyCheckAlt,
    title: 'Refund Process',
    content: 'Refunds will be processed by our customer services within 5-7 business days after the returned product is received and verified. ',
    borderColor: 'border-green-400',
    bgColor: 'bg-white',
    titleColor: 'text-green-700',
    textColor: 'text-green-600',
    iconColor: 'text-green-500',
  },
  {
    icon: FaUndoAlt,
    title: 'Exchanges',
    content: 'Currently, we do not offer direct exchanges. In case any damaged products are delivered ,customers can contact our service at \nEmail: info@sancotoys.com \nPhone: +91-8446090922..',
    borderColor: 'border-yellow-400',
    bgColor: 'bg-white',
    titleColor: 'text-yellow-700',
    textColor: 'text-yellow-600',
    iconColor: 'text-yellow-500',
  },
];

const CancellationRefunds = ({ cards = defaultCards }) => {
  return (
    <div className="min-h-screen bg-white px-6 py-16 animate-fade-in-up">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-5xl font-bold text-black mb-10 text-center flex items-center justify-center gap-4 animate-fade-in-up delay-[200ms]">
          <FaUndoAlt className="text-black" /> Cancellation & Refunds
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

export default CancellationRefunds;
