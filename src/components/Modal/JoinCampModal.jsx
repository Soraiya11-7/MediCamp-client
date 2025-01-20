
import { useState } from 'react';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { useForm } from 'react-hook-form';

const JoinCampModal = ({ isOpen, closeModal, camp, user, refetch }) => {
    const axiosSecure = useAxiosSecure();
    const { register, handleSubmit, formState: { errors }, reset } = useForm();

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
        try {
            const { data } = await axiosSecure.post("/register-participant", participantData);
            // console.log(data);

            if (data.insertedId) {
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
                refetch();
                closeModal();
            }

        } catch (error) {
            console.error("Error:", error);
            Swal.fire({
                icon: "error",
                title: "Error",
                text: "Something went wrong. Please try again later.",
            });
        }

    };

    return (
        <div>
            
            {isOpen && <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
                <div className="relative w-[80%] max-w-2xl bg-gradient-to-br from-sky-500 to-green-700 rounded-3xl shadow-2xl overflow-y-auto max-h-[600px] p-6">
                <h2 className='text-center text-xl my-6'>Register a Camp</h2>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 mt-8">
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
                                className="input input-bordered w-full rounded-lg bg-gray-100 cursor-not-allowed text-gray-500"
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
                                className="input input-bordered w-full rounded-lg bg-gray-100 cursor-not-allowed text-gray-500"
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
                                className="input input-bordered w-full rounded-lg bg-gray-100 cursor-not-allowed text-gray-500"
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
                                className="input input-bordered w-full rounded-lg bg-gray-100 cursor-not-allowed text-gray-500"
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
                                className="input input-bordered w-full rounded-lg bg-gray-100 cursor-not-allowed text-gray-500"
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
                                className="input input-bordered w-full rounded-lg bg-gray-100 cursor-not-allowed text-gray-500"
                            />
                        </div>

                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Age*</span>
                            </label>
                            <input
                                type="number"
                                placeholder="Enter your age"
                                {...register("age", { required: true })}
                                className="input input-bordered w-full"
                            />
                            {errors.age && <p className="text-red-500 text-sm">Age is required </p>}
                        </div>

                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Phone Number*</span>
                            </label>
                            <input
                                type="tel"
                                placeholder="Enter your Phone Number"
                                {...register("phoneNumber", { required: true })}
                                className="input input-bordered w-full"
                            />
                            {errors.phoneNumber && <p className="text-red-500 text-sm">Phone Number is required </p>}
                        </div>


                        <div className='form-control'>
                            <label className="label">
                                <span className="label-text">Gender*</span>
                            </label>
                            <select

                                {...register("gender", { required: true })}
                                className="w-full mt-1 p-2 border border-gray-300 rounded"
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
                                <span className="label-text">EmergencyContact*</span>
                            </label>
                            <input
                                type="tel"
                                placeholder="Enter your Emergency Contact"
                                {...register("emergencyContact", { required: true })}
                                className="input input-bordered w-full"
                            />
                            {errors.emergencyContact && <p className="text-red-500 text-sm">Emergency Contact Number is required </p>}
                        </div>

                        <div className="flex justify-end space-x-4 mt-4">
                            <button
                                onClick={closeModal}
                                className="btn px-6 py-2 rounded-full transition duration-200 shadow-md bg-gray-500 text-white"
                            >
                                Close
                            </button>
                            <button
                                className="btn bg-green-900 hover:bg-green-300 text-white w mb-5 px-6 py-2 rounded-full transition duration-200 shadow-md"
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
