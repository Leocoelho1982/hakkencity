import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function UsersPage() {
  const [users, setUsers] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  const navigate = useNavigate();
  const API = "https://api.hakkencity.com/api/users";

  // ---------------------
  // GET USERS
  // ---------------------
  const loadUsers = async () => {
    setLoading(true);

    try {
      const token = localStorage.getItem("adminToken");

      const res = await fetch(API, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = await res.json();
      setUsers(data);
      setFiltered(data);
    } catch (err) {
      console.error("Erro ao carregar utilizadores:", err);
      alert("Falha ao carregar utilizadores.");
    }

    setLoading(false);
  };

  // ---------------------
  // DELETE USER
  // ---------------------
  const deleteUser = async (id) => {
    if (!confirm("Tem a certeza que deseja apagar este utilizador?")) return;

    try {
      const token = localStorage.getItem("adminToken");

      const res = await fetch(`${API}/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.ok) return alert("Erro ao apagar.");

      // Remover visualmente
      const updated = users.filter((u) => u.id !== id);
      setUsers(updated);
      setFiltered(updated);
    } catch (err) {
      console.error("Erro ao apagar:", err);
      alert("Falha ao remover utilizador.");
    }
  };

  // ---------------------
  // SEARCH BAR
  // ---------------------
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

  // ---------------------
  // LOAD DATA
  // ---------------------
  useEffect(() => {
    loadUsers();
  }, []);

  if (loading)
    return <p className="p-6 text-gray-600">A carregar utilizadores...</p>;

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
                    onClick={() => deleteUser(user.id)}
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
