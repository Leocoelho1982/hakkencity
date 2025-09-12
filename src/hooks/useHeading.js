import { useEffect, useState } from "react";

export default function useHeading() {
  const [heading, setHeading] = useState(null);
  const [hasPermission, setHasPermission] = useState(false);

  useEffect(() => {
    // iOS 13+ pede permissão explícita
    if (typeof DeviceOrientationEvent !== "undefined" &&
        typeof DeviceOrientationEvent.requestPermission === "function") {
      DeviceOrientationEvent.requestPermission()
        .then((resp) => {
          if (resp === "granted") setHasPermission(true);
        })
        .catch(console.error);
    } else {
      setHasPermission(true);
    }
  }, []);

  useEffect(() => {
    if (!hasPermission) return;

    const handleOrientation = (event) => {
      if (event.absolute && event.alpha != null) {
        setHeading(event.alpha); // 0–360 graus
      }
    };

    window.addEventListener("deviceorientationabsolute", handleOrientation, true);
    return () =>
      window.removeEventListener("deviceorientationabsolute", handleOrientation, true);
  }, [hasPermission]);

  return { heading, hasPermission };
}
