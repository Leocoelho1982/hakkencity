import React from "react";

export default function RoundFloatingButton({
  onClick,
  icon,
  className = "",
  style = {},
}) {
  return (
    <button
      onClick={onClick}
      className={`
        flex items-center justify-center
        w-14 h-14 rounded-full
        bg-gold-100
        shadow-lg shadow-[rgba(0,0,0,0.25)]
        border-4 border-marron-100
        active:scale-95 transition
        ${className}
      `}
      style={style}
    >
      {icon}
    </button>
  );
}
