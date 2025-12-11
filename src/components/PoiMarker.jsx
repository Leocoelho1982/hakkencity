/* eslint-disable */
import React, { useMemo, useState, useEffect } from "react";
import { Marker, Circle } from "react-leaflet";
import { createPortal } from "react-dom";
import L from "leaflet";
import * as turf from "@turf/turf";

import coinIcon from "../assets/coin.png";
import coinsIcon from "../assets/coins.png";
import ampliarIcon from "../assets/bt_ampliar.png";
import iconClose from "../assets/bt_close.png";

import EffectParticles from "../components/EffectParticles";
import { coinSound } from "../utils/sound";

function makeIcon(collected) {
  return L.icon({
    iconUrl: coinIcon,
    iconSize: [34, 34],
    className: collected ? "poi-icon-collected" : "poi-icon",
  });
}

function formatDistance(meters) {
  if (!meters) return "—";
  if (meters < 1000) return `${Math.round(meters)} m`;
  return `${(meters / 1000).toFixed(2)} km`;
}

export default function PoiMarker({ poi, userPosition, visited = [], onCollect }) {
  const [open, setOpen] = useState(false);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [showParticles, setShowParticles] = useState(false);

  // -----------------------------------------
  // ABRIR MODAL A PARTIR DE OUTRA PÁGINA
  // -----------------------------------------
  useEffect(() => {
    function handleOpenModal(e) {
      if (e.detail === poi.id) setOpen(true);
    }
    window.addEventListener("openPoiModal", handleOpenModal);
    return () => window.removeEventListener("openPoiModal", handleOpenModal);
  }, [poi.id]);

  // -----------------------------------------
  // DISTÂNCIA
  // -----------------------------------------
  const distance = useMemo(() => {
    if (!userPosition) return null;
    const from = turf.point([userPosition.lng, userPosition.lat]);
    const to = turf.point([poi.lng, poi.lat]);
    return turf.distance(from, to, { units: "meters" });
  }, [userPosition, poi]);

  const isCollected = visited.includes(poi.id);
  const canCollect = !isCollected && distance !== null && distance <= poi.radius;

  // -----------------------------------------
  // ALERTA DE PROXIMIDADE
  // -----------------------------------------
  const proximityAlert =
    canCollect &&
    createPortal(
      <div
        className="
          fixed bottom-28 left-1/2 -translate-x-1/2
          bg-gold-60 text-marron-100
          px-5 py-2 rounded-full shadow-xl z-[900]
          border-2 border-gold-80 font-bold animate-bounce
        "
      >
        🎉 Estás no raio do POI! Toca no marcador para recolher moedas!
      </div>,
      document.body
    );

  // -----------------------------------------
  // MODAL DO POI — TOTALMENTE CONSISTENTE
  // -----------------------------------------
  const modal = open
    ? createPortal(
        <div
          className="fixed inset-0 bg-black/60 z-[999] flex justify-center overflow-y-auto"
          onClick={() => setOpen(false)}
        >
          <div
            className="
              bg-gradient-to-b from-gold-20 to-gold-60
              rounded-3xl p-6 w-xl m-4 border-[6px] border-marron-100
              shadow-2xl relative my-10 max-h-[90vh] overflow-y-auto
            "
            onClick={(e) => e.stopPropagation()}
          >
            {/* Fechar */}
            <button
              onClick={() => setOpen(false)}
              className="absolute top-3 right-3 hover:scale-110 transition"
            >
              <img src={iconClose} className="h-7 w-7" alt="Fechar" />
            </button>

            {/* TÍTULO */}
            <h3
              className="
                font-title text-2xl mb-4 text-marron-100 text-center
                bg-gold-80 py-2 rounded-xl shadow-inner
                border-b-[4px] border-gold-100
              "
            >
              {poi.content?.title || poi.name}
            </h3>

            {/* IMAGEM DO POI */}
            {poi.content?.image && (
              <div className="relative mb-4">
                <img
                  src={poi.content.image}
                  alt={poi.name}
                  className="
                    w-full h-48 object-cover rounded-xl
                    border-[4px] border-gold-100 shadow-xl
                  "
                />

                {/* MOEDAS */}
                <div
                  className="
                    absolute top-3 left-3 flex items-center
                    bg-white/80 rounded-full px-3 py-1 shadow-md
                    border border-gold-80
                  "
                >
                  <img src={coinsIcon} alt="" className="w-6 h-6 mr-1" />
                  <span className="font-extrabold text-marron-100 text-lg">
                    {poi.points}
                  </span>
                </div>

                {/* AMPLIAR */}
                <button
                  onClick={() => setLightboxOpen(true)}
                  className="
                    absolute top-3 right-3 bg-white/80
                    rounded-full p-2 shadow-md hover:scale-110 transition
                  "
                >
                  <img src={ampliarIcon} alt="Ampliar" className="w-6 h-6" />
                </button>
              </div>
            )}

            {/* DESCRIÇÃO */}
            <p className="text-sm text-marron-80 mb-4 leading-relaxed">
              {poi.content?.text}
            </p>

            {/* DISTÂNCIA */}
            <div className="my-4">
              <p className="text-center text-sm font-semibold text-marron-80 mb-1">
                Distância até ao POI
              </p>

              <div className="w-full bg-gold-40 rounded-full h-4 overflow-hidden">
                <div
                  className={`
                    h-full transition-all duration-500
                    ${
                      canCollect
                        ? "bg-green-500"
                        : distance < 200
                        ? "bg-yellow-500"
                        : "bg-red-500"
                    }
                  `}
                  style={{
                    width: `${Math.min(
                      100,
                      (poi.radius / Math.max(1, distance)) * 100
                    )}%`,
                  }}
                />
              </div>

              <p className="text-center mt-1 text-sm text-marron-80">
                {formatDistance(distance)}
              </p>
            </div>

            {/* BOTÃO DE RECOLHA */}
            {canCollect ? (
              <button
                onClick={() => {
                  coinSound.play();
                  setShowParticles(true);
                  onCollect(poi);
                  setOpen(false);
                }}
                className="
                  w-full bg-gradient-to-b from-[#FFB75E] to-[#E67826]
                  text-white py-3 rounded-full font-title text-xl
                  shadow-xl mt-4 animate-pulse hover:scale-105 transition
                "
              >
                ✨ Recolher Moedas!
              </button>
            ) : (
              <p className="text-center text-sm text-marron-80 mt-4 italic">
                {isCollected
                  ? "✅ Já recolhido"
                  : distance < 200
                  ? "🔎 Estás muito perto!"
                  : "🚶 Aproxima-te para recolher"}
              </p>
            )}
          </div>
        </div>,
        document.body
      )
    : null;

  // -----------------------------------------
  // LIGHTBOX
  // -----------------------------------------
  const lightbox = lightboxOpen
    ? createPortal(
        <div
          className="fixed inset-0 bg-black/80 z-[1000] flex items-center justify-center"
          onClick={() => setLightboxOpen(false)}
        >
          <div
            className="relative w-full max-w-2xl mx-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setLightboxOpen(false)}
              className="absolute top-4 right-4 bg-white/90 rounded-full p-2 shadow-xl hover:scale-110 transition"
            >
              <img src={iconClose} className="h-8 w-8" alt="Fechar" />
            </button>

            <img
              src={poi.content?.image}
              alt="Grande"
              className="w-full max-h-[80vh] object-contain rounded-3xl shadow-2xl"
            />
          </div>
        </div>,
        document.body
      )
    : null;

  return (
    <>
      {/* Área do POI */}
      <Circle
        center={{ lat: poi.lat, lng: poi.lng }}
        radius={poi.radius}
        pathOptions={{
          color: isCollected ? "gray" : "var(--color-gold-100)",
          fillOpacity: 0.15,
        }}
      />

      {/* Marcador */}
      <Marker
        position={{ lat: poi.lat, lng: poi.lng }}
        icon={makeIcon(isCollected)}
        zIndexOffset={canCollect ? 1000 : 300}
        eventHandlers={{ click: () => setOpen(true) }}
      />

      {modal}
      {lightbox}
      {proximityAlert}

      {showParticles && (
        <EffectParticles onComplete={() => setShowParticles(false)} />
      )}
    </>
  );
}
