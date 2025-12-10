/* eslint-disable */
import React, { useState, useEffect } from "react";
import { FiArrowLeft, FiMapPin, FiCheckCircle, FiClock } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { POIS } from "../data/pois";

export default function POIProgressPage() {
  const navigate = useNavigate();
  
  // Buscar POIs visitados do localStorage
  const [visited, setVisited] = useState(() =>
    JSON.parse(localStorage.getItem("visited") || "{}")
  );

  // Calcular estatísticas
  const total = POIS.length;
  const visitedCount = POIS.filter((poi) => visited[poi.id]).length;
  const progressPercent = Math.round((visitedCount / total) * 100);

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
          Progresso dos POIs
        </h1>
      </div>

      {/* CARD DE PROGRESSO */}
      <div className="px-6 mb-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="w-full max-w-md mx-auto bg-white/80 rounded-xl p-3 shadow-sm"
        >
          <p className="text-[#5A2C0A] font-bold text-center mb-3 text-base">
            Exploração: {visitedCount}/{total} POIs
          </p>

          {/* Barra de progresso */}
          <div className="w-full bg-[#f4e2b8] rounded-full h-5 overflow-hidden shadow-inner mb-2">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progressPercent}%` }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="h-full bg-[#8B3A1A] transition-all"
            />
          </div>

          <p className="text-center text-[#8B5E3C] mt-2 text-sm font-semibold">
            {progressPercent}% concluído
          </p>
        </motion.div>
      </div>

      {/* LISTA DE POIs */}
      <div className="px-6 space-y-2 max-w-md mx-auto">
        {POIS.map((poi, index) => {
          const isVisited = visited[poi.id];
          return (
            <motion.div
              key={poi.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 + index * 0.05 }}
              className="flex items-center gap-3 bg-white/80 rounded-xl p-3 shadow-sm"
            >
              <FiMapPin size={20} className="text-[#5A2C0A] flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-[#5A2C0A] text-sm">
                  {poi.name}
                </p>
                <p className="text-xs text-[#8B5E3C] mt-0.5">
                  {isVisited ? "Visitado" : "Por visitar"}
                </p>
              </div>
              <div className="flex-shrink-0">
                {isVisited ? (
                  <FiCheckCircle size={24} className="text-green-600" />
                ) : (
                  <FiClock size={24} className="text-orange-500" />
                )}
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
