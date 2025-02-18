import React from 'react';
import useAuth from '../../../hooks/useAuth';
import OrganizerProfile from './OrganizerProfile';
import { Helmet } from 'react-helmet-async';

const AdminHome = () => {
    const { user } = useAuth();
    return (
        <>
            <Helmet>
                <title>Medical Camp | Admin Dashboard</title>
            </Helmet>
            <div>
                <h2 className="text-lg sm:text-xl md:text-3xl my-10 text-center ">Welcome
                    <span className='text-green-900 font-bold dark:text-white'> Organizer!</span>

                </h2>

                <OrganizerProfile></OrganizerProfile>
            </div>
        </>

    );
};

export default AdminHome;