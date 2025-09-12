import React, { useMemo } from "react";
import { Marker, Circle, Popup } from "react-leaflet";
import L from "leaflet";
import * as turf from "@turf/turf";
import coinIcon from "../assets/coin.png";

// Cria ícone do POI
function makeIcon(collected) {
  return L.icon({
    iconUrl: coinIcon,
    iconSize: [32, 32],
    className: collected ? "poi-icon-collected" : "poi-icon",
  });
}

export default function PoiMarker({ poi, userPosition, visited = {}, onCollect }) {
  // Distância em metros
  const distance = useMemo(() => {
    if (!userPosition) return null;
    const from = turf.point([userPosition.lng, userPosition.lat]);
    const to = turf.point([poi.lng, poi.lat]);
    return turf.distance(from, to, { units: "meters" });
  }, [userPosition, poi]);

  const isCollected = visited && visited[poi.id];


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
      >
        <Popup>
          <h3 className="font-bold">{poi.content?.title || poi.name}</h3>
          {poi.content?.image && (
            <img
              src={poi.content.image}
              alt={poi.name}
              className="w-40 h-28 object-cover rounded-md mb-2"
            />
          )}
          <p className="text-sm">{poi.content?.text}</p>

          {!isCollected && distance <= poi.radius ? (
            <button
              onClick={() => onCollect(poi)}
              className="bg-marron-40 text-white px-3 py-1 rounded-lg mt-2 hover:bg-marron-60"
            >
              Recolher +{poi.points} moedas
            </button>
          ) : (
            <p className="text-xs text-gray-500 mt-2">
              {isCollected ? "✅ Já recolhido" : "Aproxime-se para recolher"}
            </p>
          )}
        </Popup>
      </Marker>
    </>
  );
}
