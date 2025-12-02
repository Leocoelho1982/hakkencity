import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function ARCollect({ onCollected }) {
  const navigate = useNavigate();
  const { poiId } = useParams();

  // Receber mensagens vindas do iframe (AR)
  useEffect(() => {
    function onMessage(ev) {
      if (ev.data?.type === "COLLECT_COIN") {
        console.log("Moeda recolhida!", poiId);

        if (onCollected) onCollected(poiId);

        // Voltar para o mapa após recolher
        navigate("/map");
      }
    }

    window.addEventListener("message", onMessage);
    return () => window.removeEventListener("message", onMessage);
  }, [navigate, onCollected, poiId]);

  return (
    <div style={{ width: "100vw", height: "100vh", position: "relative" }}>
      
      {/* Botão fechar */}
      <button
        onClick={() => navigate("/map")}
        style={{
          position: "absolute",
          top: 20,
          left: 20,
          zIndex: 9999,
          background: "rgba(0,0,0,0.6)",
          color: "white",
          border: "none",
          padding: "10px 16px",
          borderRadius: "12px",
          fontSize: "16px",
        }}
      >
        Voltar
      </button>

      {/* Iframe AR */}
      <iframe
        src="/ar/index.html"
        allow="camera; fullscreen"
        style={{
          width: "100vw",
          height: "100vh",
          border: "none",
        }}
      />
    </div>
  );
}
