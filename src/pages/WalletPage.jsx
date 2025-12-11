/* eslint-disable */
import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FiArrowLeft, FiStar, FiTrendingUp, FiMapPin } from "react-icons/fi";

import {
  useGetCoinsTotalQuery,
  useGetCollectedPoisQuery,
} from "../features/poiApi";

export default function WalletPage() {
  const navigate = useNavigate();

  const { data: coinsData } = useGetCoinsTotalQuery();
  const totalCoins = coinsData?.coins ?? 0;

  const { data: collectedData } = useGetCollectedPoisQuery();
  const collected = collectedData?.details || [];

  return (
    <div
      className="
        min-h-screen w-full 
        bg-gradient-to-b from-gold-20 to-gold-60
        flex flex-col items-center px-6 pb-20 pt-20 relative
      "
    >
      {/* VOLTAR */}
      <button
        onClick={() => navigate("/map")}
        className="
          absolute top-5 left-4 w-12 h-12 rounded-full
          bg-gold-60 border-[3px] border-marron-100
          flex items-center justify-center
          shadow-[0_3px_0px_var(--color-marron-100)]
          hover:scale-110 transition cursor-pointer
        "
      >
        <FiArrowLeft size={22} className="text-marron-100" />
      </button>

      {/* TÍTULO */}
      <motion.h1
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="
          font-title text-3xl text-center text-marron-100
          bg-gold-100 px-10 py-3 rounded-xl
          shadow-inner border-b-[4px] border-[#b29146]
        "
      >
        Tesouro do Explorador
      </motion.h1>

      {/* EMBLEMA / INSÍGNIA ANIMADA */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 110 }}
        className="relative mt-10 flex items-center justify-center"
      >
        <div
          className="
            w-36 h-36 rounded-full 
            bg-gradient-to-b from-[#fce9ab] to-[#f9c66a]
            shadow-xl border-[6px] border-[#b29146]
            flex items-center justify-center
          "
        >
          <span className="font-title text-5xl text-marron-100">
            {totalCoins}
          </span>
        </div>

        {/* brilho animado */}
        <motion.div
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{ opacity: 1, scale: 1, rotate: 360 }}
          transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
          className="absolute -top-4 text-yellow-500"
        >
          <FiStar size={40} />
        </motion.div>
      </motion.div>

      <p className="text-marron-100 text-center mt-4 font-semibold">
        Total acumulado das tuas aventuras!
      </p>

      {/* HISTÓRICO */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.25 }}
        className="
          w-full max-w-md mt-12 bg-white rounded-2xl shadow-xl 
          p-6 border-4 border-gold-60
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
          <div className="space-y-4">
            {collected.map((item) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: -15 }}
                animate={{ opacity: 1, x: 0 }}
                className="
                  bg-gold-40 rounded-xl p-4 border-[2px] border-gold-100
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

                <div className="font-bold text-marron-100 text-xl">
                  +{item.coins}
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </motion.div>
    </div>
  );
}
