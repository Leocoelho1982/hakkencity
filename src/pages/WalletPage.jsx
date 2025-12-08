/* eslint-disable */
import React from "react";
import { useSelector } from "react-redux";
import { FiArrowLeft, FiStar, FiTrendingUp } from "react-icons/fi";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

import chestImg from "../assets/mapicon.png";
import coin from "../assets/coins.png";

export default function WalletPage() {
  const navigate = useNavigate();
  const score = useSelector((state) => state.user.score);

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-[#FFF4D4] to-[#F6C468] px-6 
                    flex flex-col items-center pt-16 relative">

      {/* VOLTAR */}
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


      {/* TÍTULO */}
      <motion.h1
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-3xl font-title text-marron-100 mb-4 text-center"
      >
        Tesouro do Explorador
      </motion.h1>

      {/* COFRE ANIMADO */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 120 }}
        className="relative mt-4"
      >
        <img
          src={chestImg}
          alt="Cofre de Tesouro"
          className="w-44 sm:w-52 drop-shadow-xl"
        />

        {/* Shine / Sparkle */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1, rotate: 360 }}
          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
          className="absolute -top-4 left-1/2 -translate-x-1/2 text-yellow-400"
        >
          <FiStar size={36} />
        </motion.div>
      </motion.div>

      {/* TOTAL DE MOEDAS */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="mt-6 bg-[#8B3A1A] text-white px-10 py-4 rounded-3xl shadow-xl 
                   font-title text-4xl flex items-center gap-3"
      >
        <img src={coin} className="w-10 h-10 drop-shadow-md" alt="coins" />
        {score}
      </motion.div>

      {/* DESCRIÇÃO */}
      <p className="text-marron-100 text-center mt-3 font-semibold">
        Moedas acumuladas nas tuas aventuras!
      </p>

      {/* HISTÓRICO */}
      <motion.div
        className="w-full max-w-md bg-white mt-8 rounded-2xl shadow-xl 
                   p-6 border-4 border-yellow-300"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <h2 className="text-lg font-bold text-marron-100 mb-3 flex items-center gap-2">
          <FiTrendingUp /> Histórico de Ganhos
        </h2>

        <p className="text-sm text-marron-80 italic">
          Em breve vais poder ver de onde vieram todas as tuas conquistas!
        </p>
      </motion.div>

    </div>
  );
}
