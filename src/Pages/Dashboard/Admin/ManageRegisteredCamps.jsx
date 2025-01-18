import React, { useState } from 'react';
import useRegisteredCamps from '../../../hooks/useRegisteredCamps';
import SearchBar from '../../../components/Shared/SearchBar';
import { FaTrashAlt } from 'react-icons/fa';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../../hooks/useAxiosSecure';

const ManageRegisteredCamps = () => {
    const [search, setSearch] = useState('');
    const [registeredCamps, , refetch] = useRegisteredCamps(search);
   
    const axiosSecure = useAxiosSecure();

    const handleConfirmStatus = async (camp) => {
       
        // if (camp.paymentStatus !== 'Paid') {
        //     alert('The payment must be completed before confirmation.');
        //     return;
        // }

        // try {
        //     // Update confirmation status to "Confirmed"
        //     await axiosPublic.patch(`/register-participant/${camp._id}`, { confirmationStatus: 'Confirmed' });
        //     refetch(); 
        //     alert('Registration confirmed!');
        // } catch (error) {
        //     console.error('Error confirming registration:', error);
        // }
    };

    const handleDeleteCamp = async (camp) => {

         Swal.fire({
              title: "Are you sure?",
              text: "You won't be able to revert this!",
              icon: "warning",
              showCancelButton: true,
              confirmButtonColor: "#3085d6",
              cancelButtonColor: "#d33",
              confirmButtonText: "Yes, delete it!",
            }).then(async (result) => {
              if (result.isConfirmed) {
                const res = await axiosSecure.delete(`/delete-registered-camp/${camp._id}`);
                if (res.data.deletedCount > 0) {
                  refetch();
                  Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: `${camp.participantName} has been deleted from registered  ${camp.campName}`,
                    showConfirmButton: false,
                    timer: 1500,
                  });
                }
              }
            });
    };
    return (
        <div>
            <h2 className="text-4xl font-bold text-center my-8">Manage Registered Camps</h2>

            {/* SearchBar Reusable Component..................... */}
            <div className="flex justify-end mt-10 mb-8">
                <SearchBar
                    placeholder="Search camps..."
                    searchTerm={search}
                    setSearchTerm={setSearch}
                />
            </div>

            <div className="overflow-x-auto shadow-md border border-gray-200 rounded-lg">
                <table className="table w-full table-auto">
                    <thead className="bg-gray-800 text-white">
                        <tr className="text-center">
                            <th className="py-3 px-4 text-lg">#</th>
                            <th className="py-3 px-4 text-lg">Participant Name</th>
                            <th className="py-3 px-4 text-lg">Camp Name</th>
                            <th className="py-3 px-4 text-lg">Camp Fees</th>
                            <th className="py-3 px-4 text-lg">Payment Status</th>
                            <th className="py-3 px-4 text-lg">Confirmation Status</th>
                            <th className="py-3 px-4 text-lg">Cancel</th>
                        </tr>
                    </thead>
                    <tbody className="text-center bg-slate-200">
                        {registeredCamps.map((camp, index) => (
                            <tr
                                key={camp._id}
                                className="border-t hover:bg-gray-50 transition-all duration-300"
                            >
                                <td className="py-3 px-4">{index + 1}</td>
                                <td className="py-3 px-4">{camp.participantName}</td>
                                <td className="py-3 px-4">{camp.campName}</td>
                                <td className="py-3 px-4">${camp.campFees}</td>
                                <td className="py-3 px-4">{camp.paymentStatus}</td>
                                <td className="py-3 px-4">
                                    {/* Confirmation Button */}
                                    <div className="flex justify-center items-center">
                                        {camp.confirmationStatus === 'Pending' ? (
                                            <button
                                                onClick={() => handleConfirmStatus(camp)}
                                                className="btn btn-ghost btn-lg text-green-600 hover:bg-green-200 rounded-md transition-all"
                                            >
                                                Pending
                                            </button>
                                        ) : (
                                            <span className="text-green-600">Confirmed</span>
                                        )}
                                    </div>
                                </td>
                                <td className="py-3 px-4">
                                <div className="flex justify-center items-center">
                                        <button
                                            onClick={() => handleDeleteCamp(camp)}
                                            disabled={camp.paymentStatus === 'Paid' && camp.confirmationStatus === 'Confirmed'}
                                            className="btn btn-ghost btn-lg text-red-600 hover:bg-red-200 rounded-md transition-all"
                                        >
                                            <FaTrashAlt />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ManageRegisteredCamps;