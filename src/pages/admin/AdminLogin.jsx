import { useState } from "react";
import { useAdminLoginMutation } from "../../features/adminApi";

export default function AdminLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [adminLogin, { isLoading }] = useAdminLoginMutation();

  const login = async (e) => {
    e.preventDefault();

    try {
      await adminLogin({ username, password }).unwrap();
      window.location.href = "/admin";

    } catch (err) {
      console.error("Erro login admin:", err);
      alert("Credenciais inválidas");
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
            className="w-full px-4 py-2 border rounded-lg"
          />

          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Senha"
            type="password"
            className="w-full px-4 py-2 border rounded-lg"
          />

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-blue-600 text-white py-2 rounded-lg disabled:opacity-50"
          >
            {isLoading ? "A entrar..." : "Entrar"}
          </button>
        </form>
      </div>
    </div>
  );
}
