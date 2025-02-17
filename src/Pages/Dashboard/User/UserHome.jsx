import React from 'react';
import useAuth from '../../../hooks/useAuth';
import Analytics from './Analytics';
import { Helmet } from 'react-helmet-async';

const UserHome = () => {
    const {user} = useAuth();
    return (
        <div className='w-full'>
             <Helmet>
                <title>Medical Camp | Analytics</title>
            </Helmet>
          
            <Analytics></Analytics>

        </div>
    );
};

export default UserHome;