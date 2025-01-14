import { Link, useRouteError } from "react-router-dom";

const ErrorPage = () => {
    const error = useRouteError();
    // console.log(error);

    return (
        <div className="text-center flex flex-col justify-center items-center mt-20 container mx-auto max-w-6xl">
            
            <p className="text-3xl sm:text-5xl font-bold mb-3 sm:mb-5">
                <i>{error.statusText || error.message}</i>
            </p>
            <h5 className="mb-5 text-xl sm:text-3xl">Go back where you from</h5>
             <Link to="/"><button className="btn bg-sky-400 text-white ">Home</button></Link>
          
        </div>
    );
};

export default ErrorPage;