import { createBrowserRouter } from "react-router";
import AdminLayout from "../Layouts/AdminLayout";
import HomeLayout from "../Layouts/HomeLayout";
import AdminCrimes from "../Pages/admin/AdminCrimes";
import AdminLostFound from "../Pages/admin/AdminLostFound";
import AdminPage from "../Pages/admin/AdminPage";
import AdminSOS from "../Pages/admin/AdminSOS";
import Login from "../Pages/auth/Login";
import Register from "../Pages/auth/Register";
import Contact from "../Pages/Contact";
import CrimeDashboard from "../Pages/CrimeReport/CrimeDashboard";
import EmergencyHelp from "../Pages/Emergency/EmergencyHelp";
import Home from "../Pages/Home";
import LostFound from "../Pages/LostFound.jsx/Lost";
import AddLostFound from "../Pages/LostFound.jsx/LostFoundForm";
import AddMedicines from "../Pages/Medical/AddMedicines";


export const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/emergency",
        element: <EmergencyHelp />,
      },
      {
        path: "/addMedicines",
        element: <AddMedicines />
      },
  
      {
        path: "crime",
        element: <CrimeDashboard />,
      },
      {
        path: "lostfound",
        element: <LostFound />,
      },
      {
        path: "contact",
        element: <Contact />,
      },
       {
        path: "login", 
        element: <Login />,
      },
      {
        path: "register", 
        element: <Register />,
      },
       {
        path: "addLostFound", 
        element: <AddLostFound />,
      },
      

    ],
    
  },
  {
     path: "/admin-dashboard",
    element: <AdminLayout />,
    children: [
      {
        index: true,
        element: <AdminPage />,
      },
      {
        path: '/admin-dashboard/crimes',
        element: <AdminCrimes/>
      },
      {
        path: '/admin-dashboard/sos',
        element: <AdminSOS/>
      },
      {
        path: '/admin-dashboard/lostFound',
        element: <AdminLostFound/>
      }


    ]
  }
]);
