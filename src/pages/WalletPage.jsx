/* eslint-disable */
import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FiArrowLeft, FiStar, FiTrendingUp, FiMapPin } from "react-icons/fi";

import { useGetCoinsTotalQuery, useGetCollectedPoisQuery } from "../features/poiApi";

import chestImg from "../assets/mapicon.png";
import coin from "../assets/coins.png";

export default function WalletPage() {
  const navigate = useNavigate();

  // TOTAL GLOBAL DE MOEDAS
  const { data: coinsData } = useGetCoinsTotalQuery();
  const totalCoins = coinsData?.coins ?? 0;

  // LISTA DE POIS RECOLHIDOS
  const { data: collectedData } = useGetCollectedPoisQuery();
  const collected = collectedData?.details || []; 
  // (vou assumir que vais devolver { details: [{id, name, coins, collectedAt}] })

  return (
    <div
      className="min-h-screen w-full bg-gradient-to-b from-yellow-100 to-yellow-300 
                 px-6 pb-20 flex flex-col items-center pt-20 relative"
    >

      {/* BOTÃO VOLTAR */}
      <button
        onClick={() => navigate("/map")}
        className="absolute top-5 left-4 w-12 h-12 rounded-full
                   bg-[#F8DCA0] border-[3px] border-[#8B5E3C]
                   flex items-center justify-center
                   shadow-[0_3px_0px_#C89B4C]
                   hover:scale-110 transition"
      >
        <FiArrowLeft size={22} className="text-[#5A2C0A]" />
      </button>

      {/* TÍTULO GAMIFICADO */}
      <motion.h1
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="
          font-title text-3xl text-center text-[#5A2C0A]
          bg-yellow-400 px-8 py-3 rounded-xl
          shadow-inner border-b-[4px] border-yellow-600
        "
      >
        Tesouro do Explorador
      </motion.h1>

      {/* BAÚ ANIMADO COM SPARKLE */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: 'spring', stiffness: 130 }}
        className="relative mt-10"
      >
        <motion.img
          src={chestImg}
          alt="Cofre"
          className="w-48 drop-shadow-xl"
          animate={{ rotate: [0, -2, 2, 0] }}
          transition={{ duration: 4, repeat: Infinity }}
        />

        {/* SPARKLE ANIMADO */}
        <motion.div
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{ opacity: 1, scale: 1, rotate: 360 }}
          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
          className="absolute -top-4 left-1/2 -translate-x-1/2 text-yellow-500"
        >
          <FiStar size={40} />
        </motion.div>
      </motion.div>

      {/* QUADRO DO TOTAL DE MOEDAS */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="
          mt-10 bg-gradient-to-b from-[#8B3A1A] to-[#5A1E0E]
          border-[4px] border-[#3A0E05]
          text-white font-title
          px-12 py-5 rounded-3xl shadow-2xl 
          text-5xl flex items-center gap-4
        "
      >
        <img src={coin} className="w-12 h-12 drop-shadow-md" alt="moedas" />
        {totalCoins}
      </motion.div>

      <p className="text-marron-100 text-center mt-3 font-semibold">
        Total acumulado das tuas aventuras!
      </p>

      {/* HISTÓRICO DE RECOLHAS */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.35 }}
        className="
          w-full max-w-md mt-12 bg-white rounded-2xl shadow-xl 
          p-6 border-4 border-yellow-400
        "
      >
        <h2 className="text-lg font-bold text-marron-100 mb-4 flex items-center gap-2">
          <FiTrendingUp /> Histórico de Recolhas
        </h2>

        {collected.length === 0 ? (
          <p className="text-sm text-marron-80 italic">
            Ainda não recolheste nenhum tesouro…
          </p>
        ) : (
          <div className="space-y-3">
            {collected.map((item) => (
              <div
                key={item.id}
                className="
                  bg-yellow-100 rounded-xl p-4 border-[2px] border-yellow-400 
                  shadow-md flex justify-between items-center
                "
              >
                <div>
                  <p className="font-bold text-marron-100 flex items-center gap-1">
                    <FiMapPin /> {item.name}
                  </p>
                  <p className="text-xs text-marron-80 mt-1">
                    {new Date(item.collectedAt).toLocaleString("pt-PT")}
                  </p>
                </div>

                <div className="flex items-center gap-1 font-bold text-yellow-700">
                  <img src={coin} className="w-6 h-6" />
                  {item.coins}
                </div>
              </div>
            ))}
          </div>
        )}
      </motion.div>

    </div>
  );
}
