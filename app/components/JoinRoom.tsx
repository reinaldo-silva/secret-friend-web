"use client";
import { FormEvent, useEffect, useRef, useState } from "react";
import { User } from "../interfaces/user";
import { generateId } from "../utils";

export default function JoinRoom({ onBack }: { onBack: () => void }) {
  const [roomId, setRoomId] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);

  const [myMatch, setMyMatch] = useState<User | null>(null);
  const wsRef = useRef<WebSocket | null>(null);

  useEffect(() => {
    const url = process.env.NEXT_PUBLIC_WS_URL || "ws://localhost:3000";
    const ws = new WebSocket(url);
    wsRef.current = ws;
    ws.onmessage = (e) => {
      const data = JSON.parse(e.data);
      if (data.type === "joined") {
        console.log("Você entrou na sala");
      }
      if (data.type === "your_match") {
        setMyMatch(data.match);
      }
      if (data.type === "participant_added") {
        console.log("alguem entrou na sala", { data });
      }
      if (data.type === "error") alert("Erro: " + data.message);
    };
    return () => ws.close();
  }, [user?.id]);

  function join(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const name = formData.get("name")?.toString().trim() || undefined;
    const roomId = formData.get("roomId")?.toString().trim() || "";

    const payload = {
      type: "join_room",
      roomId,
      clientId: generateId("p_"),
      name: name,
    };

    setUser({ id: payload.clientId, name: name || "Guest" });
    setRoomId(roomId);
    wsRef.current?.send(JSON.stringify(payload));
  }

  return (
    <div className="mt-6">
      <button onClick={onBack} className="text-sm underline">
        ← voltar
      </button>
      <div className="p-4 bg-white rounded shadow mt-2">
        <form onSubmit={join}>
          <label className="block text-sm mb-1">Room ID</label>
          <input className="input" name="roomId" disabled={!!roomId} />
          <label className="block text-sm mt-2 mb-1">Seu nome</label>
          <input className="input" name="name" disabled={!!roomId} />
          <div className="mt-3">
            <button type="submit" className="btn" disabled={!!roomId}>
              Entrar
            </button>
          </div>
        </form>

        {roomId && user && <p className="mt-4">Entrou na sala {roomId}</p>}

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
