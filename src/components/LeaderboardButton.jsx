/* eslint-disable */
import React from "react";
import { FaMedal } from "react-icons/fa";
import RoundFloatingButton from "./RoundFloatingButton";
import { useNavigate } from "react-router-dom";

export default function LeaderboardButton() {
  const navigate = useNavigate();

  return (
    <RoundFloatingButton
      onClick={() => navigate("/leaderboard")}
      icon={<FaMedal size={22} className="text-marron-100" />}
      className="absolute left-4 bottom-24 z-[9999]" 
    />
  );
}
