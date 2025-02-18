import React, { useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { FaMapMarkerAlt, FaUserMd, FaRegClock, FaDollarSign, FaUsers } from "react-icons/fa";
import useAuth from "../hooks/useAuth";
import JoinCampModal from "../components/Modal/JoinCampModal";
import Skeleton from "react-loading-skeleton";
import useCampById from "../hooks/useCampById";
import { Helmet } from "react-helmet-async";

const CampDetails = () => {
    const { campId } = useParams();
    const { user } = useAuth();
    const navigate = useNavigate();
    const [isModalOpen, setModalOpen] = useState(false);
    const [camp, isLoading, refetch] = useCampById(campId);
    const location = useLocation();

    const openModal = () => {
        if (!user) {
            navigate("/login", { state: { from: location.pathname } });
        } else {
            setModalOpen(true);
        }
    };

    const closeModal = () => setModalOpen(false);

    const {
        campName,
        image,
        dateTime,
        fees,
        location: campLocation,
        healthcareProfessional,
        participants,
        description,
    } = camp || {};

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gray-100">
                <Skeleton count={3} height={120} width={200} />
            </div>
        );
    }

    return (
        <>
            <Helmet>
                <title>Medical Camp | Camp Details</title>
            </Helmet>
            <div className="dark:bg-gray-700">
            <div className=" bg-slate-50  w-[90%] mx-auto pb-10">
                {/* Header Section */}
                <div className="pt-16  mb-8 ">
                    <div className=" text-center">
                        <h1 className="text-2xl md:text-4xl font-bold mb-2">Camp Details</h1>
                        <p className="text-sm w-[80%] mx-auto sm:text-base md:text-lg">
                            Comprehensive insights about the camp and its activities
                        </p>
                    </div>
                </div>


                <div className="w-[90%] sm:w-[80%] md:w-[90%] lg:w-[75%] mx-auto rounded-lg shadow-lg overflow-hidden mt-6 px-3 lg:px-10 bg-white ">
                    <div className="pb-10">
                        {camp ? (
                            <>
                                {/* Image Section */}
                                <div className="relative mt-8">
                                    <img
                                        src={image}
                                        alt={campName}
                                        className="w-full h-64 md:h-80 lg:h-[28rem] object-cover transition-transform duration-500 hover:scale-105"
                                    />
                                </div>

                                {/* Details Section */}
                                <div className="p-4 space-y-3">
                                    {/* Camp Name */}
                                    <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-left sm:text-center mb-6 text-green-700">
                                        {campName}
                                    </h2>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        {/* Fees */}
                                        <div className="flex items-center">
                                            <FaDollarSign className="text-green-700 text-2xl sm:text-3xl mr-2" />
                                            <div>
                                                <h3 className="text-sm sm:text-lg font-semibold">Camp Fees</h3>
                                                <p className="text-gray-800">${fees}</p>
                                            </div>
                                        </div>

                                        {/* Date and Time */}
                                        <div className="flex items-center">
                                            <FaRegClock className="text-green-700 text-2xl sm:text-3xl mr-2" />
                                            <div>
                                                <h3 className="text-sm sm:text-lg font-semibold">Date & Time</h3>
                                                <p className="text-gray-800">{dateTime}</p>
                                            </div>
                                        </div>

                                        {/* Location */}
                                        <div className="flex items-center">
                                            <FaMapMarkerAlt className="text-green-700 text-2xl sm:text-3xl mr-2" />
                                            <div>
                                                <h3 className="text-sm sm:text-lg font-semibold">Location</h3>
                                                <p className="text-gray-800">{campLocation}</p>
                                            </div>
                                        </div>

                                        {/* Healthcare Professional */}
                                        <div className="flex items-center">
                                            <FaUserMd className="text-green-700 text-2xl sm:text-3xl mr-2" />
                                            <div>
                                                <h3 className="text-sm sm:text-lg font-semibold">
                                                    Healthcare Professional
                                                </h3>
                                                <p className="text-gray-800">{healthcareProfessional}</p>
                                            </div>
                                        </div>

                                        {/* Participants */}
                                        <div className="flex items-center">
                                            <FaUsers className="text-green-700 text-2xl sm:text-3xl mr-2" />
                                            <div>
                                                <h3 className="text-sm sm:text-lg font-semibold">Participants</h3>
                                                <p className="text-gray-800">{participants}</p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Description */}
                                    <div>
                                        <h3 className="text-sm sm:text-lg font-semibold text-green-700 mb-4">Description</h3>
                                        <p className="mt-2 text-gray-600 leading-relaxed">
                                            {description}
                                        </p>
                                    </div>

                                    {/* Button Section */}
                                    <div className="flex justify-center mt-10">
                                        <button
                                            onClick={openModal}
                                            className="px-10 py-3 bg-green-700 text-white font-semibold rounded-full shadow-md transition-transform duration-300 hover:scale-105"
                                        >
                                            Join Camp
                                        </button>
                                    </div>
                                </div>

                                {/* Modal */}
                                <JoinCampModal
                                    isOpen={isModalOpen}
                                    closeModal={closeModal}
                                    camp={camp}
                                    user={user}
                                    refetch={refetch}
                                />
                            </>
                        ) : (
                            <div className="text-center py-16">
                                <h2 className="text-3xl font-bold text-gray-800 dark:text-white">Camp not found!</h2>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            </div>
           
        </>

    );
};

export default CampDetails;
