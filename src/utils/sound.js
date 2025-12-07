// src/utils/sound.js
import { Howl } from "howler";

export const coinSound = new Howl({
  src: ["/sounds/coin.mp3"],
  volume: 0.5,
});

let audioUnlocked = false;

/**
 * Desbloqueia o áudio — necessário em Chrome/Safari mobile
 */
function unlockAudio() {
  if (audioUnlocked) return;

  // tenta tocar 1ms de áudio e parar logo
  try {
    coinSound.play();
    coinSound.stop();
    audioUnlocked = true;
    console.log("🔊 Audio desbloqueado!");
  } catch (e) {
    console.warn("⚠ Falha ao desbloquear áudio:", e);
  }
}

// Executa no primeiro gesto de utilizador
if (typeof window !== "undefined") {
  const unlockHandler = () => {
    unlockAudio();
    window.removeEventListener("click", unlockHandler);
    window.removeEventListener("touchstart", unlockHandler);
  };

  window.addEventListener("click", unlockHandler);
  window.addEventListener("touchstart", unlockHandler);
}
