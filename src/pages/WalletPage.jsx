/* eslint-disable */
import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FiArrowLeft, FiStar, FiTrendingUp } from "react-icons/fi";
import { useGetCoinsTotalQuery } from "../features/poiApi";

import chestImg from "../assets/mapicon.png";
import coin from "../assets/coins.png";

export default function WalletPage() {
  const navigate = useNavigate();

  // 👉 pega o total real do backend
  const { data } = useGetCoinsTotalQuery();
  const totalCoins = data?.coins ?? 0;

  return (
    <div
      className="
        min-h-screen w-full 
        bg-gradient-to-b from-gold-20 to-gold-60 
        px-6 pb-16
        flex flex-col items-center pt-16 relative
      "
    >
      {/* BOTÃO VOLTAR */}
      <button
        onClick={() => navigate("/map")}
        className="
          absolute top-5 left-4
          w-12 h-12 rounded-full
          bg-[#F8DCA0]
          border-[3px] border-[#8B5E3C]
          flex items-center justify-center
          shadow-[0_3px_0px_#C89B4C]
          hover:scale-110 transition
        "
      >
        <FiArrowLeft size={22} className="text-[#5A2C0A]" />
      </button>

      {/* TÍTULO */}
      <motion.h1
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="
          font-title text-3xl text-center text-[#5A2C0A]
          bg-[#E9C27D]
          px-8 py-3 rounded-xl
          shadow-inner border-b-[3px] border-[#C89B4C]
        "
      >
        Tesouro do Explorador
      </motion.h1>

      {/* BAÚ CENTRAL */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 120 }}
        className="relative mt-8"
      >
        <img
          src={chestImg}
          alt="Cofre de Tesouro"
          className="w-48 drop-shadow-xl"
        />

        {/* brilho animado */}
        <motion.div
          initial={{ opacity: 0, scale: 0.7 }}
          animate={{ opacity: 1, scale: 1, rotate: 360 }}
          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
          className="absolute -top-5 left-1/2 -translate-x-1/2 text-yellow-400"
        >
          <FiStar size={40} />
        </motion.div>
      </motion.div>

      {/* CARD DE MOEDAS */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="
          mt-8 px-10 py-4 rounded-3xl
          bg-[#8B3A1A] text-white font-title text-4xl
          shadow-xl flex items-center gap-4
          border-[3px] border-[#5A2C0A]
        "
      >
        <img src={coin} className="w-12 h-12 drop-shadow-md" alt="coins" />
        {totalCoins}
      </motion.div>

      <p className="text-marron-100 text-center mt-3 font-semibold">
        Total acumulado das tuas aventuras!
      </p>

      {/* HISTÓRICO */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.35 }}
        className="
          w-full max-w-md bg-white mt-10 rounded-2xl
          shadow-xl p-6 border-4 border-yellow-300
        "
      >
        <h2 className="text-lg font-bold text-marron-100 mb-3 flex items-center gap-2">
          <FiTrendingUp /> Histórico de Recolhas
        </h2>

        <p className="text-sm text-marron-80 italic">
          Em breve vais poder ver cada tesouro conquistado, com datas e locais!
        </p>
      </motion.div>
    </div>
  );
}
