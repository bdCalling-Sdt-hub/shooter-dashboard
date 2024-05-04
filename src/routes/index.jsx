import { createBrowserRouter } from "react-router-dom";
import Auth from "../layouts/Auth/Auth";
import LogIn from "../pages/Auth/LogIn";
import ForgotPassword from "../pages/Auth/ForgotPassword";
import VerifyOtp from "../pages/Auth/VerifyOtp";
import UpdatePassword from "../pages/Auth/UpdatePassword";
import Main from "../layouts/Main/Main";
import DashboardHome from "../pages/Main/DashboardHome/DashboardHome";
import AllUser from "../pages/Main/AllUser/AllUser";
import EventsRegister from "../pages/Main/EventsRegister/EventsRegister";
import Events from "../pages/Main/Events/Events";
import AddEvent from "../pages/Main/AddEvent/AddEvent";
import EditEvent from "../pages/Main/EditEvent/EditEvent";
import Matches from "../pages/Main/Matches/Matches";
import AddMatches from "../pages/Main/AddMatches/AddMatches";
import EditMatches from "../pages/Main/EditMatches/EditMatches";
import Setting from "../pages/Main/Setting/Setting";
import PrivacyPolicy from "../pages/Main/Setting/PrivacyPolicy";
import TermsAndConditions from "../pages/Main/Setting/TermsAndConditions";
import AboutUs from "../pages/Main/Setting/AboutUs";
import EditPrivacyPolicy from "../pages/Main/Setting/EditPrivacyPolicy";
import EditTermsAndConditions from "../pages/Main/Setting/EditTermsAndConditions";
import EditAboutUs from "../pages/Main/Setting/EditAboutUs";
import ProfileInformation from "../pages/Main/ProfileInformation/ProfileInformation";
import EditProfileInformation from "../pages/Main/EditProfileInformation/EditProfileInformation";
import Notification from "../pages/Main/Notification/Notification";
import AdminRoutes from "./AdminRoute";
import UploadScore from "../pages/Main/UploadScore/UploadScore";




const router = createBrowserRouter([
    {
      path: "/",
      element: <AdminRoutes><Main /></AdminRoutes>,
      children: [
        {
          path: "/",
          element: <DashboardHome />,
        },
        {
          path: "/users",
          element: <AllUser/>,
        },
        {
          path: "/profile-information",
          element: <ProfileInformation/>,
        },
        {
          path: "/notification",
          element: <Notification/>,
        },
        {
          path: "/edit-profile/:id",
          element: <EditProfileInformation/>,
        },
        {
          path: "/matches-register",
          element: <EventsRegister/>,
        },
        {
          path: "/events",
          element: <Events/>,
        },
        {
          path: "/events/add-event",
          element: <AddEvent/>,
        },
        {
          path: "/events/edit-event/:id",
          element: <EditEvent/>,
        },
        {
          path: "/matches",
          element: <Matches/>,
        },
        {
          path: "/matches/add-matches",
          element: <AddMatches/>,
        },
        {
          path: "/matches/edit-matches/:id",
          element: <EditMatches/>,
        },
        {
          path: "/matches/upload-score/:id",
          element: <UploadScore/>,
        },
        {
          path: "/settings",
          element: <Setting />,
        },
        {
          path: "/settings/privacy-policy",
          element: <PrivacyPolicy/>,
        },
        {
          path: "/settings/edit-privacy-policy",
          element: <EditPrivacyPolicy />,
        },
        {
          path: "/settings/terms-conditions",
          element: <TermsAndConditions/>,
        },
        {
          path: "/settings/edit-terms-conditions",
          element: <EditTermsAndConditions/>,
        },
        {
          path: "/settings/about-us",
          element: <AboutUs/>,
        },
        {
          path: "/settings/edit-about-us",
          element: <EditAboutUs/>,
        },
       
        // {
        //   path: "/settings/:settingType",
        //   element: <SettingDetail />,
        // },
      ],
    },
    {
      path: "/auth",
      element: <Auth />,
      children: [
        {
          path: "/auth",
          element: <LogIn/>,
        },
        // {
        //   path: "login",
        //   element: <Login />,
        // },
        {
          path: "forgot-password",
          element: <ForgotPassword/>,
        },
        {
          path: "verify/:email",
          element: <VerifyOtp />,
        },
        {
          path: "update-password/:email",
          element: <UpdatePassword/>,
        },
      ],
    },
    // {
    //   path: "*",
    //   element: <NotFound />,
    // },
  ]);

  export default router;