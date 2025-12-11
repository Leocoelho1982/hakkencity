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
  const { data } = useGetCoinsTotalQuery();
  const totalCoins = data?.coins ?? 0;

  return (
    <div
      className="
        min-h-screen w-full 
        bg-[url('/assets/parchment_texture.jpg')] bg-cover bg-center
        px-6 pb-16
        flex flex-col items-center pt-20 relative
      "
    >
      {/* MOLDURA LATERAL */}
      <div className="absolute inset-0 pointer-events-none bg-[url('/assets/frame.png')] bg-cover opacity-60"></div>

      {/* BOTÃO VOLTAR */}
      <button
        onClick={() => navigate("/map")}
        className="
          absolute top-5 left-4 z-50
          w-12 h-12 rounded-full
          bg-[#F8DCA0]
          border-[3px] border-[#8B5E3C]
          flex items-center justify-center
          shadow-[0_4px_0px_#C89B4C]
          hover:scale-110 transition
        "
      >
        <FiArrowLeft size={22} className="text-[#5A2C0A]" />
      </button>

      {/* TÍTULO EM FAIXA DE MADEIRA */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="
          bg-[url('/assets/wood_banner.png')] bg-cover bg-center
          text-[#FFE6B3] font-title text-3xl
          px-10 py-4 rounded-xl shadow-xl border-[3px] border-[#5A2C0A]
        "
      >
        Tesouro do Explorador
      </motion.div>

      {/* BAÚ ANIMADO */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: 'spring', stiffness: 140 }}
        className="relative mt-10 drop-shadow-2xl"
      >
        <motion.img
          src={chestImg}
          alt="Cofre"
          className="w-52"
          animate={{ rotate: [0, -3, 3, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Sparkle */}
        <motion.div
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{ opacity: 1, scale: 1, rotate: 360 }}
          transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
          className="absolute -top-6 left-1/2 -translate-x-1/2 text-yellow-300 drop-shadow-md"
        >
          <FiStar size={45} />
        </motion.div>
      </motion.div>

      {/* CARD DO TOTAL DE MOEDAS */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="
          mt-10 bg-gradient-to-b from-[#A14422] to-[#6B1F10]
          border-[4px] border-[#3A0E05]
          text-[#FFE9C8]
          px-12 py-5 rounded-3xl shadow-2xl
          font-title text-5xl flex items-center gap-4
        "
      >
        <img src={coin} className="w-12 h-12 drop-shadow-xl" alt="coins" />
        {totalCoins}
      </motion.div>

      <p className="text-marron-100 text-center mt-3 font-semibold drop-shadow-sm">
        Total acumulado das tuas aventuras!
      </p>

      {/* HISTÓRICO COMO PERGAMINHO */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.35 }}
        className="
          w-full max-w-md mt-12
          bg-[url('/assets/parchment_block.png')] bg-cover bg-center
          shadow-xl rounded-xl p-6 border-[3px] border-[#C8A45A]
        "
      >
        <h2 className="text-xl font-bold text-[#5A2C0A] mb-3 flex items-center gap-2">
          <FiTrendingUp /> Histórico de Recolhas
        </h2>

        <p className="text-marron-80 text-sm italic leading-relaxed drop-shadow-sm">
          Em breve vais poder ver todos os tesouros recolhidos,  
          com datas, locais e recompensas!
        </p>
      </motion.div>
    </div>
  );
}
