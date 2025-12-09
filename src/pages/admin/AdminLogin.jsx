import { useState } from "react";

export default function AdminLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const login = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("https://api.hakkencity.com/api/admin/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      // Erro de credenciais
      if (!res.ok) {
        alert("Credenciais incorretas");
        setLoading(false);
        return;
      }

      const data = await res.json();

      // Salva token e vai para dashboard
      localStorage.setItem("adminToken", data.token);
      window.location.href = "/admin";

    } catch (err) {
      console.error("Erro no login admin:", err);
      alert("Erro ao ligar ao servidor");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-sm">
        <h1 className="text-2xl font-semibold text-center mb-6">
          Área Administrativa
        </h1>

        <form onSubmit={login} className="space-y-4">
          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Utilizador"
            className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-blue-300 outline-none"
          />

          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Senha"
            type="password"
            className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-blue-300 outline-none"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 transition text-white py-2 rounded-lg font-medium disabled:opacity-50"
          >
            {loading ? "A entrar..." : "Entrar"}
          </button>
        </form>
      </div>
    </div>
  );
}
