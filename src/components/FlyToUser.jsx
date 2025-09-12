// src/components/FlyToUser.jsx
import { useEffect, useRef } from "react";
import { useMap } from "react-leaflet";

export default function FlyToUser({ position, zoom = 18 }) {
  const map = useMap();
  const doneRef = useRef(false); // marca se já centramos uma vez

  useEffect(() => {
    if (!position) return;
    if (doneRef.current) return;           // já centrado → não faz nada
    map.flyTo([position.lat, position.lng], zoom, { duration: 1.2 });
    doneRef.current = true;                 // marca como feito
  }, [position, zoom, map]);

  return null;
}
