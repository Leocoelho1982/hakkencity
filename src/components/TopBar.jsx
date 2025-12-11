/* eslint-disable */
import React from "react";
import { useNavigate } from "react-router-dom";
import coinIcon from "../assets/coin.png";
import mapicon from "../assets/mapicon.png";
import filterIcon from "../assets/filter.png";
import avatarFallback from "../assets/avatar.jpg";

export default function TopBar({ score, visitedCount, totalPois, avatar, city, level }) {
  const navigate = useNavigate();
  const avatarUrl = avatar || avatarFallback;

  return (
    <div className="relative w-full z-50">
      {/* FUNDO DA BARRA */}
      

        {/* CONTENT */}
        <div className="
          flex items-center justify-between
          bg-gradient-to-b from-gold-20 to-gold-100
          border-[4px] border-marron-100 rounded-3xl
          px-4 py-2 shadow-xl
        ">

          {/* ------------------------- */}
          {/* AVATAR + BADGE DE NÍVEL   */}
          {/* ------------------------- */}
          <div
            className="relative cursor-pointer transition hover:scale-105"
            onClick={() => navigate("/profile")}
          >
            {/* Badge de Nível */}
            <div
              className="
                absolute -top-3 -right-3
                w-10 h-10 rounded-full 
                bg-gold-100 border-[3px] border-marron-100
                flex items-center justify-center 
                font-title text-marron-100 text-lg 
                shadow-md
              "
            >
              {level}
            </div>

            {/* Avatar */}
            <div
              className="
                p-[2px] bg-gold-100 border-[3px] border-marron-100 
                rounded-2xl shadow-md
              "
            >
              <img
                src={avatarUrl}
                alt="Avatar"
                className="
                  w-12 h-12 rounded-xl border-2 border-marron-100 
                  object-cover shadow-inner
                "
              />
            </div>
          </div>

          {/* ------------------------- */}
          {/* MOEDAS                   */}
          {/* ------------------------- */}
          <div
            onClick={() => navigate("/wallet")}
            className="
              relative cursor-pointer hover:scale-105 transition
              p-[2px] bg-gold-100 border-[3px] border-marron-100 rounded-3xl
            "
          >
            <img
              src={coinIcon}
              alt="Moeda"
              className="absolute -top-3 -left-3 w-10 drop-shadow-md"
            />

            <div
              className="
                flex items-center gap-2 bg-marron-100 text-white font-title 
                pl-12 pr-3 py-1 rounded-3xl shadow-inner
              "
            >
              <span>{score}</span>
            </div>
          </div>

          {/* ------------------------- */}
          {/* PROGRESSO DOS POIS       */}
          {/* ------------------------- */}
          <div
            onClick={() => navigate("/pois")}
            className="
              relative cursor-pointer hover:scale-105 transition
              p-[2px] bg-gold-100 border-[3px] border-marron-100 rounded-3xl
            "
          >
            <img
              src={mapicon}
              alt="POIs"
              className="absolute -top-3 -left-3 w-10 drop-shadow-md"
            />

            <div
              className="
                flex items-center gap-2 bg-marron-100 text-white font-title
                pl-12 pr-3 py-1 rounded-3xl shadow-inner
              "
            >
              <span>
                {visitedCount}/{totalPois}
              </span>
            </div>
          </div>

          {/* ------------------------- */}
          {/* BOTÃO DE FILTRO          */}
          {/* ------------------------- */}
          <button className="hover:scale-110 transition">
            <img src={filterIcon} alt="Filtro" className="w-8 h-8" />
          </button>
        </div>

        
      
    </div>
  );
}
