import React, { useState } from 'react';
import useAxiosPublic from '../../../hooks/useAxiosPublic';
import useRegisteredCamps from '../../../hooks/useRegisteredCamps';
import SearchBar from '../../../components/Shared/SearchBar';
import { FaTrashAlt } from 'react-icons/fa';

const ManageRegisteredCamps = () => {
    const [search, setSearch] = useState('');
    const [registeredCamps, , refetch] = useRegisteredCamps(search);
    const axiosPublic = useAxiosPublic();

     const handleDeleteCamp = (camp) => {

        console.log(camp);
    
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
                  <td className="py-3 px-4">{camp.confirmationStatus}</td>
                  <td className="py-3 px-4">
                    <div className="flex justify-center items-center">
                      {/* Delete Button .........................*/}
                      <button
                        onClick={() => handleDeleteCamp(camp)}
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