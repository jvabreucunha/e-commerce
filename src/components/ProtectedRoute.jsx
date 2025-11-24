import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const [loading, setLoading] = useState(true);
  const [valid, setValid] = useState(false);

  useEffect(() => {
    async function checkToken() {
      const token = localStorage.getItem("token");
      if (!token) {
        setLoading(false);
        setValid(false);
        return;
      }

      try {
        const res = await fetch("https://sua-api.com/auth/validate", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (res.ok) {
          setValid(true);
        } else {
          setValid(false);
          localStorage.removeItem("token");
        }
      } catch {
        setValid(false);
      }

      setLoading(false);
    }

    checkToken();
  }, []);

  if (loading) {
    return <div className="text-white">Validando sessão...</div>;
  }

  if (!valid) {
    return <Navigate to="/login" replace />;
  }

  return children;
}
