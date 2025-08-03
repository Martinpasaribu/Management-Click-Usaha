"use client";

import { useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/lib/store";

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const theme = useSelector((state: RootState) => state.theme.mode);

  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove("dark", "light");
    root.classList.add(theme);
  }, [theme]);

  return <>{children}</>;
}
