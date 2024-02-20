import { Homeowner } from "./user.interface";

type NotificationStatus = "due" | "pending" | "completed";

interface Response {
  code: number;
  success?: boolean;
  data?: Record<any, any>;
  error?: any;
  requestTime?: Date;
}

interface NotificationCardProps {
  title: string;
  status: NotificationStatus;
  description: string;
}

interface ConcernDetalsCardProps {
  open: boolean;
  close: () => void;
  concern?: ConcernProps;
}

interface NewHomeownerCardProps {
  open: boolean;
  close: () => void;
}

export type {
  Response,
  NotificationCardProps,
  NotificationStatus,
  ConcernDetalsCardProps,
  NewHomeownerCardProps,
};

// no need to exports down here
interface ConcernProps {
  title: string;
  description: string;
  dateCreated: Date;
  homeowner: Homeowner;
}
