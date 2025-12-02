import React from "react";
import { Marker } from "react-leaflet";
import L from "leaflet";
import { renderToStaticMarkup } from "react-dom/server";
import { useSelector } from "react-redux";
import avatarFallback from "../assets/avatars/avatar1.jpg";

function makeCircleIcon({ size = 48, image }) {
  const html = renderToStaticMarkup(
    <div
      style={{
        width: size,
        height: size,
        borderRadius: "50%",
        overflow: "hidden",
        border: "3px solid #fff",
        boxShadow: "0 0 10px rgba(0,0,0,0.3)",
        backgroundColor: "#fff",
      }}
    >
      <img
        src={image || avatarFallback}
        alt="avatar"
        style={{ width: "100%", height: "100%", objectFit: "cover" }}
      />
    </div>
  );

  return L.divIcon({
    className: "",
    html,
    iconSize: [size, size],
    iconAnchor: [size / 2, size / 2],  // 👈 AGORA O CENTRO É O ANCORAMENTO
  });
}

export default function PlayerMarker({ position }) {
  const image = useSelector((state) => state.user.image);

  if (!position) return null;

  return <Marker position={position} icon={makeCircleIcon({ image })} />;
}
