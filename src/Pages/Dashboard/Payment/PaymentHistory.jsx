import React, { useState } from 'react';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import useAuth from '../../../hooks/useAuth';
import SearchBar from '../../../components/Shared/SearchBar';
import Skeleton from 'react-loading-skeleton';
import Pagination from '../../../components/Shared/Pagination';

const PaymentHistory = () => {
    const { user } = useAuth();

    const axiosSecure = useAxiosSecure();
     const [search, setSearch] = useState('');

     const { data: payments = [] ,isPending: loading } = useQuery({
        queryKey: ['payments', user?.email,search],
        queryFn: async () => {
            const res = await axiosSecure.get(`/payments/${user?.email}?search=${search}`)
            return res.data;
        }
    })

     const handleSearch = (searchTerm) => {
             setSearch(searchTerm);
             setCurrentPage(1); // Reset to the first page on search
         };
         const rowsPerPage = 10;
         const [currentPage, setCurrentPage] = useState(1);
     
         const totalPages = Math.ceil(payments.length / rowsPerPage);
     
         // Get data for the current page
         const currentTableData = payments.slice(
             (currentPage - 1) * rowsPerPage,
             currentPage * rowsPerPage
         );
     
         const handlePageChange = (pageNumber) => {
             setCurrentPage(pageNumber);
         };
     
     
   

       if(loading){
               return <div className="flex items-center min-h-screen justify-center">
                   <Skeleton count={3} height={120} width={200} />
               </div>
           }

    // console.log(payments);

    return (
        <div>
            <h2 className="text-xl sm:text-2xl md:text-4xl font-bold mb-2 text-center my-8">Payment History</h2>

            {/* SearchBar Reusable Component..................... */}
            <div className="flex justify-end mt-10 mb-8">
                <SearchBar
                    placeholder="Search history..."
                    searchTerm={search}
                    setSearchTerm={handleSearch}
                />
            </div>

            {
                payments && payments.length === 0 ? (
                    <div className="text-center">
                        <h3 className="text-lg md:text-xl font-bold text-gray-800 mb-3 mt-10">You have not made any payments yet.</h3>
                       
                        <p className='text-sm sm:text-base w-[80%] mx-auto'>To participate in camps and make payments, please register and complete your camp registration.</p>
                    </div>
                ):
                (<div>
                     <div className="overflow-x-auto shadow-md border border-gray-200 rounded-lg">
                <table className="table w-full table-auto">
                    <thead className="bg-green-800 text-white">
                        <tr className="text-center">
                            <th className="py-1 px-2 text-sm md:text-base lg:text-lg">#</th>
                            <th className="py-1 px-2 text-sm md:text-base lg:text-lg">Camp Name</th>
                            <th className="py-1 px-2 text-sm md:text-base lg:text-lg">Camp Fees</th>
                            <th className="py-1 px-2 text-sm md:text-base lg:text-lg">Payment Status</th>
                            <th className="py-1 px-2 text-sm md:text-base lg:text-lg">Confirmation Status</th>
                        </tr>
                    </thead>
                    <tbody className="text-center bg-slate-200">
                        {currentTableData.map((camp, index) => (
                            <tr
                                key={camp._id}
                                className="border-t hover:bg-gray-50 transition-all duration-300"
                            >
                                <td className="py-1 px-2 text-xs sm:text-sm md:text-base">{index + 1}</td>
                                <td className="py-1 px-2 text-xs sm:text-sm md:text-base">{camp.campName}</td>
                                <td className="py-1 px-2 text-xs sm:text-sm md:text-base">${camp.price}</td>
                                <td className="py-1 px-2 text-xs sm:text-sm md:text-base">{camp.paymentStatus}</td>
                                <td className="py-1 px-2 text-xs sm:text-sm md:text-base">{camp.confirmationStatus}</td>
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
                </div>)
            }

           
        </div>
    );
};

export default PaymentHistory;