"use client";
import { useEffect, useEffectEvent } from "react";
import { SERVER_STATUS, useWebSocket } from "../contexts/WebsocketContext";

export function GetRoom({ slug }: { slug: string }) {
  const { sendMessage, room, status, currentUser } = useWebSocket();

  const getRoomById = useEffectEvent(() => {
    if (currentUser) {
      sendMessage({
        type: "get_room_by_id",
        roomId: slug,
        clientId: currentUser.id,
      });
    }
  });

  useEffect(() => {
    if (status === SERVER_STATUS.ALIVE && !room && currentUser) {
      getRoomById();
    }
  }, [status, room, currentUser]);

  return null;
}
