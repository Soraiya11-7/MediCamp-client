import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";


const useRegisteredCamps = (search) => {
    const axiosSecure = useAxiosSecure();
  
    const {data: registeredCamps = [], isPending: loading, refetch} = useQuery({
        queryKey: ['registeredCamps', search], 
        queryFn: async() =>{
            const res = await axiosSecure.get(`/register-participant?search=${search}`);
            return res.data;
        }
    })

    return [registeredCamps, loading, refetch]
}

export default useRegisteredCamps;