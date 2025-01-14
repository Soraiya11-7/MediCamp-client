import { Outlet } from "react-router-dom";


const MainLayout = () => {
    return (
        <div className="max-w-[1440px] mx-auto">
            {/* Navbar */}
            <div className="min-h-[calc(100vh-368px)]">
            <Outlet />
          </div>
            {/* Footer */}
        </div>
    );
};

export default MainLayout;