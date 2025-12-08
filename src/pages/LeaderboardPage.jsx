/* eslint-disable */
import React from "react";
import { FiArrowLeft, FiAward, FiStar } from "react-icons/fi";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

// ⚠️ Placeholder estático — depois trocamos pela API
const mockLeaderboard = [
  { id: 1, username: "LeoCoelho", coins: 780, xp: 1200, avatar: "/assets/avatars/avatar_1_p.jpg" },
  { id: 2, username: "CapitaoRui", coins: 640, xp: 1100, avatar: "/assets/avatars/avatar_2_p.jpg" },
  { id: 3, username: "MiaTreasure", coins: 500, xp: 900, avatar: "/assets/avatars/avatar_1_p.jpg" },
  { id: 4, username: "ExplorerKid", coins: 420, xp: 670, avatar: "/assets/avatars/avatar_2_p.jpg" },
];

export default function LeaderboardPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-gold-20 to-gold-60 px-6 pt-10 flex flex-col items-center">

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
        Ranking dos Exploradores
        </motion.div>


      {/* SUBTÍTULO */}
      <p className="font-semibold text-marron-80 mb-4">
        Quem lidera a caça ao tesouro?
      </p>

      {/* LISTA */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="w-full max-w-md bg-white rounded-3xl border-4 border-yellow-300 shadow-xl p-4"
      >
        {mockLeaderboard.map((player, index) => {
          const rank = index + 1;
          const colors = rank === 1
            ? "bg-yellow-400 text-yellow-900"
            : rank === 2
            ? "bg-gray-300 text-gray-900"
            : rank === 3
            ? "bg-orange-400 text-orange-900"
            : "bg-marron-100 text-white";

          return (
            <motion.div
              key={player.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-center justify-between p-3 rounded-xl mb-3 bg-[#FFF2CC] border border-yellow-400 shadow-sm"
            >
              {/* Rank Medal */}
              <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${colors}`}>
                {rank}
              </div>

              {/* Avatar & Username */}
              <div className="flex items-center gap-3 flex-1 ml-3">
                <img
                  src={player.avatar}
                  alt="avatar"
                  className="w-12 h-12 rounded-full border-2 border-yellow-500 object-cover"
                />
                <div>
                  <p className="font-title text-marron-100 text-lg">{player.username}</p>
                  <p className="text-xs text-marron-80">Nível {Math.floor(player.xp / 250)}</p>
                </div>
              </div>

              {/* Scores */}
              <div className="text-right">
                <p className="font-bold text-marron-100 flex items-center gap-1">
                  <FiStar /> {player.xp}
                </p>
                <p className="font-bold text-yellow-700 flex items-center gap-1">
                  <FiAward /> {player.coins}
                </p>
              </div>
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
}
