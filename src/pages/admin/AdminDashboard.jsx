import { Link } from "react-router-dom";
import {
  FiUsers,
  FiMap,
  FiMapPin,
  FiGrid,
  FiLogOut,
} from "react-icons/fi";

import {
  useGetCitiesCountQuery,
  useGetZonesCountQuery,
  useGetPoisCountQuery,
} from "../../features/adminApi";

import { useAdminSessionQuery } from "../../features/adminApi";


export default function AdminDashboard() {

    const { data, error, isLoading } = useAdminSessionQuery();

    if (isLoading) {
    return <div className="p-6">A carregar…</div>;
    }

    // cookie inválido → vai para login
    if (error) {
    window.location.href = "/admin/login";
    return null;
    }

  const menu = [
    { name: "Utilizadores", icon: <FiUsers className="h-5 w-5" />, to: "/admin/users" },
    { name: "POIs", icon: <FiMapPin className="h-5 w-5" />, to: "/admin/pois" },
    { name: "Cidades", icon: <FiMap className="h-5 w-5" />, to: "/admin/cities" },
    { name: "Zonas", icon: <FiGrid className="h-5 w-5" />, to: "/admin/zones" },
  ];

  const logout = async () => {
  try {
    await fetch("https://api.hakkencity.com/api/admin/logout", {
      method: "POST",
      credentials: "include",  // 🔥 envia o cookie para backend apagar
    });

    window.location.href = "/admin/login";
  } catch (err) {
    console.error("Erro ao terminar sessão:", err);
  }
};


  // ---- Estatísticas ----
  const { data: citiesCount } = useGetCitiesCountQuery();
  const { data: zonesCount } = useGetZonesCountQuery();
  const { data: poisCount } = useGetPoisCountQuery();

  return (
    <div className="min-h-screen flex bg-gray-100">
      
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md p-6 flex flex-col">
        <h2 className="text-xl font-bold mb-6">Administração</h2>

        <nav className="flex-1 space-y-2">
          {menu.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-200 transition"
            >
              {item.icon}
              <span>{item.name}</span>
            </Link>
          ))}
        </nav>

        <button
          onClick={logout}
          className="flex items-center gap-2 mt-6 text-red-600 p-3 hover:bg-red-100 rounded-lg transition"
        >
          <FiLogOut className="h-5 w-5" />
          Terminar sessão
        </button>
      </aside>

      {/* Conteúdo */}
      <main className="flex-1 p-10">
        <h1 className="text-3xl font-bold mb-6">Painel Administrativo</h1>
        <p className="text-gray-700 mb-8">
          Escolha uma opção no menu à esquerda para gerir os dados do jogo.
        </p>

        {/* Estatísticas */}
        <div className="grid grid-cols-3 gap-6 mt-10">
          <div className="bg-white shadow rounded-xl p-6 flex flex-col items-center">
            <FiMap className="h-8 w-8 text-blue-600 mb-2" />
            <p className="text-2xl font-bold">{citiesCount?.total ?? "—"}</p>
            <p className="text-gray-600">Cidades</p>
          </div>

          <div className="bg-white shadow rounded-xl p-6 flex flex-col items-center">
            <FiGrid className="h-8 w-8 text-green-600 mb-2" />
            <p className="text-2xl font-bold">{zonesCount?.total ?? "—"}</p>
            <p className="text-gray-600">Zonas</p>
          </div>

          <div className="bg-white shadow rounded-xl p-6 flex flex-col items-center">
            <FiMapPin className="h-8 w-8 text-red-600 mb-2" />
            <p className="text-2xl font-bold">{poisCount?.total ?? "—"}</p>
            <p className="text-gray-600">POIs</p>
          </div>
        </div>

      </main>
    </div>
  );
}
