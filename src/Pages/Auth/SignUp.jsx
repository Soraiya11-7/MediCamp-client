import { useState } from "react";

import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import Swal from 'sweetalert2'
import useAxiosPublic from "../../hooks/useAxiosPublic";
import useAuth from "../../hooks/useAuth";
import SocialLogin from "./SocialLogin";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { toast } from "react-toastify";
import { Helmet } from "react-helmet-async";


const SignUp = () => {

    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const { createUser, updateUserProfile, setUser } = useAuth();
    const navigate = useNavigate();
    const axiosPublic = useAxiosPublic();


    const [showSecretKey, setShowSecretKey] = useState(false);

    const onSubmit = data => {
        // console.log(data);
        createUser(data.email, data.password)
            .then(result => {
                const loggedUser = result.user;
                // console.log(loggedUser);
                updateUserProfile({ displayName: data.name, photoURL: data.photoURL })
                    .then(() => {
                        setUser({
                            ...result.user,
                            displayName: data.name,
                            photoURL: data.photoURL,
                        });

                        const userInfo = {
                            name: data.name,
                            email: data.email,
                            image: data.photoURL
                        }

                        axiosPublic.post('/users', userInfo)
                            .then(res => {
                                // console.log(res);
                                if (res.data.insertedId) {
                                    // console.log('user added to the database')

                                    Swal.fire({
                                        position: 'top-end',
                                        icon: 'success',
                                        title: 'User created successfully.',
                                        showConfirmButton: false,
                                        timer: 1500
                                    });
                                    navigate('/');
                                }
                                else if (res.data.message === "user already exists") {
                                    toast.error("User already exists. Please log in.", {
                                        position: "top-center",
                                        autoClose: 2000,
                                    });
                                }
                            })
                            .catch((err) => {
                                //  console.log(err);
                                const errorMessage = err.message;
                                const errorCode = errorMessage.match(/\(([^)]+)\)/)?.[1];
                                // setError(errorCode);
                                toast.error(errorCode || "An unexpected error occurred", {
                                    position: "top-center",
                                    autoClose: 2000,
                                });
                                // console.log(error)
                            })
                        reset();

                    })
                    .catch((err) => {
                        // console.log(err);
                        const errorMessage = err.message;
                        const errorCode = errorMessage.match(/\(([^)]+)\)/)?.[1];
                        // setError(errorCode);
                        toast.error(errorCode || "An unexpected error occurred", {
                            position: "top-center",
                            autoClose: 2000,
                        });
                        // console.log(error)
                    })
            })
            .catch((err) => {
                // console.log(err);
                const errorMessage = err.message;
                const errorCode = errorMessage.match(/\(([^)]+)\)/)?.[1];
                // setError(errorCode);
                toast.error(errorCode || "An unexpected error occurred", {
                    position: "top-center",
                    autoClose: 2000,
                });
                // console.log(error)
            })
    };

    return (
        <>
            <Helmet>
                <title>Medical Camp | SignUp</title>
            </Helmet>
            <div className='dark:bg-gray-950 bg-opacity-50'>
  <div className="hero min-h-screen w-[90%] mx-auto flex justify-center py-8 items-center">
    <div className="card bg-base-100 dark:bg-gray-900 w-[90%] sm:w-[60%] md:w-[50%] lg:w-[35%] mx-auto shadow-2xl p-1 sm:p-2">
      <h1 className="text-xl sm:text-3xl font-bold text-center mt-3 dark:text-white">Sign up now!</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="card-body">
        {/* Name Field */}
        <div className="relative mb-3">
          <div className={`relative border-2 rounded-lg p-0.5 md:p-1 transition-colors 
            border-gray-300 focus-within:border-green-800 dark:border-gray-600 dark:focus-within:border-yellow-500`}>
            <label className="absolute -top-3 left-3 px-1 text-xs md:text-sm text-green-800 dark:text-yellow-500 bg-white dark:bg-gray-900 z-10">
              Name
            </label>
            <input type="text" {...register("name", { required: true })} placeholder="Name"
              className="w-full px-1.5 py-1 text-sm md:text-base bg-transparent focus:outline-none text-gray-800 dark:text-white" />
          </div>
          {errors.name && <span className="text-red-600 text-sm">Name is required</span>}
        </div>

        {/* Photo URL Field */}
        <div className="relative mb-3">
          <div className={`relative border-2 rounded-lg p-0.5 md:p-1 transition-colors 
            border-gray-300 focus-within:border-green-800 dark:border-gray-600 dark:focus-within:border-yellow-500`}>
            <label className="absolute -top-3 left-3 px-1 text-xs md:text-sm text-green-800 dark:text-yellow-500 bg-white dark:bg-gray-900 z-10">
              Photo URL
            </label>
            <input type="text" {...register("photoURL", { required: true })} placeholder="Photo URL"
              className="w-full px-1.5 py-1 text-sm md:text-base bg-transparent focus:outline-none text-gray-800 dark:text-white" />
          </div>
          {errors.photoURL && <span className="text-red-600 text-sm">Photo URL is required</span>}
        </div>

        {/* Email Field */}
        <div className="relative mb-3">
          <div className={`relative border-2 rounded-lg p-0.5 md:p-1 transition-colors 
            border-gray-300 focus-within:border-green-800 dark:border-gray-600 dark:focus-within:border-yellow-500`}>
            <label className="absolute -top-3 left-3 px-1 text-xs md:text-sm text-green-800 dark:text-yellow-500 bg-white dark:bg-gray-900 z-10">
              Email
            </label>
            <input type="email" {...register("email", { required: true })} placeholder="Email"
              className="w-full px-1.5 py-1 text-sm md:text-base bg-transparent focus:outline-none text-gray-800 dark:text-white" />
          </div>
          {errors.email && <span className="text-red-600 text-sm">Email is required</span>}
        </div>

        {/* Password Field */}
        <div className="relative mb-3">
          <div className={`relative border-2 rounded-lg p-0.5 md:p-1 transition-colors 
            border-gray-300 focus-within:border-green-800 dark:border-gray-600 dark:focus-within:border-yellow-500`}>
            <label className="absolute -top-3 left-3 px-1 text-xs md:text-sm text-green-800 dark:text-yellow-500 bg-white dark:bg-gray-900 z-10">
              Password
            </label>
            <input type={showSecretKey ? 'text' : 'password'}
              {...register("password", {
                required: true,
                minLength: 6,
                maxLength: 20,
                pattern: /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z])/
              })}
              placeholder="Password"
              className="w-full px-1.5 py-1 text-sm md:text-base bg-transparent focus:outline-none text-gray-800 dark:text-white" />
            <button type="button" onClick={() => setShowSecretKey(!showSecretKey)} className="absolute top-2.5 right-2 text-sm">
              {showSecretKey ? <FaEyeSlash className="dark:text-white" /> : <FaEye className="dark:text-white" />}
            </button>
          </div>

          {/* Error Messages */}
          {errors.password?.type === 'required' && <p className="text-red-600 text-sm mt-1">Password is required</p>}
          {errors.password?.type === 'minLength' && <p className="text-red-600 text-sm mt-1">Password must be at least 6 characters</p>}
          {errors.password?.type === 'maxLength' && <p className="text-red-600 text-sm mt-1">Password must not exceed 20 characters</p>}
          {errors.password?.type === 'pattern' && <p className="text-red-600 text-sm mt-1">Password must include uppercase, lowercase, number & special character</p>}
        </div>

        {/* Submit Button */}
        <div className="form-control mt-4">
          <input
            className="btn bg-green-900 text-white hover:bg-green-950 dark:bg-yellow-700 dark:hover:bg-yellow-800"
            type="submit"
            value="Sign Up"
          />
        </div>
      </form>

      <p className="text-sm sm:text-base text-center mb-5 dark:text-white">
        Already have an account?
        <Link to="/login" className="text-green-800 dark:text-yellow-500 font-semibold ml-1">Login</Link>
      </p>
    </div>
  </div>
</div>



        </>
    );
};

export default SignUp;