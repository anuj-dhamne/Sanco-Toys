import React from 'react';
import {
  Facebook,
  Instagram,
  Twitter,
  Linkedin
} from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-100 ">
      {/* Top section */}
      <div className="max-w-7xl mx-auto px-4 py-10 grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        {/* Logo Section */}
        <div className="flex flex-col items-start space-y-4">
        <img
    src="/sanco_logo.png"
    alt="Sanco Toys Logo"
    className="h-16 w-auto transform transition duration-300 hover:scale-110 "
  />
          <p className="text-sm text-gray-900 font-bold normal-font">
          Where Imagination Comes to Life.
          </p>
        </div>

        {/* Links + Socials */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          <div className="space-y-2">
            <h4 className="font-semibold text-black">Company</h4>
            <a href="/about" className="text-yellow-500 hover:font-bold block">About Us</a>
            <a href="/contact" className="text-red-500 hover:font-bold block">Contact Us</a>
            <a href="/contact" className="text-green-500 hover:font-bold block">Careers</a>
            <a href="/certification" className="text-blue-500 hover:font-bold block">Certifications</a>
          </div>

          <div className="space-y-2 ">
            <h4 className="font-semibold text-black">Support</h4>
            <a href="/customer-care" className="text-red-500 hover:font-bold block">Customer Care</a>
            <a href="#faq" className="text-purple-500 hover:font-bold block">FAQs</a>
            {/* <a href="/" className="hover:text-blue-500 block">Shipping</a>
            <a href="/" className="hover:text-blue-500 block">Returns</a> */}
          </div>

          <div className="space-y-2">
            <h4 className="font-semibold text-black">Legal</h4>
            <a href="/privacy-policies" className="text-yellow-500 hover:font-bold block">Privacy Policy</a>
            <a href="/terms&conditions" className="text-blue-500 hover:font-bold block">Terms & Conditions</a>
            <div className="flex space-x-4 pt-2 ">
              <a href="https://www.instagram.com" target="_blank" rel="noreferrer">
                <Instagram className="w-5 h-5 hover:text-pink-500 hover:w-6 h-6" />
              </a>
              <a href="https://www.facebook.com" target="_blank" rel="noreferrer">
                <Facebook className="w-5 h-5 hover:text-blue-600 hover:w-6 h-6" />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noreferrer">
                <Twitter className="w-5 h-5 hover:text-sky-500 hover:w-6 h-6" />
              </a>
              <a href="https://www.linkedin.com" target="_blank" rel="noreferrer">
                <Linkedin className="w-5 h-5 hover:text-blue-700 hover:w-6 h-6" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom line */}
      <div className="border-t border-gray-300 py-4 text-center text-sm text-gray-600 hover:font-bold">
        &copy; Sanco Toys 2024-2025. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
