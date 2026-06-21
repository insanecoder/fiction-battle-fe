import "@testing-library/jest-dom";

Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: (query: string) => ({
    matches: query.includes("dark") ? false : true, // default: light mode
    media: query,
    onchange: null,
  }),
});