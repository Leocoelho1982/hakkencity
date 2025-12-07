import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { setUser } from "../features/userSlice";
import { useRegisterUserMutation } from "../features/authApi";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { motion } from "framer-motion";

import mapBg from "../assets/background.png";

// Avatares corpo inteiro
import flintFull from "../assets/avatars/avatar_1.png";
import ariaFull from "../assets/avatars/avatar_2.jpg";

// Avatares HEAD (para gravar)
import flintHead from "../assets/avatars/avatar_1_p.jpg";
import ariaHead from "../assets/avatars/avatar_2_p.jpg";

export default function RegisterPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [registerUser, { isLoading }] = useRegisterUserMutation();

  // Avatares disponíveis
  const avatars = [
    {
      id: "flint",
      name: "Flint",
      description: "O Explorador Destemido",
      full: flintFull,
      head: flintHead,
    },
    {
      id: "aria",
      name: "Aria",
      description: "A Capitã Aventureira",
      full: ariaFull,
      head: ariaHead,
    },
  ];

  const [form, setForm] = useState({
    username: "",
    password: "",
    confirmPassword: "",
    image: "",       // avatar head para enviar ao backend
    fullImage: "",   // apenas para preview visual
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

    if (form.password !== form.confirmPassword)
      return setError("As palavras-passe não coincidem");

    if (!form.image)
      return setError("Escolhe primeiro o teu Avatar");

    try {
      const res = await registerUser({
        username: form.username,
        password: form.password,
        image: form.imageFile, // ← avatar HEAD
      }).unwrap();

      console.log(res)

      dispatch(setUser(res.user));
      navigate("/map");
    } catch (err) {
      setError(err?.data?.message || "Erro no registo");
    }
  }

  return (
    <div
      className="h-screen w-screen bg-cover bg-center flex items-center justify-center px-4"
      style={{ backgroundImage: `url(${mapBg})` }}
    >
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-sm bg-[#FFF4D4] rounded-3xl shadow-2xl border-4 border-marron-100 p-7"
      >

        {/* TITLE */}
        <h1 className="text-3xl text-center font-title text-marron-100">
          Novo Explorador
        </h1>

        <p className="text-center text-marron-80 text-sm mt-1 mb-4 italic">
          Escolhe o teu herói e começa a aventura
        </p>

        {/* AVATAR SELECT */}
        <div className="grid grid-cols-2 gap-5 justify-items-center mb-4">
          {avatars.map(av => (
            <motion.button
              key={av.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.92 }}
              onClick={() =>
                setForm({
                  ...form,
                  image: av.head,               // caminho completo (para comparar)
                  imageFile: av.head.split("/").pop(), // só o ficheiro (para o backend)
                  fullImage: av.full            // preview
                })
              }
              className={`
                rounded-xl border-4 bg-white shadow-lg p-3 transition-all w-36 h-56 flex flex-col items-center
                ${
                  form.image === av.head
                    ? "border-yellow-500 shadow-yellow-400 shadow-xl"
                    : "border-transparent opacity-85 hover:opacity-100"
                }
              `}
            >
              <img
                src={av.full}
                alt={av.name}
                className="w-full h-36 object-contain drop-shadow-md"
              />
              <p className="text-center font-semibold text-marron-100 mt-1 text-sm">
                {av.name}
              </p>
              <p className="text-center text-xs text-marron-80 leading-tight">
                {av.description}
              </p>
            </motion.button>
          ))}
        </div>


        {/* FORM */}
        <form onSubmit={handleSubmit} className="space-y-3">

          <input
            type="text"
            name="username"
            placeholder="Username"
            value={form.username}
            onChange={handleChange}
            className="block w-full rounded-full border-2 border-marron-100 bg-white h-[48px] px-4"
            required
          />

          {/* PASSWORD */}
          <div className="relative">
            <input
              type={showPass ? "text" : "password"}
              name="password"
              placeholder="Palavra Passe"
              value={form.password}
              onChange={handleChange}
              className="block w-full rounded-full border-2 border-marron-100 bg-white h-[48px] px-4"
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

          {/* CONFIRM */}
          <div className="relative">
            <input
              type={showConfirm ? "text" : "password"}
              name="confirmPassword"
              placeholder="Confirmar Palavra Passe"
              value={form.confirmPassword}
              onChange={handleChange}
              className="block w-full rounded-full border-2 border-marron-100 bg-white h-[48px] px-4"
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

          {error && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-red-600 text-sm text-center"
            >
              {error}
            </motion.p>
          )}

          <motion.button
            type="submit"
            whileTap={{ scale: 0.95 }}
            disabled={isLoading}
            className="w-full bg-gradient-to-b from-[#E86A46] to-[#D3563A] text-white font-title text-xl py-3 rounded-full shadow-lg hover:brightness-110 transition disabled:opacity-50"
          >
            {isLoading ? "A criar conta..." : "Começar Aventura!"}
          </motion.button>
        </form>

        <div className="mt-6 text-center text-sm font-semibold text-marron-100">
          Já tem conta?{" "}
          <Link to="/login" className="underline hover:text-marron-80">
            Entrar
          </Link>
        </div>

      </motion.div>
    </div>
  );
}
