import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import coinImg from "../assets/coin.png";

export default function ARCollect({ onCollected }) {
  const navigate = useNavigate();
  const { poiId } = useParams();

  function handleCollected() {
    if (onCollected) onCollected(poiId);
    navigate(-1);
  }

  useEffect(() => {
    const btn = document.getElementById("start-ar");

    btn.addEventListener("click", () => {
      btn.style.display = "none";

      const scene = document.querySelector("a-scene");
      scene.style.display = "block";
    });
  }, []);

  return (
    <div className="w-screen h-screen bg-black relative">

      {/* Botão obrigatório para o iPhone permitir a câmera */}
      <button
        id="start-ar"
        className="absolute z-50 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 
                   bg-gold-100 text-marron-100 px-8 py-4 rounded-2xl font-title shadow-xl"
      >
        Iniciar AR
      </button>

      {/* Cena começa ocultada até o usuário clicar */}
      <a-scene
        style={{ display: "none" }}
        mindar-image="imageTargetSrc: /targets/coin.mind;"
        color-space="sRGB"
        embedded
        vr-mode-ui="enabled: false"
        device-orientation-permission-ui="enabled: true"
      >
        <a-assets>
          <img id="coinTexture" src={coinImg} alt="coin" />
        </a-assets>

        {/* CÂMERA CORRETA DO MINDAR */}
        <a-camera mindar-image-camera></a-camera>

        {/* MOEDA LIGADA AO TARGET */}
        <a-entity
          mindar-image-target="targetIndex: 0"
          geometry="primitive: circle; radius: 0.35"
          material="src: #coinTexture"
          position="0 0 0"
        ></a-entity>

      </a-scene>
    </div>
  );
}
