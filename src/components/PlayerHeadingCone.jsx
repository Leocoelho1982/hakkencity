import { useMemo } from "react";
import { Polygon } from "react-leaflet";

export default function PlayerHeadingCone({ position, heading }) {
  if (!position?.lat || !position?.lng) return null;
  if (heading == null || isNaN(heading)) return null;

  const angle = 70;      // abertura estilo Google Maps
  const distance = 0.00045; // comprimento (~50m em zoom 18)

  const rad = (deg) => (deg * Math.PI) / 180;

  const conePoints = useMemo(() => {
    const base = [position.lat, position.lng];

    const left = [
      position.lat + Math.cos(rad(heading - angle / 2)) * distance,
      position.lng + Math.sin(rad(heading - angle / 2)) * distance,
    ];

    const right = [
      position.lat + Math.cos(rad(heading + angle / 2)) * distance,
      position.lng + Math.sin(rad(heading + angle / 2)) * distance,
    ];

    return [base, left, right];
  }, [position, heading]);

  return (
    <Polygon
      positions={conePoints}
      pathOptions={{
        color: "rgba(0, 150, 255, 0.8)",
        fillColor: "rgba(0, 150, 255, 0.35)",
        fillOpacity: 0.35,
        weight: 0,
      }}
    />
  );
}
