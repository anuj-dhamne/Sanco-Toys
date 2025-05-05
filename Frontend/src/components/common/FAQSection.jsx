import React, { useState } from 'react'
import { ChevronDown, ChevronUp } from 'lucide-react' // Make sure lucide-react is installed

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
]

function FAQItem({ faq, isOpen, onToggle }) {
  return (
    <div className="border border-gray-200 rounded-xl mb-4 bg-white shadow-md transition-all duration-300 ease-in-out">
      <button
        onClick={onToggle}
        className="w-full flex justify-between items-center px-6 py-4 text-left hover:bg-gray-50 focus:outline-none"
      >
        <span className="text-lg font-semibold text-gray-800">{faq.question}</span>
        <span className="text-gray-500 transition-transform duration-300">
          {isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </span>
      </button>
      <div
        className={`px-6 overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? 'max-h-[500px] py-2 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <p className="text-gray-600 text-base leading-relaxed">
          {faq.answer}
        </p>
      </div>
    </div>
  )
}

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState(null)

  const toggleFAQ = (index) => {
    setOpenIndex((prevIndex) => (prevIndex === index ? null : index))
  }

  return (
    <section className="max-w-4xl mx-auto px-4 py-12" id="faq">
      <h2 className="text-3xl font-bold text-center text-gray-900 mb-10">
        Frequently Asked Questions
      </h2>
      {faqs.map((faq, index) => (
        <FAQItem
          key={index}
          faq={faq}
          isOpen={openIndex === index}
          onToggle={() => toggleFAQ(index)}
        />
      ))}
    </section>
  )
}
