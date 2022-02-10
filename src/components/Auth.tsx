import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export const RequireAuth = ({ children }: { children: JSX.Element }) => {
  let { user } = useAuth();
  let location = useLocation();

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

export const NoAuth = ({ children }: { children: JSX.Element }) => {
  let { user } = useAuth();

  if (user) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export const AdminOnly = ({ children }: { children: JSX.Element }) => {
  let { user } = useAuth();

  if (user.role !== "admin") {
    return <Navigate to="/" replace />;
  }

  return children;
};
