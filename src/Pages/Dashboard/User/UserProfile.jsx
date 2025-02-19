import React, { useEffect, useState } from "react";
import useProfileData from "../../../hooks/useProfileData";
import Skeleton from "react-loading-skeleton";
import { FaUserCircle } from "react-icons/fa";
import { MdEmail, MdLocationOn, MdPhone, MdEdit } from "react-icons/md";
import useAuth from "../../../hooks/useAuth";
import { Helmet } from "react-helmet-async";
import { useNavigate } from "react-router-dom";

const UserProfile = () => {
  const [userInfo, isPending] = useProfileData();
  const [preview, setPreview] = useState("");
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (userInfo?.image) {
      setPreview(userInfo.image);
    } else {
      setPreview("");
    }
  }, [userInfo]);

  if (isPending) {
    return (
      <div className="flex items-center min-h-screen justify-center">
        <Skeleton count={5} height={30} width={300} />
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>Medical Camp | {userInfo?.name?.split(" ")[0]}'s Profile</title>
      </Helmet>
      <div className="w-full px-6 py-10">
        {/* Profile Header */}
        <div className="flex flex-col items-center space-y-4">
          {/* Profile Image */}
          <div className="w-40 h-40 md:w-48 md:h-48 rounded-full overflow-hidden border-4 border-transparent bg-gradient-to-r from-green-500 via-green-700 to-green-900 p-2">
            <div className="w-full h-full rounded-full overflow-hidden bg-white">
              {userInfo.image ? (
                <img
                  src={userInfo.image}
                  alt="Profile"
                  className="object-cover w-full h-full rounded-full"
                />
              ) : (
                <FaUserCircle className="text-gray-300 w-full h-full" />
              )}
            </div>
          </div>

          {/* Name */}
          <h2 className="text-3xl font-semibold text-gray-800 tracking-wide">
            {userInfo.name}
          </h2>
        </div>

        {/* User Details */}
        <div className="mt-6 space-y-4 text-gray-700">
          <div className="flex items-center text-xl">
            <MdEmail className="text-green-800 mr-3 text-2xl" />
            <p>{userInfo.email}</p>
          </div>

          <div className="flex items-center text-xl">
            <MdPhone className="text-green-800 mr-3 text-2xl" />
            <p>{userInfo.phoneNumber || "N/A"}</p>
          </div>

          <div className="flex items-center text-xl">
            <MdLocationOn className="text-green-800 mr-3 text-2xl" />
            <p>{userInfo.location || "N/A"}</p>
          </div>
        </div>

        {/* Update Profile Button */}
        <button
          onClick={() => navigate("/dashboard/update-profile")}
          className="mt-6 flex items-center px-8 py-3 bg-green-800 text-white font-medium text-xl rounded-full shadow-md hover:bg-green-900 transition duration-300"
        >
          <MdEdit className="mr-3 text-2xl" /> Update Profile
        </button>
      </div>
    </>
  );
};

export default UserProfile;
