import { Transform } from "class-transformer";
import { IsBoolean ,IsNotEmpty, IsString } from "class-validator";


export class UpdateForumDto {
    @Transform(({ value }) => value.trim())
    @IsNotEmpty()
    @IsString()
    title: string;

    @Transform(({ value }) => value.trim())
    @IsNotEmpty()
    @IsString()
    description: string;

    @Transform(({ value }) => value.trim())
    @IsNotEmpty()
    @IsBoolean()
    status: boolean;
}