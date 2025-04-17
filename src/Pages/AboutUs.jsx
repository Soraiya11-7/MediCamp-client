import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import AOS from 'aos';
import 'aos/dist/aos.css';
import {
    FaRegCalendarAlt, FaRegListAlt, FaChartBar,
    FaHandsHelping, FaHeart, FaBullhorn,
    FaMedkit, FaPeopleCarry
} from 'react-icons/fa';

const AboutUs = () => {
    const cardClass = `
    relative group hover:z-10
    before:content-[''] before:absolute before:inset-0
    before:rounded-lg before:bg-transparent
    before:border-r-4 before:border-b-4 before:border-green-800 dark:before:border-yellow-700
    before:transition-all before:duration-300
    group-hover:before:border-r-8 group-hover:before:border-b-8 group-hover:before:translate-x-2 group-hover:before:translate-y-2

    bg-white dark:bg-gray-900 dark:text-white
    rounded-lg shadow-lg p-6 flex flex-col items-center justify-center
    transition duration-300 transform hover:scale-105
    group-hover:blur-sm hover:!blur-none
`;




    const iconClass = 'text-4xl mb-4 text-green-800 dark:text-yellow-600';

    return (
        <>
            <Helmet>
                <title>Medical Camp | About Us</title>
            </Helmet>

            <div className="dark:bg-gray-950 dark:text-white">
                <section className="flex flex-col justify-center items-center w-[90%] mx-auto container py-10" data-aos="fade-up">
                    <div className="text-center">
                        <h1 className="text-2xl md:text-4xl font-bold mb-6">About Us</h1>
                        <p className="mb-6 text-sm md:text-base w-[90%] sm:w-[80%] md:w-[60%] lg:w-[50%] mx-auto">
                            Welcome to the Medical Camp Management System (MCMS), a platform designed to simplify the organization and management of medical camps, making the process smoother and more efficient for both organizers and participants.
                        </p>

                        {/* Mission Section */}
                        <h2 className="text-xl md:text-2xl font-medium mb-4 mt-10 relative inline-block" data-aos="fade-right">
                            Our Mission
                            <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-20 h-[3px] bg-green-800 dark:bg-white"></span>
                        </h2>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-8 group">
                            <div className={cardClass} data-aos="zoom-in">
                                <FaHandsHelping className={iconClass} />
                                <h3 className="text-lg md:text-xl font-semibold mb-2">Efficient Event Management</h3>
                                <p className="text-sm md:text-base text-center">
                                    Provide a seamless and user-friendly solution for medical camp organizers to efficiently manage events.
                                </p>
                            </div>
                            <div className={cardClass} data-aos="zoom-in">
                                <FaRegListAlt className={iconClass} />
                                <h3 className="text-lg md:text-xl font-semibold mb-2">Simplified Registration</h3>
                                <p className="text-sm md:text-base text-center">
                                    Empower participants to easily discover and register for local medical camps.
                                </p>
                            </div>
                            <div className={cardClass} data-aos="zoom-in">
                                <FaBullhorn className={iconClass} />
                                <h3 className="text-lg md:text-xl font-semibold mb-2">Data-Driven Insights</h3>
                                <p className="text-sm md:text-base text-center">
                                    Enhance healthcare outreach by increasing participation and improving management of camps.
                                </p>
                            </div>
                        </div>

                        {/* Vision Section */}
                        <h2 className="text-xl md:text-2xl font-medium mb-4 mt-10 relative inline-block" data-aos="fade-right">
                            Our Vision
                            <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-20 h-[3px] bg-green-800 dark:bg-white"></span>
                        </h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-8 group">
                            <div className={cardClass} data-aos="fade-up">
                                <FaMedkit className={iconClass} />
                                <h3 className="text-lg md:text-xl font-semibold mb-2">Leading the Change</h3>
                                <p className="text-sm md:text-base text-center">
                                    Become the leading platform for medical camp management, revolutionizing how camps are organized.
                                </p>
                            </div>
                            <div className={cardClass} data-aos="fade-up">
                                <FaPeopleCarry className={iconClass} />
                                <h3 className="text-lg md:text-xl font-semibold mb-2">Improving Healthcare Accessibility</h3>
                                <p className="text-sm md:text-base text-center">
                                    Make healthcare services easily accessible to everyone, especially underserved communities.
                                </p>
                            </div>
                            <div className={cardClass} data-aos="fade-up">
                                <FaBullhorn className={iconClass} />
                                <h3 className="text-lg md:text-xl font-semibold mb-2">Community Health Impact</h3>
                                <p className="text-sm md:text-base text-center">
                                    Foster better healthcare outreach and community health improvements through efficient camp management.
                                </p>
                            </div>
                        </div>

                        {/* Our Values Section */}
                        <h2 className="text-xl md:text-2xl font-medium mb-4 mt-10 relative inline-block" data-aos="fade-right">
                            Our Values
                            <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-20 h-[3px] bg-green-800 dark:bg-white"></span>
                        </h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-8 group">
                            <div className={cardClass} data-aos="flip-left">
                                <FaHeart className={iconClass} />
                                <h3 className="text-lg md:text-xl font-semibold mb-2">Accessibility</h3>
                                <p className="text-sm md:text-base text-center">
                                    We strive to make healthcare camps accessible to everyone, ensuring that individuals from all backgrounds can participate.
                                </p>
                            </div>
                            <div className={cardClass} data-aos="flip-left">
                                <FaMedkit className={iconClass} />
                                <h3 className="text-lg md:text-xl font-semibold mb-2">Efficiency</h3>
                                <p className="text-sm md:text-base text-center">
                                    Our platform is designed to make the process of organizing and attending medical camps as smooth and efficient as possible.
                                </p>
                            </div>
                            <div className={cardClass} data-aos="flip-left">
                                <FaBullhorn className={iconClass} />
                                <h3 className="text-lg md:text-xl font-semibold mb-2">Innovation</h3>
                                <p className="text-sm md:text-base text-center">
                                    We continuously strive to innovate and improve our platform to meet the ever-evolving needs of the medical community and camp participants.
                                </p>
                            </div>
                            <div className={cardClass} data-aos="flip-left">
                                <FaPeopleCarry className={iconClass} />
                                <h3 className="text-lg md:text-xl font-semibold mb-2">Collaboration</h3>
                                <p className="text-sm md:text-base text-center">
                                    We believe in fostering collaboration between healthcare providers, organizers, and participants to maximize the impact of medical camps.
                                </p>
                            </div>
                        </div>

                        {/* What We Offer Section */}
                        <h2 className="text-xl md:text-2xl font-medium mb-4 mt-10 relative inline-block" data-aos="fade-right">
                            What We Offer
                            <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-24 h-[3px] bg-green-800 dark:bg-white"></span>
                        </h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-8 group">
                            <div className={cardClass} data-aos="fade-up">
                                <FaRegCalendarAlt className={iconClass} />
                                <h3 className="text-lg md:text-xl font-semibold mb-2">Easy Event Scheduling</h3>
                                <p className="text-sm md:text-base text-center">
                                    Organizers can schedule and manage multiple medical camps, including dates, locations, and camp details.
                                </p>
                            </div>
                            <div className={cardClass} data-aos="fade-up">
                                <FaRegListAlt className={iconClass} />
                                <h3 className="text-lg md:text-xl font-semibold mb-2">Registration Management</h3>
                                <p className="text-sm md:text-base text-center">
                                    Participants can register for camps directly through the platform, while organizers can manage participant lists.
                                </p>
                            </div>
                            <div className={cardClass} data-aos="fade-up">
                                <FaChartBar className={iconClass} />
                                <h3 className="text-lg md:text-xl font-semibold mb-2">Event Analytics</h3>
                                <p className="text-sm md:text-base text-center">
                                    Organizers gain insights into camp performance, participant feedback, and other helpful metrics.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </>
    );
};

export default AboutUs;
