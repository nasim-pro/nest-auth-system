import { IsEmail, IsString, MaxLength, MinLength } from 'class-validator';


export class RegisterDto {

    @IsString()
    @MaxLength(100)
    @MinLength(2)
    name!: string;

    @IsEmail()
    email!: string;

    @IsString()
    @MinLength(6)
    @MaxLength(20)
    password!: string;
}
export class LoginDto {

    @IsEmail()
    email!: string;

    @IsString()
    @MinLength(6)
    @MaxLength(20)
    password!: string;
}