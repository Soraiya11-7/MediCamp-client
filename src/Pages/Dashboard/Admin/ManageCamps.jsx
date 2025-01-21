import { FaEdit, FaTrashAlt } from "react-icons/fa";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import useCamp from "../../../hooks/useCamp";
import { useState } from "react";
import SearchBar from "../../../components/Shared/SearchBar";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Pagination from "../../../components/Shared/Pagination";

const ManageCamps = () => {
  const [search, setSearch] = useState('');
  const [camps, , refetch] = useCamp(search);
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

  const handleDeleteCamp = (camp) => {

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
        // console.log(camp.CampName);
        const res = await axiosSecure.delete(`/delete-camp/${camp._id}`);
        // console.log(res);
        if (res.data.deletedCount > 0) {
          refetch();
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: `${camp.CampName} has been deleted`,
            showConfirmButton: false,
            timer: 1500,
          });
        }
      }
    });
  };

  return (
    <div>
      <h2 className="text-4xl font-bold text-center my-8">Manage Camps</h2>

      {/* SearchBar Reusable Component..................... */}
      <div className="flex justify-end mt-10 mb-8">
        <SearchBar
          placeholder="Search camps..."
          searchTerm={search}
          setSearchTerm={handleSearch}
        />
      </div>

      <div className="overflow-x-auto shadow-md border border-gray-200 rounded-lg">
        <table className="table w-full table-auto">
          <thead className="bg-gray-800 text-white">
            <tr className="text-center">
              <th className="py-3 px-4 text-lg">#</th>
              <th className="py-3 px-4 text-lg">Camp Name</th>
              <th className="py-3 px-4 text-lg">Date & Time</th>
              <th className="py-3 px-4 text-lg">Location</th>
              <th className="py-3 px-4 text-lg">Healthcare Professional</th>
              <th className="py-3 px-4 text-lg">Action</th>
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
                <td className="py-3 px-4">{camp.dateTime}</td>
                <td className="py-3 px-4">{camp.location}</td>
                <td className="py-3 px-4">{camp.healthcareProfessional}</td>
                <td className="py-3 px-4">
                  <div className="flex justify-center gap-2">
                    {/* Update Button..................... */}
                    <Link to={`/dashboard/update-camp/${camp._id}`}>
                      <button className="btn btn-ghost btn-lg text-blue-600 hover:bg-blue-200 rounded-md transition-all">
                        <FaEdit />
                      </button>
                    </Link>
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

      {/* Pagination Footer */}
      <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                />
    </div>
  );
};

export default ManageCamps;
