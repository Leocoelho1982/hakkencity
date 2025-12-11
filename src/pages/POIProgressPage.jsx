/* eslint-disable */
import React, { useMemo, useState } from "react";
import { FiArrowLeft, FiMapPin, FiChevronDown, FiChevronUp, FiCheckCircle, FiClock } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

import { useGetPoisQuery, useGetCollectedPoisQuery } from "../features/poiApi";

export default function POIProgressPage() {
  const navigate = useNavigate();

  // --- Dados reais do backend ---
  const { data: pois = [] } = useGetPoisQuery();
  const { data: collectedData } = useGetCollectedPoisQuery();

  const collected = collectedData?.collected || [];

  // --- Agrupamento por zona ---
  const groupedByZone = useMemo(() => {
    const groups = {};

    pois.forEach((poi) => {
      const zone = poi.Zone?.name || "Zona Desconhecida";

      if (!groups[zone]) groups[zone] = [];
      groups[zone].push({
        id: poi.id,
        name: poi.name,
        visited: collected.includes(poi.id),
      });
    });

    return groups;
  }, [pois, collected]);

  // Controla abrir/fechar zonas
  const [openZones, setOpenZones] = useState({});

  const toggleZone = (zone) => {
    setOpenZones((prev) => ({ ...prev, [zone]: !prev[zone] }));
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-gold-20 to-gold-60 p-6 pt-14">

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
      <motion.div
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
        className="
          bg-[#E9C27D] 
          text-[#5A2C0A] 
          font-title 
          text-2xl 
          text-center 
          px-6 py-2 
          rounded-xl 
          shadow-inner 
          border-b-[3px] border-[#C89B4C] 
          mb-4 mt-6
        "
      >
        Progresso dos POIs por Zona
      </motion.div>

      {/* --- LISTA DE ZONAS --- */}
      <div className="mt-6 max-w-md mx-auto space-y-4">
        {Object.entries(groupedByZone).map(([zoneName, zonePois]) => {
          const visitedCount = zonePois.filter((p) => p.visited).length;
          const total = zonePois.length;
          const percent = Math.round((visitedCount / total) * 100);

          return (
            <div
              key={zoneName}
              className="bg-white border-4 border-yellow-300 rounded-2xl shadow-xl"
            >
              {/* HEADER DA ZONA */}
              <button
                onClick={() => toggleZone(zoneName)}
                className="w-full flex justify-between items-center p-4"
              >
                <div>
                  <p className="font-title text-xl text-marron-100">{zoneName}</p>
                  <p className="text-sm text-marron-80">
                    {visitedCount}/{total} explorados ({percent}%)
                  </p>
                </div>

                {openZones[zoneName] ? (
                  <FiChevronUp size={26} className="text-marron-100" />
                ) : (
                  <FiChevronDown size={26} className="text-marron-100" />
                )}
              </button>

              {/* PROGRESS BAR */}
              <div className="w-full bg-[#f4e2b8] h-4 rounded-full mx-4 mb-3 overflow-hidden">
                <div
                  className="h-full bg-[#8B3A1A]"
                  style={{ width: `${percent}%` }}
                />
              </div>

              {/* LISTA DE POIs */}
              {openZones[zoneName] && (
                <div className="px-4 pb-4 space-y-3">
                  {zonePois.map((poi, index) => (
                    <motion.div
                      key={poi.id}
                      initial={{ opacity: 0, x: -15 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="
                        bg-yellow-100 rounded-xl p-4 border-[2px] border-yellow-300 
                        shadow-md flex justify-between items-center
                      "
                    >
                      <div className="flex items-center gap-3">
                        <FiMapPin size={24} className="text-marron-100" />
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
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
