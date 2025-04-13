import React, { useState } from 'react';
import img from "../../assets/newsletter.jpg";
import { toast } from 'react-toastify';

const Newsletter = () => {
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent default form submission behavior

      // Simulate email submission here
      toast.success('Thank you for subscribing to our newsletter.');
      setEmail(''); // Clear the email input field
  };
  return (
    <div>
      {/* Newsletter Subscription */}
      <section className="py-12 bg-green-800 text-white">
        <div className="flex flex-col md:flex-row items-center justify-center mx-auto gap-8 w-[90%] container ">
          <div className="">
            <img
              src={img} // Replace with your image URL
              alt="Newsletter Subscription"
              className="w-52 md:w-72 h-auto rounded-lg shadow-lg"
            />
          </div>
          <div className="w-[90%] sm:w-[70%] md:w-[40%] ">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-6 text-center md:text-left">Stay Updated with Our Latest News</h2>
            <p className="text-sm md:text-base mb-6 text-center md:text-left">Subscribe to our newsletter to receive the latest updates, promotions, and exclusive content directly to your inbox.</p>

            <form onSubmit={handleSubmit} className="flex justify-center">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
            className="p-2 rounded-l-lg text-black w-full"
          />
          <button
            type="submit"
            className="px-4 py-2 bg-yellow-600 text-white rounded-r-lg transform transition-all duration-300 ease-in-out hover:bg-yellow-700 hover:scale-105 hover:shadow-lg focus:outline-none"
          >
            Subscribe
          </button>
        </form>
            {/* <div className="flex">
              <input
                type="email"
                value={email}
                placeholder="Enter your email"
                className="p-2 rounded-l-lg text-black w-full"
              />
              <button className="px-4 py-2 bg-yellow-600 text-white rounded-r-lg transform transition-all duration-300 ease-in-out hover:bg-yellow-700 hover:scale-105 hover:shadow-lg focus:outline-none">
                Subscribe
              </button>
            </div> */}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Newsletter;
