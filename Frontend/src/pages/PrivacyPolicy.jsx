import React from 'react';

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-gray-50 px-6 py-16">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-5xl font-bold text-gray-800 mb-10 text-center">Privacy Policy</h1>

        <div className="text-lg text-gray-700 leading-8 space-y-6">
          <p>
            At <span className="font-semibold text-primary">SancoToys</span>, we value your privacy and are committed to protecting your personal information. This policy explains how we collect, use, and safeguard your data.
          </p>

          <h2 className="text-3xl font-semibold text-gray-800 mb-4">1. Information We Collect</h2>
          <p>
            We may collect your name, contact details, shipping address, payment information, order history, and device/browser data to help process orders and improve your shopping experience.
          </p>

          <h2 className="text-3xl font-semibold text-gray-800 mb-4">2. How We Use Your Information</h2>
          <p>
            Your information is used to process orders, personalize your experience, communicate with you, and improve our services. We do not sell your personal data.
          </p>

          <h2 className="text-3xl font-semibold text-gray-800 mb-4">3. Data Security</h2>
          <p>
            We use secure servers, encryption, and limited access to protect your data. Payment processing is handled through trusted third-party gateways.
          </p>

          <h2 className="text-3xl font-semibold text-gray-800 mb-4">4. Cookies & Tracking</h2>
          <p>
            We use cookies to analyze traffic, enhance functionality, and personalize content. You can manage your cookie preferences in your browser settings.
          </p>

          <h2 className="text-3xl font-semibold text-gray-800 mb-4">5. Your Rights</h2>
          <p>
            You have the right to access, correct, or delete your personal information. To exercise these rights, please contact us at <a href="mailto:info@sancotoys.com" className="text-blue-600 underline">info@sancotoys.com</a>.
          </p>

          <h2 className="text-3xl font-semibold text-gray-800 mb-4">6. Policy Updates</h2>
          <p>
            We may update this Privacy Policy periodically. Please check this page regularly to stay informed.
          </p>

          <h2 className="text-3xl font-semibold text-gray-800 mb-4">7. Contact Us</h2>
          <p>
            If you have any questions about this Privacy Policy or how we handle your data, feel free to reach out at <a href="mailto:info@sancotoys.com" className="text-blue-600 underline">info@sancotoys.com</a>.
          </p>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
