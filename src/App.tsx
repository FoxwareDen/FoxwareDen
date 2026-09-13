import { lazy, Suspense } from "react";
import {
  createRootRoute,
  createRoute,
  createRouter,
  RouterProvider,
} from "@tanstack/react-router";
import RootLayout from "./RootLayout";
import Home from "./pages/home/Page";
import Loading from "./ui/Loading";

const LoginPage = lazy(() => import("./pages/login/Page"));
const DashboardPage = lazy(() => import("./pages/dashboard/Page"));
const Products = lazy(() => import("./pages/products/Page"));
const AboutPage = lazy(() => import("./pages/about/Page"));
const PrivacyPage = lazy(() => import("./pages/privacy/Page"));
const TermsPage = lazy(() => import("./pages/terms/Page"));
const ReviewFormPage = lazy(() => import("./pages/reviews/ReviewFormPage"));

function RootRouteComponent() {
  return <RootLayout />;
}

function DashboardRouteComponent() {
  return <DashboardPage />;
}

const rootRoute = createRootRoute({
  component: RootRouteComponent,
});

const indexRoute = createRoute({ getParentRoute: () => rootRoute, path: "/", component: Home });
const loginRoute = createRoute({ getParentRoute: () => rootRoute, path: "/login", component: LoginPage });
const dashboardRoute = createRoute({ getParentRoute: () => rootRoute, path: "/dashboard", component: DashboardRouteComponent });
const aboutRoute = createRoute({ getParentRoute: () => rootRoute, path: "/about", component: AboutPage });
const termsRoute = createRoute({ getParentRoute: () => rootRoute, path: "/terms", component: TermsPage });
const privacyRoute = createRoute({ getParentRoute: () => rootRoute, path: "/privacy", component: PrivacyPage });
const reviewFormRoute = createRoute({ getParentRoute: () => rootRoute, path: "/reviews/form/$token/$name", component: ReviewFormPage });
const productsRoute = createRoute({ getParentRoute: () => rootRoute, path: "/$product", component: Products });

const routeTree = rootRoute.addChildren([
  indexRoute,
  loginRoute,
  dashboardRoute,
  aboutRoute,
  termsRoute,
  privacyRoute,
  reviewFormRoute,
  productsRoute,
]);

export const router = createRouter({ routeTree });

function App() {
  return (
    <Suspense fallback={<Loading size="full" text="loading Page..." />}>
      <RouterProvider router={router} />
    </Suspense>
  );
}

export default App;
