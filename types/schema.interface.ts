import { Homeowner } from "./user.interface";

export type CategoryStatus = "active" | "inactive";

// * Category
export interface Category {
  _id: string;
  category: string;
  description: string;
  fee: number;
  status: CategoryStatus;
  createdAt: Date;
}

export interface NewCategoryData {
  _id?: string;
  category: string;
  description: string;
  fee: Number;
  status: CategoryStatus;
}

export interface NewCategoryDataOptionalProps {
  _id?: string;
  category?: string;
  description?: string;
  fee?: Number;
  status?: CategoryStatus;
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
