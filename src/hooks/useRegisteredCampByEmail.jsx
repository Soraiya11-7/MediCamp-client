import { useQuery } from "@tanstack/react-query";
// import useAxiosPublic from "./useAxiosPublic";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";

const useRegisteredCampByEmail = (search) => {
    const axiosSecure = useAxiosSecure();
  

   const {user} = useAuth()
    const {data: camps = [], isPending: loading, refetch} = useQuery({
        queryKey: ['camps', user?.email, search],
        queryFn: async() => {
            const res = await axiosSecure.get(`/register-camps?email=${user?.email}&search=${search}`);
            return res.data;
        }
    })

    return [camps,loading, refetch]

};

export default useRegisteredCampByEmail;




