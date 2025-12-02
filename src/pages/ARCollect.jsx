import { useEffect } from "react";
import "mind-ar/dist/mindar-image.prod.js";
import "mind-ar/dist/mindar-image.css";
import { useNavigate, useParams } from "react-router-dom";
import coinImg from "../assets/coin.png";

export default function ARCollect({ onCollected }) {
  const navigate = useNavigate();
  const { poiId } = useParams();

  function handleCollected() {
    if (onCollected) onCollected(poiId);
    navigate(-1); // volta para o mapa
  }

  useEffect(() => {
    const scene = document.querySelector("a-scene");

    scene.addEventListener("click", () => {
      console.log("Moeda clicada, recolhendo…");
      handleCollected();
    });
  }, []);

  return (
    <div className="w-screen h-screen bg-black">
      <a-scene
        mindar-image="imageTargetSrc: /targets/moeda.mind;"
        vr-mode-ui="enabled: false"
        device-orientation-permission-ui="enabled: true"
        embedded
      >
        <a-assets>
          <img id="coinTexture" src={coinImg} alt="coin" />
        </a-assets>

        <a-camera position="0 0 0" look-controls="enabled: false"></a-camera>

        {/* Moeda que aparece quando o alvo é detectado */}
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
