/* eslint-disable */
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLogoutUserMutation } from "../features/authApi";
import { logout } from "../features/userSlice";
import { useNavigate } from "react-router-dom";
import { FiLogOut, FiArrowLeft } from "react-icons/fi";
import { motion } from "framer-motion";
import avatarFallback from "../assets/avatar.jpg";   // ✅ IMPORTAR

export default function ProfilePage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [logoutUser, { isLoading }] = useLogoutUserMutation();

  const username = useSelector((state) => state.user.username);
  const avatar = useSelector((state) => state.user.image);

  // ✅ CORREÇÃO AQUI
  const avatarUrl = avatar || avatarFallback;


  async function handleLogout() {
    try {
      await logoutUser().unwrap();
    } catch (err) {
      console.warn("Erro ao terminar sessão", err);
    }
    dispatch(logout());
    localStorage.clear();
    navigate("/login");
  }


  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-[#F8E6B8] to-[#F4C87C] flex flex-col items-center pt-10 px-6">

      {/* Botão de Voltar */}
      <button
  onClick={() => navigate("/map")}
  className="
    absolute top-4 left-4
    w-11 h-11
    rounded-full
    bg-[#F8DCA0]
    border-[3px] border-[#8B5E3C]
    flex items-center justify-center
    shadow-[0_3px_0px_#C89B4C]
    hover:scale-110 transition
  "
>
  <FiArrowLeft size={20} className="text-[#5A2C0A]" />
</button>


      {/* CARD PRINCIPAL DO PERFIL */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white w-full max-w-md rounded-3xl p-7 shadow-2xl border-4 border-yellow-300 text-center"
      >
        <h1 className="text-3xl font-title text-marron-100 mb-4">
          Perfil do Explorador
        </h1>

        {/* Avatar */}
        <motion.img
          src={avatarUrl}
          alt="avatar"
          className="w-32 h-32 rounded-full mx-auto border-4 border-yellow-400 shadow-xl"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 120 }}
        />

        {/* Username */}
        <p className="text-xl font-bold text-marron-100 mt-4">@{username}</p>

        {/* Estatísticas simples */}
        <div className="grid grid-cols-3 gap-3 mt-6">
          <div className="bg-yellow-100 p-4 rounded-xl shadow-md">
            <p className="text-2xl font-bold text-marron-100">5</p>
            <p className="text-xs text-marron-90">Nível</p>
          </div>

          <div className="bg-yellow-100 p-4 rounded-xl shadow-md">
            <p className="text-2xl font-bold text-marron-100">780</p>
            <p className="text-xs text-marron-90">XP</p>
          </div>

          <div className="bg-yellow-100 p-4 rounded-xl shadow-md">
            <p className="text-2xl font-bold text-marron-100">12</p>
            <p className="text-xs text-marron-90">Moedas</p>
          </div>
        </div>

        {/* Conquistas */}
        <div className="mt-7">
          <h2 className="text-lg font-semibold text-marron-100 mb-2">
            Conquistas desbloqueadas
          </h2>
          <div className="flex justify-center gap-3">
            <div className="w-12 h-12 bg-yellow-200 rounded-xl shadow-md"></div>
            <div className="w-12 h-12 bg-yellow-200 rounded-xl shadow-md"></div>
            <div className="w-12 h-12 bg-yellow-200 rounded-xl shadow-md"></div>
          </div>
        </div>

        {/* BOTÃO DE LOGOUT */}
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={handleLogout}
          disabled={isLoading}
          className="mt-8 w-full bg-red-500 hover:bg-red-600 text-white py-3 rounded-full font-bold flex items-center justify-center gap-2 shadow-lg transition"
        >
          <FiLogOut size={20} />
          {isLoading ? "A sair..." : "Terminar Sessão"}
        </motion.button>
      </motion.div>
    </div>
  );
}
