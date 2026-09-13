import { useUserSession } from "./store/auth";
import { ReactNode } from "react";
import { Navigate } from "@tanstack/react-router";

function ProtectedRoute({ children }: { children: ReactNode }) {
  const { session } = useUserSession();

  if (!session) return <Navigate to="/login" />;

  return <>{children}</>;
}

export default ProtectedRoute;
