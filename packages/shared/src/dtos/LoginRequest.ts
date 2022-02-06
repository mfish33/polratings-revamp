import { IsString } from "class-validator";
import { BaseDTO } from "../dtos";

export class LoginRequest extends BaseDTO {
    @IsString()
    username:string

    @IsString()
    password:string
}