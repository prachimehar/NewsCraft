import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../auth.jsx";

function ProtectedRoute() {
  const { user } = useAuth();
  const location = useLocation();
  return user ? <Outlet /> : <Navigate to="/login" state={{ from: location.pathname }} replace />;
}

export default ProtectedRoute;
