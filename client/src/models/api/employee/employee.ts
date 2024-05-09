import { IRegisterRequest } from '../auth/auth.user';

export interface IEmployeeRequest extends IRegisterRequest {
    address?: string;
    payrollType: string;
    payRate?: number;
    makeUpCredits?: boolean;
}
