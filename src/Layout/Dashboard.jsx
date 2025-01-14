import { FaBars, FaHome } from "react-icons/fa";
import { NavLink, Outlet } from "react-router-dom";
import useAdmin from "../hooks/useAdmin";
import Skeleton from "react-loading-skeleton";
import OrganizerMenuItems from "../components/Dashboard/OrganizerMenuItems";
import UserMenuItems from "../components/Dashboard/UsermenuItems";

const Dashboard = () => {
    const [isAdmin, isAdminLoading] = useAdmin();


    if (isAdminLoading) {
        return <div className="flex items-center min-h-screen justify-center">
            <Skeleton count={3} height={120} width={200} />
        </div>;
    }


    return (
        <div className="flex" >
            {/* dashboard side bar............... */}
            {/* Hamburger icon for mobile */}
            <div className="dropdown">
                <div tabIndex={ 0}
                 role="button" 
                 className="btn btn-ghost p-0  ml-5 mt-5 md:hidden"
                   >
                    <FaBars className="h-5 w-5 text-black" />
                </div>
                
                <ul tabIndex={ 0}
                    className={` menu menu-sm dropdown-content min-h-fit bg-green-950 text-white z-[1] w-60 lg:w-64 p-2 shadow ml-1 `}>
                        {
                            isAdmin ?
                                <OrganizerMenuItems></OrganizerMenuItems>
                                :
                                <UserMenuItems></UserMenuItems>
                        }

                        {/* shared nav links.............. */}
                        <div className="divider border-t-2 border-white"></div>
                        <li>
                            <NavLink to="/">
                                <FaHome></FaHome>
                                Home</NavLink>
                        </li>
                    </ul>
            </div>

            <div className={`w-60 lg:w-64 min-h-screen bg-green-950 text-white hidden md:block`}>
                    <ul className="menu p-4">
                        {
                            isAdmin ?
                                <OrganizerMenuItems></OrganizerMenuItems>
                                :
                                <UserMenuItems></UserMenuItems>
                        }

                       
                        <div className="divider border-t-2 border-white"></div>
                        <li>
                            <NavLink to="/" className='text-xs lg:text-sm'>
                                <FaHome></FaHome>
                                Home</NavLink>
                        </li>
                    </ul>
                </div>

            {/* dashboard content here........... */}
            <div className="flex-1 p-8">
                <Outlet></Outlet>
            </div>
        </div>
    );
};

export default Dashboard;