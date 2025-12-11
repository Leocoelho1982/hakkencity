import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  useGetUsersQuery,
  useDeleteUserMutation,
} from "../../features/adminApi";

export default function UsersPage() {
  const navigate = useNavigate();

  const { data: users = [], isLoading, error, refetch } = useGetUsersQuery();
  const [deleteUser] = useDeleteUserMutation();

  const [search, setSearch] = useState("");
  const [filtered, setFiltered] = useState([]);

  // Filtragem local
  useEffect(() => {
    const s = search.toLowerCase();
    setFiltered(
      users.filter(
        (u) =>
          u.username.toLowerCase().includes(s) ||
          (u.name && u.name.toLowerCase().includes(s))
      )
    );
  }, [search, users]);

  // Delete user
  const handleDelete = async (id) => {
    if (!confirm("Tem a certeza que deseja apagar este utilizador?")) return;

    try {
      await deleteUser(id).unwrap();
      refetch(); // atualiza lista
    } catch (err) {
      console.error("Erro ao apagar:", err);
      alert("Falha ao remover utilizador.");
    }
  };

  if (isLoading)
    return <p className="p-6 text-gray-600">A carregar utilizadores...</p>;

  if (error)
    return (
      <p className="p-6 text-red-600">
        Erro ao carregar utilizadores. Sessão pode ter expirado.
      </p>
    );

  return (
    <div className="p-6 max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-semibold">Gestão de Utilizadores</h1>

        <button
          onClick={() => navigate("/admin")}
          className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-900 rounded-md transition"
        >
          ← Voltar ao Painel
        </button>
      </div>

      {/* Search */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Pesquisar por username ou nome…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full p-3 border rounded-md shadow-sm focus:ring-2 focus:ring-indigo-500 outline-none"
        />
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-lg shadow">
        <table className="min-w-full bg-white">
          <thead className="bg-gray-100 border-b">
            <tr>
              <th className="text-left p-3 font-medium">ID</th>
              <th className="text-left p-3 font-medium">Username</th>
              <th className="text-left p-3 font-medium">Nome</th>
              <th className="text-left p-3 font-medium">Ações</th>
            </tr>
          </thead>

          <tbody>
            {filtered.length === 0 && (
              <tr>
                <td colSpan="4" className="text-center p-6 text-gray-500">
                  Nenhum utilizador encontrado.
                </td>
              </tr>
            )}

            {filtered.map((user) => (
              <tr key={user.id} className="border-b hover:bg-gray-50">
                <td className="p-3">{user.id}</td>
                <td className="p-3 font-medium">{user.username}</td>
                <td className="p-3">{user.name || "—"}</td>

                <td className="p-3 space-x-4">
                  <button
                    onClick={() => handleDelete(user.id)}
                    className="text-red-600 hover:text-red-800 font-medium"
                  >
                    Apagar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
