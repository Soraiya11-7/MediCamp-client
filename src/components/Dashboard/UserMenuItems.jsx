
import React from "react";
import { FaListAlt, FaUser, FaChartBar, FaCreditCard } from "react-icons/fa";
import { NavLink } from "react-router-dom";

const UserMenuItems = ({ open }) => {
  const menuItems = [
    { title: "Analytics", icon: FaChartBar, to: "/dashboard/userHome" },
    { title: "Participant Profile", icon: FaUser, to: "/dashboard/userProfile" },
    { title: "Registered Camps", icon: FaListAlt, to: "/dashboard/userRegisteredCamps" },
    { title: "Payment History", icon: FaCreditCard, to: "/dashboard/paymentHistory" },
  ];

  return (
    <>
       {menuItems.map((item, index) => (
              <li
                key={index}
                className={`flex rounded-md p-2 cursor-pointer hover:bg-light-white text-gray-300 text-sm items-center gap-x-4 
                  ${item.gap ? "mt-9" : "mt-2"} ${index === 0 && "bg-light-white"}`}
              >
                <NavLink
                  to={item.to}
                  className={({ isActive }) =>
                    `flex items-center gap-x-4 ${isActive ? "text-white font-bold" : ""}`
                  }
                >
                  {React.createElement(item.icon, { className: "text-2xl text-gray-200" })} {/* Render Icon.......... */}
                  <span className={`${!open && "hidden"} origin-left duration-200`}>
                    {item.title}
                  </span>
                </NavLink>
              </li>
            ))}
    </>
  );
};

export default UserMenuItems;
