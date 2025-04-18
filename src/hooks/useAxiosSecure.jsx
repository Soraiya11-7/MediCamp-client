import axios from "axios";
import { useNavigate } from "react-router-dom";
import useAuth from "./useAuth";
import { useEffect } from "react";

const axiosSecure = axios.create({
    baseURL: 'https://assignment-12-server-three-lovat.vercel.app'
})
const useAxiosSecure = () => {
    const navigate = useNavigate();
    const { signOutUser } = useAuth();

    // request interceptor to add authorization header for every secure call to teh api
    axiosSecure.interceptors.request.use(function (config) {
        const token = localStorage.getItem('access-token')
        // console.log('request stopped by interceptors', token)
        config.headers.authorization = `Bearer ${token}`;
        return config;
    }, function (error) {

        return Promise.reject(error);
    });


    // useEffect(() => {
    //     axiosSecure.interceptors.response.use(response =>{
    //         return response;
    //     }, error => {

    //         const status = error.response.status;
    //         // for 401 or 403 logout the user and move the user to the login
    //         if (status === 401 || status === 403) {
    //             signOutUser()
    //             .then(() => {
    //                 // console.log('logout user');
    //                 navigate('/login');
    //             })
    //             .catch(error => {
    //                 // console.log(error)
    //             }
    //             )
         
    //         }
    //         return Promise.reject(error);
    //     })
    // },[signOutUser,navigate])


    // intercepts 401 and 403 status
    axiosSecure.interceptors.response.use(function (response) {
        return response;
    }, async (error) => {
        const status = error.response.status;
        // for 401 or 403 logout the user and move the user to the login
        if (status === 401 || status === 403) {
            // signOutUser()
            // .then(() => {
            //     // console.log('logout user');
            //     navigate('/login');
            // })
            // .catch(error => {
            //     // console.log(error)
            // }
            // )
            await signOutUser();
            navigate('/login');
        }
        return Promise.reject(error);
    })


    return axiosSecure;
};

export default useAxiosSecure;