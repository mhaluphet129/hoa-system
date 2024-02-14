import { IsString, IsMongoId, IsArray } from "class-validator";

export class AnnouncementDTO {
  @IsString()
  title?: string;

  @IsString()
  description?: string;

  @IsMongoId()
  staffId?: string;

  @IsArray()
  images?: string[];
}
