import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import useCamp from "../hooks/useCamp";

const AvailableCamps = () => {
    const [search, setSearch] = useState('');
    const [sort, setSort] = useState('');

    const [camps, , refetch] = useCamp(search, sort);
    const [isTwoColumn, setIsTwoColumn] = useState(false);

    const toggleLayout = () => {
      setIsTwoColumn(!isTwoColumn);
    };
  

    return (
        <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold text-center my-8">Available Camps</h2>

            {/* Search and Sort Controls................ */}
            <div className="flex flex-col sm:flex-row gap-y-3 sm:gap-y-0 items-start sm:items-center justify-between mt-10 mb-14">
                {/* Search Input,,,,,,,,,,,,,,,, */}
                <input
                    type="text"
                    placeholder="Search camps..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="p-2 border"
                />

                {/* Sort Dropdown...................... */}
                <select
                    value={sort}
                    id={sort}
                    onChange={(e) => setSort(e.target.value)}
                    className="p-2 border"
                >
                    <option value="">Sort By</option>
                    <option value="most-registered">Most Registered</option>
                    <option value="camp-fees">Camp Fees</option>
                    <option value="alphabetical">Alphabetical Order</option>
                </select>
            </div>

            {/* Toggle Button */}
            <div className=" flex justify-end my-10">
                <button
                    onClick={toggleLayout}
                    className="px-4 py-2 bg-green-900 text-white font-semibold rounded hover:bg-green-800 transition duration-200"
                >
                    {isTwoColumn ? "Switch to 3 Columns" : "Switch to 2 Columns"}
                </button>
            </div>

            <div className={`grid gap-4 ${isTwoColumn ? "grid-cols-2" : "grid-cols-3"
                } transition-all duration-300`}>
                {camps.map((camp) => (
                    <div
                        key={camp._id}
                        className="bg-white shadow-lg rounded-lg overflow-hidden group transform transition duration-500 hover:scale-105"
                    >
                        {/* Camp Image */}
                        <img
                            src={camp.image}
                            alt={camp.campName}
                            className="w-full h-48 object-cover"
                        />
                        <div className="p-6">
                            {/* Camp Name */}
                            <h3 className="text-2xl font-bold text-gray-800">{camp.campName}</h3>

                            {/* Camp Details */}
                            <p className="text-sm font-medium mt-2">
                                <strong>Date & Time:</strong> {camp.dateTime}
                            </p>
                            <p className="text-sm font-medium mt-1">
                                <strong>Location:</strong> {camp.location}
                            </p>
                            <p className="text-sm font-medium mt-1">
                                <strong>Healthcare Professional:</strong> {camp.healthcareProfessional}
                            </p>
                            <p className="text-sm font-medium mt-1">
                                <strong>Participants:</strong> {camp.participants}
                            </p>

                            {/* Description */}
                            <p className="text-sm text-gray-600 mt-3">{camp.description.slice(0, 100)}...</p>

                            {/* Button to View Camp Details */}
                            <div className="mt-4 text-center">
                                <Link to={`/camp-details/${camp._id}`}>
                                    <button className="btn bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600">
                                        Details
                                    </button>
                                </Link>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AvailableCamps;
