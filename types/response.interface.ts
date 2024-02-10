interface Response {
  status: number;
  data?: Record<any, any>;
  error?: any;
  requestTime?: Date;
}

export type { Response };
