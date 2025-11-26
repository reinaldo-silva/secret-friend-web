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
  secretList?: Record<string, string>;
}

interface RoomServer {
  id: string;
  name?: string;
  adminId: string;
  participants: User[];
  secretList?: Record<string, string>;
}

export type { User, Room, RoomServer };
