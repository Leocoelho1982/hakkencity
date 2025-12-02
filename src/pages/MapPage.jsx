import { useEffect, useState } from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import { useSelector } from "react-redux";
import Leaderboard from "../components/Leaderboard";
import PlayerMarker from "../components/PlayerMarker";
import PoiMarker from "../components/PoiMarker";
import TopBar from "../components/TopBar";
// import BottomBar from "../components/BottomBar";
import FlyToUser from "../components/FlyToUser";

import useGeolocation from "../hooks/useGeolocation";
import useHeading from "../hooks/useHeading";
import { POIS } from "../data/pois";
import PlayerHeadingCone from "../components/PlayerHeadingCone";
import CompassControl from "../components/CompassControl";
import CenterOnMe from "../components/CenterOnMe";

// Função auxiliar para buscar distrito/cidade
async function getRegion(lat, lng) {
  const res = await fetch(
    `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&zoom=10&addressdetails=1`
  );
  const data = await res.json();
  return data.address.state || data.address.county || data.address.city || "—";
}

export default function MapPage() {
  const { position, msg } = useGeolocation();
  const { heading, hasPermission, requestPermission } = useHeading();
  const avatar = useSelector((state) => state.user.image);
  //const [leaderboardOpen, setLeaderboardOpen] = useState(false);

  const [city, setCity] = useState("—"); // 👈 estado para região/cidade


  console.log("HEADING ATUAL:", heading);



  // visited + score com persistência
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

  // Atualiza cidade/distrito sempre que a posição muda
  useEffect(() => {
    async function fetchRegion() {
      if (position?.lat && position?.lng) {
        try {
          const region = await getRegion(position.lat, position.lng);
          setCity(region);
        } catch (err) {
          console.error("Erro ao buscar região:", err);
        }
      }
    }
    fetchRegion();
  }, [position]);

  function handleCollect(poi) {
    if (!visited[poi.id]) {
      setVisited((prev) => ({ ...prev, [poi.id]: true }));
      setScore((prev) => prev + (poi.points || 0));
      if (navigator.vibrate) navigator.vibrate(80);
    }
  }

  return (
    <div
      className="h-screen w-screen bg-cover bg-center flex justify-center"
      style={{ backgroundImage: "url('/assets/background.png')" }}
    >
      <div className="flex flex-col w-full max-w-4xl bg-white/90">
        <div className="flex-1 relative">
          {/* Mapa */}
          <MapContainer
            center={{ lat: 40.6405, lng: -8.6538 }}
            zoom={18}
            whenReady={(map) => {
              setTimeout(() => map.target.invalidateSize(), 50);
            }}
            className="absolute inset-0 z-0"
          >

            <TileLayer
              attribution="&copy; OpenStreetMap"
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            <FlyToUser position={position} zoom={18} />
            <PlayerHeadingCone position={position} heading={heading} />
            <PlayerMarker position={position} />
            <CompassControl heading={heading}  hasPermission={hasPermission}  requestPermission={requestPermission}/>
            <CenterOnMe position={position} />

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

          
          


          {/* TopBar fixo em cima */}
          <div className="fixed top-0  w-full max-w-4xl z-50 pointer-events-none">
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
