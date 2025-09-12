import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { setUser } from "../features/userSlice";
import { useRegisterUserMutation } from "../features/authApi";
import { FiEye, FiEyeOff } from "react-icons/fi";
import coin from "../assets/coin.png";
import background from "../assets/background.png";

import avatar1 from "../assets/avatars/avatar1.jpg";
import avatar2 from "../assets/avatars/avatar2.jpg";
import avatar3 from "../assets/avatars/avatar3.jpg";
import avatar4 from "../assets/avatars/avatar4.jpg";
import avatar5 from "../assets/avatars/avatar5.jpg";
import avatar6 from "../assets/avatars/avatar6.jpg";
import avatar7 from "../assets/avatars/avatar7.jpg";
import avatar8 from "../assets/avatars/avatar8.jpg";

export default function RegisterPage() {
  const images = [avatar1, avatar2, avatar3, avatar4, avatar5, avatar6, avatar7, avatar8];

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [registerUser, { isLoading }] = useRegisterUserMutation();

  const [form, setForm] = useState({
    username: "",
    password: "",
    confirmPassword: "",
    image: "", // 👈 agora chama-se image
  });

  const [error, setError] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    if (form.password !== form.confirmPassword) {
      setError("As palavras-passe não coincidem");
      return;
    }

    console.log("📦 Dados enviados para backend:", form);

    try {
      const res = await registerUser(form).unwrap();
      dispatch(setUser(res.user || { username: form.username, image: form.image }));
      navigate("/map");
    } catch (err) {
      setError(err?.data?.message || "Erro no registo");
    }
  }

  return (
    <div
      className="h-screen w-screen bg-cover bg-center bg-fixed flex items-center justify-center px-4"
      style={{ backgroundImage: `url(${background})` }}
    >
      <div className="w-full max-w-sm bg-gradient-to-b from-gold-20 to-gold-60 rounded-3xl shadow-xl p-6 border-4 border-marron-100 max-h-[90vh] overflow-y-auto">
        <h1 className="text-2xl flex items-center justify-center font-title text-marron-100 mb-6">
          <img src={coin} className="h-10 w-10 mr-3" alt="Coin" />
          Criar Conta
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Image selection */}
          <div>
            <p className="text-center font-semibold text-marron-100 mb-2">
              Escolhe o teu Avatar
            </p>
            <div className="grid grid-cols-4 gap-3 justify-items-center">
              {images.map((img, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setForm({ ...form, image: img })}
                  className={`p-1 rounded-xl border-4 ${
                    form.image === img ? "border-marron-100" : "border-transparent"
                  }`}
                >
                  <img src={img} alt={`Avatar ${idx + 1}`} className="w-16 h-16 rounded-lg" />
                </button>
              ))}
            </div>
          </div>

          {/* Username */}
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={form.username}
            onChange={handleChange}
            className="block w-full rounded-full border-2 bg-white border-marron-100 h-[50px] px-4"
            required
          />

          {/* Password */}
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
              className="absolute right-4 top-1/2 -translate-y-1/2 text-marron-100"
            >
              {showPass ? <FiEyeOff size={20} /> : <FiEye size={20} />}
            </button>
          </div>

          {/* Confirm Password */}
          <div className="relative">
            <input
              type={showConfirm ? "text" : "password"}
              name="confirmPassword"
              placeholder="Confirmar Palavra Passe"
              value={form.confirmPassword}
              onChange={handleChange}
              className="block w-full rounded-full bg-white border-2 border-marron-100 h-[50px] px-4"
              required
            />
            <button
              type="button"
              onClick={() => setShowConfirm(!showConfirm)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-marron-100"
            >
              {showConfirm ? <FiEyeOff size={20} /> : <FiEye size={20} />}
            </button>
          </div>

          {error && <p className="text-vermelho-100 text-sm text-center">{error}</p>}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-marron-40 text-white font-title text-lg py-3 rounded-full shadow-md hover:bg-marron-60 transition disabled:opacity-50"
          >
            {isLoading ? "A criar conta..." : "Começar Aventura!"}
          </button>
        </form>

        <div className="mt-6 text-center text-sm font-semibold text-marron-100">
          Já tem conta?{" "}
          <Link to="/login" className="hover:underline">
            Entrar
          </Link>
        </div>
      </div>
    </div>
  );
}
