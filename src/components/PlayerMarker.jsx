import React from "react";
import { Marker } from "react-leaflet";
import L from "leaflet";
import { renderToStaticMarkup } from "react-dom/server";
import { useSelector } from "react-redux";
import avatarFallback from "../assets/avatars/avatar1.jpg"; // caso não haja imagem

function makePinIcon({ size = 48, image }) {
  const html = renderToStaticMarkup(
    <div className="player-pin" style={{ width: size, height: size + 16 }}>
      <div
        className="player-pin-avatar"
        style={{ width: size, height: size }}
      >
        <img src={image || avatarFallback} alt="avatar" />
        <div className="player-pin-ring" />
      </div>
      <div className="player-pin-tail" />
    </div>
  );

  return L.divIcon({
    className: "player-icon",
    html,
    iconSize: [size, size + 16],
    iconAnchor: [size / 2, size + 16],
    popupAnchor: [0, -size / 2],
  });
}

export default function PlayerMarker({ position }) {
  const image = useSelector((state) => state.user.image);

  if (!position) return null;

  return (
    <Marker
      position={position}
      icon={makePinIcon({ image })}
    />
  );
}
