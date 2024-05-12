import { IRegisterRequest } from '../auth/auth.user';

export interface IEmployeeRequest extends IRegisterRequest {
    address?: string;
    payrollType: string;
    payRate: number | null;
    makeUpCredits: boolean | null;
    access?: boolean;
    admin?: boolean;
    manageOtherTeachers?: string[];
    manageSelf?: string[];
    manageStudentsParents?: string[];
    otherPrivileges?: string[];
    permissions?: string[] 
}



