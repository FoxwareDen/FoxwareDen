import { ReactNode } from "react";

function ProtectedRoute({ children }: { children: ReactNode }) {
  return <>{children}</>;
}

export default ProtectedRoute;
