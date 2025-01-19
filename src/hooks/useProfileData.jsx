
import useAuth from './useAuth';
import useAxiosSecure from './useAxiosSecure';
import { useQuery } from '@tanstack/react-query';

const useProfileData = () => {
    const { user, loading } = useAuth();
    const axiosSecure = useAxiosSecure();
    const { data: userInfo=[], isPending, refetch  } = useQuery({

        queryKey: ['userInfo',user?.email, user ],
        enabled: !loading,
        queryFn: async () => {
            const res = await axiosSecure.get(`/users/${user.email}`);
            // console.log(res.data);
            return res.data;
        }
    })
    return [userInfo, isPending,refetch]
};


export default useProfileData;

