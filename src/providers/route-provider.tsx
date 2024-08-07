import { Suspense } from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import AppRoutes from "../routes/routes";
import ContentSpinner from "../components/Spinner";

export default function RouteProvider(): React.ReactElement {
  const routes = AppRoutes();
  const router = createBrowserRouter(routes);

  return (
    <Suspense fallback={<ContentSpinner />}>
      <RouterProvider router={router} />
    </Suspense>
  );
}
