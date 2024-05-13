export interface IUser {
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
    createdAt?: string;
    updatedAt?: string;
}
