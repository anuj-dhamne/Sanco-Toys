import React from 'react';
import { PhoneCall, Mail, MapPin } from 'lucide-react';

const Carrers = ({
  heading = 'Careers',
  email = 'info@sancotoys.com',
  phone = '8446090922',
  address = 'Plot No.A, 106 - 107, 1st Floor, H-Block, MIDC, Pimpri, Pune, Maharashtra, India - 411018',
  mapSrc = 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3782.314631373901!2d73.8014473!3d18.6429455!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2b93706031c95%3A0x5b32aafd8ca27dfb!2sSanco%20Toys%20India%20Pvt.Ltd!5e0!3m2!1sen!2sin!4v1712072343941!5m2!1sen!2sin',
}) => {
  const contactDetails = [
    {
      label: 'Email',
      value: email,
      icon: <Mail className="w-5 h-5 text-blue-600" />,
      href: `mailto:${email}`,
    },
    {
      label: 'Phone',
      value: phone,
      icon: <PhoneCall className="w-5 h-5 text-blue-600" />,
      href: `tel:${phone}`,
    },
    {
      label: 'Address',
      value: address,
      icon: <MapPin className="w-5 h-5 text-blue-600" />,
    },
  ];

  return (
    <div className="min-h-screen bg-white px-6 py-16 animate-fade-in-up">
      <div className="max-w-6xl mx-auto">
        {/* Heading */}
        <h1 className="text-5xl font-bold text-red-500 mb-10 text-center flex justify-center items-center gap-3 animate-fade-in-up delay-[200ms]">
          <PhoneCall className="w-10 h-10 text-red-500" />
          {heading}
        </h1>

        {/* Description */}
        <p className="text-lg text-yellow-500 text-center leading-8 max-w-2xl mx-auto mb-10 animate-fade-in-up delay-[300ms]">
          For making career in Sanco Toys, please free to reach out.
        </p>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-fade-in-up delay-[400ms]">
          {contactDetails.map((item, index) => (
            <div
              key={index}
              className="bg-gray-100 p-6 rounded-xl shadow hover:shadow-md transition border-l-4 border-yellow-500"
            >
              <div className="flex items-center gap-2 mb-3">
                {item.icon}
                <h2 className="text-lg font-semibold text-yellow-600">{item.label}</h2>
              </div>
              <p className="text-blue-600 break-words">
                {item.href ? (
                  <a href={item.href} className="text-blue-600 hover:underline">
                    {item.value}
                  </a>
                ) : (
                  item.value
                )}
              </p>
            </div>
          ))}
        </div>

        {/* Map */}
        <div className="mt-16 animate-fade-in-up delay-[600ms]">
          <h2 className="text-3xl font-semibold text-green-500 mb-6">Visit Us</h2>
          <div className="w-full h-[400px] rounded-xl overflow-hidden shadow-md">
            <iframe
              title="Company Location"
              src={mapSrc}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Carrers;
