import React from "react";
import { FaList, FaCog, FaPlusCircle } from "react-icons/fa";
import { GiForestCamp } from "react-icons/gi";
import { MdManageAccounts, MdAssignment } from "react-icons/md";
import { SiManageiq } from "react-icons/si";
import { NavLink } from "react-router-dom";

const OrganizerMenuItems = ({ open }) => {
  const menuItems = [
    { title: "Organizer Profile", icon: <MdManageAccounts className="text-2xl " /> , to: "/dashboard/adminHome" },
    { title: "Add A Camp", icon: <FaPlusCircle className="text-2xl " /> , to: "/dashboard/addCamp" },
    { title: "Manage Camps", icon: <FaCog className="text-2xl " /> , to: "/dashboard/manageCamps" },
    { title: "Manage Registered Camps", icon: <MdAssignment className="text-2xl " /> , to: "/dashboard/manageRegisteredCamps" },
  ];

  return (
    <ul>
      {menuItems.map((item, index) => (
        <li
          key={index}
          className={`flex rounded-md p-2 cursor-pointer hover:bg-light-white text-gray-300 text-sm items-center gap-x-3`}
        >
          <NavLink
            to={item.to}
            className={({ isActive }) =>
              `flex items-center gap-x-4 ${isActive ? "text-yellow-500 font-bold" : "text-gray-200"}`
            }
          >
            {item.icon}
            <span className="hidden md:inline">{item.title}</span>
          </NavLink>
        </li>
      ))}
    </ul>
  );
};

export default OrganizerMenuItems;
