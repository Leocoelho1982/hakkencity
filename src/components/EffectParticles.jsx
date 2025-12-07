/* eslint-disable */
import { useCallback } from "react";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";

export default function EffectParticles({ onComplete }) {
  const particlesInit = useCallback(async engine => {
    await loadFull(engine);
  }, []);

  return (
    <Particles
      id="coinExplosion"
      init={particlesInit}
      options={{
        autoPlay: true,
        fullScreen: { enable: true, zIndex: 9999 },
        particles: {
          number: { value: 0 },
          shape: {
            type: "image",
            image: [
              {
                src: "/assets/coin.png",
                width: 32,
                height: 32
              }
            ]
          },
          opacity: { value: 1 },
          size: { value: 20 },
          move: {
            enable: true,
            speed: 6,
            direction: "none",
            outModes: "destroy"
          }
        },
        emitters: {
          autoPlay: true,
          rate: { delay: 0, quantity: 20 },
          life: { duration: 0.4, count: 1 },
          position: { x: 50, y: 50 } // centro do ecrã
        }
      }}
      detectRetina
      onClick={() => null}
      onParticlesLoaded={() => {
        setTimeout(() => onComplete?.(), 600);
      }}
    />
  );
}
