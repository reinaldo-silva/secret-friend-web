"use client";
import { useEffect, useRef, useState } from "react";
import { generateId } from "../utils";

interface User {
  id: string;
  name: string;
}

export default function JoinRoom({ onBack }: { onBack: () => void }) {
  const [roomId, setRoomId] = useState("");
  const [name, setName] = useState("");
  const [myMatch, setMyMatch] = useState<User | null>(null);
  const clientIdRef = useRef(generateId("p_"));
  const wsRef = useRef<WebSocket | null>(null);

  useEffect(() => {
    const url = process.env.NEXT_PUBLIC_WS_URL || "ws://localhost:3000";
    const ws = new WebSocket(url);
    wsRef.current = ws;
    ws.onmessage = (e) => {
      const data = JSON.parse(e.data);
      if (data.type === "joined") {
        // ignore
      }
      if (data.type === "your_match") {
        setMyMatch(data.match);
      }
      if (data.type === "participant_added") {
        // ignore
      }
      if (data.type === "error") alert("Erro: " + data.message);
    };
    return () => ws.close();
  }, []);

  function join() {
    const payload = {
      type: "join_room",
      roomId,
      clientId: clientIdRef.current,
      name: name || "Participante",
    };
    wsRef.current?.send(JSON.stringify(payload));
  }

  return (
    <div className="mt-6">
      <button onClick={onBack} className="text-sm underline">
        ← voltar
      </button>
      <div className="p-4 bg-white rounded shadow mt-2">
        <label className="block text-sm mb-1">Room ID</label>
        <input
          className="input"
          value={roomId}
          onChange={(e) => setRoomId(e.target.value)}
        />
        <label className="block text-sm mt-2 mb-1">Seu nome</label>
        <input
          className="input"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <div className="mt-3">
          <button onClick={join} className="btn">
            Entrar
          </button>
        </div>

        {myMatch && (
          <div className="mt-4 p-3 bg-zinc-50 rounded">
            <h4 className="font-medium">Seu amigo secreto:</h4>
            <div className="mt-2">{myMatch.name}</div>
          </div>
        )}
      </div>
    </div>
  );
}
