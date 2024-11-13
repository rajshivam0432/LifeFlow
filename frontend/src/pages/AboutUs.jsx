import React from 'react';

function AboutUs() {
  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Hero Section */}
      <section className="relative">
      <div className="overflow-hidden h-[400px] relative">
  <img
    src="https://images.pexels.com/photos/6519932/pexels-photo-6519932.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
    alt="Blood Donation"
    className="w-full object-cover opacity-80 transform -translate-y-[50px]"
  />
</div>


        <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white px-4">
          <h1 className="text-5xl font-bold mb-4">About Us</h1>
          <p className="text-xl max-w-2xl">
            Dedicated to saving lives by ensuring a reliable and efficient blood donation network.
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="px-8 py-16 bg-white text-gray-800 text-center">
        <h2 className="text-4xl font-semibold text-red-500 mb-6">Our Mission</h2>
        <p className="text-lg max-w-4xl mx-auto leading-relaxed">
          Our mission is to bridge the gap between blood donors and those in urgent need. We aim to create a seamless platform where donors and hospitals can connect effortlessly, ensuring that everyone has access to life-saving resources in times of need. Together, we believe that we can make a difference in the lives of countless individuals.
        </p>
      </section>

      {/* What We Do Section */}
      <section className="bg-gray-100 py-16 px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-semibold text-red-500">What We Do</h2>
        </div>
        <div className="flex flex-wrap justify-center gap-10 max-w-6xl mx-auto">
          <div className="bg-white p-6 rounded-lg shadow-md max-w-sm">
            <h3 className="text-xl font-bold text-gray-700 mb-2">Connect Donors and Hospitals</h3>
            <p className="text-gray-600">
              We make it easy for hospitals to find registered blood donors through our user-friendly platform.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md max-w-sm">
            <h3 className="text-xl font-bold text-gray-700 mb-2">Emergency Blood Requests</h3>
            <p className="text-gray-600">
              Our real-time system enables hospitals to request specific blood types urgently when time is critical.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md max-w-sm">
            <h3 className="text-xl font-bold text-gray-700 mb-2">Blood Inventory Management</h3>
            <p className="text-gray-600">
              We help hospitals manage and track blood inventory efficiently, reducing shortages and waste.
            </p>
          </div>
        </div>
      </section>

      {/* Our Team Section */}
      <section className="px-8 py-16 bg-white text-center">
        <h2 className="text-4xl font-semibold text-red-500 mb-6">Meet Our Team</h2>
        <p className="text-lg max-w-2xl mx-auto mb-12 text-gray-600">
          Our team is composed of passionate individuals committed to creating a difference in healthcare through technology.
        </p>
        <div className="flex flex-wrap justify-center gap-8 max-w-4xl mx-auto">
          <div className="bg-gray-100 p-6 rounded-lg shadow-md max-w-xs text-center">
            <img
              src="https://via.placeholder.com/150"
              alt="Team Member"
              className="w-24 h-24 rounded-full mx-auto mb-4"
            />
            <h3 className="text-xl font-semibold text-gray-700">Member</h3>
            <p className="text-gray-500">Designation</p>
          </div>
          <div className="bg-gray-100 p-6 rounded-lg shadow-md max-w-xs text-center">
            <img
              src="https://via.placeholder.com/150"
              alt="Team Member"
              className="w-24 h-24 rounded-full mx-auto mb-4"
            />
            <h3 className="text-xl font-semibold text-gray-700">Member</h3>
            <p className="text-gray-500">Designation</p>
          </div>
          <div className="bg-gray-100 p-6 rounded-lg shadow-md max-w-xs text-center">
            <img
              src="https://via.placeholder.com/150"
              alt="Team Member"
              className="w-24 h-24 rounded-full mx-auto mb-4"
            />
            <h3 className="text-xl font-semibold text-gray-700">Member</h3>
            <p className="text-gray-500">Designation</p>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-red-500 text-white text-center">
        <h2 className="text-3xl font-semibold mb-4">Join Us in Saving Lives</h2>
        <p className="mb-8 text-lg max-w-3xl mx-auto">
          Be a part of our mission to make blood donation more accessible. Whether you're a donor or a hospital, together we can create a world where everyone has access to life-saving resources.
        </p>
        <a href="/register" className="bg-white text-red-500 font-semibold py-3 px-6 rounded-full shadow-lg hover:bg-gray-100 transition duration-300">
          Get Involved
        </a>
      </section>
    </div>
  );
}

export default AboutUs;
