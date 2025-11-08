import React, { useState } from "react";
import iconClose from "../assets/bt_close.png";

// Dados de exemplo (temos de substituir por props da base de dados no futuro
const mockLeaderboard = [
  { id: 1, name: "Jogador1", time: "12:30", coins: 150 },
  { id: 2, name: "Jogador2", time: "14:10", coins: 120 },
  { id: 3, name: "Jogador3", time: "15:25", coins: 100 },
  { id: 4, name: "Jogador4", time: "16:05", coins: 80 },
];

export default function Leaderboard({ open, onClose }) {
  if (!open) return null;

  return (
    <div className="absolute inset-0 flex items-center justify-center bg-black/60 z-[999]">
      <div className="bg-gradient-to-b from-[#FFF4D6] to-[#FBCB6D] rounded-2xl p-6 w-96 border-4 border-[#5A2C0A] shadow-lg relative">
        {/* Botão fechar */}
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-[#5A2C0A] font-bold text-lg"
        >
          <img src={iconClose} className="h-6 w-6" />
        </button>

        <h2 className="font-bold font-title text-xl mb-4 text-center text-[#5A2C0A]">
          🏆 Leaderboard
        </h2>

        <div className="space-y-3">
          {mockLeaderboard.map((player, index) => (
            <div
              key={player.id}
              className={`flex items-center justify-between p-3 rounded-lg shadow ${
                index === 0
                  ? "bg-yellow-300"
                  : index === 1
                  ? "bg-gray-300"
                  : index === 2
                  ? "bg-orange-300"
                  : "bg-white/80"
              }`}
            >
              <span className="font-bold text-[#5A2C0A] w-8">#{index + 1}</span>
              <span className="flex-1 font-semibold text-[#5A2C0A]">
                {player.name}
              </span>
              <span className="text-sm text-[#5A2C0A]">
                ⏱ {player.time}
              </span>
              <span className="ml-3 font-bold text-[#5A2C0A]">
                💰 {player.coins}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
