interface User {
  id: string;
  name: string;
}

interface Room {
  slug: string;
  name?: string;
  participants: User[];
  admin: User;
  cretedAt?: Date;
}

export type { User, Room };
