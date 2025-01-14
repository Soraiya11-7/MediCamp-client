
import { useNavigate } from "react-router-dom";


import { FcGoogle } from "react-icons/fc";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import useAuth from "../../hooks/useAuth";


const SocialLogin = () => {
    const { signInWithGoogle } = useAuth();
    const axiosPublic = useAxiosPublic();
    const navigate = useNavigate();

    const handleGoogleSignIn = () =>{
        signInWithGoogle()
        .then(result =>{
            // console.log(result.user);
            const userInfo = {
                email: result.user?.email,
                name: result.user?.displayName
            }
            axiosPublic.post('/users', userInfo)
            .then(res =>{
                // console.log(res.data);
                navigate('/');
            })
        })
    }

    return (
        <div className="">
            <div className="divider px-4">OR</div>
            <div className="flex justify-center items-center mb-3">
            <button onClick={handleGoogleSignIn} className='p-1 sm:p-2 flex items-center gap-1 rounded-xl border text-base sm:text-lg hover:border-sky-500'><FcGoogle className='text-base sm:text-lg'></FcGoogle> Login with Google</button>
            </div>
        </div>
    );
};

export default SocialLogin;