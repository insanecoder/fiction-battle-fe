import { useEffect } from "react";
import { type ToastType } from "../../store/ToastStore";

type ToastProps = {
  id: string;
  message: string;
  type: ToastType;
  onClose: (id: string) => void;
};

const styles = {
  success:
    "border-green-200 bg-green-50 text-green-800 dark:border-green-800/60 dark:bg-green-950/70 dark:text-green-200",
  error:
    "border-red-200 bg-red-50 text-red-800 dark:border-red-800/60 dark:bg-red-950/70 dark:text-red-200"
};

const icons = {
  success: "✅",
  error: "❌"
};

export default function Toast({ id, message, type, onClose }: ToastProps) {
  useEffect(() => {
    const timer = setTimeout(() => onClose(id), 3000);
    return () => clearTimeout(timer);
  }, [id, onClose]);

  return (
    <div
      role="status"
      aria-live="polite"
      className={`flex items-center gap-3 rounded-xl border px-4 py-3 shadow-md backdrop-blur-sm ${styles[type]}`}
    >
      <span aria-hidden="true" className="text-sm">{icons[type]}</span>

      <div className="flex-1 text-sm font-medium">{message}</div>

      <button
        onClick={() => onClose(id)}
        className="opacity-70 hover:opacity-100 cursor-pointer"
        aria-label="Close"
      >
        ×
      </button>
    </div>
  );
}