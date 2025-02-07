import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./AuthContext.js";

const ProtectedRoute = () => {
  const { isAuthenticated } = useAuth();

  return isAuthenticated ? <Outlet /> : <Navigate to="/" replace />;
};

export default ProtectedRoute;
