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
