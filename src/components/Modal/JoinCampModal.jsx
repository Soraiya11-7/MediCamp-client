
import { useState } from 'react';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { useForm } from 'react-hook-form';
import { AiOutlineClose } from "react-icons/ai";
// import { useNavigate } from 'react-router-dom';

const JoinCampModal = ({ isOpen, closeModal, camp, user, refetch }) => {
    const axiosSecure = useAxiosSecure();
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    // const navigate = useNavigate();

    const onSubmit = async (data) => {

        const participantData = {
            campId: camp._id,
            campName: camp.campName,
            campFees: camp.fees,
            location: camp.location,
            healthcareProfessional: camp.healthcareProfessional,
            participantName: user?.displayName,
            participantEmail: user?.email,
            age: data.age,
            phoneNumber: data.phoneNumber,
            gender: data.gender,
            emergencyContact: data.emergencyContact,
            paymentStatus: 'Unpaid',
            confirmationStatus: 'Pending',
        }

        // console.log(participantData);
        try {
            const { data } = await axiosSecure.post("/register-participant", participantData);
            // console.log(data);

            if (data.message) {
                reset();

                // Show alert based on the server message
                Swal.fire({
                    icon: data.insertedId ? "success" : "warning",
                    title: data.insertedId
                        ? `${participantData.participantName} Successfully registered for the camp!`
                        : "Already Registered",
                    text: data.message,
                    showConfirmButton: false,
                    timer: 3000,
                });

            }
            if (data.insertedId) {
                reset();
                refetch();
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'Camp Registration Completed Successfully.',
                    showConfirmButton: false,
                    timer: 1500
                });
                // navigate('/');

            }
            closeModal();

        } catch (error) {
            // console.error("Error:", error);
            Swal.fire({
                icon: "error",
                title: "Error",
                text: "Something went wrong. Please try again later.",
                timer: 3000
            });
        }

    };

    return (
        <div>

            {isOpen && <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
                <div className="relative w-[80%] max-w-2xl bg-gradient-to-br from-green-800 to-green-900 rounded-lg shadow-2xl overflow-y-auto max-h-[600px] ">

                    <div className='sticky top-0 z-20 flex justify-between items-center px-3 md:px-8   bg-white font-bold'>
                        <h2 className='text-center text-xl md:text-2xl text-green-800 my-3'>Register a Camp</h2>
                        {/* Close Button */}
                        <button
                            onClick={closeModal}
                            className="  text-green-800 text-2xl hover:text-red-500 transition"
                        >
                            <AiOutlineClose />
                        </button>

                    </div>
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 mt-4 p-3 md:p-8 ">
                        <div className="space-y-4">

                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text text-white font-semibold">Camp Name</span>
                                </label>
                                <input
                                    type="text"
                                    defaultValue={camp.campName}
                                    {...register("campName")}
                                    readOnly
                                    className="input input-bordered w-full rounded-lg bg-gray-100 text-xs md:text-sm cursor-not-allowed text-gray-800"
                                />
                            </div>

                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text text-white font-semibold">Camp Fees</span>
                                </label>
                                <input
                                    type="number"
                                    defaultValue={camp.fees}
                                    {...register("campFees")}
                                    readOnly
                                    className="input input-bordered w-full rounded-lg bg-gray-100 text-xs md:text-sm cursor-not-allowed text-gray-800"
                                />
                            </div>

                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text text-white font-semibold">Location</span>
                                </label>
                                <input
                                    type="text"
                                    defaultValue={camp.location}
                                    {...register("location")}
                                    readOnly
                                    className="input input-bordered w-full  rounded-lg bg-gray-100 text-xs md:text-sm cursor-not-allowed text-gray-800"
                                />
                            </div>

                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text text-white font-semibold">Healthcare Professional</span>
                                </label>
                                <input
                                    type="text"
                                    defaultValue={camp.healthcareProfessional}
                                    {...register("healthcareProfessional")}
                                    readOnly
                                    className="input input-bordered w-full rounded-lg bg-gray-100 text-xs md:text-sm cursor-not-allowed text-gray-800"
                                />
                            </div>

                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text text-white font-semibold">Participant Name</span>
                                </label>
                                <input
                                    type="text"
                                    defaultValue={user?.displayName}
                                    {...register("participantName")}
                                    readOnly
                                    className="input input-bordered w-full rounded-lg bg-gray-100 text-xs md:text-sm cursor-not-allowed text-gray-800"
                                />
                            </div>


                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text text-white font-semibold">Participant Email</span>
                                </label>
                                <input
                                    type="email"
                                    name="participantEmail"
                                    defaultValue={user?.email}
                                    {...register("participantEmail")}
                                    readOnly
                                    className="input input-bordered w-full rounded-lg bg-gray-100 text-xs md:text-sm cursor-not-allowed text-gray-800"
                                />
                            </div>

                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text text-white">Age*</span>
                                </label>
                                <input
                                    type="number"
                                    placeholder="Enter your age"
                                    {...register("age", { required: true })}
                                    className="input input-bordered w-full text-xs md:text-sm text-gray-800"
                                />
                                {errors.age && <p className="text-red-500 text-sm">Age is required </p>}
                            </div>

                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text text-white">Phone Number*</span>
                                </label>
                                <input
                                    type="tel"
                                    placeholder="Enter your Phone Number"
                                    {...register("phoneNumber", { required: true })}
                                    className="input input-bordered w-full text-xs md:text-sm text-gray-800"
                                />
                                {errors.phoneNumber && <p className="text-red-500 text-sm">Phone Number is required </p>}
                            </div>


                            <div className='form-control'>
                                <label className="label">
                                    <span className="label-text text-white">Gender*</span>
                                </label>
                                <select

                                    {...register("gender", { required: true })}
                                    className="w-full mt-1 p-2 text-xs md:text-sm border border-gray-300 rounded"
                                    required
                                >
                                    <option value="">Select Gender</option>
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                                    <option value="Other">Other</option>
                                </select>
                                {errors.gender && <p className="text-red-500 text-sm">Emergency Contact Number is required </p>}
                            </div>


                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text text-white">Emergency Contact*</span>
                                </label>
                                <input
                                    type="tel"
                                    placeholder="Enter Emergency Contact"
                                    {...register("emergencyContact", { required: true })}
                                    className="input input-bordered w-full text-xs md:text-sm"
                                />
                                {errors.emergencyContact && <p className="text-red-500 text-sm">Emergency Contact Number is required </p>}
                            </div>

                            <div className="flex justify-end space-x-2 md:space-x-4 mt-4">

                                <button
                                    onClick={closeModal}
                                    className="border-2 border-white text-white font-bold mb-5 px-3 py-1.5 sm:px-6 sm:py-2 rounded-full hover:bg-gray-950 "
                                >
                                    Close
                                </button>
                                <button
                                    className="border-2 text-white border-white hover:bg-white hover:text-green-800 font-bold mb-5 px-3 py-1.5 sm:px-6 sm:py-2 rounded-full transition duration-200 shadow-md"
                                >
                                    Register
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>}

        </div>
    );
};

export default JoinCampModal;
