import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setTheme, ThemeMode } from "./themeSlice";
import type { RootState, AppDispatch } from "./store";

const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const dispatch = useDispatch<AppDispatch>();
  const mode = useSelector((state: RootState) => state.theme.mode);

  // 1) Cargar theme guardado al iniciar
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark" || savedTheme === "light") {
      dispatch(setTheme(savedTheme as ThemeMode));
    } else {
      dispatch(setTheme("light"));
    }
  }, [dispatch]);

  // 2) Aplicar la clase .light / .dark al body
  useEffect(() => {
    const currentTheme = mode || "light";

    const root = document.documentElement; // ✅ html
    root.classList.remove("light", "dark");
    root.classList.add(currentTheme);

    // opcional: también en body (no hace daño)
    document.body.classList.remove("light", "dark");
    document.body.classList.add(currentTheme);

    localStorage.setItem("theme", currentTheme);
  }, [mode]);

  return <>{children}</>;
};

export default ThemeProvider;