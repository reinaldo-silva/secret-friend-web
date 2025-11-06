"use client";
import { redirect } from "next/navigation";
import { ServerIsAlive } from "../components/ServerIsAlive";
import { WebSocketProvider } from "../contexts/WebsocketContext";
import { LocalStorage } from "../utils/localstorage";

const localStorage = new LocalStorage();

export default function RoomLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const localUser = localStorage.get("localUser");

  if (!localUser) {
    redirect("/");
  }

  return (
    <WebSocketProvider>
      <ServerIsAlive />
      {children}
    </WebSocketProvider>
  );
}
