import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { ServerIsAlive } from "../components/ServerIsAlive";
import { WebSocketProvider } from "../contexts/WebsocketContext";
import { User } from "../interfaces/user";

export default async function RoomLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  const userLocal = cookieStore.get("userLocal")?.value;

  if (!userLocal) {
    redirect("/");
  }

  return (
    <WebSocketProvider currentUser={JSON.parse(userLocal) as User}>
      <ServerIsAlive />
      {children}
    </WebSocketProvider>
  );
}
