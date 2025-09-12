import { useEffect, useState } from "react";

export default function useGeolocation() {
  const [position, setPosition] = useState(null);
  const [accuracy, setAccuracy] = useState(null);
  const [speed, setSpeed] = useState(null);
  const [msg, setMsg] = useState("À procura do GPS...");

  useEffect(() => {
    if (!navigator.geolocation) {
      setMsg("Geolocalização não suportada");
      return;
    }

    const watcher = navigator.geolocation.watchPosition(
      (pos) => {
        setPosition({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        });
        setAccuracy(pos.coords.accuracy);
        setSpeed(pos.coords.speed);
        setMsg("GPS ativo");
      },
      (err) => {
        console.error("Erro no GPS:", err);
        setMsg("Erro ao obter localização");
      },
      { enableHighAccuracy: true, maximumAge: 10000, timeout: 20000 }
    );

    return () => navigator.geolocation.clearWatch(watcher);
  }, []);

  return { position, accuracy, speed, msg };
}
