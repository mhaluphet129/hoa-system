export type UserType = "homeowner" | "staff" | "treasurer" | "bod";
export type HomeOwnerType = "owner" | "renter";

export interface User {
  _id: string;
  username?: string;
  password?: string;
  type?: UserType;
  homeownerId?: Homeowner;
  staffId?: Staff;
  treasurerId?: Treasurer;
  dateCreated?: Date;
}

export interface Homeowner {
  name: string;
  middlename?: string;
  lastname: string;
  email: string;
  phone: string;
  move_in_date: Date;
  type: HomeOwnerType;
  spouse_name: string;
  spouse_number: number;
  monthly_due: number;
  annual_membership_fee: number;
  profile_description: string;
}

export interface Staff {
  name: string;
  role: string;
}

export interface Treasurer {
  account_balance: number;
}

export default User;
