"use client";

import { useWebSocket } from "../contexts/WebsocketContext";

export function ResultMatch() {
  const { room, myMatch } = useWebSocket();

  console.log(room);

  return <div>Seu amigo secreto é o {myMatch?.name}</div>;
}
