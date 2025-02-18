import { useState } from "react";
import { FaBars, FaHome } from "react-icons/fa";
import { NavLink, Outlet } from "react-router-dom";
import useAdmin from "../hooks/useAdmin";
import Skeleton from "react-loading-skeleton";
import OrganizerMenuItems from "../components/Dashboard/OrganizerMenuItems";
import UserMenuItems from "../components/Dashboard/UserMenuItems";
import ThemeToggleButton from "../components/Dashboard/ThemeToggleButton";

const Dashboard = () => {
    const [isAdmin, isAdminLoading] = useAdmin();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Toggle sidebar for small devices

    if (isAdminLoading) {
        return (
            <div className="flex items-center min-h-screen justify-center">
                <Skeleton count={3} height={120} width={200} />
            </div>
        );
    }

    return (
        <div className="flex dark:bg-gray-800 dark:text-white container w-full mx-auto border border-red-600">
             
            {/* Hamburger Button for Small Devices */}
            <button
                className={`md:hidden absolute top-5   text-2xl z-50 ${
                    isSidebarOpen ? "text-white" : "text-black"
                }`}
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            >
                <FaBars />
            </button>

            {/* Sidebar */}
            <div
                className={`bg-green-950 min-h-screen p-5 pt-8 transition-all duration-300 fixed md:relative z-40 ${
                    isSidebarOpen ? "block w-20" : "hidden"
                } md:block md:w-64`}
            >
                <div className="flex items-center justify-center mb-6">
                    <h1 className="text-white font-medium text-xl hidden md:block">
                        Dashboard
                    </h1>
                </div>
                <ul className="pt-6 space-y-4">
                    {/* Admin/User menu items */}
                    {isAdmin ? (
                        <OrganizerMenuItems open={isSidebarOpen} />
                    ) : (
                        <UserMenuItems open={isSidebarOpen} />
                    )}

                    {/* Shared Nav Links */}
                    <div className="divider border-t-2 border-white"></div>
                    <li>
                        <NavLink
                            to="/"
                            className="text-gray-300 text-sm flex items-center gap-x-4"
                        >
                            <FaHome className="text-xl" />
                            {/* Show text only on md+ devices */}
                            <span className="hidden md:inline">Home</span>
                        </NavLink>
                    </li>
                </ul>
            </div>

            {/* Main Content */}
            <div className="flex-1 p-8 overflow-x-auto relative">
            <div className="absolute top-5 right-5 z-50">
                <ThemeToggleButton />
            </div>
                <Outlet />
            </div>
        </div>
    );
};

export default Dashboard;
