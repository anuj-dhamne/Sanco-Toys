import React from 'react';

const CustomerCare = () => {
  return (
    <div className="min-h-screen bg-gray-50 px-6 py-16">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-5xl font-bold text-gray-800 mb-10 text-center">Customer Care</h1>

        <div className="text-lg text-gray-700 leading-8 space-y-6">
          <p>
            At <span className="font-semibold text-primary">SancoToys</span>, we prioritize your satisfaction and aim to
            provide a seamless shopping experience from start to finish.
          </p>

          <h2 className="text-3xl font-semibold text-gray-800 mb-4">Need Help?</h2>
          <p>
            If you have any questions about your order, shipping, returns, or product information,
            our dedicated customer care team is here to help.
          </p>

          <h2 className="text-3xl font-semibold text-gray-800 mb-4">Contact Information</h2>
          <p><strong>Phone:</strong> +91 8446090922</p>
          <p><strong>Email:</strong> info@sancotoys.com</p>
          <p><strong>Working Hours:</strong> Monday - Saturday, 10 AM to 6 PM</p>

          <h2 className="text-3xl font-semibold text-gray-800 mb-4">Returns & Refunds</h2>
          <p>
            If you’re not completely satisfied with your purchase, you can return the product within 7 days of delivery.
            Please ensure the product is unused and in its original packaging. Refunds will be processed within 3–5 business days.
          </p>

          <h2 className="text-3xl font-semibold text-gray-800 mb-4">Feedback</h2>
          <p>
            We love hearing from you! Your feedback helps us improve our products and services. Feel free to drop us a message anytime.
          </p>
        </div>
      </div>
    </div>
  );
};

export default CustomerCare;
