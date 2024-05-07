import { Transform } from "class-transformer";
import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator";

export class LoginUserDto {

    @Transform(({ value }) => value.trim())
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @Transform(({ value }) => value.trim())
    @IsNotEmpty()
    @IsString()
    @MinLength(6)
    password: string;



}