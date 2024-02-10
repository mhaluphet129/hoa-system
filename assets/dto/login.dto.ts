import { dto, include, scope } from "dto-mapper";
import type { UserType, Homeowner, Staff, Treasurer } from "../../types";

// TODO: need to fix homeowner and other reference variable
@dto()
export class LoginDTO {
  @include()
  username?: string;

  @include()
  token?: string;

  @include()
  type?: UserType;

  @scope("homeowner")
  homeownerId?: Homeowner;

  @scope("staff")
  staffId?: Staff;

  @scope("treasurer")
  treasurerId?: Treasurer;
}
