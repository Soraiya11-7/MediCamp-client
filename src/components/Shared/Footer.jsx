import React from 'react';
import { FaFacebookF, FaTwitter, FaInstagram, FaGithub, FaFacebook, FaLinkedin, FaEnvelope, FaPhone } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import logo from '../../assets/mc2.png'

const Footer = () => {
    return (
        <footer className="bg-gray-800 text-white pt-10">
            <div className=" mx-auto text-center w-[80%] pb-10">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 p-2">
                    {/* About Section */}
                    <div className="text-center md:text-left ">
                        <div className='flex items-center justify-center md:justify-start gap-1 mb-4'>
                        <div className="h-8 w-10  flex justify-center items-center rounded-full px-1 " >
                            <img className=" h-full w-full  rounded-full object-cover overflow-hidden" src={logo}
                                alt="image"
                            />
                        </div>
                        <h2 className="text-xl font-semibold text-center md:text-left">MediCamp</h2>
                        </div>
                        <p className="text-gray-400 mx-auto text-sm sm:text-base w-full sm:w-[60%] md:w-[95%] md:mx-0">
                        MediCamp, built on the MERN stack, streamlines medical camp management by simplifying scheduling and participant registration for organizers and attendees.
                        </p>
                    </div>


                    {/* Links Section */}
                    <div className="text-center ">
                        <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
                        <ul>
                            <li><Link to="/" className="text-gray-400 hover:text-white transition duration-300">Home</Link></li>
                            <li><Link to="/allCamps" className="text-gray-400 hover:text-white transition duration-300">All Camps</Link></li>
                            <li className="text-gray-400 hover:text-white transition duration-300">About</li>
                            <li className="text-gray-400 hover:text-white transition duration-300">Contact</li>
                        </ul>
                    </div>
                 <div>
                 <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
                 <div className='flex flex-col items-center'>
                 <div className="flex items-center space-x-2">
                        <FaEnvelope className="text-xl" />
                        <span><a href="mailto:info@visatrek.com" className="text-sky-400 hover:underline">info@medicamp.com</a></span>
                    </div>
                    <div className="flex items-center space-x-2 mb-4">
                        <FaPhone className="text-xl" />
                        <span><a href="tel:+8801722165790" className="text-sky-400 hover:underline">+880 1723 165 770</a></span>
                    </div>
                 </div>
                     {/* Social Icons ..............................*/}
                     <div className="flex justify-center gap-0.5 sm:gap-3">
                        <button
                            onClick={() => window.open('https://www.facebook.com/', '_blank')}
                            className="btn btn-circle  hover:bg-green-800 transition-all border "
                        >
                            <FaFacebook className="text-xl" />
                        </button>
                        <button
                            onClick={() => window.open('https://github.com/', '_blank')}
                            className="btn btn-circle  hover:bg-green-800 transition-all border "
                        >
                            <FaGithub className="text-xl" />
                        </button>
                        <button
                            onClick={() => window.open('https://www.linkedin.com/', '_blank')}
                            className="btn btn-circle  hover:bg-green-800 transition-all border "
                        >
                            <FaLinkedin className="text-xl" />
                        </button>
                    </div>
                 </div>
                   
                </div>

                {/* Footer Bottom Section */}
                <div className="mt-8 border-t border-gray-700 pt-6 text-center">
                    <p className="text-sm text-gray-400">
                        &copy; {new Date().getFullYear()} MediCamp. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
