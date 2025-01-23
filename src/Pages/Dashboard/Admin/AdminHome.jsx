import React from 'react';
import useAuth from '../../../hooks/useAuth';
import OrganizerProfile from './OrganizerProfile';

const AdminHome = () => {
    const {user} = useAuth();
    return (
        <div>
            <h2 className="text-lg sm:text-xl md:text-3xl my-10 text-center ">
            Hello,<span className='text-green-900 font-bold'> {user?.displayName?.split(' ')[0]}</span>, Welcome!
               
            </h2>

            <OrganizerProfile></OrganizerProfile>
        </div>
    );
};

export default AdminHome;