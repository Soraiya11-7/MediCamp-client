import { FaChartBar, FaCreditCard, FaListAlt, FaUser } from "react-icons/fa";
import { NavLink } from "react-router-dom";

const UserMenuItems = ({ open }) => {
  const menuItems = [
      { title: "Analytics", icon: <FaChartBar className="text-2xl text-gray-200" />, to: "/dashboard/userHome" },
      { title: "Participant Profile", icon: <FaUser className="text-2xl text-gray-200" />, to: "/dashboard/userProfile" },
      { title: "Registered Camps", icon: <FaListAlt className="text-2xl text-gray-200" />, to: "/dashboard/userRegisteredCamps" },
      { title: "Payment History", icon: <FaCreditCard className="text-2xl text-gray-200" />, to: "/dashboard/paymentHistory" },
  ];

  return (
      <>
          {menuItems.map((item, index) => (
              <li
                  key={index}
                  className={`flex rounded-md p-2 cursor-pointer hover:bg-light-white text-gray-300 text-sm items-center gap-x-4`}
              >
                  <NavLink
                      to={item.to}
                      className={({ isActive }) =>
                          `flex items-center gap-x-4 ${isActive ? "text-white font-bold" : ""}`
                      }
                  >
                      {item.icon}
                      <span className="hidden md:inline">{item.title}</span>
                  </NavLink>
              </li>
          ))}
      </>
  );
};

export default UserMenuItems;
