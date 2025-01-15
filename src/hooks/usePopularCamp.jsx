import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";


const usePopularCamp = () => {
    const axiosPublic = useAxiosPublic();
  
    const {data: camps = [], isPending: loading, refetch} = useQuery({
        queryKey: ['popularCamps'], 
        queryFn: async() =>{
            const res = await axiosPublic.get('/popularCamps');
            return res.data;
        }
    })

    return [camps, loading, refetch]
};

export default usePopularCamp;