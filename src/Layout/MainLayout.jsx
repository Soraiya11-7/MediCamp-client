import { Outlet } from "react-router-dom";
import Navbar from "../components/Shared/Navbar";
import Footer from "../components/Shared/Footer";
import { useEffect } from "react";
import Aos from "aos";
import "aos/dist/aos.css";

const MainLayout = () => {
     useEffect(() => {
            Aos.init({
                duration: 1000, 
           easing: "ease-out-cubic", 
           once: true,
            })
          },[]);
    return (
        <div className=" container w-full mx-auto">
            <Navbar></Navbar>
            <div className="min-h-[calc(100vh-413px)]">
                <Outlet />
            </div>
            {/* Footer */}
            <Footer></Footer>
        </div>
    );
};

export default MainLayout;