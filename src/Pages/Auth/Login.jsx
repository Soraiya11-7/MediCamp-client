import { useContext, useEffect, useState } from 'react';
// import { loadCaptchaEnginge, LoadCanvasTemplate, validateCaptcha } from 'react-simple-captcha';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

import { useForm } from 'react-hook-form';
import useAuth from '../../hooks/useAuth';
import SocialLogin from './SocialLogin';


const Login = () => {
    const [disabled, setDisabled] = useState(true);
    const { loginUser } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    const from = location.state?.from || "/";

    const { register, handleSubmit, formState: { errors }, setValue } = useForm();

    // useEffect(() => {
    //     loadCaptchaEnginge(6);
    // }, []);

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
            });
    }

    const handleValidateCaptcha = (e) => {
        const user_captcha_value = e.target.value;
        if (validateCaptcha(user_captcha_value)) {
            setDisabled(false);
        } else {
            setDisabled(true);
        }
    }

    return (
        <>
          
            <div className="hero min-h-screen bg-base-200">
                <div className="hero-content flex-col lg:flex-row-reverse">
                    <div className="text-center  lg:text-left">
                        <h1 className="text-5xl font-bold">Login now!</h1>
                       
                    </div>
                    <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                        <form onSubmit={handleSubmit(handleLogin)} 
                        className="card-body">
                            <h1 className="text-2xl font-bold my-5 text-center">Login now!</h1>
                            <div className="form-control">
                            <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input type="email"  {...register("email", { required: true })} name="email" placeholder="Enter your email" className="input input-bordered" />
                                {errors.email && <span className="text-red-600">Email is required</span>}
                              
                            </div>
                              {/* Password................... */}
                              <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input type="password"  {...register("password", {
                                    required: true
                                })} placeholder="password" className="input input-bordered" />
                                {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
                               
                            </div>
                            {/* <div className="form-control">
                                <label className="label">
                                    <LoadCanvasTemplate />
                                </label>
                                <input
                                    onBlur={handleValidateCaptcha}
                                    type="text"
                                    name="captcha"
                                    placeholder="type the captcha above"
                                    className="input input-bordered"
                                />
                            </div>
                            <button type="button" className="bg-orange-500 w-32 btn">verify Captcha</button> */}
                            <div className="form-control mt-6">
                                <input
                                    
                                    className="btn btn-primary"
                                    type="submit"
                                    value="Login"
                                />
                            </div> 
                        </form>
                       
                <SocialLogin></SocialLogin>
                        <h2 className='text-sm sm:text-base text-center mb-5'>New here? <Link to='/signup' className='text-blue-500'>Create an account</Link></h2>
                        {/* <SocialLogin /> */}
                    </div>
                </div>
            </div>
        </>
    );
};

export default Login;
