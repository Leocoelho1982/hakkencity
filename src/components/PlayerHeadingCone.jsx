import { useMemo } from "react";
import { Polygon } from "react-leaflet";

export default function PlayerHeadingCone({ position, heading }) {
  if (!position?.lat || !position?.lng || heading == null) return null;

  // ângulo de abertura do cone
  const angle = 50; // graus
  const distance = 0.00025; // quão comprido é o cone

  const rad = (deg) => (deg * Math.PI) / 180;

  const conePoints = useMemo(() => {
    const base = { lat: position.lat, lng: position.lng };
    const left = {
      lat: base.lat + Math.cos(rad(heading - angle / 2)) * distance,
      lng: base.lng + Math.sin(rad(heading - angle / 2)) * distance,
    };
    const right = {
      lat: base.lat + Math.cos(rad(heading + angle / 2)) * distance,
      lng: base.lng + Math.sin(rad(heading + angle / 2)) * distance,
    };

    return [base, left, right];
  }, [position, heading]);

  return (
    <Polygon
      pathOptions={{
        color: "rgba(0, 150, 255, 0.9)",
        fillColor: "rgba(0, 150, 255, 0.4)",
        weight: 0,
      }}
      positions={conePoints}
    />
  );
}
