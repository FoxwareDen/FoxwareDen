import { Session } from "@supabase/supabase-js";
import { createContext, ReactNode, useContext, useState } from "react";

export interface UserSession {
  session: Session | null;
}

interface UserSessionActions {
  setSession: (session: Session | null) => void;
}

const UserSessionContext = createContext<UserSession & UserSessionActions>({
  session: null,
  setSession: () => {},
});

export const useUserSession = () => {
  // Use useContext to access the value provided by the Provider
  const context = useContext(UserSessionContext);

  if (context === undefined) {
    throw new Error("useUserSession must be used within a UserSessionProvider");
  }

  // Note: Your original function didn't use `useContext`.
  // It should be updated to return the actual context value, not the context object itself.
  return context;
};

export function UserSessionProvider({
  children,
}: {
  children: ReactNode | string;
}) {
  const [userSession, setUserSession] = useState<UserSession>({
    session: null,
  });

  const setSession = (session: Session | null) => {
    setUserSession({ session });
  };

  return (
    <UserSessionContext.Provider value={{ ...userSession, setSession }}>
      {children}
    </UserSessionContext.Provider>
  );
}
