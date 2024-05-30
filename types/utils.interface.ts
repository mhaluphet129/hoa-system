export interface Response {
  code: number;
  success: boolean;
  message?: string;
}

export interface ExtendedResponse<T> extends Response {
  data?: T;
  meta?: {
    total: number;
  };
}

export interface CheckStakeholderProps {
  staff: boolean;
  treasurer: boolean;
  // bod: boolean,
}
