import { createContext, useContext, useState } from "react";

const ToastContext = createContext();

/* eslint-disable react-refresh/only-export-components */

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
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
                ? "rgb(34 197 94)" 
                : toast.type === "error"
                ? "rgb(239 68 68)" 
                : "rgb(168 85 247)" 
          }}
        >
          {toast.message}
        </div>
      )}
    </ToastContext.Provider>
  );
}