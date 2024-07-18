import { Transform } from "class-transformer";
import { IsBoolean, IsDate, IsNotEmpty, IsString } from "class-validator";


export class CreateForumDto {
    @Transform(({ value }) => value.trim())
    @IsNotEmpty()
    @IsString()
    title: string;

    @Transform(({ value }) => value.trim())
    @IsNotEmpty()
    @IsString()
    description: string;
}