import { Role } from '@prisma/client';
import { IsArray, IsEmail, IsEnum, IsOptional, IsString } from 'class-validator';

export class CreateUserDto {
    @IsEmail()
    email: string;

    password: string | null;

    @IsString()
    @IsOptional()
    firstName: string;

    @IsString()
    @IsOptional()
    lastName: string;

    @IsString()
    @IsOptional()
    centerName: string;

    @IsOptional()
    phoneNumber?: string;

    @IsOptional()
    address?: string;

    @IsOptional()
    @IsArray()
    @IsEnum(Role, { each: true })
    roles?: Role[];
}
