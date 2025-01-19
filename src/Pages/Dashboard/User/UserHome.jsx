import React from 'react';
import useAuth from '../../../hooks/useAuth';
import Analytics from './Analytics';

const UserHome = () => {
    const {user} = useAuth();
    return (
        <div className='w-full'>
          
            <Analytics></Analytics>

        </div>
    );
};

export default UserHome;