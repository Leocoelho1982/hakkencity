/* eslint-disable */
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLogoutUserMutation } from "../features/authApi";
import { logout } from "../features/userSlice";
import { useNavigate } from "react-router-dom";
import { FiLogOut, FiArrowLeft } from "react-icons/fi";
import { motion } from "framer-motion";
import avatarFallback from "../assets/avatar.jpg";

export default function ProfilePage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [logoutUser, { isLoading }] = useLogoutUserMutation();

  const username = useSelector((state) => state.user.username);
  const avatar = useSelector((state) => state.user.image);
  const score = useSelector((state) => {
    const localScore = Number(localStorage.getItem("score") || 0);
    return localScore || state.user.score || 0;
  });

  const avatarUrl = avatar || avatarFallback;

  // Mock data - depois virá da API
  const level = 5;
  const xp = 780;

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
    <div className="min-h-screen w-full bg-gradient-to-b from-[#FFF4D6] to-[#FBCB6D] pb-8">
      {/* VOLTAR */}
      <button
        onClick={() => navigate("/map")}
        className="absolute top-4 left-4 w-11 h-11 rounded-full bg-[#F8DCA0] border-[3px] border-[#8B5E3C] flex items-center justify-center shadow-[0_3px_0px_#C89B4C] hover:scale-110 transition z-10"
      >
        <FiArrowLeft size={20} className="text-[#5A2C0A]" />
      </button>

      {/* TÍTULO - Mesmo estilo da Leaderboard */}
      <div className="pt-16 pb-4 px-6">
        <h1 className="text-center text-[#5A2C0A] font-title text-2xl font-bold mb-2">
          Perfil do Explorador
        </h1>
      </div>

      {/* AVATAR */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2 }}
        className="flex flex-col items-center mb-6"
      >
        <img
          src={avatarUrl}
          alt="avatar"
          className="w-32 h-32 rounded-full border-4 border-[#6FA3D6] shadow-xl object-cover bg-white"
        />
        <p className="text-xl font-bold text-[#5A2C0A] mt-4">@{username}</p>
      </motion.div>

      {/* ESTATÍSTICAS */}
      <div className="px-6 mb-6">
        <div className="grid grid-cols-3 gap-3 max-w-md mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white/80 rounded-xl p-4 shadow-sm text-center"
          >
            <p className="text-2xl font-bold text-[#5A2C0A]">{level}</p>
            <p className="text-xs text-[#8B5E3C] mt-1">Nível</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white/80 rounded-xl p-4 shadow-sm text-center"
          >
            <p className="text-2xl font-bold text-[#5A2C0A]">{xp}</p>
            <p className="text-xs text-[#8B5E3C] mt-1">XP</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-white/80 rounded-xl p-4 shadow-sm text-center"
          >
            <p className="text-2xl font-bold text-[#5A2C0A]">{score}</p>
            <p className="text-xs text-[#8B5E3C] mt-1">Moedas</p>
          </motion.div>
        </div>
      </div>

      {/* CONQUISTAS */}
      <div className="px-6 mb-6">
        <div className="max-w-md mx-auto">
          <h2 className="text-center text-[#5A2C0A] font-semibold mb-3">
            Conquistas desbloqueadas
          </h2>
          <div className="flex justify-center gap-3">
            <div className="w-12 h-12 bg-white/80 rounded-xl shadow-sm border border-[#FBCB6D]"></div>
            <div className="w-12 h-12 bg-white/80 rounded-xl shadow-sm border border-[#FBCB6D]"></div>
            <div className="w-12 h-12 bg-white/80 rounded-xl shadow-sm border border-[#FBCB6D]"></div>
          </div>
        </div>
      </div>

      {/* BOTÃO DE LOGOUT */}
      <div className="px-6">
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleLogout}
          disabled={isLoading}
          className="w-full max-w-md mx-auto bg-gradient-to-r from-[#E67826] to-[#FFB75E] text-white py-3 rounded-2xl font-bold flex items-center justify-center gap-2 shadow-xl hover:scale-105 transition-transform"
        >
          <FiLogOut size={20} />
          {isLoading ? "A sair..." : "Terminar Sessão"}
        </motion.button>
      </div>
    </div>
  );
}
