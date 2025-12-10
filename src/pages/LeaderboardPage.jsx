/* eslint-disable */
import React, { useState } from "react";
import { FiArrowLeft, FiTrendingUp, FiTrendingDown } from "react-icons/fi";
import { FaCrown } from "react-icons/fa";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

// ⚠️ Placeholder estático — depois trocamos pela API
const mockLeaderboard = [
  { id: 1, username: "LeoCoelho", coins: 780, xp: 1200, avatar: "/assets/avatars/avatar_1_p.jpg", scoreChange: 15 },
  { id: 2, username: "CapitaoRui", coins: 640, xp: 1100, avatar: "/assets/avatars/avatar_2_p.jpg", scoreChange: -8 },
  { id: 3, username: "MiaTreasure", coins: 500, xp: 900, avatar: "/assets/avatars/avatar_1_p.jpg", scoreChange: 12 },
  { id: 4, username: "ExplorerKid", coins: 420, xp: 670, avatar: "/assets/avatars/avatar_2_p.jpg", scoreChange: 5 },
  { id: 5, username: "JoeyLui", coins: 380, xp: 600, avatar: "/assets/avatars/avatar_1_p.jpg", scoreChange: -3 },
  { id: 6, username: "Yukishino", coins: 350, xp: 550, avatar: "/assets/avatars/avatar_2_p.jpg", scoreChange: 8 },
  { id: 7, username: "Player7", coins: 320, xp: 500, avatar: "/assets/avatars/avatar_1_p.jpg", scoreChange: 2 },
  { id: 8, username: "Player8", coins: 300, xp: 480, avatar: "/assets/avatars/avatar_2_p.jpg", scoreChange: -5 },
  { id: 9, username: "Player9", coins: 280, xp: 450, avatar: "/assets/avatars/avatar_1_p.jpg", scoreChange: 10 },
  { id: 10, username: "Player10", coins: 250, xp: 400, avatar: "/assets/avatars/avatar_2_p.jpg", scoreChange: 0 },
];

