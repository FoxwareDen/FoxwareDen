"use client";

import { useState } from "react";

interface BrutalistSwitchProps {
  checked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  label?: string;
  disabled?: boolean;
  size?: "sm" | "md" | "lg";
  className?: string;
}

export default function BrutalistSwitch({
  checked: controlledChecked,
  onCheckedChange,
  label,
  disabled = false,
  size = "md",
  className,
}: BrutalistSwitchProps) {
  const [internalChecked, setInternalChecked] = useState(false);

  const isControlled = controlledChecked !== undefined;
  const checked = isControlled ? controlledChecked : internalChecked;

  const handleToggle = () => {
    if (disabled) return;

    const newValue = !checked;
    if (!isControlled) {
      setInternalChecked(newValue);
    }
    onCheckedChange?.(newValue);
  };

  const sizes = {
    sm: {
      container: "w-10 h-5",
      handle: "w-4 h-4",
      translate: "translate-x-5",
    },
    md: {
      container: "w-14 h-7",
      handle: "w-5 h-5",
      translate: "translate-x-7",
    },
    lg: {
      container: "w-16 h-8",
      handle: "w-6 h-6",
      translate: "translate-x-8",
    },
  };

  const sizeConfig = sizes[size];

  return (
    <label
      className={`inline-flex items-center gap-3 ${
        disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
      }`}
    >
      <button
        aria-label="Toggle switch"
        type="button"
        role="switch"
        aria-checked={checked}
        disabled={disabled}
        onClick={handleToggle}
        className={`
          relative ${sizeConfig.container}
          border border-foreground/20
          rounded-full
          transition-all duration-300
          ${checked ? "bg-gradient-to-r from-vibrant-purple to-vibrant-teal" : "bg-foreground/10"}
          ${disabled ? "cursor-not-allowed" : "cursor-pointer hover:border-vibrant-purple/50"}
          ${className}
        `}
      >
        {/* Handle */}
        <span
          className={`
            absolute top-1/2 -translate-y-1/2 left-0.5
            ${sizeConfig.handle}
            transition-all duration-300
            ${checked ? sizeConfig.translate : "translate-x-0"}
            bg-white
            rounded-full
            shadow-md
            ${checked ? "shadow-vibrant-purple/30" : ""}
          `}
        />
      </button>

      {label && (
        <span className="font-mono font-medium select-none text-foreground">{label}</span>
      )}
    </label>
  );
}
