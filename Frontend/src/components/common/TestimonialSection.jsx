import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TypeAnimation } from 'react-type-animation';
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
      "Your toy trucks are a valuable educational tool for young children. They help develop fine motor skills, spatial awareness, and imaginative play. We appreciate the attention to detail in the design, which makes them engaging for kids of all ages.",
    borderColor: "border-purple-500",
    image:'/jui.jpg'
  },
];

const TestimonialSection = () => {
  const navigate = useNavigate();
  const headingRef = useRef(null);
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setAnimate(true);
          observer.unobserve(entry.target); // Run only once
        }
      },
      { threshold: 0.5 } // triggers when 50% visible
    );

    if (headingRef.current) {
      observer.observe(headingRef.current);
    }

    return () => {
      if (headingRef.current) observer.unobserve(headingRef.current);
    };
  }, []);

  return (
    <section className="px-4 py-12 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Heading */}
        <h2
          ref={headingRef}
          className="text-3xl font-bold text-center text-orange-900 mb-10 bg-orange-100 rounded-md"
        >
          {animate ? (
            <TypeAnimation
              sequence={[
                'What our Happy Customers Say', // text
                2000, // pause
              ]}
              wrapper="span"
              speed={20}
              repeat={0} // play only once
              cursor={false}
            />
          ) : (
            <span className="opacity-0">What our Happy Customers Say</span> // placeholder to keep space
          )}
        </h2>

        {/* Testimonial Carousel */}
        <InfiniteMovingCards items={testimonials} direction="left" speed="normal" />
      </div>
    </section>
  );
};

export default TestimonialSection;
