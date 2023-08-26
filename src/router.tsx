import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ReservationPage from "./pages/ReservationPage";

const Router = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <ReservationPage />,
    },
  ]);

  return <RouterProvider router={router} />;
};

export default Router;
