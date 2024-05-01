export interface IUser {
    id?: number;
    eduCenterName?: string;
    email: string;
    password: string;
    firstName?: string;
    lastName?: string;
    size?: string;
    roles: string[]
	createdAt?: string
	updatedAt?: string
}
