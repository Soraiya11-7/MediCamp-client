import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import useCamp from "../hooks/useCamp";
import SearchBar from "../components/Shared/SearchBar";
import LazyLoad from "react-lazyload";
// import Skeleton from "react-loading-skeleton";
import { Helmet } from "react-helmet-async";

const AvailableCamps = () => {
    const [search, setSearch] = useState('');
    const [sort, setSort] = useState('');

    const [camps, loading, refetch] = useCamp(search, sort);
    const [isTwoColumn, setIsTwoColumn] = useState(false);

    const toggleLayout = () => {
        setIsTwoColumn(!isTwoColumn);
    };



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





    //  if (loading) {
    //         return <div className="flex items-center min-h-screen justify-center">
    //             <Skeleton count={3} height={120} width={200} />
    //         </div>
    //     }
    // if(loading){
    //     return <div className="flex items-center min-h-screen justify-center">
    //         <Skeleton count={3} height={120} width={200} />
    //         {/* <span className="loading loading-infinity loading-lg flex items-center justify-center"></span> */}
    //     </div>
    // }

    return (
        <>
            <Helmet>
                <title>Medical Camp | Available Camps</title>
            </Helmet>
            <div className="dark:bg-gray-950">
                <div className="w-[90%] mx-auto  container py-10 ">
                    <h2 className="text-2xl md:text-4xl font-bold mb-2 text-center my-8 dark:text-white">Available Camps</h2>

                    {/* Search and Sort Controls................ */}
                    <div className="flex flex-col sm:flex-row gap-y-3 sm:gap-y-0 items-start sm:items-center justify-between mt-10 mb-10">
                        {/* Search Input,,,,,,,,,,,,,,,, */}
                        <SearchBar
                            placeholder="Search camps..."
                            searchTerm={search}
                            setSearchTerm={setSearch}
                        />

                        {/* Sort Dropdown...................... */}
                        <select
                            value={sort}
                            id={sort}
                            onChange={(e) => setSort(e.target.value)}
                            className="p-2 border-2 border-green-900 dark:border-yellow-600 dark:text-white dark:bg-gray-950 rounded-lg"
                        >
                            <option value="">Sort By</option>
                            <option value="most-registered">Most Registered</option>
                            <option value="camp-fees">Camp Fees</option>
                            <option value="alphabetical">Camp Name</option>
                        </select>
                    </div>

                    {/* Toggle Button */}
                    <div className=" flex justify-end my-10">
                        <button
                            onClick={toggleLayout}
                            className="hidden lg:block px-4 py-2 bg-green-950 dark:border-2 dark:border-white text-white font-semibold hover:bg-green-800 dark:bg-yellow-700 dark:hover:bg-yellow-600 transition duration-200 rounded-lg"
                        >
                            {isTwoColumn ? "Switch to 3 Columns" : "Switch to 2 Columns"}
                        </button>
                    </div>

                    {

                        loading ? (<div className="flex items-center justify-center">
                            <span className="loading loading-bars loading-lg flex items-center justify-center dark:text-white dark:bg-white text-green-800"></span>

                        </div>)
                            : camps.length === 0 ? (
                                <div className="text-center">
                                    <h3 className="text-xl text-gray-500 dark:text-white">No Camps Found.</h3>
                                </div>
                            )
                                : (
                                    <div className={`grid gap-4 w-[95%] mx-auto sm:w-full grid-cols-1 ${isTwoColumn ? "  sm:grid-cols-2" : " sm:grid-cols-2 lg:grid-cols-3"
                                        } transition-all duration-300 mb-10 `}>
                                        {camps.map((camp, index) => (
                                            <LazyLoad key={index} height={200} once debounce={400} >
                                                <div className="relative bg-white dark:bg-gray-950  p-4 rounded-lg shadow-lg overflow-hidden group transform transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:bg-green-950 border border-green-900 dark:border-white dark:text-white">

                                                    {/* Camp Image */}
                                                    <div className="relative overflow-hidden rounded-lg mb-4 h-60 w-full mx-auto shadow-xl">
                                                        <img
                                                            src={camp.image}
                                                            alt={camp.campName}
                                                            className="w-full h-full object-cover rounded-lg transition-all duration-300 group-hover:scale-110 overflow-hidden"
                                                        />
                                                    </div>

                                                    {/* Camp Details */}
                                                    <div className="text-left">
                                                        <h3 className="mb-4 text-black dark:text-yellow-500 group-hover:text-yellow-500 transition-colors duration-300 text-base md:text-lg font-bold h-auto sm:min-h-[40px] sm:flex-grow">
                                                            {camp.campName}
                                                        </h3>

                                                        <p className="group-hover:text-white dark:text-white transition-colors duration-300 text-xs sm:text-sm font-semibold text-gray-800 mb-2">
                                                            <strong>Date & Time:</strong> {formatDateTime(camp.dateTime)}
                                                        </p>
                                                        <p className="group-hover:text-white dark:text-white transition-colors duration-300 text-xs sm:text-sm font-semibold text-gray-800 mb-2">
                                                            <strong>Location:</strong> {camp.location}
                                                        </p>

                                                        <p className="group-hover:text-white dark:text-white transition-colors duration-300 mb-3 text-xs sm:text-sm font-semibold text-gray-800">
                                                            <strong>Healthcare Professional:</strong> {camp.healthcareProfessional}
                                                        </p>

                                                        <p className="text-gray-700 mb-4 group-hover:text-white dark:text-white transition-colors duration-300 text-sm h-auto sm:min-h-[40px] sm:flex-grow">
                                                            {camp.description.slice(0, 80)}...
                                                        </p>
                                                        <div className="h-10"></div>

                                                        {/* Button */}
                                                        <div className="absolute left-2 right-0 bottom-3 flex justify-left">
                                                            <Link to={`/camp-details/${camp._id}`}>
                                                                <button className="py-2 px-6 border-2 border-green-800 bg-white text-green-800 font-semibold rounded-full inline-flex items-center justify-center gap-2 transition-all duration-300 group-hover:border-white dark:text-white dark:bg-yellow-700 dark:group-hover:bg-white dark:border-white group-hover:text-green-900 dark:group-hover:text-yellow-700">
                                                                    Details
                                                                </button>
                                                            </Link>
                                                        </div>
                                                    </div>
                                                </div>


                                            </LazyLoad>


                                        ))}
                                    </div>
                                )
                    }


                </div>
            </div>


        </>

    );
};

export default AvailableCamps;
