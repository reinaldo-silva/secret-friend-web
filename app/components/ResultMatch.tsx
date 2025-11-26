"use client";

import { Gift } from "lucide-react";
import { useParams, useSearchParams } from "next/navigation";
import { useEffect, useEffectEvent } from "react";
import { SERVER_STATUS, useWebSocket } from "../contexts/WebsocketContext";
import { Loader } from "./Loader";
import ScratchReveal from "./ScratchReveal";
import { InfoCard } from "./ui/InfoCard";
import { Text } from "./ui/Text";

export function ResultMatch() {
  const { result, sendMessage, status } = useWebSocket();
  const tokenParam = useSearchParams().get("token");
  const { slug } = useParams();

  const getResult = useEffectEvent(() => {
    sendMessage({
      type: "get_result_by_token",
      roomId: slug,
      token: tokenParam,
    });
  });

  useEffect(() => {
    if (status === SERVER_STATUS.ALIVE) {
      getResult();
    }
  }, [status]);

  if (!result) {
    return <Loader />;
  }

  return (
    <div className="flex flex-col items-center w-full max-w-xl gap-4">
      <div className="size-12 rounded-xl flex items-center justify-center bg-gradient text-zinc-50 animate-bounce">
        <Gift className="size-6" />
      </div>
      <Text size="lg">
        <span className="font-semibold">{result.fromName}</span>, seu amigo
        secreto é...{" "}
      </Text>

      <ScratchReveal name={result.toName} />

      <InfoCard
        description="Salve ou registre o nome do seu amigo secreto, já que as informações podem não ficar acessíveis posteriormente."
        title="Atenção"
      />
    </div>
  );
}
