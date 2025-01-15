import { createBrowserRouter } from "react-router-dom";
import ErrorPage from "../Pages/ErrorPage";
import MainLayout from "../Layout/MainLayout";
import Home from "../Pages/Home";
import SignUp from "../Pages/Auth/SignUp";
import Login from "../Pages/Auth/Login";
import PrivateRoute from "./PrivateRoute";
import Dashboard from "../Layout/Dashboard";
import UserHome from "../Pages/Dashboard/User/UserHome";
import AdminRoute from "./AdminRoute";
import AdminHome from "../Pages/Dashboard/Admin/AdminHome";
import AddCamp from "../Pages/Dashboard/Admin/AddCamp";
import ManageCamps from "../Pages/Dashboard/Admin/ManageCamps";




const router = createBrowserRouter([
    {
      path: "/",
      errorElement: <ErrorPage></ErrorPage>,
      element: <MainLayout></MainLayout>,
      children: [
        {
          path: "/",
          element:<Home></Home>,   
        },
        {
          path: 'login',
          element: <Login></Login>
        },
        {
          path: 'signup',
          element: <SignUp></SignUp>
        },
        

      ]
    },

    {
      path: 'dashboard',
      element: <PrivateRoute><Dashboard></Dashboard></PrivateRoute>,
      children: [
          // normal user routes
          {
            path: 'userHome',
            element: <UserHome></UserHome>
          },
          // admin only routes
          {
            path: 'adminHome',
            element: <AdminRoute><AdminHome></AdminHome></AdminRoute>
          },
          {
            path: 'addCamp',
            element: <AdminRoute><AddCamp></AddCamp></AdminRoute>
          },
          {
            path: 'manageCamps',
            element: <AdminRoute><ManageCamps></ManageCamps></AdminRoute>
          },
      ]
    }
   
  ],
  {
    future: {
      v7_normalizeFormMethod: true,
      v7_fetcherPersist: true,
      v7_partialHydration: true,
      v7_relativeSplatPath: true,
      v7_skipActionStatusRevalidation: true
    },
  }
);

  export default router;