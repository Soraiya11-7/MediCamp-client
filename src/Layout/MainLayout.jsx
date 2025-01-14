import { Outlet } from "react-router-dom";
import Navbar from "../components/Shared/Navbar";


const MainLayout = () => {
    return (
        <div className="">
            <Navbar></Navbar>
            <div className="min-h-[calc(100vh-368px)]">
                <Outlet />
            </div>
            {/* Footer */}
        </div>
    );
};

export default MainLayout;