"use client";
import { useState } from "react";
import CreateRoom from "../components/CreateRoom";
import JoinRoom from "../components/JoinRoom";

export default function RoomPage() {
  const [mode, setMode] = useState<"home" | "create" | "join">("home");

  return (
    <main>
      <h1 className="text-2xl font-semibold mb-4">Sorteio — Amigo Secreto</h1>
      {mode === "home" && (
        <div className="space-x-3">
          <button onClick={() => setMode("create")} className="btn">
            Criar Sorteio
          </button>
          <button onClick={() => setMode("join")} className="btn-outline">
            Entrar em Sorteio
          </button>
        </div>
      )}
      {mode === "create" && <CreateRoom onBack={() => setMode("home")} />}
      {mode === "join" && <JoinRoom onBack={() => setMode("home")} />}
    </main>
  );
}
