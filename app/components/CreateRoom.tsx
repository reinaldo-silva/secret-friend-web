"use client";
import { FormEvent } from "react";
import { useWebSocket } from "../contexts/WebsocketContext";
import { User } from "../interfaces/user";
import { generateId } from "../utils";

export default function CreateRoom({ onBack }: { onBack: () => void }) {
  const { sendMessage, room, handleCreateRoom, addParticipantInRoom } =
    useWebSocket();

  function create(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const roomName = formData.get("roomName")?.toString().trim() || undefined;

    const { slug, admin } = handleCreateRoom(roomName || "");

    const payload = {
      type: "create_room",
      roomId: slug,
      roomName,
      adminId: admin.id,
      adminName: admin.name,
    };

    sendMessage(payload);
  }

  function addManual() {
    if (!room) return;

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

    addParticipantInRoom(newParticipant);
    sendMessage(payload);
  }

  function startDraw() {
    if (!room) return;

    const payload = {
      type: "start_draw",
      roomId: room.slug,
      adminId: room.admin.id,
    };
    sendMessage(payload);
  }

  return (
    <div className="mt-6 space-y-4">
      <button onClick={onBack} className="text-sm underline">
        ← voltar
      </button>

      <div className="p-4 bg-white rounded shadow">
        <form onSubmit={create}>
          <label className="block text-sm mb-1">
            Nome do sorteio (opcional)
          </label>
          <input
            disabled={!!room}
            className="input"
            name="roomName"
            type="text"
          />
          <div className="mt-3">
            <button type="submit" className="btn" disabled={!!room}>
              Criar sala
            </button>
          </div>
        </form>

        {room && (
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
