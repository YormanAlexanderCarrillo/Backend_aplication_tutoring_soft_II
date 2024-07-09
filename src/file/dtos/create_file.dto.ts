import { IsNotEmpty, IsNumber, IsString } from "class-validator";


export class createFileDto{
    @IsNotEmpty()
    @IsString()
    name: string
    @IsNotEmpty()
    @IsNumber()
    size: number
    @IsNotEmpty()
    @IsString()
    urlDownload:string
}