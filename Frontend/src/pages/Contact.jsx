import React from 'react'

function Contact() {
  return (
    <div className="min-h-screen bg-gray-50 px-6 py-16">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-5xl font-bold text-gray-800 mb-10 text-center">Contact Us</h1>

        <div className="text-lg text-gray-700 leading-8 space-y-6">
  <p>
    We'd love to hear from you! Whether you have a question about our toys, need assistance,
    or just want to share your feedback, feel free to reach out.
  </p>

  <div className="space-y-4">
    <p><strong>Email:</strong> <a href="mailto:info@sancotoys.com" className="text-blue-600 hover:underline">info@sancotoys.com</a></p>
    <p><strong>Phone:</strong> <a href="tel:+918446090922" className="text-blue-600 hover:underline">8446090922</a></p>
    <p><strong>Address:</strong> Plot No.A, 106 - 107, 1st Floor, H-Block, MIDC, Pimpri, Pune, Maharashtra, India - 411018</p>
  </div>

</div>


        <div className="mt-16">
          <h2 className="text-3xl font-semibold text-gray-800 mb-6">Visit Us</h2>
          <div className="w-full h-[400px] rounded-xl overflow-hidden shadow-md">
            <iframe
              title="Sanco Toys India Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3782.314631373901!2d73.8014473!3d18.6429455!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2b93706031c95%3A0x5b32aafd8ca27dfb!2sSanco%20Toys%20India%20Pvt.Ltd!5e0!3m2!1sen!2sin!4v1712072343941!5m2!1sen!2sin"
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
  )
}

export default Contact