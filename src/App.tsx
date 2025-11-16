import { Route, Routes } from "react-router";
import RootLayout from "./RootLayout";
import Home from "./pages/home/Page";
import LoginPage from "./pages/login/Page";
import DashboardPage from "./pages/dashboard/Page";
import ProtectedRoute from "./ProtectedRoute";
import Products from "./pages/products/Page";
import AboutPage from "./pages/about/Page";

function App() {
  return (
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
        <Route path="*" element={<Products />} />
      </Route>
    </Routes>
  );
}

export default App;
