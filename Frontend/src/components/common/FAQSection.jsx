import React, { useState } from 'react';
import { TypeAnimation } from 'react-type-animation';
import { ChevronDown, ChevronUp } from 'lucide-react';

const faqs = [
  {
    question: "Are Sanco Toys Products safe for children?",
    answer:
      "Yes, safety is our top priority at Sanco Toys. All of our products undergo rigorous testing to meet and exceed safety standards set by regulatory agencies. We use non-toxic materials and adhere to strict quality control measures to ensure the safety of children while playing with our toys.",
  },
  {
    question: "Do you offer any warranties or guarantees on your products?",
    answer:
      "Yes, we stand behind the quality of our products. Sanco Toys offers a [insert warranty duration] warranty on all purchases. If you encounter any issues with your toy, please contact our customer service team for assistance.",
  },
  {
    question: "How can I clean and maintain Sanco Toys products?",
    answer:
      "To clean our toys, we recommend using mild soap and water. Avoid harsh chemicals or abrasive cleaners, as they may damage the materials. For specific care instructions, please refer to the product packaging or contact our customer service team.",
  },
  {
    question: "Are Sanco Toys products eco-friendly?",
    answer:
      "Yes, we are committed to sustainability and minimizing our environmental impact. Whenever possible, we use eco-friendly materials and packaging in the production of our toys. We strive to create products that are both safe for children and gentle on the planet.",
  },
  {
    question: "Can Sanco Toys products be used in educational settings, such as schools or daycare centers?",
    answer:
      "Yes, many of our toys are suitable for use in educational settings. Teachers and childcare providers appreciate the educational value and durability of our products, which can enhance learning experiences in classrooms, daycare centers, and homeschool environments.",
  },
];

// Define a set of tailwind border color classes
const borderColors = [
  'border-red-400',
  'border-yellow-400',
  'border-green-400',
  'border-blue-400',
  'border-purple-400',
];

function FAQItem({ faq, isOpen, onToggle, borderColorClass }) {
  const borderFullClass = isOpen ? `border-2 ${borderColorClass}` : 'border-0';

  return (
    <div
      className={`relative rounded-xl mb-4 bg-white shadow-md transition-all duration-500 ease-in-out border-l-4 ${borderColorClass} ${borderFullClass}`}
    >
      <button
        onClick={onToggle}
        className="w-full flex justify-between items-center px-6 py-4 text-left"
      >
        <span className="text-lg font-semibold text-gray-800 normal-font">{faq.question}</span>
        <span className="text-gray-500 transition-transform duration-300">
          {isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </span>
      </button>

      <div
        className={`px-6 overflow-hidden transition-all duration-500 ease-in-out transform ${isOpen
            ? 'max-h-[500px] py-2 opacity-100 translate-y-0'
            : 'max-h-0 opacity-0 translate-y-5'
          }`}
      >
        <p className="text-gray-600 text-base leading-relaxed">{faq.answer}</p>
      </div>
    </div>
  );
}




export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  return (
    <section className="max-w-7xl mx-auto px-4 py-10  w-full" id="faq" >
      <h2 className="text-3xl font-bold text-center text-blue-400 mb-10 bg-blue-100 rounded-md ">
        <TypeAnimation
        sequence={[
          'Frequently Asked Questions', // text
          2000, // wait 2 sec
          
        ]}
        wrapper="span"
        speed={20}
        repeat={Infinity}
        cursor={false}
      />
      </h2>

      <div className="flex flex-col md:flex-row gap-10 items-start ">
        {/* Image section */}
        <div className="w-full md:w-1/2 flex justify-center ">
          <div className="animate-fade-in-up duration-1000 ease-out">
            <img
              src="/FAQ.jpg"
              alt="FAQ Illustration"
              className="max-w-full h-110 rounded-lg shadow-lg hover:scale-105 transition-transform duration-500"
            />
          </div>
        </div>


        {/* FAQ list */}
        <div className="w-full md:w-1/2 normal-font">
        
          {faqs.map((faq, index) => (
            <FAQItem
              key={index}
              faq={faq}
              isOpen={openIndex === index}
              onToggle={() => toggleFAQ(index)}
              borderColorClass={borderColors[index % borderColors.length]}
            />
          ))}
          
        </div>
      </div>
    </section>
  );
}

