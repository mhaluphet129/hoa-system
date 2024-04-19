import { Homeowner } from "./user.interface";

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
}
