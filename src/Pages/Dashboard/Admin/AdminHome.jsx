import React from 'react';
import useAuth from '../../../hooks/useAuth';
import OrganizerProfile from './OrganizerProfile';

const AdminHome = () => {
    const {user} = useAuth();
    return (
        <div>
            <h2 className="text-xl md:text-3xl mb-6 ">
                <span>Hello, {
                    user?.displayName ? user.displayName : 'Back'
                }, Welcome!</span>
               
            </h2>

            <OrganizerProfile></OrganizerProfile>
        </div>
    );
};

export default AdminHome;