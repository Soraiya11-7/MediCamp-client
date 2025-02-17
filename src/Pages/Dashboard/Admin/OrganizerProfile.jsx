import React, { useState, useEffect } from 'react';
import Skeleton from 'react-loading-skeleton';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import { FaUserCircle } from 'react-icons/fa';
import { FiEdit } from 'react-icons/fi';
import { MdEmail, MdPhone } from 'react-icons/md';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import useAxiosPublic from '../../../hooks/useAxiosPublic';
import useProfileData from '../../../hooks/useProfileData';
import { Helmet } from 'react-helmet-async';

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const OrganizerProfile = () => {
  const [userInfo, isPending, refetch] = useProfileData();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [preview, setPreview] = useState('');
  const axiosSecure = useAxiosSecure();
  const axiosPublic = useAxiosPublic();
  const { register, handleSubmit, formState: { errors }, reset } = useForm();


  useEffect(() => {
    if (userInfo?.image) {
      setPreview(userInfo.image);
    } else {
      setPreview('');
    }
  }, [userInfo]);

  if (isPending) {
    return (
      <div className="flex items-center min-h-screen justify-center">
        <Skeleton count={3} height={120} width={200} />
      </div>
    );
  }

  const onSubmit = async (data) => {
    try {
      let updatedImage = preview;

      if (data.image && data.image[0]) {
        const imageFile = new FormData();
        imageFile.append("image", data.image[0]);

        const imageResponse = await axiosPublic.post(image_hosting_api, imageFile, {
          headers: { "content-type": "multipart/form-data" },
        });

        if (imageResponse.data.success) {
          updatedImage = imageResponse.data.data.display_url;
        }
      }
      //  console.log(updatedImage);
      const updatedProfile = {
        name: data.name,
        email: userInfo.email,
        phoneNumber: data.phoneNumber,
        image: updatedImage,
      };

      const dbResponse = await axiosSecure.patch(`/update-profile/${userInfo._id}`, updatedProfile);
      if (dbResponse.data.modifiedCount > 0) {
        setIsModalOpen(false);
        refetch();
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: `Profile updated successfully.`,
          showConfirmButton: false,
          timer: 1500,
        });
      }
    } catch (error) {
      // console.error("Error updating profile:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Something went wrong. Please try again later.",
      });
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPreview(URL.createObjectURL(file));
    }
  };

  return (
    <>
      <Helmet>
        <title> Admin Dashboard | Profile</title>
      </Helmet>
      <div className=" flex items-center justify-center p-2 md:p-4">

        <div className="bg-white shadow-2xl rounded-lg w-full max-w-md text-center px-2 md:px-4 py-8 transform transition hover:scale-105 duration-300">
          <div className="relative">
            <div className="w-28 h-28 md:w-28 md:h-28 mx-auto rounded-full overflow-hidden shadow-md border-4 border-green-800">
              {userInfo.image ? (
                <img
                  src={userInfo.image}
                  alt="Profile"
                  className="object-cover w-full h-full"
                />
              ) : (
                <FaUserCircle className="text-green-800 w-full h-full" />
              )}
            </div>
            <button
              onClick={() => setIsModalOpen(true)}
              className="sm:hidden absolute -top-2 -right-2 bg-green-800 text-white p-2 rounded-full shadow hover:bg-green-800 focus:outline-none"
            >
              <FiEdit className="text-xl" />
            </button>
          </div>
          <h2 className="text-base sm:text-lg md:text-2xl font-bold text-gray-800 mt-4">{userInfo.name}</h2>
          <div className="flex items-center justify-center text-gray-600 mt-3 space-x-2 text-xs sm:text-sm">
            <MdEmail className="text-green-800" />
            <p>{userInfo.email}</p>
          </div>
          <div className="flex items-center justify-center text-gray-600 mt-2 space-x-2  text-xs sm:text-sm">
            <MdPhone className="text-green-800" />
            <p>{userInfo.phoneNumber || 'N/A'}</p>
          </div>
          <div className='flex items-center justify-end'>
            <button
              onClick={() => setIsModalOpen(true)}
              className="hidden sm:flex mt-6 px-6 py-2 bg-gradient-to-r from-green-800 to-green-500 text-white rounded-lg shadow hover:from-green-500 hover:to-green-800 focus:outline-none  items-center justify-center space-x-2"
            >
              <FiEdit />
              <span>Update Profile</span>
            </button>
          </div>
        </div>


        {isModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
            <div className="relative bg-gradient-to-br from-green-800 to-green-700 rounded-xl shadow-2xl w-[80%] max-w-2xl overflow-y-auto max-h-[600px] p-8">

              {/* Close Button........................ */}
              <button
                onClick={() => setIsModalOpen(false)}
                className="absolute top-4 right-4 text-white hover:text-gray-200 focus:outline-none text-2xl"
              >
                ✕
              </button>


              <h3 className="text-sm md:text-xl mt-2 font-bold text-white text-center">
                Update Profile
              </h3>

              {/* Modal Form............................ */}
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mt-8">
                {/* Name and Phone Fields ......................*/}
                <div className="md:flex mb-3 md:mb-8">
                  <div className="form-control md:w-1/2 mb-3 md:mb-0">
                    <label className="label">
                      <span className="label-text text-white font-semibold">Name*</span>
                    </label>
                    <input
                      type="text"
                      defaultValue={userInfo.name}
                      {...register("name", { required: true })}
                      className="input input-bordered w-full text-xs md:text-sm rounded-lg focus:ring-2 focus:ring-blue-400"
                    />
                    {errors.name && (
                      <p className="text-red-200 text-sm mt-1">
                        {errors.name.message}
                      </p>
                    )}
                  </div>
                  <div className="form-control md:w-1/2 md:ml-4">
                    <label className="label">
                      <span className="label-text text-white font-semibold">
                        Phone Number*
                      </span>
                    </label>
                    <input
                      type="text"
                      defaultValue={userInfo.phoneNumber}
                      {...register("phoneNumber", { required: true })}
                      className="input input-bordered w-full text-xs md:text-sm rounded-lg focus:ring-2 focus:ring-blue-400"
                    />
                    {errors.phoneNumber && (
                      <p className="text-red-200 text-sm mt-1">
                        {errors.phoneNumber.message}
                      </p>
                    )}
                  </div>
                </div>

                {/* Email Field ReadOnly.................................*/}
                <div className="form-control">
                  <label className="label">
                    <span className="label-text text-white font-semibold">Email</span>
                  </label>
                  <input
                    type="email"
                    defaultValue={userInfo.email}
                    {...register("email")}
                    readOnly
                    className="input input-bordered w-full rounded-lg bg-gray-100 cursor-not-allowed text-gray-500 text-xs md:text-sm"
                  />
                </div>

                {/* Image Field..................................... */}
                <div className="form-control">
                  <label className="label">
                    <span className="label-text text-white font-semibold">
                      Current Image
                    </span>
                  </label>
                  <div className="flex items-center gap-2">
                    <img
                      src={preview}
                      alt="Preview"
                      className="w-12 h-12 md:w-20 md:h-20 rounded-full object-cover border-4 border-white shadow-lg"
                    />
                    <input
                      type="file"
                      {...register("image")}
                      onChange={handleFileChange}
                      className="file-input file-input-bordered w-full h-8 sm:h-12 rounded-lg text-xs md:text-sm"
                    />
                  </div>
                </div>

                {/* Modal Actions ......................................*/}
                <div className="flex justify-end items-center">

                  <button
                    type="submit"
                    className="bg-white hover:bg-green-300 text-green-800 font-bold mb-5 px-3 py-1.5 sm:px-6 sm:py-2 rounded-full transition duration-200 shadow-md"
                  >
                    Save
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

      </div>
    </>

  );

};

export default OrganizerProfile;
