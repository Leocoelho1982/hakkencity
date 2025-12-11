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

/// --- XP e Level com progressão crescente ---
function calculateXp(coins, badges = 0) {
  return coins * 3 + badges * 200;
}

function calculateLevel(xp) {
  let level = 1;

  // XP para o próximo nível (base = 1000)
  let next = 500;

  // Fator de crescimento (ex: +20% a cada nível)
  const growth = 1.2;

  while (xp >= next) {
    xp -= next;
    level++;

    // Aumenta a dificuldade do próximo nível
    next = Math.floor(next * growth); 
  }

  return level;
}


export default function ProfilePage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [logoutUser] = useLogoutUserMutation();

  // USER STORE
  const username = useSelector((state) => state.user.username);
  const avatar = useSelector((state) => state.user.image);
  const avatarUrl = avatar || avatarFallback;

  // BACKEND
  const { data: coinsData } = useGetCoinsTotalQuery();
  const { data: collectedData } = useGetCollectedPoisQuery();

  const totalCoins = coinsData?.coins ?? 0;
  const collected = collectedData?.details ?? [];

  // XP + LEVEL
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
    <div className="min-h-screen w-full bg-gradient-to-b from-gold-20 to-gold-60 flex flex-col items-center pt-16 px-6 relative">

      {/* BOTÃO VOLTAR */}
      <button
        onClick={() => navigate("/map")}
        className="
          absolute top-4 left-4
          w-11 h-11 rounded-full
          bg-gold-60 border-[3px] border-marron-100
          flex items-center justify-center
          shadow-[0_3px_0px_var(--color-marron-100)]
          hover:scale-110 transition cursor-pointer
        "
      >
        <FiArrowLeft size={20} className="text-marron-100" />
      </button>

      {/* TÍTULO PADRÃO WALLET/POI */}
      <motion.h1
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="
          font-title text-3xl text-center text-marron-100
          bg-gold-100 px-10 py-3 rounded-xl
          shadow-inner border-b-[4px] border-[#b29146]
        "
      >
        Perfil do Explorador
      </motion.h1>

      {/* CARD PRINCIPAL */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="
          bg-white w-full max-w-md rounded-3xl p-7 mt-10
          shadow-2xl border-4 border-gold-60 text-center
        "
      >
        {/* AVATAR */}
        <motion.img
          src={avatarUrl}
          className="w-32 h-32 rounded-full mx-auto border-[5px] border-gold-100 shadow-xl"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
        />

        {/* USERNAME */}
        <p className="text-xl font-bold text-marron-100 mt-4">@{username}</p>

        {/* INSÍGNIA / XP / LEVEL / COINS */}
        <div className="grid grid-cols-3 gap-4 mt-6">

          <div className="bg-gold-40 p-4 rounded-xl border-2 border-gold-100 shadow-md">
            <p className="text-2xl font-bold text-marron-100">{level}</p>
            <p className="text-xs text-marron-80">Nível</p>
          </div>

          <div className="bg-gold-40 p-4 rounded-xl border-2 border-gold-100 shadow-md">
            <p className="text-2xl font-bold text-marron-100">{xp}</p>
            <p className="text-xs text-marron-80">XP</p>
          </div>

          <div className="bg-gold-40 p-4 rounded-xl border-2 border-gold-100 shadow-md">
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
          className="
            mt-8 w-full bg-red-500 hover:bg-red-600 text-white py-3
            rounded-full font-bold flex items-center justify-center gap-2 shadow-lg
          "
        >
          <FiLogOut size={20} />
          Terminar Sessão
        </motion.button>
      </motion.div>
    </div>
  );
}
