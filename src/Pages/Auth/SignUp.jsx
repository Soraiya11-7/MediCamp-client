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
            <div className='dark:bg-gray-950 '>
                <div className="hero min-h-screen  w-[90%] mx-auto flex justify-center py-8 items-center">
                    <div className="card bg-base-100  w-[90%] sm:w-[60%] md:w-[50%] lg:w-[35%] mx-auto shadow-2xl p-1 sm:p-2">
                        <h1 className="text-xl sm:text-3xl font-bold text-center mt-3">Sign up now!</h1>
                        {/* form.............. */}
                        <form onSubmit={handleSubmit(onSubmit)} className="card-body">

                            {/* Name................... */}
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Name</span>
                                </label>
                                <input type="text"  {...register("name", { required: true })} name="name" placeholder="Name" className="input input-bordered" />
                                {errors.name && <span className="text-red-600">Name is required</span>}
                            </div>

                            {/* Image................... */}
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Photo URL</span>
                                </label>
                                <input type="text"  {...register("photoURL", { required: true })} placeholder="Photo URL" className="input input-bordered" />
                                {errors.photoURL && <span className="text-red-600">Photo URL is required</span>}
                            </div>
                            {/* Email................... */}
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input type="email"  {...register("email", { required: true })} name="email" placeholder="Enter your email" className="input input-bordered" />
                                {errors.email && <span className="text-red-600">Email is required</span>}
                            </div>

                            {/* Password................... */}
                            <div className="form-control relative">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input type={showSecretKey ? 'text' : 'password'}  {...register("password", {
                                    required: true,
                                    minLength: 6,
                                    maxLength: 20,
                                    pattern: /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z])/
                                })} placeholder="password" className="input input-bordered" />

                                <button type="button" onClick={() => setShowSecretKey(!showSecretKey)} className="absolute btn btn-xs top-12 right-2">
                                    {
                                        showSecretKey ? <FaEyeSlash></FaEyeSlash> : <FaEye></FaEye>
                                    }
                                </button>
                                {errors.password?.type === 'required' && <p className="text-red-600">Password is required</p>}
                                {errors.password?.type === 'minLength' && <p className="text-red-600">Password must be 6 characters</p>}
                                {errors.password?.type === 'maxLength' && <p className="text-red-600">Password must be less than 20 characters</p>}
                                {errors.password?.type === 'pattern' && <p className="text-red-600">Password must have one Uppercase one lower case, one number and one special character.</p>}

                            </div>
                            <div className="form-control mt-6">
                                <input className="btn bg-green-950 text-white hover:bg-green-800" type="submit" value="Sign Up" />
                            </div>
                        </form>
                        <SocialLogin></SocialLogin>
                        <h2 className='text-sm sm:text-base text-center mb-5'>Already have an account? <Link to='/login' className='text-green-800 font-semibold'>Login Now</Link></h2>
                    </div>
                </div>
            </div>


        </>
    );
};

export default SignUp;