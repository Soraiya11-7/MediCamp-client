import { Dialog, Transition, DialogPanel, DialogTitle, TransitionChild } from '@headlessui/react';
import { Fragment, useState } from 'react';
import Swal from 'sweetalert2';
import useAxiosPublic from '../../hooks/useAxiosPublic';

const JoinCampModal = ({ isOpen, closeModal, camp, user, refetch }) => {
    const axiosPublic = useAxiosPublic();
    const [participantData, setParticipantData] = useState({
        campId: camp._id,
        campName: camp.campName,
        campFees: camp.fees,
        location: camp.location,
        healthcareProfessional: camp.healthcareProfessional,
        participantName: user?.displayName,
        participantEmail: user?.email,
        age: '',
        phoneNumber: '',
        gender: '',
        emergencyContact: '',
        paymentStatus: 'Unpaid',
        confirmationStatus: 'Pending',
    });


    const handleChange = (e) => {
        const { name, value } = e.target;
        setParticipantData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        console.log(participantData);
        closeModal();
        try {
            const {data} = await axiosPublic.post("/register-participant", participantData);
            console.log(data);

            if (data.message) {
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
                refetch();
                closeModal();
            }

            // if (data.insertedId) {
            //     refetch();
            //     closeModal();
            //     Swal.fire({
            //         position: "top-end",
            //         icon: "success",
            //         title: `${participantData.participantName} Successfully registered for the camp!`,
            //         showConfirmButton: false,
            //         timer: 1500,
            //     });

            // }

            // if (data.message === "Participant already joined this camp") {
            //     Swal.fire({
            //         icon: "warning",
            //         title: "Already Registered",
            //         text: `${data.message}`,
            //     });
            //     return;
            // }

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
        <Transition appear show={isOpen} as={Fragment}>
            <Dialog as="div" className="relative z-10" onClose={closeModal}>
                <TransitionChild
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-black bg-opacity-25" />
                </TransitionChild>

                <div className="fixed inset-0 overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center p-4 text-center">
                        <TransitionChild
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                        >
                            <DialogPanel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                                <DialogTitle as="h3" className="text-lg font-medium text-center leading-6 text-gray-900">
                                    Register for Camp
                                </DialogTitle>
                                <div className="mt-2">
                                    <form onSubmit={handleSubmit}>
                                        <div className="space-y-4">
                                            <div>
                                                <label className="block text-sm font-semibold">Camp Name</label>
                                                <input
                                                    type="text"
                                                    name="campName"
                                                    value={participantData.campName}
                                                    readOnly
                                                    className="w-full mt-1 p-2 border border-gray-300 rounded"
                                                />
                                            </div>

                                            <div>
                                                <label className="block text-sm font-semibold">Camp Fees</label>
                                                <input
                                                    type="number"
                                                    name="campFees"
                                                    value={participantData.campFees}
                                                    readOnly
                                                    className="w-full mt-1 p-2 border border-gray-300 rounded"
                                                />
                                            </div>

                                            <div>
                                                <label className="block text-sm font-semibold">Location</label>
                                                <input
                                                    type="text"
                                                    name="location"
                                                    value={participantData.location}
                                                    readOnly
                                                    className="w-full mt-1 p-2 border border-gray-300 rounded"
                                                />
                                            </div>

                                            <div>
                                                <label className="block text-sm font-semibold">Healthcare Professional</label>
                                                <input
                                                    type="text"
                                                    name="healthcareProfessionalName"
                                                    value={participantData.healthcareProfessional}
                                                    readOnly
                                                    className="w-full mt-1 p-2 border border-gray-300 rounded"
                                                />
                                            </div>

                                            <div>
                                                <label className="block text-sm font-semibold">Participant Name</label>
                                                <input
                                                    type="text"
                                                    name="participantName"
                                                    value={participantData.participantName}
                                                    readOnly
                                                    className="w-full mt-1 p-2 border border-gray-300 rounded"
                                                />
                                            </div>

                                            <div>
                                                <label className="block text-sm font-semibold">Participant Email</label>
                                                <input
                                                    type="email"
                                                    name="participantEmail"
                                                    value={participantData.participantEmail}
                                                    readOnly
                                                    className="w-full mt-1 p-2 border border-gray-300 rounded"
                                                />
                                            </div>

                                            <div>
                                                <label className="block text-sm font-semibold">Age</label>
                                                <input
                                                    type="number"
                                                    name="age"
                                                  
                                                    onChange={handleChange}
                                                    className="w-full mt-1 p-2 border border-gray-300 rounded"
                                                    required
                                                />
                                            </div>

                                            <div>
                                                <label className="block text-sm font-semibold">Phone Number</label>
                                                <input
                                                    type="tel"
                                                    name="phoneNumber"
                                                   
                                                    onChange={handleChange}
                                                    className="w-full mt-1 p-2 border border-gray-300 rounded"
                                                    required
                                                />
                                            </div>

                                            <div>
                                                <label className="block text-sm font-semibold">Gender</label>
                                                <select
                                                    name="gender"
                                                    
                                                    onChange={handleChange}
                                                    className="w-full mt-1 p-2 border border-gray-300 rounded"
                                                    required
                                                >
                                                    <option value="">Select Gender</option>
                                                    <option value="Male">Male</option>
                                                    <option value="Female">Female</option>
                                                    <option value="Other">Other</option>
                                                </select>
                                            </div>

                                            <div>
                                                <label className="block text-sm font-semibold">Emergency Contact</label>
                                                <input
                                                    type="tel"
                                                    name="emergencyContact"
                                                 
                                                    onChange={handleChange}
                                                    className="w-full mt-1 p-2 border border-gray-300 rounded"
                                                    required
                                                />
                                            </div>

                                            <div className="flex justify-end space-x-4 mt-4">
                                                <button
                                                    type="button"
                                                    onClick={closeModal}
                                                    className="px-4 py-2 bg-gray-500 text-white rounded"
                                                >
                                                    Close
                                                </button>
                                                <button
                                                    type="submit"
                                                    className="px-4 py-2 bg-blue-500 text-white rounded"
                                                >
                                                    Register
                                                </button>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </DialogPanel>
                        </TransitionChild>
                    </div>
                </div>
            </Dialog>
        </Transition>
    );
};

export default JoinCampModal;
