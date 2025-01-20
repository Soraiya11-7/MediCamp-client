import React, { useState } from 'react';
import useRegisteredCampByEmail from '../../../hooks/useRegisteredCampByEmail';
import useAxiosPublic from '../../../hooks/useAxiosPublic';
import { FaTrashAlt } from 'react-icons/fa';
import SearchBar from '../../../components/Shared/SearchBar';
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import Pagination from '../../../components/Shared/Pagination';

const RegisteredCamps = () => {
    const [search, setSearch] = useState('');
    const [camps, , refetch] = useRegisteredCampByEmail(search);
    const axiosSecure = useAxiosSecure();

    const handleSearch = (searchTerm) => {
        setSearch(searchTerm);
        setCurrentPage(1); // Reset to the first page on search
    };
    const rowsPerPage = 10;
    const [currentPage, setCurrentPage] = useState(1);

    const totalPages = Math.ceil(camps.length / rowsPerPage);

    // Get data for the current page
    const currentTableData = camps.slice(
        (currentPage - 1) * rowsPerPage,
        currentPage * rowsPerPage
    );

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
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
                    setSearchTerm={handleSearch}
                />
            </div>

            <div className="overflow-x-auto shadow-md border border-gray-200 rounded-lg max-w-5xl mx-auto">
                <table className="table w-full table-auto">
                    <thead className="bg-gray-800 text-white">
                        <tr className="text-center">
                            <th className="py-3 px-4 text-lg">#</th>
                            <th className="py-3 px-4 text-lg">Camp Name</th>
                            <th className="py-3 px-4 text-lg">Camp Fees</th>
                            <th className="py-3 px-4 text-lg">Participant Name</th>

                            <th className="py-3 px-4 text-lg">Payment Status</th>
                            <th className="py-3 px-4 text-lg">Confirmation Status</th>
                            <th className="py-3 px-4 text-lg">Cancel</th>
                            <th className="py-3 px-4 text-lg">Feedback</th>
                        </tr>
                    </thead>
                    <tbody className="text-center bg-slate-200">
                        {currentTableData.map((camp, index) => (
                            <tr
                                key={camp._id}
                                className="border-t hover:bg-gray-50 transition-all duration-300"
                            >
                                <td className="py-3 px-4">{index + 1}</td>
                                <td className="py-3 px-4">{camp.campName}</td>
                                <td className="py-3 px-4">${camp.campFees}</td>
                                <td className="py-3 px-4">{camp.participantName}</td>
                                <td className="py-3 px-4">
                                    {camp.paymentStatus === 'Paid' ? (
                                        <span className="text-green-600">Paid</span>
                                    ) : (
                                       <Link to={`/dashboard/payment/${camp._id}`}>
                                        <button
                                            className="btn btn-ghost btn-lg text-blue-600 hover:bg-blue-200 rounded-md transition-all"
                                        >
                                            Pay
                                        </button>
                                        </Link>
                                    )}
                                       
                                </td>
                               
                                <td className="py-3 px-4">
                                    {camp.confirmationStatus}
                                </td>
                                <td className="py-3 px-4">
                                    <button
                                        onClick={() => handleDeleteCamp(camp)}
                                        disabled={camp.paymentStatus === 'Paid'}
                                        className={`btn btn-ghost btn-lg text-red-600 hover:bg-red-200 rounded-md transition-all ${camp.paymentStatus === 'Paid' && 'cursor-not-allowed opacity-50'
                                            }`}
                                    >
                                        <FaTrashAlt />
                                    </button>
                                </td>
                                <td className="py-3 px-4">
                                    {camp.feedback ? (
                                        <span>{camp.feedback}</span>
                                    ) : (
                                        <>
                                            {camp.paymentStatus === 'Paid' && camp.confirmationStatus === 'Confirmed' ? (
                                                <Link to={`/dashboard/feedback/${camp._id}`}>
                                                <button
                                                    
                                                    className="btn btn-ghost btn-lg text-purple-600 hover:bg-purple-200 rounded-md transition-all"
                                                >
                                                    Feedback
                                                </button>
                                                </Link>
                                            ) : (
                                                <span>N/A</span>
                                            )}
                                        </>
                                    )}
                                </td>


                            </tr>
                        ))}
                    </tbody>
                </table>

               
            </div>
             {/* Pagination Footer */}
             <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                />
        </div>
    );
};

export default RegisteredCamps;