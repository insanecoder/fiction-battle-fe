import { useTheme } from "../hooks/useTheme";

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const themeIcon = (theme === "dark" ? "☀️" : "🌙")
  const themeText = (theme === "dark" ? "Light": "Dark")
  return (
    <button
      onClick={toggleTheme}
      className="transition hover:cursor-pointer"
    >
    {themeIcon}<span className="ml-3" aria-label="Toggle Theme">{themeText}</span>
    </button>
  );
}
