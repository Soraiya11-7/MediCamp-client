
import { Navigate, useLocation } from "react-router";
import useAuth from "../hooks/useAuth";
import Skeleton from "react-loading-skeleton";


const PrivateRoute = ({ children }) => {
    const { user, loading } = useAuth();
    const location = useLocation();

    if(loading){
        return <div className="flex items-center min-h-screen justify-center">
            <Skeleton count={3} height={120} width={200} />
            {/* <span className="loading loading-infinity loading-lg flex items-center justify-center"></span> */}
        </div>
    }

    if (user) {
        return children;
    }
    return <Navigate to="/login" state={{from: location}} replace></Navigate>
};

export default PrivateRoute;