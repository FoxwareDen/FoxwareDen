import { create } from "zustand";
import { OrgMetaData } from "../api/requests";

type State = {
  orgData?: OrgMetaData;
  loading: boolean;
  error: string | null;
};

type Actions = {
  setData: (data: OrgMetaData) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
};

export const useOrg = create<State & Actions>()((set) => ({
  data: undefined,
  loading: false,
  error: null,
  setData: (orgData) => set({ orgData }),
  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error }),
}));
