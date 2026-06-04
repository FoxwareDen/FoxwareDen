"use client";

import { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";
import { Link } from "react-router";

export interface DropdownItem {
  label: string;
  href: string;
}

interface DropdownProps {
  label: string;
  items: DropdownItem[];
  className?: string;
}

export default function DropdownProps({
  label,
  items,
  className,
}: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        aria-label="content dropdown button"
        onClick={() => setIsOpen(!isOpen)}
        className={`font-medium text-foreground hover:text-vibrant-purple transition-colors flex items-center gap-1 ${className}`}
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        {label}
        <ChevronDown
          className={`h-4 w-4 transition-transform duration-300 ${
            isOpen ? "rotate-180 text-vibrant-purple" : ""
          }`}
        />
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 mt-2 min-w-[200px] bg-card border border-foreground/10 rounded-xl shadow-lg z-50 overflow-hidden animate-fade-in-down">
          <div className="flex flex-col">
            {items.map((item, index) => (
              <Link
                key={index}
                to={item.href}
                className="px-4 py-3 font-mono text-sm text-foreground hover:bg-vibrant-purple/10 hover:text-vibrant-purple transition-colors border-b border-foreground/5 last:border-b-0"
                onClick={() => setIsOpen(false)}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
