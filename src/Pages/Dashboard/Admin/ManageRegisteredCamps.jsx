import React, { useState } from 'react';
import useRegisteredCamps from '../../../hooks/useRegisteredCamps';
import SearchBar from '../../../components/Shared/SearchBar';
import { FaTrashAlt } from 'react-icons/fa';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import Pagination from '../../../components/Shared/Pagination';

const ManageRegisteredCamps = () => {
    const [search, setSearch] = useState('');
    const [registeredCamps, , refetch] = useRegisteredCamps(search);
   
    const axiosSecure = useAxiosSecure();

     const handleSearch = (searchTerm) => {
                 setSearch(searchTerm);
                 setCurrentPage(1); // Reset to the first page on search
             };
             const rowsPerPage = 10;
             const [currentPage, setCurrentPage] = useState(1);
         
             const totalPages = Math.ceil(registeredCamps.length / rowsPerPage);
         
             // Get data for the current page
             const currentTableData = registeredCamps.slice(
                 (currentPage - 1) * rowsPerPage,
                 currentPage * rowsPerPage
             );
         
             const handlePageChange = (pageNumber) => {
                 setCurrentPage(pageNumber);
             };

    const handleConfirmStatus = async (camp) => {
    
        try {
            // Update confirmation status to "Confirmed"
            await axiosSecure.patch(`/register-participant/${camp._id}`);
            if (res.data.modifiedCount > 0) {
                refetch();
                Swal.fire({
                  position: "top-end",
                  icon: "success",
                  title: `Registration confirmed!`,
                  showConfirmButton: false,
                  timer: 3000,
                });
              }
        } catch (error) {
            // console.error('Error confirming registration:', error);
        }
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
        <div className='border border-red-200'>
            <h2 className="text-xl sm:text-2xl md:text-4xl font-bold mb-2 text-center my-8">Manage Registered Camps</h2>

            {/* SearchBar Reusable Component..................... */}
            <div className="flex justify-end mt-10 mb-8">
                <SearchBar
                    placeholder="Search camps..."
                    searchTerm={search}
                    setSearchTerm={handleSearch}
                />
            </div>
            { registeredCamps && registeredCamps.length === 0 ? (
                    <div className="text-center">
                        <h3 className="text-lg md:text-xl font-bold text-gray-800 mb-3 mt-10">There are no registered camps available at this time.</h3>
                       
                        <p className='text-sm sm:text-base w-[80%] mx-auto'>Once users start registering, their details will appear here.</p>
                    </div>
                ):(<div>
                    <div className="overflow-x-auto shadow-md border border-gray-200 rounded-lg ">
                <table className="table-auto w-full ">
                    <thead className="bg-green-800 text-white">
                        <tr className="text-center">
                            <th className="py-1 px-2 text-sm md:text-base lg:text-lg">#</th>
                            <th className="py-1 px-2 text-sm md:text-base lg:text-lg">Participant Name</th>
                            <th className="py-1 px-2 text-sm md:text-base lg:text-lg">Camp Name</th>
                            <th className="py-1 px-2 text-sm md:text-base lg:text-lg">Camp Fees</th>
                            <th className="py-1 px-2 text-sm md:text-base lg:text-lg">Payment Status</th>
                            <th className="py-1 px-2 text-sm md:text-base lg:text-lg">Confirmation Status</th>
                            <th className="py-1 px-2 text-sm md:text-base lg:text-lg">Cancel</th>
                        </tr>
                    </thead>
                    <tbody className="text-center bg-slate-200">
                        {currentTableData.map((camp, index) => (
                            <tr
                                key={camp._id}
                                className="border-t hover:bg-gray-50 transition-all duration-300"
                            >
                                <td className="py-1 px-2 text-xs sm:text-sm md:text-base">{index + 1}</td>
                                <td className="py-1 px-2 text-xs sm:text-sm md:text-base">{camp.participantName}</td>
                                <td className="py-1 px-2 text-xs sm:text-sm md:text-base">{camp.campName}</td>
                                <td className="py-1 px-2 text-xs sm:text-sm md:text-base">${camp.campFees}</td>
                                <td className="py-1 px-2 text-xs sm:text-sm md:text-base">{camp.paymentStatus}</td>
                                <td className="py-1 px-2 text-xs sm:text-sm md:text-base">
                                    {/* Confirmation Button */}
                                    <div className="flex justify-center items-center">
                                        {camp.confirmationStatus === 'Pending' ? (
                                            <button
                                                disabled={camp.paymentStatus === 'Unpaid'}
                                                onClick={() => handleConfirmStatus(camp)}
                                                className="btn btn-sm text-black hover:bg-green-200 rounded-md transition-all"
                                            >
                                                Pending
                                            </button>
                                        ) : (
                                            <span className="text-green-600">Confirmed</span>
                                        )}
                                    </div>
                                </td>
                                <td className="py-1 px-2 text-xs sm:text-sm md:text-base">
                                <div className="flex justify-center items-center">
                                        <button
                                            onClick={() => handleDeleteCamp(camp)}
                                            disabled={camp.paymentStatus === 'Paid' && camp.confirmationStatus === 'Confirmed'}
                                            className="btn  btn-sm text-red-600 hover:bg-red-200 rounded-md transition-all"
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

            {/* Pagination Footer */}
            <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                />
                </div>)}

            
        </div>
    );
};

export default ManageRegisteredCamps;