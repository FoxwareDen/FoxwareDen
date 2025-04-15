import { useEffect, useState } from "react";

interface LoadingProps {
  text?: string;
  size?: "sm" | "md" | "lg" | "full";
  showDelay?: number;
  mode?: "dark" | "light";
}

function Loading({
  text = "LOADING",
  size = "full",
  showDelay = 300,
  mode = "dark",
}: LoadingProps) {
  const [visible, setVisible] = useState(showDelay === 0);

  useEffect(() => {
    if (showDelay === 0) return;

    const timer = setTimeout(() => {
      setVisible(true);
    }, showDelay);

    return () => clearTimeout(timer);
  }, [showDelay]);

  if (!visible) return null;

  const sizeClasses = {
    sm: "w-32 h-32",
    md: "w-48 h-48",
    lg: "w-64 h-64",
    full: "w-full h-full min-h-[200px]",
  };

  const colors: Record<string, string> = {
    dark: "border-black dark:border-white",
  };

  return (
    <div
      className={`flex flex-col items-center justify-center ${sizeClasses[size]}`}
    >
      <div className="relative">
        {/* Outer rotating square */}
        <div
          className={`w-20 h-20 border-4 ${colors[mode]} animate-[spin_3s_linear_infinite]`}
        >
          {/* Inner counter-rotating square */}
          <div
            className={`w-full h-full border-4 ${colors[mode]} flex items-center justify-center animate-[spin_2s_linear_infinite_reverse]`}
          >
            {/* Center square */}
            <div className="w-8 h-8 bg-black dark:bg-white animate-[pulse_1.5s_ease-in-out_infinite]"></div>
          </div>
        </div>
      </div>

      {/* Text with blinking effect */}
      <div className="mt-6 font-mono font-bold text-xl tracking-widest animate-[pulse_1.5s_ease-in-out_infinite]">
        {text}
      </div>

      {/* Progress bar */}
      <div className={`mt-4 w-40 h-2 border-2 ${colors[mode]} overflow-hidden`}>
        <div className="h-full bg-black dark:bg-white w-full animate-[brutalistProgress_2s_ease-in-out_infinite]"></div>
      </div>
    </div>
  );
}

export default Loading;
