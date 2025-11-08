import React, { useMemo, useState } from "react";
import { Marker, Circle } from "react-leaflet";
import { createPortal } from "react-dom";
import L from "leaflet";
import * as turf from "@turf/turf";
import coinIcon from "../assets/coin.png";
import coinsIcon from "../assets/coins.png";
import ampliarIcon from "../assets/bt_ampliar.png";
import iconClose from "../assets/bt_close.png";

// Cria ícone do POI
function makeIcon(collected) {
  return L.icon({
    iconUrl: coinIcon,
    iconSize: [32, 32],
    className: collected ? "poi-icon-collected" : "poi-icon",
  });
}

// Função auxiliar para formatar distância
function formatDistance(meters) {
  if (meters == null) return "—";
  if (meters < 1000) return `${Math.round(meters)} m`;
  return `${(meters / 1000).toFixed(2)} km`;
}

export default function PoiMarker({ poi, userPosition, visited = {}, onCollect }) {
  const [open, setOpen] = useState(false);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  // Distância em metros
  const distance = useMemo(() => {
    if (!userPosition) return null;
    const from = turf.point([userPosition.lng, userPosition.lat]);
    const to = turf.point([poi.lng, poi.lat]);
    return turf.distance(from, to, { units: "meters" });
  }, [userPosition, poi]);

  const isCollected = visited && visited[poi.id];
  const canCollect = !isCollected && distance !== null && distance <= poi.radius;

  // Modal principal (fora do mapa, via portal)
  const modal = open
    ? createPortal(
        <div
          className="fixed inset-0 bg-black/60 z-[999] flex justify-center overflow-y-auto touch-none"
          onClick={() => setOpen(false)}
        >
          <div
            className="bg-gradient-to-b from-gold-20 to-gold-60 rounded-3xl p-6 w-90 border-4 border-marron-100 shadow-lg relative my-10 max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Botão fechar */}
            <button
              onClick={() => setOpen(false)}
              className="absolute top-2 right-2 text-marron-100 font-bold text-lg"
            >
              <img src={iconClose} className="h-6 w-6" alt="Fechar" />
            </button>

            <h3 className="font-bold font-title text-lg mb-3 text-marron-100">
              {poi.content?.title || poi.name}
            </h3>

            {poi.content?.image && (
              <div className="relative mb-3">
                {/* Imagem */}
                <img
                  src={poi.content.image}
                  alt={poi.name}
                  className="w-full h-40 object-cover rounded-md"
                />

                {/* Coins + valor */}
                <div className="absolute top-2 left-2 flex items-center bg-white/80 rounded-full px-2 py-1 shadow">
                  <img src={coinsIcon} alt="coins" className="w-5 h-5 mr-1" />
                  <span className="font-bold text-[#5A2C0A]">{poi.points}</span>
                </div>

                {/* Botão ampliar */}
                <button
                  onClick={() => setLightboxOpen(true)}
                  className="absolute top-2 right-2 bg-white/80 rounded-full p-1 shadow hover:scale-105 transition"
                >
                  <img src={ampliarIcon} alt="Ampliar" className="w-5 h-5" />
                </button>
              </div>
            )}

            <p className="text-sm text-marron-100 mb-2">{poi.content?.text}</p>

            {/* Distância */}
            <p className="text-center text-sm font-semibold text-marron-100 mb-4">
              Distância: {formatDistance(distance)}
            </p>

            {canCollect ? (
              <button
                onClick={() => {
                  onCollect(poi);
                  setOpen(false);
                }}
                className="w-full bg-[#E66A4E] text-white py-2 rounded-full font-title font-semibold hover:bg-[#d85d3f] transition cursor-pointer"
              >
                Recolher +{poi.points} moedas
              </button>
            ) : (
              <p className="text-center text-sm text-azul-60">
                {isCollected
                  ? "✅ Já recolhido"
                  : "Aproxime-se para recolher as moedas"}
              </p>
            )}
          </div>
        </div>,
        document.body
      )
    : null;

  // Lightbox (fora do mapa, via portal)
  const lightbox = lightboxOpen
    ? createPortal(
        <div
          className="fixed inset-0 bg-black/80 z-[1000] flex items-center justify-center overflow-y-auto touch-none"
          onClick={() => setLightboxOpen(false)}
        >
          <div
            className="relative w-full max-w-2xl mx-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setLightboxOpen(false)}
              className="absolute top-4 right-4 bg-white/90 rounded-full px-3 py-1 font-bold text-[#5A2C0A] shadow"
            >
              <img src={iconClose} className="h-8 w-8" alt="Fechar" />
            </button>
            <img
              src={poi.content?.image}
              alt="Ampliado"
              className="w-full max-h-[80vh] object-contain rounded-3xl shadow-xl"
            />
          </div>
        </div>,
        document.body
      )
    : null;

  return (
    <>
      {/* Raio de alcance */}
      <Circle
        center={{ lat: poi.lat, lng: poi.lng }}
        radius={poi.radius}
        pathOptions={{
          color: isCollected ? "gray" : "#e68d2f",
          fillOpacity: 0.15,
        }}
      />

      {/* Marcador */}
      <Marker
        position={{ lat: poi.lat, lng: poi.lng }}
        icon={makeIcon(isCollected)}
        eventHandlers={{
          click: () => setOpen(true),
        }}
      />

      {/* Portais */}
      {modal}
      {lightbox}
    </>
  );
}
