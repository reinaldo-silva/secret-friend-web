"use client";
import { SERVER_STATUS, useWebSocket } from "../contexts/WebsocketContext";

export function ServerIsAlive() {
  const { status } = useWebSocket();

  return (
    <div className="fixed bottom-4 right-4 p-2 bg-white rounded shadow">
      <span className="text-sm">
        Server status:{" "}
        {status === SERVER_STATUS.CHECKING && (
          <span className="text-yellow-500">Checking...</span>
        )}
        {status === SERVER_STATUS.ALIVE && (
          <span className="text-green-500">Alive</span>
        )}
        {status === SERVER_STATUS.DOWN && (
          <span className="text-red-500">Down</span>
        )}
      </span>
    </div>
  );
}
