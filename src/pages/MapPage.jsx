import { useEffect, useState } from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import { useSelector } from "react-redux";

import Leaderboard from "../components/Leaderboard";
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
import { POIS } from "../data/pois";

// ---- Helper para buscar cidade/distrito ----
// Nota: Nominatim bloqueia requisições diretas do browser (CORS)
// Para produção, esta funcionalidade deve ser implementada no backend
async function getRegion(lat, lng) {
  // Por enquanto, retornamos "—" para evitar erros CORS
  // Em produção, fazer esta requisição através do backend
  return "—";
  
  /* Código comentado - requer backend proxy devido a CORS
  try {
    const res = await fetch(
      `/api/geocode/reverse?lat=${lat}&lon=${lng}`,
      { method: 'GET' }
    );
    if (res.ok) {
      const data = await res.json();
      return data.city || data.region || "—";
    }
  } catch (error) {
    // Silenciosamente retorna "—"
  }
  return "—";
  */
}

export default function MapPage() {
  // Sessão
  const { isAuthenticated, loading, image: avatar } = useSelector(
    (state) => state.user
  );

  // Se ainda estiver a carregar sessão → NÃO renderiza mapa
  if (loading) return <div className="text-center mt-10">A carregar…</div>;

  // Se não estiver autenticado (fallback extra — PrivateRoute cuida disto)
  if (!isAuthenticated) return null;

  // Geo + Heading
  const { position, msg } = useGeolocation();
  const { heading, hasPermission, requestPermission } = useHeading();

  // Região
  const [city, setCity] = useState("—");

  // POIs visitados + score
  const [visited, setVisited] = useState(() =>
    JSON.parse(localStorage.getItem("visited") || "{}")
  );
  const [score, setScore] = useState(() =>
    Number(localStorage.getItem("score") || 0)
  );

  // Guardar progresso
  useEffect(() => {
    localStorage.setItem("visited", JSON.stringify(visited));
  }, [visited]);

  useEffect(() => {
    localStorage.setItem("score", String(score));
  }, [score]);

  // Atualizar localização → cidade/distrito
  useEffect(() => {
    if (!position?.lat || !position?.lng) return;
    
    // Debounce para evitar muitas requisições
    const timeoutId = setTimeout(async () => {
      const region = await getRegion(position.lat, position.lng);
      setCity(region);
    }, 1000); // Aguarda 1 segundo antes de fazer a requisição
    
    return () => clearTimeout(timeoutId);
  }, [position]);

  // Recolha de POIs
  function handleCollect(poi) {
    if (!visited[poi.id]) {
      setVisited((prev) => ({ ...prev, [poi.id]: true }));
      setScore((prev) => prev + (poi.points || 0));
      navigator.vibrate?.(80);
    }
  }

  return (
    <div
      className="h-screen w-screen bg-cover bg-center flex justify-center"
      style={{ backgroundImage: "url('/assets/background.png')" }}
    >
      <div className="flex flex-col w-full max-w-4xl bg-white/90">
        <div className="flex-1 relative">

          {/* ------- MAPA ------- */}
          <MapContainer
            center={{ lat: 40.6405, lng: -8.6538 }}
            zoom={18}
            className="absolute inset-0 z-0"
            whenReady={(map) => {
              setTimeout(() => map.target.invalidateSize(), 80);
            }}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
              url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
            />

            {/* Utilizador */}
            <FlyToUser position={position} zoom={18} />
            <PlayerHeadingCone position={position} heading={heading} />
            <PlayerMarker position={position} />

            {/* Botões */}
            <CompassControl
              heading={heading}
              hasPermission={hasPermission}
              requestPermission={requestPermission}
            />
            <CenterOnMe position={position} />
            <LeaderboardButton />


            {/* POIs */}
            {POIS.map((poi) => (
              <PoiMarker
                key={poi.id}
                poi={poi}
                userPosition={position}
                visited={visited}
                onCollect={handleCollect}
              />
            ))}
          </MapContainer>


          {/* ------- TOP BAR (avatar + score + notificações GPS) ------- */}
          <div className="fixed top-0 w-full max-w-4xl z-50 pointer-events-none">
            <div className="pointer-events-auto">
              <TopBar
                score={score}
                visitedCount={Object.values(visited).filter(Boolean).length}
                totalPois={POIS.length}
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
