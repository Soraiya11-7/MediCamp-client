
import { Link } from "react-router-dom";
import usePopularCamp from "../../hooks/usePopularCamp";

const PopularCamps = () => {
    const [camps, , refetch] = usePopularCamp();

    return (
        <div className="container mx-auto px-4 py-8">
            <h2 className="text-4xl font-bold text-center my-8">Popular Medical Camps</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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

                            {/* Camp Fees */}
                            <p className="text-sm text-gray-600 mt-2">
                                <strong>Camp Fees:</strong> ${camp.fees}
                            </p>

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

export default PopularCamps;
