import { Transaction } from "./props.types";
import { Homeowner, User } from "./user.interface";

export type CategoryStatus = "active" | "inactive";
export type CategoryType = "due" | "service";

// * Category
export interface CategoryData {
  category: string;
  description: string;
  fee: number;
  status: CategoryStatus;
  type: CategoryType;
}
export interface Category extends CategoryData {
  _id: string;
  createdAt: Date;
}

// * Concern
export interface ConcernData {
  title: string;
  description: string;
  image?: String;
  homeownerId?: string | Homeowner;
}

export interface Concern extends ConcernData {
  _id: string;
  createdAt: Date;
}

// * Dashboard Data
export interface HomeownerColumn {
  name: string | null;
  lastname: string | null;
  status: boolean;
}
export interface DashboardData {
  homeowners: HomeownerColumn[];
  transaction: Transaction[];
}

// * Notification

export type NotificationType = "due" | "events";
export type NotificationStatus = "error" | "pending" | "success";
export interface Notification {
  type: NotificationType;
  status: NotificationStatus;
  userId: User;
  title: string;
  sub_title: string;
  description: string;
  extra?: Record<any, any>;
}

export interface NotificationData extends Notification {
  _id: string;
  createdAt: Date;
}
