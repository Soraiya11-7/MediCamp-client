import { Link } from "react-router-dom";
import usePopularCamp from "../../hooks/usePopularCamp";
import Skeleton from "react-loading-skeleton";
import { MdDateRange, MdOutlineHealthAndSafety, MdOutlineLocationOn } from "react-icons/md";
import { FaStethoscope, FaUsers } from "react-icons/fa";

const PopularCamps = () => {
    const [camps, loading, refetch] = usePopularCamp();


    
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
      


    if (loading) {
        return <div className="flex items-center min-h-screen justify-center">
            <Skeleton count={3} height={120} width={200} />
        </div>
    }

  
    return (
        <div id="popular" className="w-[90%] mx-auto py-8  ">
            <h2 className="text-xl sm:text-2xl text-center md:text-3xl font-bold  mb-10 text-green-900">Popular Medical Camps</h2>
            {
                 camps.length === 0 ? (
                    <div className="text-center my-6">
                        <h3 className="text-xl text-gray-500">No  Camps Found.</h3>

                    </div>
                ) :
                    (<div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {camps.map((camp) => (
                                <div
                                    key={camp._id}
                                    className="relative bg-white p-4 rounded-lg shadow-lg overflow-hidden group transform transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:bg-green-800 border-2 border-green-800 "
                                    data-aos="flip-right"
                                    data-aos-easing="ease-out-cubic"

                                >
                                    {/* Camp Image */}
                                    <div className="relative overflow-hidden rounded-lg mb-4 border group-hover:border-yellow-700 h-60 w-full mx-auto shadow-xl">
                                        <img
                                            src={camp.image}
                                            alt={camp.campName}
                                            className="w-full h-full object-cover rounded-lg transition-all duration-300 group-hover:scale-110 border overflow-hidden group-hover:border-yellow-700"
                                        />
                                    </div>


                                    {/* Camp Details */}
                                    <div className="text-left">
                                        <h3 className=" mb-4 group-hover:text-yellow-500 transition-colors duration-300  text-base md:text-lg font-bold h-auto sm:min-h-[40px] sm:flex-grow">
                                            {camp.campName}
                                        </h3>

                                        <p className="group-hover:text-white transition-colors duration-300 text-xs sm:text-sm font-semibold text-gray-800 mb-2 flex items-center gap-1">
                                            <MdDateRange className="text-green-900 group-hover:text-white text-base" /> {formatDateTime(camp.dateTime)}
                                        </p>
                                        <p className=" group-hover:text-white transition-colors duration-300 text-xs sm:text-sm font-semibold text-gray-800 mb-2 flex items-center gap-1">
                                        <MdOutlineLocationOn className="text-green-900 group-hover:text-white text-lg" /> {camp.location}
                                        </p>
                                        {/* <p className="group-hover:text-white transition-colors duration-300 mb-3 text-xs sm:text-sm font-semibold text-gray-800">
                                            <strong>Fees:</strong> ${camp.fees}
                                        </p> */}
                                        <p className="group-hover:text-white transition-colors duration-300 mb-3 text-xs sm:text-sm font-semibold text-gray-800 flex items-center gap-1">
                                        <FaStethoscope className="text-green-900 group-hover:text-white text-sm" /> {camp.healthcareProfessional}
                                        </p>
                                        <p className="group-hover:text-white transition-colors duration-300 mb-3 text-xs sm:text-sm font-semibold text-gray-800 flex items-center gap-1">
                                        <FaUsers className="text-green-900 group-hover:text-white text-sm" /> {camp.participants}
                                        </p>
                                        <p className="text-gray-700 mb-4 group-hover:text-white transition-colors duration-300 text-sm h-auto sm:min-h-[40px] sm:flex-grow">
                                                        {camp.description.slice(0, 80)}...
                                                    </p>
                                        <div className="h-10"></div>



                                        {/* Button */}
                                        <div className="absolute left-0 right-2 bottom-3 flex justify-end">
                                            <Link to={`/camp-details/${camp._id}`}>
                                                <button className="py-2 px-6 border-2 border-green-800 bg-green-900 text-white font-semibold rounded-full inline-flex items-center justify-center gap-2 transition-all duration-300 group-hover:bg-white group-hover:text-green-900">
                                                    Details

                                                </button>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="flex justify-center items-center mt-10">
                            <Link to='/allCamps'>
                                <button className="py-2 px-6 border-2 border-green-900 bg-white text-green-950 font-bold rounded-full inline-flex items-center justify-center gap-2 transition-all duration-300 hover:bg-green-900 hover:text-white">
                                    See All Camps

                                </button>

                            </Link>
                        </div>
                    </div>)
            }

        </div>
    );
};

export default PopularCamps;
