import { useToastStore } from "../store/ToastStore";
import Toast from "../common/components/Toast";

export default function ToastContainer() {
  const toasts = useToastStore((s) => s.toasts);
  const removeToast = useToastStore((s) => s.removeToast);

  return (
    <div className="fixed top-4 left-1/2 z-100 flex w-full max-w-md -translate-x-1/2 flex-col items-center gap-3 px-3">
      {toasts.map((t) => (
        <Toast
          key={t.id}
          id={t.id}
          message={t.message}
          type={t.type}
          onClose={removeToast}
        />
      ))}
    </div>
  );
}