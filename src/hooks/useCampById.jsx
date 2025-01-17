
import useAxiosPublic from './useAxiosPublic';
import { useQuery } from '@tanstack/react-query';

const useCampById = (campId) => {
    const axiosPublic = useAxiosPublic();
  
    const {
        data: camp = {},
        isLoading,
        refetch,
      } = useQuery({
        queryKey: ['camp', campId],
        queryFn: async () => {
          const { data } = await axiosPublic(`/camps/${campId}`)
          return data
        },
      })
  
      return [camp, isLoading, refetch]
};

export default useCampById;

