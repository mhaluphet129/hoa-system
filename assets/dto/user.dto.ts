import {
  IsString,
  IsOptional,
  IsEnum,
  IsEmail,
  IsPhoneNumber,
  IsNumber,
  IsMongoId,
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

  @IsEnum(["owner", "render"])
  type?: string;
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
  @IsMongoId()
  id?: string;

  @IsOptional()
  @IsString()
  username?: string;

  @IsOptional()
  @IsString()
  password?: string;

  @IsOptional()
  @IsEnum(["homeowner", "staff", "treasurer", "bod"])
  type?: string;

  @IsOptional()
  @IsMongoId()
  homeownerId?: string;

  @IsOptional()
  @IsMongoId()
  staffId?: string;

  @IsOptional()
  @IsMongoId()
  treasurerId?: string;
}
