import React from "react";
import { FaCrosshairs } from "react-icons/fa";
import { useMap } from "react-leaflet";
import RoundFloatingButton from "./RoundFloatingButton";

export default function CenterOnMe({ position }) {
  const map = useMap();

  function handleClick() {
    if (position?.lat && position?.lng) {
      map.flyTo([position.lat, position.lng], 18, { duration: 0.6 });
    }
  }

  return (
    <RoundFloatingButton
      onClick={handleClick}
      icon={<FaCrosshairs size={22} className="text-marron-100" />}
      className="absolute right-4 bottom-24 z-[9999]"
    />
  );
}
