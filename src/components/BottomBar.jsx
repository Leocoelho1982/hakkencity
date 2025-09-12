// BottomBar.jsx
import React from "react";
import dotsIcon from "../assets/dots.png";
import changeCoinIcon from "../assets/changecoin.png";
import centerOnMeIcon from "../assets/centeronme.png";

export default function BottomBar({ user, map }) {
  if (!user) return null;

  const toLatLng = (pos) => {
    if (Array.isArray(pos)) return [Number(pos[0]), Number(pos[1])];
    if (pos?.lat != null && pos?.lng != null) return [Number(pos.lat), Number(pos.lng)];
    return null;
  };

  const handleCenter = () => {
    const target = toLatLng(user);
    if (!map || !target) {
      console.log("map ou posição inválida:", map, target);
      return;
    }
    map.stop?.();
    const nextZoom = Math.max(map.getZoom?.() ?? 0, 18);
    map.setView(target, nextZoom, { animate: true });
    // ou: map.flyTo(target, nextZoom, { duration: 0.8 });
  };

  return (
    <div className="bg-[#FFF4D6] px-6 rounded-t-3xl w-full border-t-4 border-black/20 flex items-center justify-between">
      <button type="button" className="flex flex-col items-center justify-center">
        <img src={changeCoinIcon} alt="Trocar Moedas" className="w-[72px] h-[72px]" />
      </button>

      <button
        type="button"
        onClick={handleCenter}
        className="relative -top-8 flex flex-col items-center justify-center"
        aria-label="Centralizar no meu local"
      >
        <img src={centerOnMeIcon} alt="Centralizar" className="w-24 h-24" />
        <span className="text-xs mt-1">Recentrar</span>
      </button>

      <button type="button" className="flex flex-col items-center justify-center">
        <img src={dotsIcon} alt="Mais opções" className="w-10 h-10" />
      </button>
    </div>
  );
}
