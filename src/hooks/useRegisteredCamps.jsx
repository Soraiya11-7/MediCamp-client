import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";


const useRegisteredCamps = (search) => {
    const axiosPublic = useAxiosPublic();
  
    const {data: registeredCamps = [], isPending: loading, refetch} = useQuery({
        queryKey: ['registeredCamps', search], 
        queryFn: async() =>{
            const res = await axiosPublic.get(`/register-participant?search=${search}`);
            return res.data;
        }
    })

    return [registeredCamps, loading, refetch]
}

export default useRegisteredCamps;