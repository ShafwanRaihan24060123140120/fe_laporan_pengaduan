import { Navigate, Outlet } from "react-router-dom";

export default function RequireRole({ role }) {

    
  if (isDev) {
    localStorage.setItem("token", localStorage.getItem("token") || "dummy");
    localStorage.setItem("role", localStorage.getItem("role") || "teknisi");
  }

  const token = localStorage.getItem("token");
  const userRole = (localStorage.getItem("role") || "").trim().toLowerCase();

  if (!token) return <Navigate to="/login" replace />;
  if (userRole !== role) return <Navigate to="/login" replace />;

  return <Outlet />;
}
