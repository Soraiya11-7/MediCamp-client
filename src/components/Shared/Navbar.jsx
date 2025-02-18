import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import logo from "../../assets/mc2.png"
import useAdmin from "../../hooks/useAdmin";
import useProfileData from "../../hooks/useProfileData";
import { FaMoon, FaSun } from "react-icons/fa";


const Navbar = () => {
    const { user, signOutUser, darkMode,setDarkMode  } = useAuth();
    const [userInfo, isPending, refetch] = useProfileData();
     const [preview, setPreview] = useState('');
     const [name, setName] = useState('');
    const location = useLocation();
    const navigate = useNavigate();

    const [isAdmin] = useAdmin();

    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
          if (userInfo?.image) {
            setPreview(userInfo.image);
            setName(userInfo.name)
          } else {
            setPreview(user?.photoUR);
            setName(user?.displayName)
          }
        }, [userInfo, user]);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const [theme, setTheme] = useState('light');

    useEffect(() => {
        if (theme === 'dark') {
            setDarkMode(true);
            document.documentElement.classList.add('dark');
        } else {
            setDarkMode(false);
            document.documentElement.classList.remove('dark');
        }

    }, [theme]);

    const toggleTheme = () => {
        setTheme(theme === 'light' ? 'dark' : 'light');
    };


    // Check if the current route is the home page
    // const isHomePage = location.pathname === "/";

    // Navbar background classes
    const navbarClass = 
         darkMode
            ? "bg-gray-900 text-white"
            : "bg-green-950 "



    const links = <>

        <li><NavLink to='/'
            className={({ isActive }) =>
                `flex items-center gap-x-1  ${isActive ? 'text-yellow-500 font-bold' : 'text-white '}`
            }>Home</NavLink></li>
        <li><NavLink className={({ isActive }) =>
            `flex items-center gap-x-0.5  ${isActive ? 'text-yellow-500 font-bold' : 'text-white'}`
        } to='/allCamps'>Available Camps</NavLink></li>
         <li><NavLink className={({ isActive }) =>
            `flex items-center gap-x-0.5  ${isActive ? 'text-yellow-500 font-bold' : 'text-white'}`
        } to='/contact'>Contact Us</NavLink></li>
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
        <div className={`${navbarClass} container mx-auto sticky top-0 z-50`}>
            <div className={`navbar container w-[91%] mx-auto`}>
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn -ml-4 btn-ghost p-0 sm:p-2  text-white md:hidden">
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
                    <div className=" w-10 h-10 ">
                        <img className="w-full h-full overflow-hidden rounded-full object-cover" src={logo} alt="" />

                    </div>
                    <h2 className="text-xl text-white sm:text-2xl font-bold">MediCamp</h2>
                </div>


            </div>
            <div className="navbar-center hidden md:flex">
                <ul className="menu menu-horizontal px-1 space-x-2">
                    {links}

                </ul>
            </div>
            <div className="navbar-end flex  items-center gap-1 md:gap-2">
                <div className=" flex flex-col items-center relative mr-1">
                    {
                        user ?
                            <div className="flex items-center">
                                <div className="h-8 w-10 md:h-10 md:w-12  rounded-full px-1 " >
                                    <button onClick={toggleDropdown}
                                        className="flex items-center justify-center w-10 h-10 rounded-full overflow-hidden border border-gray-300">
                                        <img className=" h-full w-full  rounded-full object-cover overflow-hidden" src={preview}
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
                                                {name?.split(" ")[0]}
                                            </div>
                                            <hr className="border-gray-500" />

                                            {/* Dashboard Link..... */}
                                            <Link
                                                to={isAdmin ? "/dashboard/adminHome" : "/dashboard/userProfile"}
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
                <div className="flex justify-center items-center mt-1">
                <button
                    onClick={toggleTheme}
                    className="flex items-center  bg-white  p-0.5 rounded-full shadow-lg bg-gray-white dark:bg-gray-800 border border-white  transition-all duration-300"
                >
                    {theme === 'light' ? (
                        <FaMoon className="text-yellow-500 text-xs sm:text-base" />
                    ) : (
                        <FaSun className="text-orange-400 text-xs sm:text-base" />
                    )}
                   
                </button>
            </div>

            </div>

        </div>
        </div>
        
    );
};

export default Navbar;