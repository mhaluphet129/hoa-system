import { Staff } from "./user.interface";

export interface Event {
  _id?: string;
  title: string;
  description: string;
  staffId: Staff | string;
  images: string[];
  createdAt?: Date;
  updatedAt?: Date;
}

export interface EventWithTotal {
  events: Event[];
  total: number;
}
