import {
    FaEnvelope,
    FaPhone,
    FaMapMarkerAlt,
    FaUser,
    FaHeadset,
} from "react-icons/fa";
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
        toast.success("Thank you for reaching out to us!", {
            position: "top-center",
            autoClose: 2000,
        });

        setFormData({
            name: "",
            email: "",
            message: "",
        });
    };

    return (
        <>
            <Helmet>
                <title>Medical Camp | Contact Us</title>
            </Helmet>
            <div className="dark:bg-gray-950 py-10">
                <div className="w-[90%] mx-auto container py-10 flex justify-center items-center">
                    <div className="w-full bg-white dark:bg-gray-900 shadow-xl rounded-lg overflow-hidden flex flex-col md:flex-row">

                        {/* Left Section - Contact Details */}
                        <div
                            className="md:w-1/2 bg-green-950 dark:bg-gray-950 text-white p-8 flex flex-col justify-center"
                            data-aos="fade-right"
                        >
                            <h2 className="text-xl md:text-3xl font-bold mb-3 text-yellow-600">Get in Touch</h2>
                            <p className="text-sm sm:text-base mb-8 text-white dark:text-yellow-500">
                                We'd love to hear from you. Reach out to us for any inquiries or support.
                            </p>

                            <div className="space-y-4">
                                {[
                                    {
                                        icon: FaMapMarkerAlt,
                                        label: "Location",
                                        value: "123 Medical Street, Health City, Dhaka",
                                    },
                                    {
                                        icon: FaPhone,
                                        label: "Phone",
                                        value: "+1 234 567 890",
                                    },
                                    {
                                        icon: FaHeadset,
                                        label: "Support",
                                        value: "+1 987 654 321",
                                    },
                                    {
                                        icon: FaEnvelope,
                                        label: "Email",
                                        value: "contact@medicalcamp.com",
                                    },
                                ].map((item, index) => (
                                    <div
                                        key={index}
                                        className="p-2 rounded-lg  transform hover:bg-green-900  transition-transform duration-300 hover:scale-y-105 focus-within:scale-y-105 origin-top dark:hover:bg-gray-900 hover:scale-105 cursor-pointer dark:border dark:border-yellow-500"
                                        data-aos="fade-right"
                                        data-aos-delay={index * 300} // 0ms, 300ms, 600ms, 900ms...
                                    >
                                        <div className="flex items-center space-x-2">
                                            <item.icon className="text-lg sm:text-xl text-white dark:text-yellow-500" />
                                            <span className="text-sm md:text-base font-semibold text-white dark:text-yellow-500">
                                                {item.label}
                                            </span>
                                        </div>
                                        <p className="text-sm md:text-base pl-6 text-gray-200 dark:text-yellow-500">
                                            {item.value}
                                        </p>
                                    </div>
                                ))}
                            </div>

                        </div>

                        {/* Right Section - Contact Form */}
                        <div className="md:w-1/2 p-8">
  <h2 className="text-xl md:text-3xl font-bold text-green-950 dark:text-yellow-600 mb-6">
    Contact Us
  </h2>
  <form onSubmit={handleSubmit} className="space-y-6">

    {/* Name */}
    <div className="flex items-center border border-gray-300 dark:border-yellow-500 rounded-lg p-3 transition-transform duration-300 origin-top hover:scale-y-105 focus-within:scale-y-105 hover:border-green-700">
      <FaUser className="text-green-950 dark:text-yellow-600 mr-3" />
      <input
        type="text"
        name="name"
        placeholder="Your Name"
        className="w-full outline-none bg-transparent text-black dark:text-white"
        value={formData.name}
        onChange={handleChange}
        required
      />
    </div>

    {/* Email */}
    <div className="flex items-center border border-gray-300 dark:border-yellow-500 rounded-lg p-3 transition-transform duration-300 origin-top hover:scale-y-105 focus-within:scale-y-105 hover:border-green-700">
      <FaEnvelope className="text-green-950 dark:text-yellow-600 mr-3" />
      <input
        type="email"
        name="email"
        placeholder="Your Email"
        className="w-full outline-none bg-transparent text-black dark:text-white"
        value={formData.email}
        onChange={handleChange}
        required
      />
    </div>

    {/* Message */}
    <textarea
      name="message"
      placeholder="Your Message"
      rows="4"
      className="w-full border border-gray-300 dark:border-yellow-500 rounded-lg p-3 outline-none bg-transparent text-black dark:text-white transition-transform duration-300 origin-top hover:scale-y-105 focus:scale-y-105 hover:border-green-700"
      value={formData.message}
      onChange={handleChange}
      required
    ></textarea>

    {/* Submit Button */}
    <button
      type="submit"
      className="bg-green-950 dark:bg-yellow-700 text-white py-3 px-6 rounded-lg w-full hover:bg-green-900 dark:hover:bg-yellow-800 transition duration-300"
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
