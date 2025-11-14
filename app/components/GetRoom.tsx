"use client";

import { useEffect, useEffectEvent } from "react";
import { SERVER_STATUS, useWebSocket } from "../contexts/WebsocketContext";

export function GetRoom({ slug }: { slug: string }) {
  const { sendMessage, room, status } = useWebSocket();

  const getRoomById = useEffectEvent(() => {
    sendMessage({
      type: "get_room_by_id",
      roomId: slug,
    });
  });

  useEffect(() => {
    if (status === SERVER_STATUS.ALIVE && !room) {
      getRoomById();
    }
  }, [status, room]);

  return null;
}
