import { IsNotEmpty, IsString } from 'class-validator';

export class CreateThreadDto {
  @IsNotEmpty()
  @IsString()
  forum: string;

  @IsNotEmpty()
  @IsString()
  comment: string;
}
