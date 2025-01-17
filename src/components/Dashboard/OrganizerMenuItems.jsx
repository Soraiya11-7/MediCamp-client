import React from 'react';
import { FaList } from 'react-icons/fa';
import { GiForestCamp } from 'react-icons/gi';
import { MdManageAccounts } from 'react-icons/md';
import { SiManageiq } from 'react-icons/si';
import { NavLink } from 'react-router-dom';

const OrganizerMenuItems = () => {
    return (
        <div>
            <li>
                <NavLink to="/dashboard/adminHome" className='text-xs lg:text-sm'> 
                    <MdManageAccounts />
                    Organizer Profile</NavLink>
            </li>
            <li>
                <NavLink to="/dashboard/addCamp" className='text-xs lg:text-sm'>
                    <GiForestCamp />
                    Add A Camp</NavLink>
            </li>
            <li>
                <NavLink to="/dashboard/manageCamps" className='text-xs lg:text-sm'>
                    <FaList></FaList>
                    Manage Camps</NavLink>
            </li>
            <li>
                <NavLink to="/dashboard/manageRegisteredCamps" className='text-xs lg:text-sm'>
                    <SiManageiq />
                    Manage Registered Camps</NavLink>
            </li>
        </div>
    );
};

export default OrganizerMenuItems;