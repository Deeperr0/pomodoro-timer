import { useEffect, useRef, useState } from "react";

export function useWakeLock(enabled) {
  const wakeLockRef = useRef(null);
  const [supported, setSupported] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!("wakeLock" in navigator)) {
      setSupported(false);
      return;
    }
    setSupported(true);
  }, []);

  useEffect(() => {
    if (!enabled || supported === false) {
      if (wakeLockRef.current) {
        wakeLockRef.current.release().catch(() => {});
        wakeLockRef.current = null;
      }
      return;
    }

    let isCancelled = false;

    async function requestWakeLock() {
      try {
        const wakeLock = await navigator.wakeLock.request("screen");
        if (isCancelled) return;

        wakeLockRef.current = wakeLock;

        wakeLock.addEventListener("release", () => {
          if (!isCancelled) {
            console.log("Wake lock was released");
          }
        });
      } catch (err) {
        console.error(err);
        setError(err?.message ?? "Failed to acquire wake lock");
      }
    }

    requestWakeLock();

    const handleVisibility = () => {
      if (document.visibilityState === "visible" && enabled) {
        requestWakeLock();
      }
    };
    document.addEventListener("visibilitychange", handleVisibility);

    return () => {
      isCancelled = true;
      document.removeEventListener("visibilitychange", handleVisibility);
      if (wakeLockRef.current) {
        wakeLockRef.current.release().catch(() => {});
        wakeLockRef.current = null;
      }
    };
  }, [enabled, supported]);

  return { supported, error };
}
