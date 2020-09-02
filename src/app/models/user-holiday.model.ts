export interface Holiday {
  id: number;
  date: string;
  UserId: number;
  User: {
    id: number;
    name: string;
  };
}
