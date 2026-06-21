import { useToastStore } from "../store/ToastStore";

export function useToast() {
  const addToast = useToastStore((s) => s.addToast);

  return {
    success: (message: string) =>
      addToast({ type: "success", message }),

    error: (message: string) =>
      addToast({ type: "error", message }),
  };
}