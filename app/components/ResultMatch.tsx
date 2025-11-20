"use client";

import { Gift } from "lucide-react";
import { useWebSocket } from "../contexts/WebsocketContext";
import { Loader } from "./Loader";
import ScratchReveal from "./ScratchReveal";
import { Text } from "./ui/Text";
import { InfoCard } from "./ui/InfoCard";

export function ResultMatch() {
  const { myMatch, currentUser } = useWebSocket();

  if (!myMatch) {
    return <Loader />;
  }

  return (
    <div className="flex flex-col items-center w-full max-w-xl gap-4">
      <div className="size-12 rounded-xl flex items-center justify-center bg-gradient text-zinc-50 animate-bounce">
        <Gift className="size-6" />
      </div>
      <Text size="lg">
        <span className="font-semibold">{currentUser?.name}</span>, seu amigo
        secreto é...{" "}
      </Text>

      <ScratchReveal name={myMatch.name} />

      <InfoCard
        description="Salve ou registre o nome do seu amigo secreto, já que as informações podem não ficar acessíveis posteriormente."
        title="Atenção"
      />
    </div>
  );
}
