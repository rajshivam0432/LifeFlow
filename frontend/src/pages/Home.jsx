// import React from 'react';
import FAQ from "../Components/FAQ";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="bg-gray-100 min-h-screen flex flex-col">
      {/* Header will be included via Layout */}
      <section className="bg-[#E63946] text-white text-center py-16">
        <h1 className="text-4xl font-bold">
          Welcome to the Blood Donation Management System
        </h1>
        <p className="mt-4 text-xl">
          Save lives by donating blood. Join the cause today!
        </p>
      
      </section>

      {/* Introduction Section */}
      <section className="text-center py-16 px-6 bg-white">
        <h2 className="text-3xl font-bold text-[#E63946]">Why Donate Blood?</h2>
        <p className="mt-4 text-lg max-w-3xl mx-auto text-gray-700">
          Blood donation is a vital act that helps save millions of lives each
          year. By donating blood, you can make a life-changing difference for
          someone in need. Whether its for a patient undergoing surgery or
          someone suffering from an illness, your donation matters.
        </p>
        <img
          src="https://images.pexels.com/photos/6823567/pexels-photo-6823567.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
          alt="Blood Donation"
          className="w-full h-64 mt-6 rounded-lg shadow-lg object-cover"
        />
      </section>

      {/* FAQ Section */}
      <section className="bg-gray-100 py-16 px-6">
        <h2 className="text-3xl font-bold text-[#E63946] text-center">
          Frequently Asked Questions
        </h2>
        <FAQ />
      </section>
    </div>
  );
}

export default Home;
