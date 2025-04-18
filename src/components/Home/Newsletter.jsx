import React, { useState } from 'react';
// import img from "../../assets/newsletter.jpg";
import { toast } from 'react-toastify';
import bannerImg from '../../assets/home-banner3.jpg';


const Newsletter = () => {
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    toast.success('Thank you for subscribing to our newsletter.');
    setEmail('');
  };

  const img = "https://i.ibb.co.com/Mxr01wKJ/Emails-amico.jpg";
  const bgImg = "https://i.ibb.co.com/Y7nz5MFY/multiracial-medical-team.jpg";
  
  return (
    <div>
      {/* Newsletter Subscription */}
      <section className="py-16 bg-fixed  text-white bg-[url('/../../assets/home-banner3.jpg')] 
    bg-cover bg-center bg-no-repeat"
    style={{ backgroundImage: `url(${bannerImg})` }}
    
    >
        <div className="flex flex-col md:flex-row items-center justify-center mx-auto gap-8 w-[90%] container py-12 dark:bg-gray-900 bg-green-950 bg-opacity-70 dark:bg-opacity-70 rounded-lg">
          {/* Left Image with AOS */}
          <div
            data-aos="fade-right"
            data-aos-duration="1000"
            className=""
          >
            <img
              src={img}
              alt="Newsletter Subscription"
              className="w-52 md:w-64 h-auto rounded-lg shadow-lg"
            />
          </div>

          {/* Right Content with AOS */}
          <div
            className="w-[90%] sm:w-[70%] md:w-[40%]"
            data-aos="fade-left"
            data-aos-duration="1000"
          >
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-6 text-center md:text-left">
              Stay Updated with Our Latest News
            </h2>
            <p className="text-sm md:text-base mb-6 text-center md:text-left">
              Subscribe to our newsletter to receive the latest updates, promotions,
              and exclusive content directly to your inbox.
            </p>

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
                className="px-4 py-2 bg-yellow-700 text-white rounded-r-lg transform transition-all duration-300 ease-in-out hover:bg-yellow-800 hover:scale-105 hover:shadow-lg focus:outline-none"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Newsletter;
