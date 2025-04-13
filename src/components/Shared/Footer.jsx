import React from 'react';
import { FaFacebookF,  FaGithub,  FaEnvelope, FaPhone, FaLinkedinIn } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import logo from '../../assets/mc2.png'

const Footer = () => {
    return (
        <footer className=" bg-black  pt-10 container mx-auto pb-4">

            <div className="container mx-auto w-[90%] flex flex-col md:flex-row justify-between text-center md:text-left">

                {/* Site Name */}
                <div className="md:w-[35%]">
                    <h2 className="font-bold text-white mb-3 text-xl md:text-2xl">MediCamp</h2>
                    <p className="text-xs md:text-sm opacity-80 mt-2 w-[90%] sm:w-[80%] md:w-[70%] mx-auto md:mx-0 text-white">
                        MediCamp, built on the MERN stack, streamlines medical camp management by simplifying scheduling and participant registration for organizers and attendees.
                    </p>

                </div>


                {/* Links Section */}
                <div className="mt-6 md:mt-0 md:w-[35%] mx-auto md:mx-0">
                    <h3 className="font-bold text-white mb-3 text-xl md:text-2xl">Quick Links</h3>
                    <ul className="space-y-0.5 mr-1">
                        <li><Link to="/" className="text-white transition duration-300">Home</Link></li>
                        <li><Link to="/allCamps" className="text-white hover:text-yellow-600 transition duration-300">All Camps</Link></li>
                        <li><Link to="/contact" className="text-white hover:text-yellow-600 transition duration-300">Contact Us</Link></li>
                        <li><Link to="/about" className="text-white hover:text-yellow-600 transition duration-300">About Us</Link></li>

                    </ul>
                </div>

                {/* Social Icons */}
                <div className="mt-6 md:mt-0">
                    <h3 className="font-bold text-white mb-3 text-xl md:text-2xl -ml-1">Contact Us</h3>
                    <div className='flex flex-col items-center'>
                        <div className="flex items-center space-x-2">
                            <FaEnvelope className="text-xl text-white" />
                            <span><a href="mailto:info@visatrek.com" className="text-sky-400 hover:underline">info@medicamp.com</a></span>
                        </div>
                        <div className="flex items-center space-x-1 mb-4">
                            <FaPhone className="text-xl text-white" />
                            <span><a href="tel:+8801722165790" className="text-sky-400 hover:underline">+880 1723 165 770</a></span>
                        </div>
                    </div>
                    {/* Social Icons ..............................*/}
                    <div className="flex justify-center md:justify-start space-x-2 mt-1">
                        <a
                            href="https://facebook.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 rounded-full border bg-opacity-20 hover:text-yellow-700 transition"
                        >
                            <FaFacebookF className="text-white hover:text-yellow-700" size={18} />
                        </a>
                        <a
                            href="https://github.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 rounded-full border bg-opacity-20 hover:text-yellow-700 transition"
                        >
                            <FaGithub className="text-white hover:text-yellow-700" size={18} />
                        </a>
                        <a
                            href="https://linkedin.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 rounded-full border bg-opacity-20 hover:text-yellow-700 transition"
                        >
                            <FaLinkedinIn className="text-white hover:text-yellow-700" size={18} />
                        </a>
                    </div>


                </div>



            </div>

            {/* Divider */}
            <div className="border-t border-white w-[90%] mx-auto my-6"></div>

            {/* Copyright */}
            <div className="mt-8 text-center text-sm text-gray-200 opacity-60">
                &copy; {new Date().getFullYear()} MediCamp. All rights reserved.
            </div>
        </footer>
    );
};

export default Footer;
