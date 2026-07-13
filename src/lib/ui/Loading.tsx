import { useEffect, useState } from "react";

interface LoadingProps {
  text?: string;
  size?: "sm" | "md" | "lg" | "full";
  showDelay?: number;
}

function Loading({
  text = "LOADING",
  size = "full",
  showDelay = 300,
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

  return (
    <div
      className={`flex flex-col items-center justify-center ${sizeClasses[size]}`}
    >
      <div className="relative">
        {/* Outer rotating square with gradient */}
        <div
          className="w-20 h-20 border-4 border-vibrant-purple animate-[spin_3s_linear_infinite] rounded-lg"
        >
          {/* Inner counter-rotating square */}
          <div
            className="w-full h-full border-4 border-vibrant-teal flex items-center justify-center animate-[spin_2s_linear_infinite_reverse] rounded-lg"
          >
            {/* Center square */}
            <div className="w-8 h-8 bg-gradient-to-br from-vibrant-purple to-vibrant-teal animate-pulse-glow rounded-md" />
          </div>
        </div>
      </div>

      {/* Text with blinking effect */}
      <div className="mt-6 font-mono font-bold text-xl tracking-widest text-foreground animate-pulse-glow">
        {text}
      </div>

      {/* Progress bar */}
      <div className="mt-4 w-40 h-2 border border-foreground/20 overflow-hidden rounded-full bg-foreground/5">
        <div className="h-full bg-gradient-to-r from-vibrant-purple via-vibrant-teal to-vibrant-amber w-full animate-[brutalistProgress_2s_ease-in-out_infinite]" />
      </div>
    </div>
  );
}

export default Loading;
