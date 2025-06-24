import React from 'react';
import { useNavigate } from 'react-router-dom';
import { InfiniteMovingCards } from '../ui/infinite-moving-cards.jsx'; // adjust the path if needed

const testimonials = [
  {
    name: "Jayesh Thakkar",
    role: "Verified Buyer",
    quote:
      "We've been carrying your toy trucks for several years now, and they're consistently a top seller. The quality is exceptional, and the variety of models keeps customers coming back for more. Your company has been a fantastic partner to work with.",
    borderColor: "border-green-500",
    image:'/man.jpg'
  },
  {
    name: "Rajashree Pednekar",
    role: "Parent",
    quote:
      "These toy trucks are the coolest! I love playing with them in the sandbox and pretending I'm a big construction worker. They're really strong and never break.",
    borderColor: "border-yellow-500",
    image:'/rajashree.jpg'
  },
  {
    name: "Sudhir Mahajan",
    role: "Toy Collector",
    quote:
      "As a parent, I'm always looking for toys that spark my child's imagination while also being safe and durable. Your toy trucks have exceeded my expectations on all fronts! My kids spend hours playing with them, and they’ve held up amazingly through countless adventures.",
    borderColor: "border-blue-500",
    image:'/man2.jpg'
  },
  {
    name: "Jui More",
    role: "Toy Collector",
    quote:
          "Your toy trucks are a valuable educational tool for young children. They help develop fine motor skills, spatial awareness, and imaginative play. We appreciate the attention to detail in the design, which makes them engaging for kids of all ages."                ,
    borderColor: "border-purple-500",
    image:'/jui.jpg'
  },
];

const TestimonialSection = () => {
  const navigate = useNavigate();

  return (
    <section className="w-full px-4 py-12 bg-white">
      <div className="w-[96%] mx-auto">
        {/* Heading */}
        <h2 className="text-3xl font-bold text-center text-orange-900 mb-10">
          What Our Happy Customers Say
        </h2>

        {/* Testimonial Carousel */}
        <InfiniteMovingCards items={testimonials} direction="left" speed="normal" />

        {/* Feedback Button */}
        {/* <div className="flex justify-end mt-8">
          <button
            className="bg-black text-white px-5 py-2 rounded-md hover:bg-gray-800 transition-all"
            onClick={() => navigate('/feedback-form')}
          >
            Give Your Feedback
          </button>
        </div> */}
      </div>
    </section>
  );
};

export default TestimonialSection;
