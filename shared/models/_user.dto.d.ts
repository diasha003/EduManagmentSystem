export interface User {
    id?: number;
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
export declare class CreateUserDto {
    email: string;
    password: string | null;
    firstName: string;
    lastName: string;
    centerName: string;
    phoneNumber?: string;
    address?: string;
    access?: boolean;
}
