import { Role } from '@prisma/client';
import { IsArray, IsEmail, IsEnum, IsOptional, IsString, Length } from 'class-validator';

export class CreateUserDto {
    @IsEmail()
    email: string;

    @IsString()
    @Length(3, 50)
    password: string;

    @IsString()
    @IsOptional()
    firstName: string;

    @IsString()
    @IsOptional()
    lastName: string;

    @IsString()
    @IsOptional()
    centerName?: string;

    @IsOptional()
    @IsArray()
    @IsEnum(Role, { each: true })
    roles?: Role[];
}
