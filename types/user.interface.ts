export type UserType = "homeowner" | "staff" | "treasurer" | "bod";
export type HomeOwnerType = "owner" | "renter";

export interface User {
  _id?: string;
  username: string;
  password: string;
  type?: UserType;
  homeownerId?: Homeowner;
  staffId?: Staff;
  treasurerId?: Treasurer;
}

export interface ProtectedUser {
  _id?: string;
  username: string;
  type?: UserType;
  homeownerId?: Homeowner;
  staffId?: Staff;
  treasurerId?: Treasurer;
}

export interface ProtectedUserWithToken extends ProtectedUser {
  token: string;
}

export interface Homeowner {
  _id?: string;
  name: string;
  middlename?: string;
  lastname: string;
  email: string;
  phone: string;
  type: HomeOwnerType | string;
  address: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface Staff {
  name: string;
  role: string;
}

export interface Treasurer {
  account_balance: number;
}

// utils literal haha
export interface UpdateHomeownerProps {
  id: string;
  homeownerId: string;
}
