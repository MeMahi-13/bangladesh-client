import { createBrowserRouter } from "react-router";
import HomeLayout from "../Layouts/HomeLayout";
import Contact from "../Pages/Contact";
import Crime from "../Pages/Crime";
import Home from "../Pages/Home";
import AddMedicines from "../Pages/Medical/AddMedicines";
import Medicines from "../Pages/Medical/Medicines";
import Tourism from "../Pages/Tourism";


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
        path: "/medical",
        element: <Medicines />,
      },
      {
        path: "/addMedicines",
        element: <AddMedicines />
      },
      {
        path: "tourism",
        element: <Tourism />,
      },
      {
        path: "crime",
        element: <Crime />,
      },
      {
        path: "contact",
        element: <Contact />,
      },
    ],
  },
]);
