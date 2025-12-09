/* eslint-disable */
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { PuffLoader } from "react-spinners";

export default function PrivateRoute() {
  const { isAuthenticated, loading } = useSelector((state) => state.user);

  // 1) Se ainda está a carregar (boot inicial)
  if (loading) {
    return (
      <div className="w-full h-screen flex items-center justify-center bg-gradient-to-b from-gold-20 to-gold-60">
        <PuffLoader color="#8B3A1A" size={80} />
      </div>
    );
  }

  // 2) SEM autenticação válida → ir para login
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // 3) Autenticado → pode entrar
  return <Outlet />;
}
