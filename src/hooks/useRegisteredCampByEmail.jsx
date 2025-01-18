import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";
import useAuth from "./useAuth";

const useRegisteredCampByEmail = (search) => {
    // const axiosSecure = useAxiosSecure();
    const axiosPublic = useAxiosPublic();

   const {user} = useAuth()
    const {data: camps = [], isPending: loading, refetch} = useQuery({
        queryKey: ['cart', user?.email, search],
        queryFn: async() => {
            const res = await axiosPublic.get(`/register-camps?email=${user?.email}&search=${search}`);
            return res.data;
        }
    })

    return [camps,loading, refetch]

};

export default useRegisteredCampByEmail;




