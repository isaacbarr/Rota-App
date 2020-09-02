export interface User {
  id: number;
  name: string;
  email: string;
  password: string;
  userRole: string;
  dob: string;
  phoneNo: string;
  pay: number;
  Address: {
    houseNo: number;
    street: string;
    city: string;
    postcode: string;
  };
  Holidays: {
    date: Date;
  };
  Shifts: {
    id: number;
    date: Date;
    startTime: string;
    finishTime: string;
    area: string;
  };
  Training: {
    id: number;
    training: string;
  };
}
