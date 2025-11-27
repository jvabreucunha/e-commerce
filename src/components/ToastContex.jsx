import { createContext, useContext, useState } from "react";

const ToastContext = createContext();

function useToastInternal() {
  return useContext(ToastContext);
}

export function ToastProvider({ children }) {
  const [toast, setToast] = useState(null);

  function showToast(message, type = "success") {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  }

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}

      {toast && (
        <div
          className="
            fixed top-4 right-4 px-4 py-3 rounded-xl shadow-lg
            text-white animate-slideIn z-50
          "
          style={{
            background:
              toast.type === "success"
                ? "rgb(34 197 94)" // verde
                : toast.type === "error"
                ? "rgb(239 68 68)" // vermelho
                : "rgb(168 85 247)" // roxo
          }}
        >
          {toast.message}
        </div>
      )}
    </ToastContext.Provider>
  );
}

ToastProvider.useToast = useToastInternal;
