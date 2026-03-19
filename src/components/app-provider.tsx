"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

type Toast = {
  id: number;
  title: string;
  description: string;
};

type AppContextValue = {
  theme: "light" | "dark";
  toggleTheme: () => void;
  pushToast: (toast: Omit<Toast, "id">) => void;
  dismissToast: (id: number) => void;
  toasts: Toast[];
};

const AppContext = createContext<AppContextValue | null>(null);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [toasts, setToasts] = useState<Toast[]>([]);

  useEffect(() => {
    const savedTheme = window.localStorage.getItem("instaflow-theme");
    if (savedTheme === "light" || savedTheme === "dark") {
      setTheme(savedTheme);
    }
  }, []);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    window.localStorage.setItem("instaflow-theme", theme);
  }, [theme]);

  const value = useMemo<AppContextValue>(
    () => ({
      theme,
      toggleTheme: () =>
        setTheme((current) => (current === "light" ? "dark" : "light")),
      pushToast: (toast) => {
        const id = Date.now();
        setToasts((current) => [...current, { ...toast, id }]);
        window.setTimeout(() => {
          setToasts((current) => current.filter((item) => item.id !== id));
        }, 3200);
      },
      dismissToast: (id) => {
        setToasts((current) => current.filter((item) => item.id !== id));
      },
      toasts,
    }),
    [theme, toasts],
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useAppShell() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppShell must be used inside AppProvider");
  }
  return context;
}
