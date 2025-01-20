import { useEffect, useState } from "react";
import { FaBars, FaChevronLeft, FaChevronRight, FaHome, FaSignOutAlt } from "react-icons/fa";
import { NavLink, Outlet } from "react-router-dom";
import useAdmin from "../hooks/useAdmin";
import Skeleton from "react-loading-skeleton";
import OrganizerMenuItems from "../components/Dashboard/OrganizerMenuItems";
import UserMenuItems from "../components/Dashboard/UserMenuItems";
import useAuth from "../hooks/useAuth";

const Dashboard = () => {
    const [isAdmin, isAdminLoading] = useAdmin();
    const { signOutUser } = useAuth()
    const [open, setOpen] = useState(true); // Sidebar toggle state..

    if (isAdminLoading) {
        return (
            <div className="flex items-center min-h-screen justify-center">
                <Skeleton count={3} height={120} width={200} />
            </div>
        );
    }

    // const handleLogOut = () => {
    //     signOutUser()
    //         .then(() => {
    //             navigate('/')
    //         })
    //         .catch((err) => {
    //             const error = err.message;
    //         })
    // }

    return (
        <div className="flex">
            {/* Sidebar........................ */}
            <div
                className={`${open ? "w-64" : "w-20"
                    } bg-green-950 h-screen p-5 pt-8 relative duration-300`}
            >
                {/* Sidebar toggle button................. */}
                <button
                    className={`absolute -right-3 top-9   border-2 border-green-500 rounded-full bg-white flex items-center justify-center shadow-lg ${open ? "w-10 h-10" : "w-6 h-6 rotate-180"
                        } transition-transform duration-300`}
                    onClick={() => setOpen(!open)}
                >
                    <FaChevronLeft className="text-green-500 text-lg" />
                </button>

                <div className="flex items-center justify-center">

                    <h1
                        className={`text-white origin-left font-medium text-xl duration-200 ${!open && "scale-0"
                            }`}
                    >
                        Dashboard
                    </h1>
                </div>

                <ul className="pt-6">
                    {/* Menu items based on admin/user................... */}
                    {isAdmin ? (
                        <OrganizerMenuItems open={open} />
                    ) : (
                        <UserMenuItems open={open} />
                    )}
                    {/* Shared Nav Links ..............................*/}
                    <div className="divider border-t-2 border-white"></div>
                    <li className="mb-3">
                        <NavLink to="/" className="text-gray-300 text-sm flex items-center gap-x-2">
                            <FaHome className="text-xl" />
                            <span className={`${!open && "hidden"} origin-left duration-200`}>
                                Home
                            </span>
                        </NavLink>
                    </li>
                    {/* <li>
                        <button
                            onClick={handleLogOut} 
                            className="text-gray-300 text-sm flex items-center gap-x-2"
                        >
                            <FaSignOutAlt className="text-2xl" /> 
                            <span className={`${!open && "hidden"} origin-left duration-200`}>
                                Logout
                            </span>
                        </button>
                    </li> */}

                </ul>
            </div>

            {/* Main Content.................................... */}
            <div className="flex-1 p-8">
                <Outlet />
            </div>
        </div>
    );
};

export default Dashboard;
