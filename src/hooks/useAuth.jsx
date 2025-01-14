import { useContext } from "react";
import { AuthProviderContext } from "../Provider/AuthProvider";


const useAuth = () => {
    const auth = useContext(AuthProviderContext);
    return auth;
};

export default useAuth;