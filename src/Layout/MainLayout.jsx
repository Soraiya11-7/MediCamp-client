import { Outlet } from "react-router-dom";
import Navbar from "../components/Shared/Navbar";
import Footer from "../components/Shared/Footer";


const MainLayout = () => {
    return (
        <div className="border border-red-600 container w-full mx-auto">
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