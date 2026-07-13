import { create } from "zustand";
import { X } from "lucide-react";

type Warning = "success" | "error" | "warning";

type AlertState = {
  message: string | null;
  type: Warning;
  active: boolean;
};

type Actions = {
  setAlert: (
    { message, type }: { message: string | null; type: Warning },
    timeout?: number
  ) => void;
  setState: (
    active: boolean,
    { message, type }: { message?: string | null; type?: Warning }
  ) => void;
};

export const useAlert = create<AlertState & Actions>()((set) => ({
  message: null,
  type: "warning",
  active: false,
  setAlert: ({ message, type = "warning" }, timeout = 3000) => {
    set((state) => ({
      ...state,
      active: true,
      message,
      type,
    }));

    setTimeout(() => {
      set((state) => ({
        ...state,
        type: "warning",
        message: null,
        active: false,
      }));
    }, timeout);
  },
  setState: (active, { message = null, type = "warning" }) => {
    set((state) => ({
      ...state,
      message,
      active,
      type,
    }));
  },
}));

function Alert() {
  const { active, message, type, setState } = useAlert();
  const colors = (() => {
    switch (type) {
      case "success":
        return "bg-gradient-to-r from-vibrant-teal to-vibrant-blue text-white";
      case "error":
        return "bg-gradient-to-r from-vibrant-pink to-vibrant-purple text-white";
      case "warning":
        return "bg-gradient-to-r from-vibrant-amber to-vibrant-pink text-white";
    }
  })();

  const handClick = () => {
    setState(false, { message: null, type: "warning" });
  };

  return (
    <>
      {active && message ? (
        <div
          className={`${colors} w-full px-5 py-2 min-h-10 relative animate-fade-in-down`}
        >
          <h3 className="text-lg font-mono">{message}</h3>
          <button
            aria-label="close alert"
            className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 rounded-lg flex items-center justify-center bg-white/20 hover:bg-white/30 text-white transition-colors"
            onClick={handClick}
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      ) : null}
    </>
  );
}

export default Alert;
