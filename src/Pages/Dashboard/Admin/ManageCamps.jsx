import { FaEdit, FaTrashAlt } from "react-icons/fa";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import useCamp from "../../../hooks/useCamp";
import { useState } from "react";
import SearchBar from "../../../components/Shared/SearchBar";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Pagination from "../../../components/Shared/Pagination";
// import Skeleton from "react-loading-skeleton";
import { Helmet } from "react-helmet-async";

const ManageCamps = () => {
  const [search, setSearch] = useState('');
  const [camps, loading, refetch] = useCamp(search);
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



  //date time format....
  const formatDateTime = (dateTime) => {
    const [datePart, timePart] = dateTime.split(" | ");
    const [startTime, endTime] = timePart.split(" - ");

    const formatTime = (time) => {
      const [hour, minute] = time.split(":").map(Number);
      const isPM = hour >= 12;
      const formattedHour = hour % 12 || 12; // Convert 0 to 12 for 12-hour format
      return `${formattedHour.toString().padStart(2, "0")}:${minute
        .toString()
        .padStart(2, "0")} ${isPM ? "PM" : "AM"}`;
    };

    return `${datePart} | ${formatTime(startTime)} - ${formatTime(endTime)}`;
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
            title: `Camp has been deleted`,
            showConfirmButton: false,
            timer: 1500,
          });
        }
      }
    }).catch((err) => {
      // console.error("Error updating profile:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Something went wrong. Please try again later.",
      });
    })
  };

  // if (loading) {
  //   return (
  //     <div className="flex items-center min-h-screen justify-center">
  //       <Skeleton count={3} height={120} width={200} />
  //     </div>
  //   );
  // }

  return (
    <>
      <Helmet>
        <title>Admin Dashboard | All Camps</title>
      </Helmet>
      <div>
        <h2 className="text-xl sm:text-2xl md:text-4xl font-bold text-center my-8">Manage Camps</h2>

        {/* SearchBar Reusable Component..................... */}
        <div className="flex justify-end mt-10 mb-8">
          <SearchBar
            placeholder="Search camps..."
            searchTerm={search}
            setSearchTerm={handleSearch}
          />
        </div>

        {
         
         loading ? (<div className="flex items-center justify-center">
          <span className="loading loading-bars mt-10 loading-lg flex items-center justify-center dark:text-white dark:bg-white text-green-800"></span>
         
      </div>)
          
            : camps && camps.length === 0 ? (
              <div className="text-center">
                <h3 className="text-lg md:text-xl font-bold text-gray-800 dark:text-white mb-3 mt-10">No camps have been added yet.</h3>

                <p className='text-sm sm:text-base w-[80%] mx-auto dark:text-white'>Please add camps to allow users to register and participate.</p>
              </div>
            ) : (<div>

              <div className="overflow-x-auto shadow-md border border-gray-200 rounded-lg">
                <table className="table w-full table-auto">
                  <thead className="bg-green-800 text-white">
                    <tr className="text-center">
                      <th className="py-1 px-2 text-sm md:text-base lg:text-lg">#</th>
                      <th className="py-1 px-2 text-sm md:text-base lg:text-lg">Camp Name</th>
                      <th className="py-1 px-2 text-sm md:text-base lg:text-lg">Date & Time</th>
                      <th className="py-1 px-2 text-sm md:text-base lg:text-lg">Location</th>
                      <th className="py-1 px-2 text-sm md:text-base lg:text-lg">Healthcare Professional</th>
                      <th className="py-1 px-2 text-sm md:text-base lg:text-lg">Action</th>
                    </tr>
                  </thead>
                  <tbody className="text-center bg-gray-50 dark:text-black">
                    {currentTableData.map((camp, index) => (
                      <tr
                        key={camp._id}
                        className="border-t hover:bg-gray-50 transition-all duration-300"
                      >
                        <td className="py-1 px-2 text-xs sm:text-sm md:text-base">{index + 1}</td>
                        <td className="py-1 px-2 text-xs sm:text-sm md:text-base">{camp.campName}</td>
                        <td className="py-1 px-2 text-xs sm:text-sm md:text-base">{formatDateTime(camp.dateTime)}</td>
                        <td className="py-1 px-2 text-xs sm:text-sm md:text-base">{camp.location}</td>
                        <td className="py-1 px-2 text-xs sm:text-sm md:text-base">{camp.healthcareProfessional}</td>
                        <td className="py-1 px-2 text-xs sm:text-sm md:text-base">
                          <div className="flex justify-center gap-2">
                            {/* Update Button..................... */}
                            <Link to={`/dashboard/update-camp/${camp._id}`}>
                              <button className="btn btn-sm text-green-800 hover:bg-blue-200 rounded-md transition-all">
                                <FaEdit />
                              </button>
                            </Link>
                            {/* Delete Button .........................*/}
                            <button
                              onClick={() => handleDeleteCamp(camp)}
                              className="btn btn-sm text-red-600 hover:bg-red-200 rounded-md transition-all"
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
            </div>)
        }

      </div>
    </>

  );
};

export default ManageCamps;
