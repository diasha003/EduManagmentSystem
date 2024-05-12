export interface IUser {
    id?: number;
    centerName: string;
    email: string;
    password: string;
    firstName?: string;
    lastName?: string;
    size?: string;
    roles: string[]
	createdAt?: string
	updatedAt?: string
}
