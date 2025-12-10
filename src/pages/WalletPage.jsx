/* eslint-disable */
import React from "react";
import { useSelector } from "react-redux";
import { FiArrowLeft } from "react-icons/fi";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

import coins from "../assets/coins.png";

export default function WalletPage() {
  const navigate = useNavigate();
  const score = useSelector((state) => {
    // Tentar buscar do localStorage primeiro (MapPage usa isso)
    const localScore = Number(localStorage.getItem("score") || 0);
    return localScore || state.user.score || 0;
  });

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-[#FFF4D6] to-[#FBCB6D] flex flex-col items-center pt-16 pb-8 px-6">
      {/* VOLTAR */}
      <button
        onClick={() => navigate("/map")}
        className="absolute top-4 left-4 w-11 h-11 rounded-full bg-[#F8DCA0] border-[3px] border-[#8B5E3C] flex items-center justify-center shadow-[0_3px_0px_#C89B4C] hover:scale-110 transition z-10"
      >
        <FiArrowLeft size={20} className="text-[#5A2C0A]" />
      </button>

      {/* TÍTULO - Mesmo estilo da Leaderboard */}
      <div className="pt-8 pb-6 px-6 w-full">
        <h1 className="text-center text-[#5A2C0A] font-title text-2xl font-bold mb-4">
          Tesouro do Explorador
        </h1>
      </div>

      {/* IMAGEM DAS MOEDAS */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ type: "spring", stiffness: 100 }}
        className="mb-8"
      >
        <img
          src={coins}
          alt="Moedas"
          className="w-48 h-48 drop-shadow-xl"
        />
      </motion.div>

      {/* INFORMAÇÃO DAS MOEDAS */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-white/80 rounded-2xl px-8 py-6 shadow-lg mb-8 max-w-md w-full"
      >
        <p className="text-center text-[#5A2C0A] font-semibold text-lg mb-2">
          Tens acumuladas
        </p>
        <p className="text-center text-[#5A2C0A] font-title text-4xl font-bold">
          {score} moedas
        </p>
        <p className="text-center text-[#8B5E3C] text-sm mt-2 italic">
          Continue a explorar para ganhar mais!
        </p>
      </motion.div>

      {/* BOTÃO CONTINUAR */}
      <motion.button
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        onClick={() => navigate("/map")}
        className="bg-gradient-to-r from-[#E67826] to-[#FFB75E] text-white font-bold text-lg px-12 py-4 rounded-2xl shadow-xl hover:scale-105 transition-transform"
      >
        Continuar Jogo
      </motion.button>
    </div>
  );
}
