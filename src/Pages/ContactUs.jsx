import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaUser, FaHeadset } from "react-icons/fa";
import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { toast } from "react-toastify";

const ContactUs = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        message: "",
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission
        toast.success("Thank you for reaching out to us!", {
            position: "top-center",
            autoClose: 2000,
        });

        setFormData({
            name: "",
            email: "",
            message: ""
        });

    };


    return (
        <>
            <Helmet>
                <title>Medical Camp | Contact Us</title>
            </Helmet>
            <div className="dark:bg-gray-700">
                <div className="w-[90%] mx-auto container py-10 flex justify-center items-center">
                    <div className="w-full bg-white shadow-xl rounded-lg overflow-hidden flex flex-col md:flex-row">

                        {/* Left Section - Contact Details */}
                        <div className="md:w-1/2 bg-green-800 text-white p-8 flex flex-col justify-center">
                            <h2 className="text-xl md:text-3xl font-bold mb-3">Get in Touch</h2>
                            <p className="text-sm sm:text-base  mb-8 text-gray-200">
                                We'd love to hear from you. Reach out to us for any inquiries or support.
                            </p>

                            <div className="space-y-4">
                                {[
                                    { icon: FaMapMarkerAlt, label: "Location", value: "123 Medical Street, Health City, Dhaka" },
                                    { icon: FaPhone, label: "Phone", value: "+1 234 567 890" },
                                    { icon: FaHeadset, label: "Support", value: "+1 987 654 321" },
                                    { icon: FaEnvelope, label: "Email", value: "contact@medicalcamp.com" },
                                ].map((item, index) => (
                                    <div
                                        key={index}
                                        className="p-2 rounded-lg transition duration-300 transform hover:bg-green-700 hover:scale-105 cursor-pointer"
                                    >
                                        <div className="flex items-center space-x-2">
                                            <item.icon className="text-lg sm:text-xl " />
                                            <span className="text-sm md:text-base font-semibold">{item.label}</span>
                                        </div>
                                        <p className="text-sm md:text-base pl-6 text-gray-200">{item.value}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Right Section - Contact Form */}
                        <div className="md:w-1/2 p-8">
                            <h2 className="text-xl md:text-3xl font-bold text-green-800 mb-6">Contact Us</h2>
                            <form onSubmit={handleSubmit} className="space-y-6">

                                <div className="flex items-center border border-gray-300 rounded-lg p-3">
                                    <FaUser className="text-green-800 mr-3" />
                                    <input
                                        type="text"
                                        name="name"
                                        placeholder="Your Name"
                                        className="w-full outline-none bg-transparent"
                                        value={formData.name}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>

                                <div className="flex items-center border border-gray-300 rounded-lg p-3">
                                    <FaEnvelope className="text-green-800 mr-3" />
                                    <input
                                        type="email"
                                        name="email"
                                        placeholder="Your Email"
                                        className="w-full outline-none bg-transparent"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>

                                <textarea
                                    name="message"
                                    placeholder="Your Message"
                                    className="w-full border border-gray-300 rounded-lg p-3 outline-none"
                                    rows="4"
                                    value={formData.message}
                                    onChange={handleChange}
                                    required
                                ></textarea>

                                <button
                                    type="submit"
                                    className="bg-green-800 text-white py-3 px-6 rounded-lg w-full hover:bg-green-900 transition duration-300"
                                >
                                    Send Message
                                </button>
                            </form>
                        </div>

                    </div>
                </div>
            </div>

        </>
    );
};

export default ContactUs;
