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
    createdAt?: Date;
    updatedAt?: Date;
}

export class CreateUserDto {
    @IsEmail()
    email: string;

    password: string | null;
    firstName: string;
    lastName: string;
    centerName: string;
    phoneNumber?: string;
    address?: string;
    access?: boolean;
}
