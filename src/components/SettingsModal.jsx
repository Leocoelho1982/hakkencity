/* eslint-disable */
import React from "react";
import { createPortal } from "react-dom";
import { FaMusic, FaVolumeMute, FaVolumeUp, FaStar, FaBan } from "react-icons/fa";
import iconClose from "../assets/bt_close.png";
import { useMusic } from "../context/MusicProvider";

export default function SettingsModal({ isOpen, onClose }) {
  const { musicMuted, sfxMuted, toggleMusic, toggleSfx, playClick } = useMusic();

  if (!isOpen) return null;

  return createPortal(
    <div
      className="fixed inset-0 bg-black/60 z-[999] flex justify-center items-center overflow-y-auto"
      onClick={() => {
        playClick();
        onClose();
      }}
    >
      <div
        className="bg-gradient-to-b from-[#FFF2CC] to-[#F2C97D] rounded-3xl p-6 w-xl m-4 border-[6px] border-[#8B5E3C] shadow-2xl relative max-w-md"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Fechar */}
        <button
          onClick={() => {
            playClick();
            onClose();
          }}
          className="absolute top-3 right-3 hover:scale-110 transition"
        >
          <img src={iconClose} className="h-7 w-7" alt="Fechar" />
        </button>

        {/* Título gamificado */}
        <h3 className="font-title text-2xl mb-6 text-[#5A2C0A] text-center bg-[#E9C27D] py-2 rounded-xl shadow-inner border-b-[3px] border-[#C89B4C]">
          Configurações
        </h3>

        {/* Toggle de Música */}
        <div className="mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <FaMusic className="text-2xl text-[#5A2C0A]" />
              <span className="font-title text-lg text-[#5A2C0A]">Música</span>
            </div>
            <button
              onClick={() => {
                playClick();
                toggleMusic();
              }}
              className={`
                relative w-16 h-8 rounded-full transition-all duration-300
                flex items-center
                ${musicMuted 
                  ? "bg-[#8B5E3C]" 
                  : "bg-gradient-to-r from-[#FFB75E] to-[#E67826]"
                }
                shadow-lg border-2 border-[#5A2C0A]
                cursor-pointer
              `}
            >
              <div
                className={`
                  absolute w-6 h-6 bg-white rounded-full
                  transition-all duration-300 shadow-md
                  flex items-center justify-center
                  ${musicMuted ? "left-1" : "right-1"}
                `}
              >
                {musicMuted ? (
                  <FaVolumeMute className="w-4 h-4 text-[#8B5E3C]" />
                ) : (
                  <FaVolumeUp className="w-4 h-4 text-[#E67826]" />
                )}
              </div>
            </button>
          </div>
        </div>

        {/* Toggle de VFX */}
        <div className="mb-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <FaStar className="text-2xl text-[#5A2C0A]" />
              <span className="font-title text-lg text-[#5A2C0A]">Efeitos Sonoros</span>
            </div>
            <button
              onClick={() => {
                playClick();
                toggleSfx();
              }}
              className={`
                relative w-16 h-8 rounded-full transition-all duration-300
                flex items-center
                ${sfxMuted 
                  ? "bg-[#8B5E3C]" 
                  : "bg-gradient-to-r from-[#FFB75E] to-[#E67826]"
                }
                shadow-lg border-2 border-[#5A2C0A]
                cursor-pointer
              `}
            >
              <div
                className={`
                  absolute w-6 h-6 bg-white rounded-full
                  transition-all duration-300 shadow-md
                  flex items-center justify-center
                  ${sfxMuted ? "left-1" : "right-1"}
                `}
              >
                {sfxMuted ? (
                  <FaBan className="w-4 h-4 text-[#8B5E3C]" />
                ) : (
                  <FaStar className="w-4 h-4 text-[#E67826]" />
                )}
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
}

