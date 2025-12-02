import React from "react";

export default function CompassControl({ heading, hasPermission, requestPermission }) {
  return (
    <div
      style={{
        position: "absolute",
        top: "140px",
        left: "10px",
        zIndex: 9999,
        background: "white",
        padding: "8px 12px",
        borderRadius: "12px",
        boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
        display: "flex",
        alignItems: "center",
        gap: "8px",
      }}
    >
      {hasPermission === false ? (
        <button
          onClick={requestPermission}
          style={{
            background: "#2563eb",
            color: "white",
            padding: "6px 10px",
            borderRadius: "8px",
            border: "none",
            fontSize: "12px",
            cursor: "pointer",
          }}
        >
          Ativar bússola
        </button>
      ) : (
        <span style={{ fontSize: "14px", fontWeight: "bold" }}>
          {heading != null ? `${Math.round(heading)}°` : "—"}
        </span>
      )}
    </div>
  );
}
