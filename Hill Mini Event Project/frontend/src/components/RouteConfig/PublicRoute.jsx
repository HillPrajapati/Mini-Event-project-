// src/components/PublicRoute.jsx
import { Navigate } from "react-router-dom";
import { getToken } from "../../auth";

export default function PublicRoute({ children }) {
  const token = getToken();

  if (token && token.length > 0) {
    return <Navigate to="/events" replace />;
  }

  return children;
}
