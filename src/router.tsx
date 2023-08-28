import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ReservationPage from "./pages/ReservationPage";
import App from "./test";

const Router = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <ReservationPage />,
    },
    {
      path: "/test",
      element: <App />,
    },
  ]);

  return <RouterProvider router={router} />;
};

export default Router;
