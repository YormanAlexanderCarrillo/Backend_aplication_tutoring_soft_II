import { IsEmail, IsNotEmpty, IsString } from "class-validator";
import { Role } from "src/common/Enums/enum.role";

export class UpdateTutor{
    @IsNotEmpty()
    @IsString()
    name: string;
  
    @IsNotEmpty()
    @IsString()
    lastname: string;
  
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @IsString()
    role: Role
}