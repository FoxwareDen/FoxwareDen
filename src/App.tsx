import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router";
import RootLayout from "./RootLayout";
import Home from "./pages/home/Page";
import Loading from "./ui/Loading";
const LoginPage = lazy(() => import("./pages/login/Page"));
const DashboardPage = lazy(() => import("./pages/dashboard/Page"));
const ProtectedRoute = lazy(() => import("./ProtectedRoute"));
const Products = lazy(() => import("./pages/products/Page"));
const AboutPage = lazy(() => import("./pages/about/Page"));
const PrivacyPage = lazy(() => import("./pages/privacy/Page"));
const TermsPage = lazy(() => import("./pages/terms/Page"));
const ReviewFormPage = lazy(() => import("./pages/reviews/ReviewFormPage"));

function App() {
  return (
    <Suspense fallback={<Loading size="full" text="loading Page..." />}>
      <Routes>
        <Route path="/" element={<RootLayout />}>
          <Route index element={<Home />} />
          <Route path="/login" element={<LoginPage />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <DashboardPage />
              </ProtectedRoute>
            }
          />
          <Route path="/about" element={<AboutPage />} />

          <Route path="/terms" element={<TermsPage />} />
          <Route path="/privacy" element={<PrivacyPage />} />
          <Route
            path="reviews/form/:token/:name"
            element={<ReviewFormPage />}
          />
          <Route path="*" element={<Products />} />
        </Route>
      </Routes>
    </Suspense>
  );
}

export default App;
