import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

export default function PrivateRoute() {
  const { isAuthenticated, loading } = useSelector((state) => state.user);

  if (loading) {
    return <div>Loading...</div>;   // 🔥 impede redirect precoce
  }

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
}
