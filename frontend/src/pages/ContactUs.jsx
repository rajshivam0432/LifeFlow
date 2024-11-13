import React, { useState } from 'react';

function ContactUs() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Message sent successfully!');
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <div className="bg-gray-100 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="flex flex-col lg:flex-row">
          {/* Contact Form */}
          <div className="w-full lg:w-2/3 p-8">
            <h2 className="text-3xl font-semibold text-red-600 mb-6">Get in Touch</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label htmlFor="name" className="block text-gray-700 font-medium">
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                  placeholder="Enter your name"
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="email" className="block text-gray-700 font-medium">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                  placeholder="Enter your email"
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="message" className="block text-gray-700 font-medium">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                  placeholder="Write your message"
                  rows="4"
                  required
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full bg-red-600 text-white py-2 rounded-lg font-semibold hover:bg-red-700"
              >
                Send Message
              </button>
            </form>
          </div>

          {/* Contact Details */}
          <div className="w-full lg:w-1/3 bg-gray-50 p-8 flex flex-col justify-center text-center lg:text-left">
            <h3 className="text-2xl font-semibold text-gray-800 mb-2">Contact Information</h3>
            <p className="text-gray-600 mb-4">We’d love to hear from you! Feel free to reach out via email or phone, or connect with us on social media.</p>
            <div className="mb-4">
              <p className="font-medium text-gray-700">Address</p>
              <p className="text-gray-600">123 Blood Donation Camp, New Delhi, India</p>
            </div>
            <div className="mb-4">
              <p className="font-medium text-gray-700">Phone</p>
              <p className="text-gray-600">+91 (234) 567-8900</p>
            </div>
            <div className="mb-4">
              <p className="font-medium text-gray-700">Email</p>
              <p className="text-gray-600">contact@bloodmanagement.org</p>
            </div>

            {/* Social Media Links */}
            <div className="mt-6 flex justify-center lg:justify-start space-x-4">
              <a href="#" className="text-gray-600 hover:text-red-500">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="#" className="text-gray-600 hover:text-red-500">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="#" className="text-gray-600 hover:text-red-500">
                <i className="fab fa-instagram"></i>
              </a>
              <a href="#" className="text-gray-600 hover:text-red-500">
                <i className="fab fa-linkedin"></i>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ContactUs;
