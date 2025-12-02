import { useEffect, useState } from "react";

export default function useHeading() {
  const [heading, setHeading] = useState(null);
  const [hasPermission, setHasPermission] = useState(null);

  function onOrientation(e) {
    let h = null;
    if (typeof e.webkitCompassHeading === "number") {
      h = e.webkitCompassHeading;
    } else if (typeof e.alpha === "number") {
      h = 360 - e.alpha;
    }
    if (h != null) setHeading((h % 360 + 360) % 360);
  }

  useEffect(() => {
    const Sensor = window.DeviceOrientationEvent;
    if (!Sensor) { setHasPermission(false); return; }

    // ANDROID — funciona sem permissão
    if (typeof Sensor.requestPermission !== "function") {
      window.addEventListener("deviceorientation", onOrientation, true);
      setHasPermission(true);
      return () =>
        window.removeEventListener("deviceorientation", onOrientation, true);
    }

    // iOS — precisa de clique
    setHasPermission(false);
  }, []);

  const requestPermission = async () => {
    const Sensor = window.DeviceOrientationEvent;
    if (Sensor?.requestPermission) {
      const res = await Sensor.requestPermission();
      if (res === "granted") {
        window.addEventListener("deviceorientation", onOrientation, true);
        setHasPermission(true);
      }
    }
  };

  return { heading, hasPermission, requestPermission };
}
