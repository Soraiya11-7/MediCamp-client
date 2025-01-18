import React from 'react';
import { FaAd, FaCalendar, FaHome, FaList } from 'react-icons/fa';
import { NavLink } from 'react-router-dom';

const UserMenuItems = () => {
    return (
        <div>
            <li>
                <NavLink to="/dashboard/userHome" className='text-xs lg:text-sm'>
                    <FaHome></FaHome>
                    Analytics</NavLink>
            </li>
            <li>
                <NavLink to="/dashboard/history" className='text-xs lg:text-sm'>
                    <FaCalendar></FaCalendar>
                    Participant Profile</NavLink>
            </li>
            <li>
                <NavLink to="/dashboard/userRegisteredCamps" className='text-xs lg:text-sm'>
                    <FaAd></FaAd>
                    Registered Camps</NavLink>
            </li>
            <li>
                <NavLink to="/dashboard/paymentHistory" className='text-xs lg:text-sm'>
                    <FaList></FaList>
                    Payment History</NavLink>
            </li>
        </div>
    );
};

export default UserMenuItems;