/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useRouter } from "next/navigation";
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useEffectEvent,
  useMemo,
  useRef,
  useState,
} from "react";
import { io, Socket } from "socket.io-client";
import { toast } from "sonner";
import { Room, RoomServer, User } from "../interfaces/user";
import { generateId, saveAdminMapping } from "../utils";

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
  myMatch: User | null;
  clearRoom: () => void;
};

const WebSocketContext = createContext<WebSocketContextType | undefined>(
  undefined
);

export function WebSocketProvider({
  children,
  currentUser,
}: {
  children: React.ReactNode;
  currentUser: User;
}) {
  const router = useRouter();
  const [status, setStatus] = useState<SERVER_STATUS>(SERVER_STATUS.CHECKING);
  const [myMatch, setMyMatch] = useState<User | null>(null);
  const socketRef = useRef<Socket | null>(null);
  const [room, setRoom] = useState<Room | null>(null);
  const roomId = room?.slug;

  function clearRoom() {
    setRoom(null);
  }

  const handleMessage = useCallback(
    (data: any) => {
      switch (data.type) {
        case "room_created":
          const { roomId: roomIdCreated } = data;

          router.push(`/room/${roomIdCreated}`);
          console.log("Sala criada com sucesso", data);
          break;
        case "joined":
          const { roomId: roomIdJoined } = data;
          router.push(`/room/${roomIdJoined}/join`);

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
          toast(`${data.participant.name} está participando do sorteio`);
          break;
        case "draw_result_admin": {
          if (roomId) saveAdminMapping(roomId, data.mapping);
          toast("Sorteio realizado. Mapeamento salvo no localStorage.");
          break;
        }
        case "your_match":
          setRoom((oldValue) =>
            oldValue ? { ...oldValue, alreadyDraw: true } : null
          );
          setMyMatch(data.match);
          toast("Você recebeu um par.");
          break;
        case "room_found":
          const { id, participants, name, adminId, alreadyDraw }: RoomServer =
            data.room;

          if (adminId === currentUser.id) {
            router.push(`/room/${id}`);
          } else {
            router.push(`/room/${id}/join`);
          }

          const adminUser =
            participants.find((usr) => usr.id === adminId) || ({} as User);

          setRoom({
            admin: adminUser,
            participants,
            name,
            slug: id,
            alreadyDraw,
          });
          break;
        case "error":
          const currentPath =
            typeof window !== "undefined" ? window.location.pathname : "";

          if (
            currentPath.includes(`/room/`) &&
            data.message === "not_authorized"
          ) {
            router.push("/room");
          }

          toast("Erro: " + data.message);
          break;
      }
    },
    [roomId, currentUser, router]
  );

  const sendMessage = useCallback((data: any) => {
    const socket = socketRef.current;
    if (socket && socket.connected) {
      socket.emit("message", data);
    } else {
      console.warn("🚫 Tentou enviar mensagem sem conexão ativa");
    }
  }, []);

  const handlerStartSocket = useEffectEvent(() => {
    const socket = io(process.env.NEXT_PUBLIC_WS_URL || "ws://localhost:3000");
    socketRef.current = socket;

    socketRef.current.on("connect", () => {
      console.log("✅ WebSocket conectado");
      sendMessage({ type: "connect_server", user: currentUser });
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
  });

  useEffect(() => {
    console.log(!!socketRef.current);

    handlerStartSocket();
  }, []);

  const handleCreateRoom = useCallback(
    (roomName: string) => {
      if (!currentUser) {
        throw new Error("Current user is not set");
      }

      const newRoom: Room = {
        slug: generateId("r_"),
        name: roomName,
        admin: currentUser,
        participants: [currentUser],
        alreadyDraw: false,
      };
      setRoom(newRoom);

      return newRoom;
    },
    [currentUser]
  );

  const value = useMemo(
    () => ({
      status,
      sendMessage,
      currentUser,
      room,
      handleCreateRoom,
      clearRoom,
      myMatch,
    }),
    [status, sendMessage, currentUser, room, handleCreateRoom, myMatch]
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
