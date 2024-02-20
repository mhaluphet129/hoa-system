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

  @IsString()
  homeNumber?: string;

  @IsDate()
  move_in_date?: Date;

  @IsEnum(["owner", "renter"])
  type?: HomeOwnerType;

  @IsOptional()
  currentEmployer?: string | number;

  @IsOptional()
  @IsString()
  businessName?: string;

  @IsOptional()
  @IsString()
  workPosition?: string;

  @IsOptional()
  @IsString()
  spouseName?: string;

  @IsOptional()
  @IsString()
  spouseNumber?: number;

  @IsNumber()
  monthly_due?: number;

  @IsNumber()
  annual_membership_fee?: number;

  @IsOptional()
  @IsString()
  profile_description?: string;
}
