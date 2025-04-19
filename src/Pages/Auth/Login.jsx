import { useContext, useEffect, useState } from 'react';
// import { loadCaptchaEnginge, LoadCanvasTemplate, validateCaptcha } from 'react-simple-captcha';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

import { useForm } from 'react-hook-form';
import useAuth from '../../hooks/useAuth';
import SocialLogin from './SocialLogin';
import { toast } from 'react-toastify';
import { Helmet } from 'react-helmet-async';


const Login = () => {
    const [disabled, setDisabled] = useState(true);
    const { loginUser } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    const from = location.state?.from || "/";

    const { register, handleSubmit, formState: { errors }, setValue, reset } = useForm();

    // useEffect(() => {
    //     loadCaptchaEnginge(6);
    // }, []);
    const [autoFilled, setAutoFilled] = useState(false);

    // Default credentials
    const credentials = {
        user: { email: "user77@gmail.com", password: "Keltu76#" },
        admin: { email: "admin76@gmail.com", password: "adMin76#" },
    };

    // Auto-fill credentials when the button is clicked
    const handleAutoFill = (role) => {
        setValue("email", credentials[role].email);
        setValue("password", credentials[role].password);
        setAutoFilled(true);
    };

    const handleLogin = data => {
        const { email, password } = data;
        // console.log(email, password);
        loginUser(email, password)
            .then(result => {
                const user = result.user;
                // console.log(user);
                Swal.fire({
                    title: 'User Login Successful.',
                    showClass: {
                        popup: 'animate__animated animate__fadeInDown'
                    },
                    hideClass: {
                        popup: 'animate__animated animate__fadeOutUp'
                    }
                });
                navigate(from, { replace: true });
            })
            .catch((err) => {
                const errorMessage = err.message;
                const errorCode = errorMessage.match(/\(([^)]+)\)/)?.[1];
                // setError(errorCode);
                toast.error(errorCode || "An unexpected error occurred", {
                    position: "top-center",
                    autoClose: 2000,
                });
                // setError(err.message);
            });
    }

    // const handleValidateCaptcha = (e) => {
    //     const user_captcha_value = e.target.value;
    //     if (validateCaptcha(user_captcha_value)) {
    //         setDisabled(false);
    //     } else {
    //         setDisabled(true);
    //     }
    // }

    return (
        <>
            <Helmet>
                <title>Medical Camp | Login</title>
            </Helmet>
            <div className='dark:bg-gray-950 bg-opacity-50'>
  <div className="hero min-h-screen w-[90%] mx-auto flex justify-center py-8 items-center">
    <div className="card bg-base-100 dark:bg-gray-900 w-[90%] sm:w-[60%] md:w-[50%] lg:w-[35%] mx-auto shadow-2xl p-1 sm:p-2">
      <h1 className="text-xl sm:text-3xl font-bold text-center mt-3 dark:text-white">Login now!</h1>

      <h3 className='text-green-800 dark:text-yellow-500 mt-4 ml-4 font-bold'>Credentials</h3>

      {/* Credential Buttons */}
      <div className="flex gap-2 ml-5">
        <button
          onClick={() => handleAutoFill("user")}
          className="py-1 px-2 text-white text-sm font-medium rounded-lg bg-green-900 dark:bg-white dark:text-yellow-700  "
        >
          User
        </button>
        <button
          onClick={() => handleAutoFill("admin")}
          className="py-1 px-2 text-white text-sm font-medium rounded-lg bg-green-900 dark:bg-white dark:text-yellow-700 "
        >
          Admin
        </button>

        {autoFilled && (
          <button
            type="button"
            onClick={() => {
              reset();
              setAutoFilled(false);
            }}
            className="btn-inline-block mx-auto bg-red-500 text-white py-1 px-2 rounded"
          >
            Reset
          </button>
        )}
      </div>

      <form onSubmit={handleSubmit(handleLogin)} className="card-body">
        {/* Email Field */}
        <div className="relative mb-3">
          <div className={`relative border-2 rounded-lg p-0.5 md:p-1 transition-colors 
           border-gray-300 focus-within:border-green-800 dark:border-gray-600 dark:focus-within:border-yellow-500
          `}>
            <label className="absolute -top-3 left-3 px-1 text-xs md:text-sm text-green-800 dark:text-yellow-500 bg-white dark:bg-gray-900 z-10">
              Email
            </label>
            <input
              type="email"
              {...register("email", { required: true })}
              name="email"
              placeholder="Enter your email"
              className="w-full px-1.5 py-1 text-sm md:text-base bg-transparent focus:outline-none text-gray-800 dark:text-white"
            />
          </div>
          {errors.email && (
            <span className="text-red-600 text-sm">{errors.email.message}</span>
          )}
        </div>

        {/* Password Field */}
        <div className="relative mb-3">
          <div className={`relative border-2 rounded-lg p-0.5 md:p-1 transition-colors border-gray-300 focus-within:border-green-800 dark:border-gray-600 dark:focus-within:border-yellow-600'
          `}>
            <label className="absolute -top-3 left-3 px-1 text-xs md:text-sm text-green-800 dark:text-yellow-500 bg-white dark:bg-gray-900 z-10">
              Password
            </label>
            <input
              type="password"
              {...register("password", { required: true })}
              placeholder="Enter your password"
              className="w-full px-1.5 py-1 text-sm md:text-base bg-transparent focus:outline-none text-gray-800 dark:text-white"
            />
          </div>
          {errors.password && (
            <p className="text-red-500 dark:text-red-400 text-sm mt-1">{errors.password.message}</p>
          )}
        </div>

        <div className="form-control mt-4">
          <input
            className="btn bg-green-900 text-white hover:bg-green-950 dark:bg-yellow-700 dark:hover:bg-yellow-800"
            type="submit"
            value="Login"
          />
        </div>
      </form>

      <SocialLogin />

      <h2 className='text-sm sm:text-base text-center mb-5 dark:text-white'>
        New here? 
        <Link to='/signup' className='text-green-800 dark:text-yellow-500 font-semibold ml-1'>Create an account</Link>
      </h2>
    </div>
  </div>
</div>



        </>
    );
};

export default Login;
