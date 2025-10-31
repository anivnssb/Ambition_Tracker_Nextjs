"use client";
import { useTheme } from "@/context/theme";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <span onClick={toggleTheme} className="px-4 py-2 cursor-pointer">
      {theme === "light" ? "🌙" : "☀️"}
    </span>
  );
}
