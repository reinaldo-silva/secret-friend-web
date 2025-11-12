interface User {
  id: string;
  name: string;
}

interface Room {
  slug: string;
  name?: string;
  participants: User[];
  admin: User;
}

interface RoomServer {
  id: string;
  name?: string;
  adminId: string;
  participants: User[];
}

export type { User, Room, RoomServer };
