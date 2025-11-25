"use client";

import Link from "next/link";
import { Button } from "./ui/Button";
import { useWebSocket } from "../contexts/WebsocketContext";

export function ButtonResult({ slug }: { slug: string }) {
  const { room } = useWebSocket();

  return (
    <Link
      href={room?.alreadyDraw ? `/room/${slug}/result` : `/room/${slug}/join`}
      className="flex w-full"
    >
      <Button
        className="flex-1"
        type="button"
        variant={room?.alreadyDraw ? "primary" : "ghost"}
      >
        {room?.alreadyDraw ? "Seu amigo secreto é..." : "Aguardando sorteio..."}
      </Button>
    </Link>
  );
}
