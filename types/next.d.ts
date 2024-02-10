import { NextApiRequest } from "next";
import type { User } from "./user.interface";

interface UserProps extends User {
  token: string;
}

declare module "next" {
  interface NextApiRequest {
    user?: UserProps;
  }
}
