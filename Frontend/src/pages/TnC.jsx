import React from 'react';

const TnC = () => {
  return (
    <div className="min-h-screen bg-gray-50 px-6 py-16">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-5xl font-bold text-gray-800 mb-10 text-center">Terms & Conditions</h1>

        <div className="text-lg text-gray-700 leading-8 space-y-6">
          <p>
            Welcome to <span className="font-semibold text-primary">SancoToys</span>. By using our website and services, you agree to comply with and be bound by the following terms and conditions. Please read them carefully before using our site.
          </p>

          <h2 className="text-3xl font-semibold text-gray-800 mb-4">1. Use of Website</h2>
          <p>
            You must be at least 18 years old or have parental consent to use this site. All information you provide must be accurate, current, and complete.
          </p>

          <h2 className="text-3xl font-semibold text-gray-800 mb-4">2. Product Information</h2>
          <p>
            We strive to ensure that all product descriptions, prices, and images are accurate. However, we do not guarantee that product details are error-free or complete at all times.
          </p>

          <h2 className="text-3xl font-semibold text-gray-800 mb-4">3. Orders & Payment</h2>
          <p>
            All orders are subject to availability and confirmation. We reserve the right to refuse or cancel orders at our discretion. Payments are processed securely through trusted payment gateways.
          </p>

          <h2 className="text-3xl font-semibold text-gray-800 mb-4">4. Shipping & Delivery</h2>
          <p>
            Shipping times and charges vary based on your location. We are not liable for delays due to external factors (e.g., courier delays, natural disasters).
          </p>

          <h2 className="text-3xl font-semibold text-gray-800 mb-4">5. Returns & Refunds</h2>
          <p>
            Our return policy allows eligible items to be returned within 7 days of delivery. Returned products must be unused and in original packaging. Please review our full return policy for details.
          </p>

          <h2 className="text-3xl font-semibold text-gray-800 mb-4">6. Intellectual Property</h2>
          <p>
            All content on this website — including text, images, graphics, and logos — is the property of SancoToys and protected by intellectual property laws. You may not copy, modify, or distribute any content without permission.
          </p>

          <h2 className="text-3xl font-semibold text-gray-800 mb-4">7. Limitation of Liability</h2>
          <p>
            SancoToys shall not be liable for any direct or indirect damages arising from your use of our website or products. Use our services at your own risk.
          </p>

          <h2 className="text-3xl font-semibold text-gray-800 mb-4">8. Changes to Terms</h2>
          <p>
            We reserve the right to modify these terms at any time. Continued use of the site after changes are posted constitutes your acceptance of those changes.
          </p>

          <h2 className="text-3xl font-semibold text-gray-800 mb-4">9. Contact Us</h2>
          <p>
            If you have any questions regarding these terms, please contact us at <a href="mailto:info@sancotoys.com" className="text-blue-600 underline">info@sancotoys.com</a>.
          </p>
        </div>
      </div>
    </div>
  );
};

export default TnC;