export default function LeaderboardPage() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("Friend");
  const currentUser = useSelector((state) => state.user);
  
  // Encontrar rank do utilizador atual (mock - depois virá da API)
  const userRank = 24;
  const userScore = 221;
  const userScoreChange = 5;

  const top3 = mockLeaderboard.slice(0, 3);
  const restOfPlayers = mockLeaderboard.slice(3);

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-[#FFF4D6] to-[#FBCB6D] pb-24">
      {/* VOLTAR */}
      <button
        onClick={() => navigate("/map")}
        className="absolute top-4 left-4 w-11 h-11 rounded-full bg-[#F8DCA0] border-[3px] border-[#8B5E3C] flex items-center justify-center shadow-[0_3px_0px_#C89B4C] hover:scale-110 transition z-10"
      >
        <FiArrowLeft size={20} className="text-[#5A2C0A]" />
      </button>

      {/* TÍTULO */}
      <div className="pt-16 pb-4 px-6">
        <h1 className="text-center text-[#5A2C0A] font-title text-2xl font-bold mb-2">
          Leaderboard
        </h1>

        {/* TABS */}
        <div className="flex gap-2 justify-center mt-4">
          {["Friend", "Local", "World"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`
                px-6 py-2 rounded-full font-semibold text-sm transition-all
                ${
                  activeTab === tab
                    ? "bg-[#E67826] text-white shadow-md"
                    : "bg-[#FFF4D6] text-[#8B5E3C]"
                }
              `}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* TOP 3 */}
      <div className="relative px-6 mb-6">
        {/* Confetti decorativo */}
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(12)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 rounded-sm"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 50}%`,
                backgroundColor: ["#90EE90", "#FFB6C1", "#FFD700", "#87CEEB"][
                  Math.floor(Math.random() * 4)
                ],
              }}
              animate={{
                y: [0, -10, 0],
                rotate: [0, 180, 360],
                opacity: [0.7, 1, 0.7],
              }}
              transition={{
                duration: 2 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            />
          ))}
        </div>

        <div className="flex items-end justify-center gap-2 relative z-10">
          {/* 2º Lugar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex flex-col items-center flex-1 max-w-[100px]"
          >
            <div className="relative mb-2">
              <div className="w-16 h-16 rounded-full border-4 border-[#FFD700] bg-white p-1 shadow-lg">
                <img
                  src={top3[1]?.avatar || "/assets/avatars/avatar_1_p.jpg"}
                  alt={top3[1]?.username}
                  className="w-full h-full rounded-full object-cover"
                />
              </div>
              <FaCrown className="absolute -top-2 left-1/2 -translate-x-1/2 text-[#FFD700] text-xl" />
              <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-8 h-8 bg-[#E67826] rounded-full flex items-center justify-center text-white font-bold text-sm shadow-md">
                2
              </div>
            </div>
            <p className="font-bold text-[#5A2C0A] text-xs text-center mb-1">
              {top3[1]?.username}
            </p>
            <div className="flex items-center gap-1">
              <span className="font-semibold text-[#5A2C0A] text-sm">
                {top3[1]?.xp}
              </span>
              {top3[1]?.scoreChange !== undefined && (
                <div className={`flex items-center ${top3[1].scoreChange >= 0 ? "text-green-600" : "text-red-600"}`}>
                  {top3[1].scoreChange >= 0 ? (
                    <FiTrendingUp size={12} />
                  ) : (
                    <FiTrendingDown size={12} />
                  )}
                </div>
              )}
            </div>
          </motion.div>

          {/* 1º Lugar */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 }}
            className="flex flex-col items-center flex-1 max-w-[120px]"
          >
            <div className="relative mb-2">
              <div className="w-20 h-20 rounded-full border-4 border-[#FFD700] bg-white p-1 shadow-xl">
                <img
                  src={top3[0]?.avatar || "/assets/avatars/avatar_1_p.jpg"}
                  alt={top3[0]?.username}
                  className="w-full h-full rounded-full object-cover"
                />
              </div>
              <FaCrown className="absolute -top-3 left-1/2 -translate-x-1/2 text-[#FFD700] text-2xl" />
              <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-10 h-10 bg-[#E67826] rounded-full flex items-center justify-center text-white font-bold shadow-lg">
                1
              </div>
            </div>
            <p className="font-bold text-[#5A2C0A] text-sm text-center mb-1">
              {top3[0]?.username}
            </p>
            <div className="flex items-center gap-1">
              <span className="font-semibold text-[#5A2C0A] text-base">
                {top3[0]?.xp}
              </span>
              {top3[0]?.scoreChange !== undefined && (
                <div className={`flex items-center ${top3[0].scoreChange >= 0 ? "text-green-600" : "text-red-600"}`}>
                  {top3[0].scoreChange >= 0 ? (
                    <FiTrendingUp size={14} />
                  ) : (
                    <FiTrendingDown size={14} />
                  )}
                </div>
              )}
            </div>
          </motion.div>

          {/* 3º Lugar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-col items-center flex-1 max-w-[100px]"
          >
            <div className="relative mb-2">
              <div className="w-16 h-16 rounded-full border-4 border-[#FFD700] bg-white p-1 shadow-lg">
                <img
                  src={top3[2]?.avatar || "/assets/avatars/avatar_1_p.jpg"}
                  alt={top3[2]?.username}
                  className="w-full h-full rounded-full object-cover"
                />
              </div>
              <FaCrown className="absolute -top-2 left-1/2 -translate-x-1/2 text-[#FFD700] text-xl" />
              <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-8 h-8 bg-[#E67826] rounded-full flex items-center justify-center text-white font-bold text-sm shadow-md">
                3
              </div>
            </div>
            <p className="font-bold text-[#5A2C0A] text-xs text-center mb-1">
              {top3[2]?.username}
            </p>
            <div className="flex items-center gap-1">
              <span className="font-semibold text-[#5A2C0A] text-sm">
                {top3[2]?.xp}
              </span>
              {top3[2]?.scoreChange !== undefined && (
                <div className={`flex items-center ${top3[2].scoreChange >= 0 ? "text-green-600" : "text-red-600"}`}>
                  {top3[2].scoreChange >= 0 ? (
                    <FiTrendingUp size={12} />
                  ) : (
                    <FiTrendingDown size={12} />
                  )}
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </div>

      {/* LISTA RANKS 4+ */}
      <div className="px-6 space-y-2">
        {restOfPlayers.map((player, index) => {
          const rank = index + 4;
          return (
            <motion.div
              key={player.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 + index * 0.05 }}
              className="flex items-center gap-3 bg-white/80 rounded-xl p-3 shadow-sm"
            >
              <div className="flex items-center gap-2 min-w-[60px]">
                <span className="font-bold text-[#5A2C0A] text-sm">{rank}</span>
                {player.scoreChange !== undefined && (
                  <div className={`flex items-center ${player.scoreChange >= 0 ? "text-green-600" : "text-red-600"}`}>
                    {player.scoreChange >= 0 ? (
                      <FiTrendingUp size={14} />
                    ) : (
                      <FiTrendingDown size={14} />
                    )}
                  </div>
                )}
              </div>
              <img
                src={player.avatar}
                alt={player.username}
                className="w-10 h-10 rounded-full object-cover border-2 border-[#FBCB6D]"
              />
              <div className="flex-1">
                <p className="font-semibold text-[#5A2C0A] text-sm">
                  {player.username}
                </p>
              </div>
              <div className="text-right">
                <p className="font-semibold text-[#5A2C0A] text-sm">
                  {player.xp} points
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* BARRA DO UTILIZADOR ATUAL */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="fixed bottom-0 left-0 right-0 bg-gradient-to-r from-[#FFB75E] to-[#E67826] rounded-t-3xl shadow-lg border-t-4 border-[#8B5E3C] px-6 py-4"
      >
        <div className="flex items-center justify-between max-w-md mx-auto">
          <div className="flex items-center gap-2">
            <span className="font-bold text-[#5A2C0A] text-lg">{userRank}</span>
            {userScoreChange !== undefined && (
              <div className={`flex items-center ${userScoreChange >= 0 ? "text-green-700" : "text-red-700"}`}>
                {userScoreChange >= 0 ? (
                  <FiTrendingUp size={16} />
                ) : (
                  <FiTrendingDown size={16} />
                )}
              </div>
            )}
          </div>
          <div className="flex-1 text-center">
            <p className="text-[#5A2C0A] font-semibold text-sm">
              Your current rank
            </p>
          </div>
          <div>
            <p className="font-bold text-[#5A2C0A] text-lg">
              {userScore} points
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
