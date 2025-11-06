"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import CreateRoom from "../components/CreateRoom";
import JoinRoom from "../components/JoinRoom";
import { Button } from "../components/ui/Button";
import { LocalStorage } from "../utils/localstorage";

const localStorage = new LocalStorage();

export default function RoomPage() {
  const router = useRouter();
  const [mode, setMode] = useState<"home" | "create" | "join">("home");

  const handleLeaveApp = () => {
    localStorage.remove("localUser");
    router.push("/");
  };

  return (
    <main className="flex-1">
      <h1 className="text-2xl font-semibold mb-4">Sorteio — Amigo Secreto</h1>
      {mode === "home" && (
        <div className="space-x-3">
          <button onClick={() => setMode("create")} className="btn">
            Criar Sorteio
          </button>
          <button onClick={() => setMode("join")} className="btn-outline">
            Entrar em Sorteio
          </button>

          <Button onClick={handleLeaveApp} type="button">
            Sair
          </Button>
        </div>
      )}
      {mode === "create" && <CreateRoom onBack={() => setMode("home")} />}
      {mode === "join" && <JoinRoom onBack={() => setMode("home")} />}
    </main>
  );
}
