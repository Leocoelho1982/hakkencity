/* eslint-disable */
import React from "react";
import { FiArrowLeft, FiMapPin, FiCheckCircle, FiClock } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export default function POIProgressPage() {
  const navigate = useNavigate();

  // --- 🔥 DADOS ESTÁTICOS (simulados) ---
  const pois = [
    { id: 1, name: "Clube de Ténis de Aveiro", visited: true },
    { id: 2, name: "Fábrica Centro Ciência Viva", visited: true },
    { id: 3, name: "Museu de Aveiro", visited: false },
    { id: 4, name: "Praça do Peixe", visited: false },
    { id: 5, name: "Cais dos Botirões", visited: true },
    { id: 6, name: "Parque Infante D. Pedro", visited: false },
    { id: 7, name: "Sé de Aveiro", visited: false },
  ];

  const total = pois.length;
  const visitedCount = pois.filter((p) => p.visited).length;
  const progressPercent = Math.round((visitedCount / total) * 100);

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-[#FFF4D6] to-[#F6C468] p-6 pt-14">
      
      {/* BOTÃO DE VOLTAR */}
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
      <h1 className="text-3xl font-title text-center text-marron-100 mb-6">
        Progresso dos POIs
      </h1>

      {/* PROGRESSO GERAL */}
      <div className="w-full max-w-md mx-auto bg-white border-4 border-yellow-300 rounded-2xl p-5 shadow-xl">
        <p className="text-marron-100 font-bold text-center mb-2">
          Exploração: {visitedCount}/{total} POIs
        </p>

        <div className="w-full bg-[#f4e2b8] rounded-full h-5 overflow-hidden shadow-inner">
          <div
            className="h-full bg-[#8B3A1A] transition-all"
            style={{ width: `${progressPercent}%` }}
          />
        </div>

        <p className="text-center text-marron-80 mt-1 text-sm">
          {progressPercent}% concluído
        </p>
      </div>

      {/* LISTA DE POIs */}
      <div className="mt-8 grid grid-cols-1 gap-4 max-w-md mx-auto">
        {pois.map((poi, index) => (
          <motion.div
            key={poi.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.05 }}
            className="bg-white border-4 border-yellow-300 rounded-2xl p-4 shadow-lg flex items-center justify-between"
          >
            <div className="flex items-center gap-3">
              <FiMapPin size={28} className="text-marron-100" />
              <div>
                <p className="font-title text-lg text-marron-100">{poi.name}</p>
                <p className="text-sm text-marron-80">
                  {poi.visited ? "Visitado" : "Por visitar"}
                </p>
              </div>
            </div>

            {poi.visited ? (
              <FiCheckCircle size={28} className="text-green-600" />
            ) : (
              <FiClock size={28} className="text-orange-500" />
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
}
