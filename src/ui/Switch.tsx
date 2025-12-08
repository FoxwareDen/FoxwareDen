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
          border-2 border-black dark:border-white
          transition-colors duration-200
          ${checked ? "bg-black dark:bg-white" : "bg-white dark:bg-black"}
          ${disabled ? "cursor-not-allowed" : "cursor-pointer"}
          ${className}
        `}
      >
        {/* Handle */}
        <span
          className={`
            absolute top-1/2 -translate-y-1/2 left-0.5
            ${sizeConfig.handle}
            transition-transform duration-200
            ${checked ? sizeConfig.translate : "translate-x-0"}
            ${checked ? "bg-white dark:bg-black" : "bg-black dark:bg-white"}
            border-2 border-black dark:border-white
          `}
        />
      </button>

      {label && (
        <span className="font-mono font-medium select-none">{label}</span>
      )}
    </label>
  );
}
