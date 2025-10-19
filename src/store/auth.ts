import { Session } from "@supabase/supabase-js";
import { create } from "zustand";

export interface UserSession {
  session: Session | null;
  setSession: (session: Session | null) => void;
}

export const useUserSession = create<UserSession>()((set) => ({
  session: null,
  setSession: (session: Session | null) => set({ session }),
}));
