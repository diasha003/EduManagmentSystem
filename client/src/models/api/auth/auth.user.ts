export interface IAuthUser {}

export interface IRegisterRequest {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    centerName?: string;
}

export interface ILoginRequest {
    email: string;
    password: string;
}
