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
    const target = document.querySelector("[mindar-image-target]");
    if (!target) return;

    // Quando o target é encontrado → ativa a moeda
    target.addEventListener("targetFound", () => {
      console.log("TARGET FOUND");
    });

    // Ao clicar diretamente na moeda
    target.addEventListener("click", () => {
      console.log("Moeda clicada!");
      handleCollected();
    });
  }, []);

  return (
    <div className="w-screen h-screen bg-black">
      <a-scene
        mindar-image="imageTargetSrc: /targets/coin.mind;"
        vr-mode-ui="enabled: false"
        device-orientation-permission-ui="enabled: true"
        embedded
      >
        <a-assets>
          <img id="coinTexture" src={coinImg} alt="coin" />
        </a-assets>

        {/* CÂMERA CORRETA DO MINDAR */}
        <a-camera mindar-image-camera></a-camera>

        {/* MOEDA VINCULADA AO TARGET */}
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
