
import { useLocation, useNavigate } from "react-router-dom";


import { FcGoogle } from "react-icons/fc";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import useAuth from "../../hooks/useAuth";
import { toast } from "react-toastify";
import Swal from "sweetalert2";


const SocialLogin = () => {
    const { signInWithGoogle } = useAuth();
    const axiosPublic = useAxiosPublic();
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from || "/";
    // console.log(from);

    const handleGoogleSignIn = () => {
        signInWithGoogle()
            .then(result => {
                // console.log(result.user);
                const userInfo = {
                    email: result.user?.email,
                    name: result.user?.displayName,
                    image: result.user?.photoURL
                }
                axiosPublic.post('/users', userInfo)
                    .then(res => {

                        Swal.fire({
                            title: 'User Login Successful.',
                            showClass: {
                                popup: 'animate__animated animate__fadeInDown'
                            },
                            hideClass: {
                                popup: 'animate__animated animate__fadeOutUp'
                            }
                        });
                        // console.log(res.data);
                        navigate(from, { replace: true });
                    })
            })
            .catch((err) => {
                // setError({ ...error, login: err.code })
                const errorMessage = err.message;
                const errorCode = errorMessage.match(/\(([^)]+)\)/)?.[1];
                // setError(errorCode );
                toast.error(errorCode || "An unexpected error occurred", {
                    position: "top-center",
                    autoClose: 2000,
                });

            });
    }

    return (
        <div className="">
            <div className="flex items-center gap-4 px-8 mb-4">
                <div className="flex-grow h-px bg-gray-800 dark:bg-gray-600"></div>
                <span className="text-gray-500 dark:text-gray-300 text-sm">OR</span>
                <div className="flex-grow h-px bg-gray-800 dark:bg-gray-600"></div>
            </div>

            <div className="flex justify-center items-center mb-3">
                <button onClick={handleGoogleSignIn} className='dark:text-white p-1 sm:p-2 flex items-center gap-1 rounded-xl border text-base sm:text-lg hover:border-green-700'><FcGoogle className='text-base sm:text-lg'></FcGoogle> Login with Google</button>
            </div>
        </div>
    );
};

export default SocialLogin;