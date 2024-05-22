import { Transform } from 'class-transformer';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateSubjectDto {
  @Transform(({ value }) => value.trim())
  @IsNotEmpty()
  @IsString()
  name: string;

  @Transform(({ value }) => value.trim())
  @IsNotEmpty()
  @IsString()
  description: string;

  @Transform(({ value }) => value.trim())
  @IsNotEmpty()
  @IsString()
  subjectCode: string;
}
