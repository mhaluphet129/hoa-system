import {
  IsString,
  IsEmail,
  IsOptional,
  IsPhoneNumber,
  IsDate,
  IsEnum,
  IsNumber,
} from "class-validator";
import type { HomeOwnerType } from "../../types";

export class HomeOwnerRegistrationDTO {
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  middlename?: string;

  @IsString()
  lastname?: string;

  @IsEmail()
  email?: string;

  @IsPhoneNumber()
  phone?: string;

  @IsOptional()
  @IsDate()
  move_in_date?: Date;

  @IsEnum(["owner", "renter"])
  type?: HomeOwnerType;

  @IsOptional()
  @IsString()
  spouse_name?: string;

  @IsOptional()
  @IsString()
  spouse_number?: number;

  @IsNumber()
  monthly_due?: number;

  @IsNumber()
  annual_membership_fee?: number;

  @IsOptional()
  @IsString()
  profile_description?: string;
}
