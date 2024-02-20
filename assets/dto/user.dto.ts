import {
  IsString,
  IsOptional,
  IsEnum,
  IsEmail,
  IsPhoneNumber,
  IsDateString,
  IsNumber,
} from "class-validator";
import type { UserType, Homeowner, Staff, Treasurer } from "@/types";

export class UserRegistrationDTO {
  @IsString()
  username?: string;

  @IsOptional()
  @IsString()
  password?: string;

  @IsEnum(["homeowner", "staff", "treasurer", "bod"])
  type?: UserType | string;

  @IsOptional()
  homeownerId?: Homeowner;

  @IsOptional()
  staffId?: Staff;

  @IsOptional()
  treasurerId?: Treasurer;
}

export class UserHomeOwnerDTO {
  @IsString()
  name?: string;

  @IsString()
  middlename?: string;

  @IsOptional()
  @IsString()
  lastname?: string;

  @IsEmail()
  email?: string;

  @IsPhoneNumber()
  phone?: string;

  @IsOptional()
  @IsDateString()
  move_in_date?: Date;

  @IsEnum(["owner", "render"])
  type?: string;

  @IsOptional()
  @IsString()
  spouse_name?: string;

  @IsOptional()
  @IsPhoneNumber()
  spouse_number?: any;

  @IsNumber()
  monthly_due?: Number;

  @IsNumber()
  annual_membership_fee?: Number;

  @IsOptional()
  @IsString()
  profile_description?: string;
}

export class UserTreasurerDTO {
  @IsNumber()
  account_balance?: Number;
}

export class UserStaffDTO {
  @IsString()
  name?: string;

  @IsString()
  role?: string;
}

export class UpdateUserDTO {
  @IsOptional()
  @IsString()
  username?: string;

  @IsOptional()
  @IsString()
  password?: string;

  @IsOptional()
  @IsEnum(["homeowner", "staff", "treasurer", "bod"])
  type?: string;
}
