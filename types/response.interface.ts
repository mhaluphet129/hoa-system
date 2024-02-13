interface Response {
  code: number;
  success?: boolean;
  data?: Record<any, any>;
  error?: any;
  requestTime?: Date;
}

export type { Response };
