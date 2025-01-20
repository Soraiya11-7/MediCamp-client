import React from "react";
import { FaList,FaCog ,FaPlusCircle} from "react-icons/fa";
import { GiForestCamp } from "react-icons/gi";
import { MdManageAccounts, MdAssignment } from "react-icons/md";
import { SiManageiq } from "react-icons/si";
import { NavLink } from "react-router-dom";

const OrganizerMenuItems = ({ open }) => {
  const menuItems = [
    { title: "Organizer Profile", icon: MdManageAccounts, to: "/dashboard/adminHome" },
    { title: "Add A Camp", icon: FaPlusCircle, to: "/dashboard/addCamp" },
    { title: "Manage Camps", icon: FaCog, to: "/dashboard/manageCamps" },
    { title: "Manage Registered Camps", icon: MdAssignment, to: "/dashboard/manageRegisteredCamps" },
  ];

  return (
    <ul>
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
    </ul>
  );
};

export default OrganizerMenuItems;
