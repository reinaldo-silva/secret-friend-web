/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { io, Socket } from "socket.io-client";
import { Room, User } from "../interfaces/user";
import { generateId, saveAdminMapping } from "../utils";
import { LocalUser } from "../utils/localUser";

export enum SERVER_STATUS {
  ALIVE = "ALIVE",
  DOWN = "DOWN",
  CHECKING = "CHECKING",
}

type WebSocketContextType = {
  status: SERVER_STATUS;
  sendMessage: (data: any) => void;
  room: Room | null;
  currentUser: User | null;
  handleCreateRoom: (roomName: string) => Room;
  addParticipantInRoom: (participant: User) => void;
  myMatch: User | null;
};

const WebSocketContext = createContext<WebSocketContextType | undefined>(
  undefined
);

export function WebSocketProvider({ children }: { children: React.ReactNode }) {
  const [status, setStatus] = useState<SERVER_STATUS>(SERVER_STATUS.CHECKING);
  const [myMatch, setMyMatch] = useState<User | null>(null);
  const socketRef = useRef<Socket | null>(null);
  const [room, setRoom] = useState<Room | null>(null);
  const currentUser = useMemo(() => new LocalUser().user, []);
  const roomId = room?.slug;

  const handleMessage = useCallback(
    (data: any) => {
      switch (data.type) {
        case "room_created":
          console.log("Sala criada com sucesso", data);
          break;
        case "joined":
          console.log("Você entrou na sala", data);
          break;
        case "participant_added":
          setRoom((prev) => {
            if (!prev) return prev;

            if (prev.participants.find((p) => p.id === data.participant.id))
              return prev;
            return {
              ...prev,
              participants: [...prev.participants, data.participant],
            };
          });
          break;
        case "draw_result_admin": {
          if (roomId) saveAdminMapping(roomId, data.mapping);
          alert("Sorteio realizado. Mapeamento salvo no localStorage.");
          break;
        }
        case "your_match":
          setMyMatch(data.match);
          break;
        case "error":
          alert("Erro: " + data.message);
          break;
      }
    },
    [roomId]
  );

  useEffect(() => {
    const socket = io(process.env.NEXT_PUBLIC_WS_URL || "ws://localhost:3000");
    socketRef.current = socket;
    socket.connect();
  }, []);

  useEffect(() => {
    if (!socketRef.current) return;

    if (status !== SERVER_STATUS.ALIVE) {
      socketRef.current.on("connect", () => {
        console.log("✅ WebSocket conectado");
        setStatus(SERVER_STATUS.ALIVE);
      });

      socketRef.current.on("disconnect", () => {
        console.log("❌ WebSocket desconectado");
        setStatus(SERVER_STATUS.DOWN);
      });

      socketRef.current.onAny((event, data) => {
        console.log("📩 Recebido:", event, data);
        handleMessage(data);
      });

      socketRef.current.on("connect_error", (error) => {
        console.error("⚠️ Erro WebSocket:", error);
      });
    }
  }, [handleMessage, status]);

  const sendMessage = useCallback((data: any) => {
    const socket = socketRef.current;
    if (socket && socket.connected) {
      socket.emit("message", data);
    } else {
      console.warn("🚫 Tentou enviar mensagem sem conexão ativa");
    }
  }, []);

  const handleCreateRoom = useCallback(
    (roomName: string) => {
      if (!currentUser) {
        throw new Error("Current user is not set");
      }

      const newRoom = {
        slug: generateId("r_"),
        name: roomName,
        admin: currentUser,
        participants: [currentUser],
        createdAt: new Date(),
      };
      setRoom(newRoom);

      return newRoom;
    },
    [currentUser]
  );

  const addParticipantInRoom = useCallback((participant: User) => {
    setRoom((prev) => {
      if (!prev) return prev;
      return {
        ...prev,
        participants: [...prev.participants, participant],
      };
    });
  }, []);

  const value = useMemo(
    () => ({
      status,
      sendMessage,
      currentUser,
      room,
      handleCreateRoom,
      addParticipantInRoom,
      myMatch,
    }),
    [
      status,
      sendMessage,
      currentUser,
      room,
      handleCreateRoom,
      addParticipantInRoom,
      myMatch,
    ]
  );

  return (
    <WebSocketContext.Provider value={value}>
      {children}
    </WebSocketContext.Provider>
  );
}

export function useWebSocket() {
  const context = useContext(WebSocketContext);
  if (!context)
    throw new Error("useWebSocket deve ser usado dentro de WebSocketProvider");
  return context;
}
