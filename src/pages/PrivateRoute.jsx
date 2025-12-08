/* eslint-disable */
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { PuffLoader } from "react-spinners";

export default function PrivateRoute() {
  const { isAuthenticated, loading } = useSelector((state) => state.user);

  if (loading) {
    return (
      <div className="w-full h-screen flex items-center justify-center bg-gradient-to-b from-gold-20 to-gold-60">
        <PuffLoader color="#8B3A1A" size={80} />
      </div>
    );
  }

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
}
