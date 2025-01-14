import React from 'react';
import { Link } from 'react-router-dom';

const Button = ({btnText, path='', center}) => {
    return (
        <div className={`flex ${center ? 'justify-center' : ''} items-center`}>
           <Link to={`/order/${path}`}>
            <button className="btn bg-green-950 hover:bg-white hover:border-green-900 hover:text-black text-white font-semibold btn-outline border-0 border-b-4 border-white mt-4">{btnText}</button>
            </Link>
           </div>
    );
};

export default Button;