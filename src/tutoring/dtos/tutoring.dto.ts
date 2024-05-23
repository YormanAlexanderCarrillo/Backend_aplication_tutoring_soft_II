import { IsBoolean, IsNotEmpty, IsString } from "class-validator";

export class CreateTutoringDto{
    @IsNotEmpty()
    @IsString()
    name:string

    @IsNotEmpty()
    @IsString()
    reason:string

    @IsNotEmpty()
    date:Date

    @IsNotEmpty()
    @IsString()
    hour: string

    @IsNotEmpty()
    @IsBoolean()
    status: boolean
}

