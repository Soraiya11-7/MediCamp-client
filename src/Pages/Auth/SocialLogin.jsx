
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
            <div className="divider px-4">OR</div>
            <div className="flex justify-center items-center mb-3">
                <button onClick={handleGoogleSignIn} className='p-1 sm:p-2 flex items-center gap-1 rounded-xl border text-base sm:text-lg hover:border-green-700'><FcGoogle className='text-base sm:text-lg'></FcGoogle> Login with Google</button>
            </div>
        </div>
    );
};

export default SocialLogin;