import { IsEmail, IsOptional, IsString } from 'class-validator';

export interface User {
    id: number;
    centerName: string;
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    phoneNumber?: string;
    address?: string;
    size?: string;
    roles: string[];
    isActive: boolean;
    createdAt?: string;
    updatedAt?: string;
}

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

    access?: boolean;
}
