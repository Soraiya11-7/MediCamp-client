import React from 'react';
import useAuth from '../../../hooks/useAuth';
import OrganizerProfile from './OrganizerProfile';

const AdminHome = () => {
    const {user} = useAuth();
    return (
        <div>
            <h2 className="text-3xl">
                <span>Hi Organizer, Welcome!</span>
                {
                    user?.displayName ? user.displayName : 'Back'
                }
            </h2>

            <OrganizerProfile></OrganizerProfile>
        </div>
    );
};

export default AdminHome;