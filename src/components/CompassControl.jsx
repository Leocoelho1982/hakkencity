import React from "react";
import { FaCompass } from "react-icons/fa";
import RoundFloatingButton from "./RoundFloatingButton";

export default function CompassControl({ hasPermission, requestPermission }) {
  function handleClick() {
    if (!hasPermission) requestPermission();
  }

  return (
    <RoundFloatingButton
      onClick={handleClick}
      icon={<FaCompass size={22} className="text-marron-100" />}
      className="absolute right-4 bottom-40 z-[9999]"
    />
  );
}
