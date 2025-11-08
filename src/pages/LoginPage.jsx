import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { setUser } from "../features/userSlice";
import { useLoginUserMutation } from "../features/authApi";
import { FiEye, FiEyeOff } from "react-icons/fi";
import coin from "../assets/coin.png";
import background from "../assets/background.png";

export default function LoginPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loginUser, { isLoading }] = useLoginUserMutation();

  const [form, setForm] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const [showPass, setShowPass] = useState(false);

  // ✅ Verifica se já existe utilizador guardado e restaura automaticamente
  useEffect(() => {
    const storedUser = localStorage.getItem("hakkenUser");
    if (storedUser) {
      dispatch(setUser(JSON.parse(storedUser)));
      navigate("/map"); // entra diretamente sem pedir login
    }
  }, [dispatch, navigate]);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    try {
      const res = await loginUser(form).unwrap();

      // guarda utilizador no Redux
      const userData = res.user || { username: form.username };
      dispatch(setUser(userData));

      // ✅ guarda também no localStorage
      localStorage.setItem("hakkenUser", JSON.stringify(userData));

      navigate("/map");
    } catch (err) {
      setError(err?.data?.message || "Credenciais inválidas");
    }
  }

  return (
    <div
      className="h-screen flex items-center justify-center bg-cover bg-center px-4"
      style={{ backgroundImage: `url(${background})` }}
    >
      <div className="w-full max-w-sm bg-gradient-to-b from-gold-20 to-gold-60 rounded-3xl shadow-xl p-6 border-4 border-marron-100">
        <h1 className="text-2xl flex items-center justify-center font-title text-marron-100 mb-6">
          <img src={coin} className="h-10 w-10 mr-3" alt="Coin" />
          Entrar
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={form.username}
            onChange={handleChange}
            className="block w-full rounded-full bg-white border-2 border-marron-100 h-[50px] px-4"
            required
          />

          <div className="relative">
            <input
              type={showPass ? "text" : "password"}
              name="password"
              placeholder="Palavra Passe"
              value={form.password}
              onChange={handleChange}
              className="block w-full rounded-full bg-white border-2 border-marron-100 h-[50px] px-4"
              required
            />
            <button
              type="button"
              onClick={() => setShowPass(!showPass)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-marron-100 cursor-pointer"
            >
              {showPass ? <FiEyeOff size={20} /> : <FiEye size={20} />}
            </button>
          </div>

          {error && (
            <p className="text-vermelho-100 text-sm text-center">{error}</p>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-marron-40 text-white font-title text-lg py-3 rounded-full shadow-md hover:bg-marron-60 transition disabled:opacity-50"
          >
            {isLoading ? "Entrando..." : "Entrar"}
          </button>
        </form>

        <div className="mt-6 flex justify-between text-sm font-semibold text-marron-100">
          <Link to="/register" className="hover:underline">
            Criar conta
          </Link>
          <Link to="/forgot-password" className="hover:underline">
            Esqueceu a senha?
          </Link>
        </div>
      </div>
    </div>
  );
}
