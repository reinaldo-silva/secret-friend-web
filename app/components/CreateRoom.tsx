"use client";
import { FormEvent, useCallback, useEffect, useRef, useState } from "react";
import { generateId, saveAdminMapping } from "../utils";
import { Room, User } from "../interfaces/user";

export default function CreateRoom({ onBack }: { onBack: () => void }) {
  const admin = { id: generateId("p_"), name: "Admin" };
  const [room, setRoom] = useState<Room>({
    admin,
    participants: [admin],
    slug: generateId("room_"),
  });

  const wsRef = useRef<WebSocket | null>(null);

  const roomId = room.slug;

  const handleMessage = useCallback(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (data: any) => {
      if (data.type === "room_created") {
        console.log("Sala criada com sucesso", data);
      }
      if (data.type === "joined") {
        console.log("Você entrou na sala", data);
      }
      if (data.type === "participant_added") {
        setRoom((prev) => {
          if (prev.participants.find((p) => p.id === data.participant.id)) {
            return prev;
          }
          return {
            ...prev,
            participants: [...prev.participants, data.participant],
          };
        });
      }
      if (data.type === "draw_result_admin") {
        saveAdminMapping(roomId, data.mapping);
        alert("Sorteio realizado. Mapeamento salvo no seu localStorage.");
      }
      if (data.type === "error") {
        alert("Erro: " + data.message);
      }
    },
    [roomId]
  );

  useEffect(() => {
    const url = process.env.NEXT_PUBLIC_WS_URL || "ws://localhost:3333";
    const ws = new WebSocket(url);
    wsRef.current = ws;
    ws.onmessage = (e) => {
      const d = JSON.parse(e.data);
      handleMessage(d);
    };
    return () => ws.close();
  }, [handleMessage]);

  function create(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const roomName = formData.get("roomName")?.toString().trim() || undefined;

    const payload = {
      type: "create_room",
      roomId: room.slug,
      roomName,
      adminId: room.admin.id,
      adminName: room.admin.name,
    };

    setRoom((prev) => ({ ...prev, name: roomName, cretedAt: new Date() }));

    console.log(payload);

    wsRef.current?.send(JSON.stringify(payload));
  }

  function addManual() {
    const pid = generateId("p_");
    const pname = prompt("Nome do participante") || "Pessoa";
    const payload = {
      type: "add_participant",
      roomId: room.slug,
      adminId: room.admin.id,
      participantId: pid,
      name: pname,
    };

    const newParticipant: User = { id: pid, name: pname };
    setRoom((prev) => ({
      ...prev,
      participants: [...prev.participants, newParticipant],
    }));

    console.log(payload);

    wsRef.current?.send(JSON.stringify(payload));
  }

  function startDraw() {
    const payload = {
      type: "start_draw",
      roomId: room.slug,
      adminId: room.admin.id,
    };
    wsRef.current?.send(JSON.stringify(payload));
  }

  return (
    <div className="mt-6 space-y-4">
      <button onClick={onBack} className="text-sm underline">
        ← voltar
      </button>

      <div className="p-4 bg-white rounded shadow">
        <form onSubmit={create}>
          <div className="text-sm text-zinc-600">
            Room ID: <strong>{room.slug}</strong>
          </div>
          <label className="block text-sm mb-1">
            Nome do sorteio (opcional)
          </label>
          <input
            disabled={!!room.cretedAt}
            className="input"
            name="roomName"
            type="text"
          />
          <div className="mt-3">
            <button type="submit" className="btn" disabled={!!room.cretedAt}>
              Criar sala
            </button>
          </div>
        </form>

        {room.cretedAt && (
          <div className="mt-4">
            <div className="text-sm text-zinc-600">
              Room ID: <strong>{room.slug}</strong>
            </div>
            <div className="mt-2">
              <button onClick={addManual} className="btn-outline mr-2">
                Adicionar participante manualmente
              </button>
              <button onClick={startDraw} className="btn">
                Iniciar Sorteio
              </button>
            </div>

            <div className="mt-3">
              <h4 className="font-medium">Participantes</h4>
              <ul className="mt-2 space-y-1">
                {room.participants.map((p) => (
                  <li key={p.id} className="text-sm">
                    {p.name} {p.id === room.admin.id ? "(admin)" : ""}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
