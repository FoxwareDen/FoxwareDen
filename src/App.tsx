import { Route, Routes } from "react-router";
import RootLayout from "./RootLayout";
import Home from "./pages/home/Page";
import NotFound from "./pages/404/Page";
import LoginPage from "./pages/login/Page";
import DashboardPage from "./pages/dashboard/Page";
import ProtectedRoute from "./ProtectedRoute";

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
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default App;
