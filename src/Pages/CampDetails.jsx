import React, { useState } from "react";
import { useParams } from "react-router-dom";

import { FaMapMarkerAlt,  FaUserMd, FaRegClock, FaDollarSign, FaUsers } from "react-icons/fa"; 
import useAuth from "../hooks/useAuth";
import JoinCampModal from "../components/Modal/JoinCampModal";
import Skeleton from "react-loading-skeleton";
import useCampById from "../hooks/useCampById";

const CampDetails = () => {
    const { campId } = useParams();
    const { user } = useAuth();
    const [isModalOpen, setModalOpen] = useState(false);
    const [camp, isLoading, refetch] = useCampById(campId)

    const openModal = () => setModalOpen(true);
    const closeModal = () => setModalOpen(false);

    console.log(camp);
    const { campName, image, dateTime, fees, location, healthcareProfessional, participants, description } = camp || {}
 
   
       if(isLoading){
           return <div className="flex items-center min-h-screen justify-center">
               <Skeleton count={3} height={120} width={200} />
           </div>
       }

    return (
        <div className="container mx-auto px-4 py-8">
            {camp? (
                <div className="bg-white shadow-lg rounded-lg overflow-hidden">
                    {/* Camp Image */}
                    <img
                        src={image}
                        alt={campName}
                        className="w-full h-80 object-cover"
                    />

                    {/* Camp Details....................... */}
                    <div className="p-6">
                        {/* Camp Name */}
                        <h2 className="text-3xl font-bold text-gray-800">{campName}</h2>

                        {/* Camp Fees */}
                        <div className="text-lg text-gray-600 mt-3 flex items-center">
                            <FaDollarSign className="text-xl text-gray-500 mr-2" />
                            <span>
                                <strong>Camp Fees:</strong> ${fees}
                            </span>
                        </div>

                        {/* Date and Time */}
                        <div className="text-lg text-gray-600 mt-2 flex items-center">
                            <FaRegClock className="text-xl text-gray-500 mr-2" />
                            <span>
                                <strong>Date & Time:</strong> {dateTime}
                            </span>
                        </div>

                        {/* Location */}
                        <div className="text-lg text-gray-600 mt-2 flex items-center">
                            <FaMapMarkerAlt className="text-xl text-gray-500 mr-2" />
                            <span>
                                <strong>Location:</strong> {location}
                            </span>
                        </div>

                        {/* Healthcare Professional */}
                        <div className="text-lg text-gray-600 mt-2 flex items-center">
                            <FaUserMd className="text-xl text-gray-500 mr-2" />
                            <span>
                                <strong>Healthcare Professional:</strong> {healthcareProfessional}
                            </span>
                        </div>

                        {/* Participant Count */}
                        <div className="text-lg text-gray-600 mt-2 flex items-center">
                            <FaUsers className="text-xl text-gray-500 mr-2" />
                            <span>
                                <strong>Participants:</strong> {participants}
                            </span>
                        </div>

                        {/* Description */}
                        <p className="text-md text-gray-700 mt-3">{description}</p>

                        {/* Button to Join Camp */}
                        <div className="mt-6 text-center">

                            <button onClick={openModal} className="btn bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition duration-300">
                                Join Camp
                            </button>

                            <JoinCampModal
                                isOpen={isModalOpen}
                                closeModal={closeModal}
                                camp= {camp}
                                user={user}
                                refetch={refetch}
                            />
                        </div>
                    </div>
                </div>
            ) : (
                <div className="text-center py-8">
                    <h2 className="text-2xl font-bold text-gray-800">Camp not found!</h2>
                </div>
            )}
        </div>
    );
};

export default CampDetails;
