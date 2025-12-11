/* eslint-disable */
import React, { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

import {
  FiArrowLeft,
  FiChevronDown,
  FiChevronUp,
  FiMapPin,
  FiStar,
  FiHelpCircle
} from "react-icons/fi";

import {
  useGetPoisQuery,
  useGetCollectedPoisQuery
} from "../features/poiApi";

import { PuffLoader } from "react-spinners";

export default function POIProgressPage() {
  const navigate = useNavigate();

  // --- FETCH ---
  const { data: poisData, isLoading: loadingPois } = useGetPoisQuery();
  const { data: collectedData, isLoading: loadingCollected } =
    useGetCollectedPoisQuery();

  const collected = collectedData?.collected || [];

  const [openZone, setOpenZone] = useState(null);
  const toggleZone = (zone) => setOpenZone(openZone === zone ? null : zone);

  // --- AGRUPAR POR ZONA ---
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

  // --- LOADING ---
  if (loadingPois || loadingCollected) {
    return (
      <div className="w-full h-screen flex items-center justify-center bg-gradient-to-b from-gold-20 to-gold-60">
        <PuffLoader color="var(--color-marron-100)" size={80} />
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-gold-20 to-gold-60 p-6 pt-20 relative">

      {/* BOTÃO VOLTAR */}
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

      {/* TÍTULO — PADRÃO WALLET/PROFILE */}
      <motion.h1
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="
          font-title text-3xl text-center text-marron-100
          bg-gold-100 px-10 py-3 rounded-xl
          shadow-inner border-b-[4px] border-[#b29146]
          max-w-lg mx-auto
        "
      >
        Progresso dos POIs por Zona
      </motion.h1>

      {/* LISTA DE ZONAS */}
      <div className="max-w-lg mx-auto space-y-5 mt-10">
        {zones.map((zone, index) => {
          const visited = zone.pois.filter((p) => p.visited).length;
          const total = zone.pois.length;
          const percent = Math.round((visited / total) * 100);

          return (
            <motion.div
              key={zone.name}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.07 }}
              className="
                bg-white rounded-2xl 
                border-[4px] border-gold-60
                shadow-xl p-5 relative
              "
            >
              {/* HEADER DA ZONA */}
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
              <div className="mt-3 w-full bg-gold-40 h-4 rounded-full overflow-hidden shadow-inner">
                <div
                  className="h-full bg-marron-100 transition-all"
                  style={{ width: `${percent}%` }}
                ></div>
              </div>

              {/* LISTA DE POIs */}
              {openZone === zone.name && (
                <div className="mt-4 space-y-3">
                  {zone.pois.map((poi) => (
                    <div
                      key={poi.id}
                      onClick={() => {
                        // 🔥 ABRIR MODAL GLOBAL DO POI
                        const event = new CustomEvent("openPoiModal", {
                          detail: poi.id,
                        });
                        window.dispatchEvent(event);
                      }}
                      className="
                        bg-gold-20 border-[2px] border-gold-60
                        rounded-xl p-3 shadow-md flex items-center gap-3
                        cursor-pointer hover:scale-[1.02] transition
                      "
                    >
                      <FiMapPin size={22} className="text-marron-100" />

                      <div className="flex-1">
                        <p className="text-marron-100 font-semibold">
                          {poi.name}
                        </p>
                        <p className="text-xs text-marron-80">
                          {poi.visited ? "Visitado" : "Por explorar…"}
                        </p>
                      </div>

                      {/* ÍCONES GAMIFICADOS */}
                      {poi.visited ? (
                        <FiStar
                          size={26}
                          className="text-yellow-500 drop-shadow-sm"
                        />
                      ) : (
                        <FiHelpCircle
                          size={26}
                          className="text-red-600 drop-shadow-sm"
                        />
                      )}
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
