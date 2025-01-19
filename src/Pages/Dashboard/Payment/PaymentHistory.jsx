import React, { useState } from 'react';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import useAuth from '../../../hooks/useAuth';
import SearchBar from '../../../components/Shared/SearchBar';
import Skeleton from 'react-loading-skeleton';

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

       if(loading){
               return <div className="flex items-center min-h-screen justify-center">
                   <Skeleton count={3} height={120} width={200} />
               </div>
           }

    console.log(payments);

    return (
        <div>
            <h2 className="text-4xl font-bold text-center my-8">Manage Registered Camps</h2>

            {/* SearchBar Reusable Component..................... */}
            <div className="flex justify-end mt-10 mb-8">
                <SearchBar
                    placeholder="Search history..."
                    searchTerm={search}
                    setSearchTerm={setSearch}
                />
            </div>

            <div className="overflow-x-auto shadow-md border border-gray-200 rounded-lg">
                <table className="table w-full table-auto">
                    <thead className="bg-gray-800 text-white">
                        <tr className="text-center">
                            <th className="py-3 px-4 text-lg">#</th>
                            <th className="py-3 px-4 text-lg">Camp Name</th>
                            <th className="py-3 px-4 text-lg">Camp Fees</th>
                            <th className="py-3 px-4 text-lg">Payment Status</th>
                            <th className="py-3 px-4 text-lg">Confirmation Status</th>
                        </tr>
                    </thead>
                    <tbody className="text-center bg-slate-200">
                        {payments.map((camp, index) => (
                            <tr
                                key={camp._id}
                                className="border-t hover:bg-gray-50 transition-all duration-300"
                            >
                                <td className="py-3 px-4">{index + 1}</td>
                                <td className="py-3 px-4">{camp.campName}</td>
                                <td className="py-3 px-4">${camp.price}</td>
                                <td className="py-3 px-4">{camp.paymentStatus}</td>
                                <td className="py-3 px-4">{camp.confirmationStatus}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default PaymentHistory;