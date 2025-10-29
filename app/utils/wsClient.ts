import { useEffect, useRef } from "react";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function useWs(onMessage: (data: any) => void) {
  const wsRef = useRef<WebSocket | null>(null);

  useEffect(() => {
    const url = process.env.NEXT_PUBLIC_WS_URL || "ws://localhost:3000";
    const ws = new WebSocket(url);
    wsRef.current = ws;

    ws.onopen = () => console.log("ws open");
    ws.onmessage = (e) => {
      try {
        const data = JSON.parse(e.data);
        onMessage(data);
      } catch (err) {
        console.error("invalid payload", err);
      }
    };
    ws.onclose = () => console.log("ws closed");
    ws.onerror = (err) => console.error("ws error", err);

    return () => {
      ws.close();
    };
  }, [onMessage]);

  return wsRef;
}
