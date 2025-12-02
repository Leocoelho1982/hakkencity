import { useEffect, useState } from "react";

export default function useHeading() {
  const [heading, setHeading] = useState(null);
  const [hasPermission, setHasPermission] = useState(false);

  // 1. Pedir permissão no iOS
  useEffect(() => {
    if (
      typeof DeviceOrientationEvent !== "undefined" &&
      typeof DeviceOrientationEvent.requestPermission === "function"
    ) {
      DeviceOrientationEvent.requestPermission()
        .then((resp) => {
          if (resp === "granted") setHasPermission(true);
        })
        .catch(console.error);
    } else {
      setHasPermission(true);
    }
  }, []);

  // 2. Listener universal (Android + iOS)
  useEffect(() => {
    if (!hasPermission) return;

    const handle = (event) => {
      let h = null;

      // 💙 iOS — usa a bússola nativa
      if (event.webkitCompassHeading != null) {
        h = event.webkitCompassHeading;
      }

      // 💚 Android Chrome — usa alpha
      else if (event.alpha != null) {
        h = 360 - event.alpha; // inverter sentido
      }

      if (h != null && !isNaN(h)) {
        setHeading(h);
      }
    };

    window.addEventListener("deviceorientation", handle, true);
    return () => window.removeEventListener("deviceorientation", handle, true);
  }, [hasPermission]);

  return { heading, hasPermission };
}
