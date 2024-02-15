import { Homeowner } from "./user.interface";

interface AnnouncementProps {
  title: string;
  description: string;
  image?: string[];
}

interface AnnouncementControllerProps {
  open: boolean;
  onSave: (args: AnnouncementProps) => void;
  close: () => void;
  isLoading?: boolean;
}

interface EventCardProps {
  image: string;
  title: string;
  description: string;
  id: string;
}

interface PaginationProps {
  pageSize: number;
  page: number;
  total?: number;
}

interface ConcernDetalsCardProps {
  open: boolean;
  close: () => void;
  concern?: ConcernProps;
}

type SelectImageProps = {
  setSelectedFile: (file: File | null) => void;
  selectedFile: File | null;
  loading?: boolean;
};

export type {
  AnnouncementProps,
  AnnouncementControllerProps,
  EventCardProps,
  ConcernDetalsCardProps,
  SelectImageProps,
  PaginationProps,
};

interface ConcernProps {
  title: string;
  description: string;
  dateCreated: Date;
  homeowner: Homeowner;
}
