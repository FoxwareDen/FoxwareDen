import { create } from "zustand";
import { X } from "lucide-react";
import { useMemo } from "react";

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
        return "bg-green-300 text-white";
      case "error":
        return "bg-red-300 text-black";
      case "warning":
        return "bg-yellow-300 text-black";
    }
  })();

  const handClick = () => {
    setState(false, { message: null, type: "warning" });
  };

  return (
    <>
      {active && message ? (
        <div
          className={`${colors} w-full px-5 py-2 border-black border-b-4 min-h-10 relative`}
        >
          <h3 className="text-xl font-mono">{message}</h3>
          <button
            className="absolute right-0 top-1/2 -translate-y-1/2 h-10 w-10 rounded-none border-2 border-black dark:border-white flex items-center justify-center bg-white text-black dark:bg-black dark:text-white"
            onClick={handClick}
          >
            <X />
          </button>
        </div>
      ) : null}
    </>
  );
}

export default Alert;
