import { Helmet } from "react-helmet-async";
import { Link, useRouteError } from "react-router-dom";
import img from "../assets/404-landing.jpg"

const ErrorPage = () => {
    const error = useRouteError();
    // console.log(error);

    return (
        <>
            <Helmet>
                <title>ErrorPage</title>
            </Helmet>
            <div>
                
            </div>
            <div className="dark:text-white text-center flex flex-col justify-center items-center h-screen container w-[90%] mx-auto">
                  <div className="w-[80%] mx-auto">
                  <img
                                src={img}
                                alt="404"
                                className="rounded-xl shadow w-full object-cover overflow-hidden"
                              />
                  </div>
                 <div className=" mt-8  z-20">
                 <h1 className="text-3xl md:text-3xl text-black mb-3">Ooops!!!</h1>
                <p className="text-3xl sm:text-5xl font-bold mb-3 sm:mb-4">
                    <i>{error.statusText || error.message}</i>
                </p>
                <h5 className="mb-5 text-xl sm:text-3xl">Go back where you from</h5>
                <Link to="/"><button className="btn bg-green-800 text-white ">Home</button></Link>
                 </div>

            </div>
        </>

    );
};

export default ErrorPage;