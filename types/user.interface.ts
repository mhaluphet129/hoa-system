export type UserType = "homeowner" | "staff" | "treasurer" | "bod";
export type HomeOwnerType = "owner" | "renter";
export type UserStatus = "active" | "inactive";

export interface User {
  _id?: string;
  username: string;
  password: string;
  type?: UserType;
  homeownerId?: Homeowner;
  staffId?: Staff;
  treasurerId?: Treasurer;
  status?: UserStatus;
  createdAt?: Date;
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
  monthlyDueDate?: Date;
  yearlyDueDate?: Date;
}

export interface Staff {
  _id?: string;
  name: string;
  phone?: string;
  role?: string;
}

export interface Treasurer {
  _id?: string;
  account_balance: number;
  name: string;
}

// utils literal haha
export interface UpdateHomeownerProps {
  id: string;
  homeownerId?: string;
  staffId?: string;
}
