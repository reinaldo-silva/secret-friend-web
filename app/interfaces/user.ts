interface User {
  id: string;
  name: string;
}

interface Room {
  slug: string;
  name?: string;
  participants: User[];
  admin: User;
  alreadyDraw: boolean;
}

interface RoomServer {
  id: string;
  name?: string;
  adminId: string;
  participants: User[];
  alreadyDraw: boolean;
}

export type { User, Room, RoomServer };
