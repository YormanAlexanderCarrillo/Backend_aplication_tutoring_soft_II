import { IsBoolean, IsNotEmpty } from "class-validator";

export class UpdateStatus{
    @IsNotEmpty()
    @IsBoolean()
    status: boolean
}
