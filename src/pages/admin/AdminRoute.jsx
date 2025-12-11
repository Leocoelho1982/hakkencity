import { Navigate, Outlet } from "react-router-dom";
import { useAdminSessionQuery } from "../../features/adminApi";

export default function AdminRoute() {
  const { data, error, isLoading } = useAdminSessionQuery();

  // Enquanto verifica sessão → mostra loading
  if (isLoading) {
    return <div className="p-6 text-center">A verificar sessão...</div>;
  }

  // Se sessão inválida → redireciona
  if (error) {
    return <Navigate to="/admin/login" replace />;
  }

  // Sessão válida → deixa entrar
  return <Outlet />;
}
