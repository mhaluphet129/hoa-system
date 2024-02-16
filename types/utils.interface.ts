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

export type { Response, NotificationCardProps, NotificationStatus };
