import { useEffect, useState } from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import { useSelector } from "react-redux";

import PlayerMarker from "../components/PlayerMarker";
import PoiMarker from "../components/PoiMarker";
import TopBar from "../components/TopBar";
import FlyToUser from "../components/FlyToUser";
import PlayerHeadingCone from "../components/PlayerHeadingCone";
import CompassControl from "../components/CompassControl";
import CenterOnMe from "../components/CenterOnMe";
import LeaderboardButton from "../components/LeaderboardButton";

import useGeolocation from "../hooks/useGeolocation";
import useHeading from "../hooks/useHeading";

import { useGetPoisQuery } from "../features/poiApi";
import { useCollectPoiMutation } from "../features/gameApi";


// ---- Helper para buscar cidade/distrito via Nominatim ----
async function getRegion(lat, lng) {
  const res = await fetch(
    `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&zoom=10&addressdetails=1`
  );
  const data = await res.json();
  return (
    data.address.state ||
    data.address.county ||
    data.address.city ||
    "—"
  );
}

export default function MapPage() {
  // Sessão do utilizador
  const { isAuthenticated, loading, image: avatar } = useSelector(
    (state) => state.user
  );

  if (loading) return <div className="text-center mt-10">A carregar…</div>;
  if (!isAuthenticated) return null;


  // -------- GEO + HEADING --------
  const { position, msg } = useGeolocation();
  const { heading, hasPermission, requestPermission } = useHeading();


  // -------- Mutação para recolher moedas --------
  const [collectPoi] = useCollectPoiMutation();


  // -------- POIs (vindo do backend) --------
  const {
    data: pois = [],
    isLoading: poisLoading,
    error: poisError,
  } = useGetPoisQuery();


  // -------- Região (cidade/distrito) --------
  const [city, setCity] = useState("—");

  useEffect(() => {
    if (!position?.lat || !position?.lng) return;
    (async () => {
      try {
        const region = await getRegion(position.lat, position.lng);
        setCity(region);
      } catch (e) {
        console.error("Erro ao buscar região:", e);
      }
    })();
  }, [position]);


  // -------- Progresso local (visited + score) --------
  const [visited, setVisited] = useState(() =>
    JSON.parse(localStorage.getItem("visited") || "{}")
  );
  const [score, setScore] = useState(() =>
    Number(localStorage.getItem("score") || 0)
  );

  useEffect(() => {
    localStorage.setItem("visited", JSON.stringify(visited));
  }, [visited]);

  useEffect(() => {
    localStorage.setItem("score", String(score));
  }, [score]);


  // -------- Recolha de POIs (agora com coins reais do backend) --------
  async function handleCollect(poi) {
    try {
      // 1) ENVIA PARA O BACKEND
      const res = await collectPoi(poi.id).unwrap();

      /*
        res = {
          message: "Moeda coletada",
          coins: 1,
          xp: 10,
          level: 1,
          poi: {...}
        }
      */

      console.log("Resposta backend:", res);

      // 2) MARCA LOCALMENTE
      if (!visited[poi.id]) {
        setVisited((prev) => ({ ...prev, [poi.id]: true }));

        // SOMA AS MOEDAS REAIS QUE O BACKEND ENTREGOU
        setScore((prev) => prev + res.coins);

        navigator.vibrate?.(80);
      }

    } catch (err) {
      console.error("Erro ao recolher moeda no backend:", err);
    }
  }


  // Se os POIs ainda estão a carregar
  if (poisLoading) {
    return <div className="text-center mt-10">A carregar POIs…</div>;
  }

  // Em caso de erro
  if (poisError) {
    return (
      <div className="text-center mt-10 text-red-600">
        Erro ao carregar POIs.
      </div>
    );
  }


  return (
    <div
      className="h-screen w-screen bg-cover bg-center flex justify-center"
      style={{ backgroundImage: "url('/assets/background.png')" }}
    >
      <div className="flex flex-col w-full max-w-4xl bg-white/90">
        <div className="flex-1 relative">

          {/* MAPA */}
          <MapContainer
            center={{ lat: 40.6405, lng: -8.6538 }}
            zoom={18}
            className="absolute inset-0 z-0"
            whenReady={(map) => {
              setTimeout(() => map.target.invalidateSize(), 80);
            }}
          >
            <TileLayer
              attribution="&copy; OpenStreetMap"
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            {/* POSIÇÃO DO UTILIZADOR */}
            <FlyToUser position={position} zoom={18} />
            <PlayerHeadingCone position={position} heading={heading} />
            <PlayerMarker position={position} />


            {/* CONTROLOS */}
            <CompassControl
              heading={heading}
              hasPermission={hasPermission}
              requestPermission={requestPermission}
            />
            <CenterOnMe position={position} />
            <LeaderboardButton />


            {/* POIs DO BACKEND */}
            {pois.map((p) => {
              const poi = {
                id: p.id,
                lat: p.lat,
                lng: p.lng,
                radius: p.radius,
                points: p.coins, // valor configurado do POI (não usado no score)
                tags: p.tags?.split(",") || [],
                content: {
                  title: p.content_title,
                  text: p.content_text,
                  image: p.content_image,
                },
              };

              return (
                <PoiMarker
                  key={poi.id}
                  poi={poi}
                  userPosition={position}
                  visited={visited}
                  onCollect={handleCollect}
                />
              );
            })}
          </MapContainer>


          {/* TOP BAR */}
          <div className="fixed top-0 w-full max-w-4xl z-50 pointer-events-none">
            <div className="pointer-events-auto">
              <TopBar
                score={score}
                visitedCount={Object.values(visited).filter(Boolean).length}
                totalPois={pois.length}
                gpsMsg={msg}
                avatar={avatar}
                city={city}
              />
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
