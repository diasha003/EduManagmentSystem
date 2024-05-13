import { IUser } from '../../../types/user';

export interface IRegisterRequest {
    email: string;
    password: string | null;
    firstName: string;
    lastName: string;
    centerName: string | null;
    address?: string;
    phoneNumber?: string;
}

export interface ILoginRequest {
    email: string;
    password: string;
}

export interface IAuthState {
    token?: string | null;
    user?: IUser | null;
}
