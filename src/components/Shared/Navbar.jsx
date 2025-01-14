import { Link, NavLink, useLoaderData, useLocation, useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { Tooltip } from "react-tooltip";
import { AuthProviderContext } from "../Provider/AuthProvider";
import logo from "../assets/bl2.png"


const Navbar = () => {
    const { user, signOutUser } = useContext(AuthProviderContext);

    const location = useLocation();
    const [showTooltip, setShowTooltip] = useState(false);
    // const location = useLoaderData();
    const navigate = useNavigate();
    

    const links = <>

        <li><NavLink to='/'
            className={({ isActive }) =>
                `flex items-center gap-x-1  ${isActive ? 'text-yellow-400 font-bold' : 'text-white '}`
            }>Home</NavLink></li>
        <li><NavLink className={({ isActive }) =>
            `flex items-center gap-x-0.5  ${isActive ? 'text-yellow-400 font-bold' : 'text-white'}`
        } to='/blogs'>All Blogs</NavLink></li>

        {
            user && (
                <li>
                    <NavLink
                        className={({ isActive }) =>
                            `flex items-center ${isActive ? 'text-yellow-400 font-bold' : 'text-white'}`
                        }
                        to='/addBlog'
                    >
                        Add Blog
                    </NavLink>
                </li>
            )
                
        }
        <li><NavLink className={({ isActive }) =>
            `flex items-center gap-x-0.5  ${isActive ? 'text-yellow-400 font-bold' : 'text-white'}`
        } to='/featuredBlogs'>Featured Blogs</NavLink></li>
        {
            user && <>
                <li> <NavLink className={({ isActive }) =>
                    `flex items-center gap-0 ${isActive ? 'text-yellow-400 font-bold' : 'text-white'}`
                } to='/wishlist'> WishList</NavLink></li>
            </>
        }


    </>

    const handleLogOut = () => {
        signOutUser()
        .then(() => {
            navigate('/')
        })
        .catch((err) => {
            const error = err.message;
        })
      
    }
    return (
        <div className={`navbar bg-sky-500  w-[80%] mx-auto p-2 md:p-4`}>
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost p-0 sm:p-2 ml-1 lg:hidden">
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
                {/* <div className="avatar w-12 h-8 md:w-20 md:h-14">
                    <img className="w-full h-full overflow-hidden rounded-xl object-cover" src={logo} alt="" />
                </div> */}
                
                <div className=" w-12 h-8 md:w-20 md:h-14"><img className="w-full h-full overflow-hidden rounded-xl object-cover" src={logo} alt="" /></div>
            

            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1 -space-x-1">
                    {links}

                </ul>
            </div>
            <div className="navbar-end flex  items-center gap-0.5 md:gap-2">
                <div className=" flex flex-col items-center">
                    {
                        user ?
                            <div className="flex items-center">
                                <div className="h-10 w-12 md:h-12 md:w-14 rounded-full px-1 relative" id='click' onMouseEnter={() => setShowTooltip(true)}
                                    onMouseLeave={() => setShowTooltip(false)}>
                                    <img className=" h-full w-full  rounded-full object-cover overflow-hidden" src={user?.photoURL}
                                        alt="Avatar image"
                                    />
                                    <Tooltip className="z-10" anchorSelect="#click" clickable>
                                        <button> {user?.displayName}</button>
                                    </Tooltip>

                                </div>
                               

                            </div>
                            :

                            (<Link to='/auth/login' className="bg-white text-black md:px-3 md:py-3 px-2 py-2 font-medium md:font-bold text-sm md:text-base rounded-xl">Login</Link>)
                    }

                </div>
                <div>
                    {
                        user && user?.email ?
                            (<button onClick={handleLogOut} className="bg-white text-black md:px-3 md:py-3 px-2 py-2 font-medium md:font-bold text-sm md:text-base rounded-xl ">LogOut</button>)
                            :
                            (<Link to='/auth/register' className=" bg-white text-black md:px-3 md:py-3 px-2 py-2 font-medium md:font-bold text-sm md:text-base rounded-xl ">Register</Link>)
                    }
                </div>

            </div>

        </div>
    );
};

export default Navbar;