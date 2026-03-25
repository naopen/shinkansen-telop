import { useMemo } from "react";

export function useKioskMode(): boolean {
  return useMemo(() => {
    const params = new URLSearchParams(window.location.search);
    return params.has("kiosk");
  }, []);
}
