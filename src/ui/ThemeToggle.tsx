import { Moon, Sun } from "lucide-react";
import { useTheme } from "../lib/ThemeProvider";

export default function ThemeToggle({ className }: { className?: string }) {
  const { theme, setTheme } = useTheme();

  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className={`h-10 w-10 rounded-lg border border-foreground/10 bg-background hover:bg-vibrant-amber/10 hover:border-vibrant-amber/30 flex items-center justify-center relative overflow-hidden transition-all duration-300 group ${className}`}
      aria-label="Toggle theme"
    >
      <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0 group-hover:text-vibrant-amber" />
      <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100 group-hover:text-vibrant-amber" />
    </button>
  );
}
