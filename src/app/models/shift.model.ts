export interface Shift {
  id: number;
  date: Date;
  startTime: string;
  finishTime: string;
  area: string;
  approved: boolean;
  User: {
    id: number;
    name: string;
    pay: number;
  }
}
