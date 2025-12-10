import React, { createContext, useContext, useEffect, useRef, useState } from "react";
import { Howl } from "howler";

const MusicContext = createContext(null);

export function MusicProvider({ children }) {
  const audioRef = useRef(null);
  const clickRef = useRef(null);
  const coinRef = useRef(null);

  const [musicMuted, setMusicMuted] = useState(() => {
    const saved = localStorage.getItem("bgmMuted");
    return saved === "true";
  });
  const [sfxMuted, setSfxMuted] = useState(() => {
    const saved = localStorage.getItem("sfxMuted");
    return saved === "true";
  });

  // Criar áudio uma única vez
  useEffect(() => {
    const audio = new Audio("/sounds/introsong.mp3");
    audio.loop = true;
    audio.volume = 0.4;
    audio.muted = musicMuted;
    audioRef.current = audio;

    const tryPlay = async () => {
      if (audio.muted) return;
      try {
        await audio.play();
      } catch (e) {
        console.warn("Não foi possível iniciar a música de fundo", e);
      }
    };

    tryPlay();

    return () => {
      audio.pause();
      audioRef.current = null;
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Reage a mudanças de mute da música
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.muted = musicMuted;
    localStorage.setItem("bgmMuted", String(musicMuted));

    if (musicMuted) {
      audio.pause();
    } else {
      audio.play().catch((e) =>
        console.warn("Não foi possível retomar a música de fundo", e)
      );
    }
  }, [musicMuted]);

  // Sons de efeitos (clique, moeda)
  useEffect(() => {
    clickRef.current = new Howl({
      src: ["/sounds/popclick.mp3"],
      volume: 0.3,
    });

    coinRef.current = new Howl({
      src: ["/sounds/coin.mp3"],
      volume: 0.5,
    });

    return () => {
      clickRef.current = null;
      coinRef.current = null;
    };
  }, []);

  useEffect(() => {
    localStorage.setItem("sfxMuted", String(sfxMuted));
    // Howler has global mute, but here we mute per sound for clarity
    clickRef.current?.mute(sfxMuted);
    coinRef.current?.mute(sfxMuted);
  }, [sfxMuted]);

  const toggleMusic = () => setMusicMuted((prev) => !prev);
  const toggleSfx = () => setSfxMuted((prev) => !prev);

  const playClick = () => {
    if (sfxMuted) return;
    clickRef.current?.play();
  };

  const playCoin = () => {
    if (sfxMuted) return;
    coinRef.current?.play();
  };

  return (
    <MusicContext.Provider
      value={{
        musicMuted,
        toggleMusic,
        sfxMuted,
        toggleSfx,
        playClick,
        playCoin,
      }}
    >
      {children}
    </MusicContext.Provider>
  );
}

export function useMusic() {
  const ctx = useContext(MusicContext);
  if (!ctx) throw new Error("useMusic deve ser usado dentro de MusicProvider");
  return ctx;
}

