import {
  Category,
  CategoryData,
  Concern,
  ConcernData,
} from "./schema.interface";
import { UserType, Homeowner, Staff, User } from "./user.interface";

export type SelectImageProps = {
  setSelectedFile: (file: File | null) => void;
  selectedFile: File | null;
  loading?: boolean;
};

export interface NewUserProps {
  username: string;
  password: string;
  type: UserType;
}

// Staff Props
export interface AnnouncementProps {
  title: string;
  description: string;
  images?: string[];
  createdAt?: Date;
}

export interface AnnouncementControllerProps {
  open: boolean;
  onSave: (args: AnnouncementProps) => void;
  close: () => void;
  isLoading?: boolean;
}

export interface NewConcernProps {
  open: boolean;
  onSave: (args: ConcernData) => void;
  close: () => void;
  isLoading?: boolean;
}

export interface PaginationProps {
  pageSize: number;
  page: number;
  total?: number;
}

export interface ConcernDetalsCardProps {
  open: boolean;
  close: () => void;
  concern: Concern | null;
}

export interface NewHomeownerCardProps {
  open: boolean;
  close: () => void;
  user?: User | null;
}

export interface NewStaffCardProps {
  open: boolean;
  close: () => void;
  refresh: () => void;
  user?: User | null;
}

export interface ConcernProps {
  title: string;
  description: string;
  dateCreated: Date;
  homeowner: Homeowner;
}

export interface LoginProp {
  username: string;
  password: string;
}

export interface AnnouncementDetailsProps {
  open: boolean;
  announcement: AnnouncementProps | null;
}

export interface NewCategoryProps {
  open: boolean;
  close: () => void;
  onAdd: (obj: CategoryData) => void;
  onSave: (obj: CategoryData) => void;
  isEdit?: boolean;
  data?: Category | any;
}

export interface CategoryUtilProps {
  open: boolean;
  isEdit?: boolean;
  data?: Category;
}

// export type Transaction1Type = "check" | "fund transfer";
// export interface Transaction1Props {
//   name: string;
//   or: string;
//   ar?: string;
//   amount: Number;
//   type: Transaction1Type;
// }

export interface NewHomeownerTransaction {
  open: boolean;
  close: () => void;
  onSave: (data: NewHomeownerTransactionData) => void;
  fromDue?: boolean;
}

type PaymentType = "cash" | "cheque";
export interface NewHomeownerTransactionData {
  homeownerId: Homeowner;
  dateCollected: Date;
  collectedBy?: Staff;
  paymentType?: PaymentType;
  categorySelected: Category[];
  createdAt?: Date;
}
export interface Transaction extends NewHomeownerTransactionData {
  _id?: string;
  totalFee?: number;
  status: "completed" | "pending";
}

// api
export interface ApiGetProps {
  endpoint: string;
  query?: Record<any, any>;
  publicRoute?: boolean;
}

export interface ApiPostProps {
  endpoint: string;
  payload?: Record<any, any>;
  publicRoute?: boolean;
}
