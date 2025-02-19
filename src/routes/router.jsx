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
import AvailableCamps from "../Pages/AvailableCamps";
import CampDetails from "../Pages/CampDetails";
import UpdateCamp from "../Pages/Dashboard/Admin/UpdateCamp";
import ManageRegisteredCamps from "../Pages/Dashboard/Admin/ManageRegisteredCamps";
import RegisteredCamps from "../Pages/Dashboard/User/RegisteredCamps";
import Payment from "../Pages/Dashboard/Payment/Payment";
import PaymentHistory from "../Pages/Dashboard/Payment/PaymentHistory";
import FeedbackForm from "../Pages/Dashboard/User/FeedbackForm";
import OrganizerProfile from "../Pages/Dashboard/Admin/OrganizerProfile";
import UserProfile from "../Pages/Dashboard/User/UserProfile";
import ContactUs from "../Pages/ContactUs";
import AboutUs from "../Pages/AboutUs";
import Overview from "../Pages/Dashboard/Admin/Overview";




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
          path: 'allCamps',
          element: <AvailableCamps></AvailableCamps>
        },
        {
          path: 'about',
          element: <AboutUs></AboutUs>
        },
        {
          path: 'contact',
          element: <ContactUs></ContactUs>
        },
        {
          path:'/camp-details/:campId',
          element:<CampDetails></CampDetails>
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
          {
            path:'userProfile',
            element:<UserProfile></UserProfile>
          },
          
          {
            path: 'userRegisteredCamps',
            element: <RegisteredCamps></RegisteredCamps>
          },
          {
            path: 'payment/:id',
            element: <Payment></Payment>
          },
          {
            path: 'paymentHistory',
            element: <PaymentHistory></PaymentHistory>
          },
          {
            path: 'feedback/:id',
            element: <FeedbackForm></FeedbackForm>
          },
          // admin only routes
          {
            path: 'adminHome',
            element: <AdminRoute><AdminHome></AdminHome></AdminRoute>
          },
          {
            path: 'overview',
            element: <AdminRoute><Overview></Overview></AdminRoute>
          },
          {
            path: 'addCamp',
            element: <AdminRoute><AddCamp></AddCamp></AdminRoute>
          },
          {
            path: 'manageCamps',
            element: <AdminRoute><ManageCamps></ManageCamps></AdminRoute>
          },
          {
           
            path: 'manageRegisteredCamps',
            element: <AdminRoute><ManageRegisteredCamps></ManageRegisteredCamps></AdminRoute>
          },
          {
            path: 'update-camp/:campId',
            element: <AdminRoute><UpdateCamp></UpdateCamp></AdminRoute>,
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