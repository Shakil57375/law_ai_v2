import { Navigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectAccessToken } from "../features/auth/authSlice";

export function PrivateRoute({ children }) {
  // Retrieve auth data from localStorage
  // const user = useSelector((state) => state.auth.user);
  const access = useSelector(selectAccessToken);
  const location = useLocation();

  // Check if user is not authenticated
  if (!access) {
    return <Navigate to="/home" state={{ from: location }} replace />;
  }

  // User meets all requirements
  return children;
}
