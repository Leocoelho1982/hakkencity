/* eslint-disable */
import React, { useState } from "react";
import coinIcon from "../assets/coin.png";
import filterIcon from "../assets/filter.png";
import mapicon from "../assets/mapicon.png";
import avatarFallback from "../assets/avatar.jpg";
import { useNavigate } from "react-router-dom";
import SettingsModal from "./SettingsModal";
import { useMusic } from "../context/MusicProvider";

export default function TopBar({ score, visitedCount, totalPois, avatar, city }) {
  const navigate = useNavigate();
  const [showSettings, setShowSettings] = useState(false);
  const { playClick } = useMusic();

  const avatarUrl = avatar || avatarFallback;

  return (
    <div className="relative">
      <div className="bg-[#FFF4D6] p-2 rounded-b-3xl w-full border-b border-b-5 border-b-black/20">
        <div
          className="flex items-center justify-between 
                     bg-gradient-to-b from-[#FFF4D6] to-[#FBCB6D] 
                     border-4 border-[#5A2C0A] rounded-3xl px-4 py-2"
        >
          {/* Avatar */}
          <div
            className="p-[2px] bg-[#FBCB6D] border-[#8B3A1A] border-3 rounded-2xl 
                       cursor-pointer hover:scale-105 transition"
            onClick={() => navigate("/profile")}
            title="Ver perfil"
          >
            <img
              src={avatarUrl}
              alt="Avatar"
              className="w-12 h-12 rounded-xl border-2 border-[#8B3A1A] object-cover"
            />
          </div>

          {/* Moedas */}
          <div
            className="relative p-[2px] bg-[#FBCB6D] border-[#5A2C0A] border-3 rounded-3xl cursor-pointer hover:scale-105 transition"
            onClick={() => navigate("/wallet")}
            title="Abrir Tesouro"
          >
            <img
              src={coinIcon}
              alt="Moeda"
              className="absolute -top-3 -left-3 w-10 h-10 drop-shadow-md"
            />
            <div
              className="flex items-center gap-2 bg-[#8B3A1A] font-title text-white 
                         pl-12 pr-3 py-1 rounded-3xl shadow-inner"
            >
              <span>{score}</span>
            </div>
          </div>

          {/* Progresso (agora com clique para abrir a página de POIs) */}
          <div
            className="relative p-[2px] bg-[#FBCB6D] border-[#8B3A1A] border-3 rounded-3xl 
                       cursor-pointer hover:scale-105 transition"
            onClick={() => navigate("/pois")}
            title="Ver lista de POIs"
          >
            <img
              src={mapicon}
              alt="Progress"
              className="absolute -top-3 -left-3 w-10 h-10 drop-shadow-md"
            />
            <div
              className="flex items-center gap-2 bg-[#8B3A1A] font-title text-white 
                         pl-12 pr-3 py-1 rounded-3xl shadow-inner"
            >
              <span>
                {visitedCount}/{totalPois}
              </span>
            </div>
          </div>

          {/* Filtro */}
          <button 
            title="Configurações"
            onClick={() => {
              playClick();
              setShowSettings(true);
            }}
          >
            <img
              src={filterIcon}
              alt="Filtro"
              className="w-8 h-8 hover:scale-110 transition"
            />
          </button>
        </div>

        {/* Cidade */}
        <div className="text-center font-title font-regular text-[#5A2C0A] mt-1">
          Localização: {city || "—"}
        </div>
      </div>

      {/* Modal de Configurações */}
      <SettingsModal 
        isOpen={showSettings} 
        onClose={() => setShowSettings(false)} 
      />
    </div>
  );
}
