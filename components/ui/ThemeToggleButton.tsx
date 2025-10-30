"use client";
import { useTheme } from "@/context/theme";
import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const theme = useTheme();

  return (
    <button
      onClick={theme.toggleTheme}
      className="px-4 py-2 rounded-xl bg-brand text-white shadow-card transition"
    >
      {theme.theme === "light" ? "🌙 Dark Mode" : "☀️ Light Mode"}
    </button>
  );
}
