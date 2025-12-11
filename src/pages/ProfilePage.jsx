/* eslint-disable */
import React, { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLogoutUserMutation } from "../features/authApi";
import { logout } from "../features/userSlice";
import { useNavigate } from "react-router-dom";

import {
  useGetCoinsTotalQuery,
  useGetCollectedPoisQuery,
} from "../features/poiApi";

import { FiLogOut, FiArrowLeft, FiStar } from "react-icons/fi";
import { motion } from "framer-motion";
import avatarFallback from "../assets/avatar.jpg";

// --- Funções de XP e Level (mesmas do backend) ---
function calculateXp(coins, badges = 0) {
  return coins * 10 + badges * 200;
}

function calculateLevel(xp) {
  let level = 1;
  let next = 200;

  while (xp >= next) {
    level++;
    xp -= next;
    next += 200;
  }
  return level;
}

export default function ProfilePage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [logoutUser] = useLogoutUserMutation();

  // --- USER STORE ---
  const username = useSelector((state) => state.user.username);
  const avatar = useSelector((state) => state.user.image);
  const avatarUrl = avatar || avatarFallback;

  // --- BACKEND DATA ---
  const { data: coinsData } = useGetCoinsTotalQuery();
  const { data: collectedData } = useGetCollectedPoisQuery();

  const totalCoins = coinsData?.coins ?? 0;
  const collected = collectedData?.details ?? [];

  // --- CALC XP + LEVEL ---
  const xp = useMemo(() => calculateXp(totalCoins), [totalCoins]);
  const level = useMemo(() => calculateLevel(xp), [xp]);

  async function handleLogout() {
    try {
      await logoutUser().unwrap();
    } catch {}
    dispatch(logout());
    localStorage.clear();
    navigate("/login");
  }

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-gold-20 to-gold-60 flex flex-col items-center pt-14 px-6 relative">

      {/* BOTÃO VOLTAR */}
      <button
        onClick={() => navigate("/map")}
        className="absolute top-4 left-4 w-11 h-11 rounded-full
                   bg-[#F8DCA0] border-[3px] border-[#8B5E3C]
                   flex items-center justify-center
                   shadow-[0_3px_0px_#C89B4C]
                   hover:scale-110 transition cursor-pointer"
      >
        <FiArrowLeft size={20} className="text-[#5A2C0A]" />
      </button>

      {/* CARD PRINCIPAL */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white w-full max-w-md rounded-3xl p-7 shadow-2xl border-4 border-gold-60 text-center"
      >
        {/* TÍTULO */}
        <h1 className="text-3xl font-title text-marron-100 mb-4">
          Perfil do Explorador
        </h1>

        {/* AVATAR */}
        <motion.img
          src={avatarUrl}
          className="w-32 h-32 rounded-full mx-auto border-[5px] border-gold-100 shadow-xl"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
        />

        {/* USERNAME */}
        <p className="text-xl font-bold text-marron-100 mt-4">@{username}</p>

        {/* STATS */}
        <div className="grid grid-cols-3 gap-4 mt-6">
          <div className="bg-gold-40 p-4 rounded-xl border-2 border-gold-100 shadow-md">
            <p className="text-2xl font-bold text-marron-100">{level}</p>
            <p className="text-xs text-marron-80">Nível</p>
          </div>

          <div className="bg-gold-40 p-4 rounded-xl border-2 border-gold-100 shadow-md">
            <p className="text-2xl font-bold text-marron-100">{xp}</p>
            <p className="text-xs text-marron-80">XP</p>
          </div>

          <div classname="bg-gold-40 p-4 rounded-xl border-2 border-gold-100 shadow-md">
            <p className="text-2xl font-bold text-marron-100">{totalCoins}</p>
            <p className="text-xs text-marron-80">Moedas</p>
          </div>
        </div>

        {/* CONQUISTAS */}
        <div className="mt-7">
          <h2 className="text-lg font-semibold text-marron-100 mb-2">
            Conquistas desbloqueadas
          </h2>

          <div className="flex justify-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-gold-40 border-2 border-gold-100 shadow-md"></div>
            <div className="w-12 h-12 rounded-xl bg-gold-40 border-2 border-gold-100 shadow-md"></div>
            <div className="w-12 h-12 rounded-xl bg-gold-40 border-2 border-gold-100 shadow-md"></div>
          </div>
        </div>

        {/* LOGOUT */}
        <motion.button
          whileTap={{ scale: 0.96 }}
          onClick={handleLogout}
          className="mt-8 w-full bg-red-500 hover:bg-red-600 text-white py-3
                     rounded-full font-bold flex items-center justify-center gap-2 shadow-lg"
        >
          <FiLogOut size={20} />
          Terminar Sessão
        </motion.button>
      </motion.div>

    </div>
  );
}
