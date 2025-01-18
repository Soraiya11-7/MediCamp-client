
// import useAxiosPublic from './useAxiosPublic';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from './useAxiosSecure';

const useCampById = (campId) => {
    // const axiosPublic = useAxiosPublic();
    const axiosSecure = useAxiosSecure();
  
    const {
        data: camp = {},
        isLoading,
        refetch,
      } = useQuery({
        queryKey: ['camp', campId],
        queryFn: async () => {
          const { data } = await axiosSecure(`/camps/${campId}`)
          return data
        },
      })
  
      return [camp, isLoading, refetch]
};

export default useCampById;

