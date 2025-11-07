import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { ServerIsAlive } from "../components/ServerIsAlive";
import { WebSocketProvider } from "../contexts/WebsocketContext";

export default async function RoomLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  const userLocal = cookieStore.has("userLocal");

  if (!userLocal) {
    redirect("/");
  }

  return (
    <WebSocketProvider>
      <ServerIsAlive />
      {children}
    </WebSocketProvider>
  );
}
