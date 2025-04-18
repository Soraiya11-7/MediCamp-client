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

    // if (isLoading) {
    //     return (
    //         <div className="flex items-center justify-center min-h-screen bg-gray-100">
    //             <Skeleton count={3} height={120} width={200} />
    //         </div>
    //     );
    // }

    return (
        <>
            <Helmet>
                <title>Medical Camp | Camp Details</title>
            </Helmet>
            <div className="dark:bg-gray-950 ">
            <div className="  w-[90%] mx-auto pb-10">
                {/* Header Section */}
                <div className="pt-16  mb-8 ">
                    <div className=" text-center">
                        <h1 className="text-2xl md:text-4xl font-bold mb-2 dark:text-white">Camp Details</h1>
                        <p className="text-sm w-[80%] mx-auto sm:text-base md:text-lg dark:text-white">
                            Comprehensive insights about the camp and its activities
                        </p>
                    </div>
                </div>

                {
 isLoading ? (<div className="flex items-center mt-10 justify-center">
    <span className="loading loading-bars loading-lg flex items-center justify-center dark:text-white dark:bg-white text-green-800"></span>
   
</div>) :
     camp ? (
        <div className="w-full px-8 sm:px-10 md:px-12 lg:px-16 mx-auto rounded-lg shadow-lg overflow-hidden mt-6   bg-white dark:bg-gray-900 ">
            <div className="pb-10">  
                
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
                            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-left sm:text-center mb-8 text-green-800 dark:text-yellow-600">
                                {campName}
                            </h2>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {/* Fees */}
                                <div className="flex items-center">
                                    <FaDollarSign className="text-green-800 dark:text-yellow-600 text-2xl sm:text-3xl mr-2" />
                                    <div>
                                        <h3 className="text-sm sm:text-lg font-semibold dark:text-white">Camp Fees</h3>
                                        <p className="text-gray-800 dark:text-white">${fees}</p>
                                    </div>
                                </div>

                                {/* Date and Time */}
                                <div className="flex items-center">
                                    <FaRegClock className="text-green-800 dark:text-yellow-600 text-2xl sm:text-3xl mr-2" />
                                    <div>
                                        <h3 className="text-sm sm:text-lg font-semibold dark:text-white">Date & Time</h3>
                                        <p className="text-gray-800 dark:text-white">{dateTime}</p>
                                    </div>
                                </div>

                                {/* Location */}
                                <div className="flex items-center">
                                    <FaMapMarkerAlt className="text-green-800 dark:text-yellow-600 text-2xl sm:text-3xl mr-2" />
                                    <div>
                                        <h3 className="text-sm sm:text-lg font-semibold dark:text-white">Location</h3>
                                        <p className="text-gray-800 dark:text-white">{campLocation}</p>
                                    </div>
                                </div>

                                {/* Healthcare Professional */}
                                <div className="flex items-center">
                                    <FaUserMd className="text-green-800 dark:text-yellow-600 text-2xl sm:text-3xl mr-2" />
                                    <div>
                                        <h3 className="text-sm sm:text-lg font-semibold dark:text-white">
                                            Healthcare Professional
                                        </h3>
                                        <p className="text-gray-800 dark:text-white">{healthcareProfessional}</p>
                                    </div>
                                </div>

                                {/* Participants */}
                                <div className="flex items-center">
                                    <FaUsers className="text-green-800 dark:text-yellow-600 text-2xl sm:text-3xl mr-2" />
                                    <div>
                                        <h3 className="text-sm sm:text-lg font-semibold dark:text-white">Participants</h3>
                                        <p className="text-gray-800 dark:text-white">{participants}</p>
                                    </div>
                                </div>
                            </div>

                            {/* Description */}
                            <div>
                                <h3 className="text-sm sm:text-lg font-semibold  text-green-800 dark:text-yellow-600 mb-4">Description</h3>
                                <p className="mt-2 text-gray-600 dark:text-white leading-relaxed">
                                    {description}
                                </p>
                            </div>

                            {/* Button Section */}
                            <div className="flex justify-center mt-10">
                                <button
                                    onClick={openModal}
                                    className="px-10 py-3 bg-green-900 dark:bg-yellow-700 text-white font-semibold rounded-xl shadow-md transition-transform duration-300 hover:scale-105"
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
               
            </div>
        </div> ) : (
                    <div className="text-center py-16">
                        <h2 className="text-3xl font-bold text-gray-800 dark:text-white dark:text-white">Camp not found!</h2>
                    </div>
                )
                }
       
            </div>
            </div>
           
        </>

    );
};

export default CampDetails;
