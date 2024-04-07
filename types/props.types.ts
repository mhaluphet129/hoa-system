import {
  NewCategoryData,
  NewCategoryDataOptionalProps,
} from "./schema.interface";
import { UserType, Homeowner } from "./user.interface";

export type NotificationStatus = "due" | "pending" | "completed";

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
  image?: string[];
  createdAt?: Date;
}

export interface AnnouncementControllerProps {
  open: boolean;
  onSave: (args: AnnouncementProps) => void;
  close: () => void;
  isLoading?: boolean;
}

export interface EventCardProps {
  image: string;
  title: string;
  description: string;
  id: string;
}

export interface PaginationProps {
  pageSize: number;
  page: number;
  total?: number;
}

export interface NotificationCardProps {
  title: string;
  status: NotificationStatus;
  description: string;
}

export interface ConcernDetalsCardProps {
  open: boolean;
  close: () => void;
  concern?: ConcernProps;
}

export interface NewHomeownerCardProps {
  open: boolean;
  close: () => void;
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
  onAdd: (obj: NewCategoryData) => void;
  onSave: (obj: NewCategoryDataOptionalProps) => void;
  isEdit?: boolean;
  data?: NewCategoryData | any;
}

export interface CategoryUtilProps {
  open: boolean;
  isEdit?: boolean;
  data?: NewCategoryData;
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
