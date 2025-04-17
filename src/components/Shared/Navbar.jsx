import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import logo from "../../assets/mc2.png"
import useAdmin from "../../hooks/useAdmin";
import useProfileData from "../../hooks/useProfileData";
import { FaMoon, FaSignOutAlt, FaSun, FaThLarge, FaUser,} from "react-icons/fa";
import { Dropdown } from "antd";



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

    // const toggleDropdown = () => {
    //     setIsOpen(!isOpen);
    // };

   

    // const [theme, setTheme] = useState('light');
    const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');
    useEffect(() => {
        if (theme === 'dark') {
            setDarkMode(true);
            document.documentElement.classList.add('dark');
        } else {
            setDarkMode(false);
            document.documentElement.classList.remove('dark');
        }
        localStorage.setItem('theme', theme);

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
                `flex items-center gap-x-0.5  ${isActive ? 'text-yellow-500 font-bold' : 'text-white '}`
            }>Home</NavLink></li>
        <li><NavLink className={({ isActive }) =>
            `flex items-center gap-x-0.5  ${isActive ? 'text-yellow-500 font-bold' : 'text-white'}`
        } to='/allCamps'>Available Camps</NavLink></li>
         <li><NavLink className={({ isActive }) =>
            `flex items-center gap-x-0.5  ${isActive ? 'text-yellow-500 font-bold' : 'text-white'}`
        } to='/contact'>Contact Us</NavLink></li>
         <li><NavLink className={({ isActive }) =>
            `flex items-center   ${isActive ? 'text-yellow-500 font-bold' : 'text-white'}`
        } to='/about'>About Us</NavLink></li>
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

    
    const menuItems = [
        {
          label: (
            <span className="flex items-center gap-2 text-gray-700 font-bold">
              <FaUser className="text-green-800" /> {/* User Icon */}
              {name?.split(" ")[0]}
            </span>
          ),
          key: "0",
          disabled: true,
        },
        { type: "divider" },
        {
          label: (
            <Link
              to={isAdmin ? "/dashboard/adminHome" : "/dashboard/userProfile"}
              className="flex items-center gap-2 text-gray-700 hover:text-green-600"
            >
               <FaThLarge className="text-green-800" />
              Dashboard
            </Link>
          ),
          key: "1",
        },
        {
          label: (
            <button
              onClick={handleLogOut}
              className="flex items-center gap-2 w-full text-left text-gray-700 hover:text-black"
            >
              <FaSignOutAlt className="text-green-800" /> 
              Logout
            </button>
          ),
          key: "2",
        },
      ];


    return (
        <nav className={`${navbarClass} sticky top-0 z-50 shadow-md`}>
          <div className="w-[90%] container mx-auto  py-5 flex items-center justify-between">
            {/* Left Side - Logo....... */}
            <Link to="/" className="flex items-center space-x-2">
              <img src={logo} className="h-9 w-9 rounded-full object-cover" alt="logo" />
              <span className="text-xl font-bold text-white">MediCamp</span>
            </Link>
      
            {/* Center - Desktop Links */}
            <div className="hidden md:flex gap-6 items-center list-none m-0 p-0">
              {links}
            </div>
      
            {/* Right Side */}
            <div className="flex items-center  space-x-1 md:space-x-4">
              {/* Theme Toggle Button */}
              <div
                onClick={toggleTheme}
                className="w-14 h-8 flex items-center bg-gradient-to-r from-yellow-500 via-yellow-600 to-yellow-700 dark:from-gray-600 dark:via-gray-700 dark:to-gray-600 rounded-full px-1 cursor-pointer transition"
              >
                <div
                  className={`w-6 h-6 rounded-full bg-white text-yellow-500 dark:text-white shadow-md flex items-center justify-center text-lg transition-transform duration-300 ${
                    theme === "dark" ? "translate-x-6" : "translate-x-0"
                  }`}
                >
                  {theme === "dark" ? <FaMoon className="text-yellow-500 text-base" /> : <FaSun className="text-base" />}
                </div>
              </div>
      
              {/* User or Login */}
              {user ? (
                <Dropdown
                  menu={{ items: menuItems }}
                  trigger={["click"]}
                  placement="bottomRight"
                  getPopupContainer={(trigger) => trigger.parentElement}
                >
                  <button className="outline-none">
                    <img
                      src={preview}
                      alt="User"
                      className="w-9 h-9 rounded-full border border-gray-300 object-cover"
                    />
                  </button>
                </Dropdown>
              ) : (
                <Link
                  to="/login"
                  className="bg-white text-green-800 px-2 py-1.5 md:px-3 md:py-2 rounded-md font-semibold text-sm hover:bg-green-100 transition"
                >
                  Join Us
                </Link>
              )}
      
              {/* Hamburger Icon */}
              <button
                className="md:hidden text-white focus:outline-none"
                onClick={() => setIsOpen(!isOpen)}
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>
      
          {/* Mobile Menu */}
          <div
            className={`md:hidden fixed top-0 right-0 h-full w-64 bg-green-950 text-white z-40 transform transition-transform duration-300 ease-in-out ${
              isOpen ? "translate-x-0" : "translate-x-full"
            }`}
          >
            <div className="flex justify-between items-center p-4 border-b border-gray-700">
              <span className="text-lg font-bold">Menu</span>
              <button onClick={() => setIsOpen(false)}>
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <ul className="flex flex-col space-y-4 px-4 py-6">{links}</ul>
          </div>
      
          {/* Background overlay */}
          {isOpen && (
            <div
              className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
              onClick={() => setIsOpen(false)}
            />
          )}
        </nav>
      );
      
    
};

export default Navbar;