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
    const scene = document.querySelector("a-scene");
    if (!scene) return;

    // clicar em qualquer parte do target recolhe a moeda
    scene.addEventListener("click", () => {
      console.log("Moeda clicada, recolhendo…");
      handleCollected();
    });
  }, []);

  return (
    <div className="w-screen h-screen bg-black">
      <a-scene
        mindar-image="imageTargetSrc: /targets/coin.mind;"
        color-space="sRGB"
        renderer="colorManagement: true; physicallyCorrectLights: true"
        vr-mode-ui="enabled: false"
        device-orientation-permission-ui="enabled: true"
        embedded
      >
        <a-assets>
          <img id="coinTexture" src={coinImg} alt="coin" />
        </a-assets>

        <a-camera position="0 0 0" look-controls="enabled: false"></a-camera>

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
