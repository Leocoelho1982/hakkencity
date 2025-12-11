/* eslint-disable */
import React, { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FiArrowLeft,
  FiChevronDown,
  FiChevronUp,
  FiMapPin
} from "react-icons/fi";

import {
  useGetPoisQuery,
  useGetCollectedPoisQuery
} from "../features/poiApi";

import { PuffLoader } from "react-spinners";

export default function POIProgressPage() {
  const navigate = useNavigate();

  // --- FETCH VIA REDUX ---
  const { data: poisData, isLoading: loadingPois } = useGetPoisQuery();
  const { data: collectedData, isLoading: loadingCollected } =
    useGetCollectedPoisQuery();

  const collected = collectedData?.collected || [];

  const [openZone, setOpenZone] = useState(null);

  const toggleZone = (zone) => {
    setOpenZone(openZone === zone ? null : zone);
  };

  // ------------------------------------------------------
  // AGRUPAR POIs POR ZONA + IDENTIFICAR VISITADOS
  // ------------------------------------------------------
  const zones = useMemo(() => {
    if (!poisData) return [];

    const groups = {};

    poisData.forEach((poi) => {
      const zoneName = poi.Zone?.name || "Zona Desconhecida";

      if (!groups[zoneName]) groups[zoneName] = [];

      groups[zoneName].push({
        id: poi.id,
        name: poi.name,
        visited: collected.includes(poi.id),
      });
    });

    return Object.entries(groups).map(([zoneName, pois]) => ({
      name: zoneName,
      pois,
    }));
  }, [poisData, collected]);

  // ------------------------------------------------------
  // LOADING
  // ------------------------------------------------------
  if (loadingPois || loadingCollected) {
    return (
       <div className="w-full h-screen flex items-center justify-center bg-gradient-to-b from-gold-20 to-gold-60">
        <PuffLoader color="#8B3A1A" size={80} />
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-gold-20 to-gold-60 p-6 pt-16">

      {/* BOTÃO VOLTAR */}
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
          hover:scale-110 transition cursor-pointer
        "
      >
        <FiArrowLeft size={20} className="text-[#5A2C0A]" />
      </button>

      {/* TÍTULO */}
      <motion.div
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        className="
          bg-[#E9C27D] 
          text-[#5A2C0A] 
          font-title text-2xl text-center
          px-6 py-3 rounded-xl shadow-inner
          border-b-[4px] border-[#C89B4C]
          max-w-lg mx-auto mb-6
        "
      >
        Progresso dos POIs por Zona
      </motion.div>

      {/* LISTA DE ZONAS */}
      <div className="max-w-lg mx-auto space-y-5">
        {zones.map((zone, index) => {
          const visited = zone.pois.filter((p) => p.visited).length;
          const total = zone.pois.length;
          const percent = Math.round((visited / total) * 100);

          return (
            <motion.div
              key={zone.name}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.08 }}
              className="
                bg-white rounded-2xl border-[4px] border-yellow-300
                shadow-xl p-5 relative
              "
            >
              {/* HEADER */}
              <button
                className="w-full flex justify-between items-center"
                onClick={() => toggleZone(zone.name)}
              >
                <div>
                  <p className="font-title text-xl text-marron-100">
                    {zone.name}
                  </p>
                  <p className="text-sm text-marron-80">
                    {visited}/{total} explorados ({percent}%)
                  </p>
                </div>

                {openZone === zone.name ? (
                  <FiChevronUp size={24} className="text-marron-100" />
                ) : (
                  <FiChevronDown size={24} className="text-marron-100" />
                )}
              </button>

              {/* PROGRESS BAR */}
              <div className="mt-3 w-full bg-[#f4e2b8] h-4 rounded-full overflow-hidden shadow-inner">
                <div
                  className="h-full bg-[#8B3A1A] transition-all"
                  style={{ width: `${percent}%` }}
                ></div>
              </div>

              {/* LISTA DE POIs */}
              {openZone === zone.name && (
                <div className="mt-4 space-y-3">
                  {zone.pois.map((poi) => (
                    <div
                      key={poi.id}
                      className="
                        bg-yellow-50 border-[2px] border-yellow-300
                        rounded-xl p-3 shadow-md flex items-center gap-3
                      "
                    >
                      <FiMapPin size={22} className="text-marron-100" />

                      <div className="flex-1">
                        <p className="text-marron-100 font-semibold">
                          {poi.name}
                        </p>
                        <p className="text-xs text-marron-80">
                          {poi.visited ? "Visitado ✔️" : "Por explorar…"}
                        </p>
                      </div>

                      <span
                        className={
                          poi.visited
                            ? "text-green-700 font-bold"
                            : "text-red-600 font-bold"
                        }
                      >
                        {poi.visited ? "✔" : "•"}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
