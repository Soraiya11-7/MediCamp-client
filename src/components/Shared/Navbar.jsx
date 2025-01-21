import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import useAuth from "../../hooks/useAuth";
import logo from "../../assets/mc2.png"
import useAdmin from "../../hooks/useAdmin";


const Navbar = () => {
    const { user, signOutUser } = useAuth();
    const location = useLocation();
    const navigate = useNavigate();

    const [isAdmin] = useAdmin();

    const [isOpen, setIsOpen] = useState(false);
    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };



    const links = <>

        <li><NavLink to='/'
            className={({ isActive }) =>
                `flex items-center gap-x-1  ${isActive ? 'text-yellow-400 font-bold' : 'text-white '}`
            }>Home</NavLink></li>
        <li><NavLink className={({ isActive }) =>
            `flex items-center gap-x-0.5  ${isActive ? 'text-yellow-400 font-bold' : 'text-white'}`
        } to='/allCamps'>Available Camps</NavLink></li>
    </>

    const handleLogOut = () => {
        signOutUser()
            .then(() => {
                navigate('/')
            })
            .catch((err) => {
                const error = err.message;
            })
            setIsOpen(false)

    }
    return (
        <div className={`navbar bg-sky-500 w-[90%] mx-auto p-2 md:p-4`}>
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost p-0 sm:p-2 ml-1 md:hidden">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor">
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M4 6h16M4 12h8m-8 6h16" />
                        </svg>
                    </div>
                    <ul
                        tabIndex={0}
                        className="menu menu-sm dropdown-content bg-black rounded-box z-[1] mt-3 w-52 p-2 shadow ">
                        {links}
                    </ul>
                </div>
               
                <div className="flex gap-1 items-center">
                    <div className=" w-10 h-10 md:w-12 md:h-12">
                        <img className="w-full h-full overflow-hidden rounded-full object-cover" src={logo} alt="" />

                    </div>
                    <h2 className="text-2xl font-bold">MediCamp</h2>
                </div>


            </div>
            <div className="navbar-center hidden md:flex">
                <ul className="menu menu-horizontal px-1 -space-x-1">
                    {links}

                </ul>
            </div>
            <div className="navbar-end flex  items-center gap-0.5 md:gap-2">
                <div className=" flex flex-col items-center relative">
                    {
                        user ?
                            <div className="flex items-center">
                                <div className="h-10 w-12 md:h-12 md:w-14  rounded-full px-1 " >
                                    <button onClick={toggleDropdown}
                                        className="flex items-center justify-center w-10 h-10 rounded-full overflow-hidden border border-gray-300">
                                        <img className=" h-full w-full  rounded-full object-cover overflow-hidden" src={user?.photoURL}
                                            alt="image"
                                        />
                                    </button>

                                </div>
                                {/* Dropdown Menu ............*/}
                                {isOpen && (
                                    <div className=" absolute right-0 mt-44 w-40 bg-white rounded-md shadow-lg z-10">
                                        <div className="py-2">
                                            {/* User Name............ */}
                                            <div className="px-4 py-2 text-gray-700 font-medium">
                                                {user?.displayName?.split(" ")[0]}
                                            </div>
                                            <hr className="border-gray-500" />

                                            {/* Dashboard Link..... */}
                                            <Link
                                                to={isAdmin ? "/dashboard/adminHome" : "/dashboard/userHome"}
                                                className="block px-4 py-2 text-gray-700 hover:bg-gray-100 transition"
                                            >
                                                Dashboard
                                            </Link>

                                            {/* Logout Button......... */}
                                            <button
                                                onClick={handleLogOut}
                                                className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 transition"
                                            >
                                                Logout
                                            </button>
                                        </div>
                                    </div>
                                )}

                            </div>

                            :
                            (<Link to='/login' className="bg-white text-black md:px-3 md:py-3 px-2 py-2 font-medium md:font-bold text-sm md:text-base rounded-xl">Join Us</Link>)
                    }

                </div>

            </div>

        </div>
    );
};

export default Navbar;