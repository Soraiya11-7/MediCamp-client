import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";

const useCamp = (search, sort) => {
    const axiosPublic = useAxiosPublic();
  
    const {data: camps = [], isPending: loading, refetch} = useQuery({
        queryKey: ['camps', search, sort], 
        queryFn: async() =>{
            const res = await axiosPublic.get(`/camps?search=${search}&sort=${sort}`);
            return res.data;
        }
    })

    return [camps, loading, refetch]
}

export default useCamp;