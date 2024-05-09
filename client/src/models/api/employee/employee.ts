import { IRegisterRequest } from '../auth/auth.user';

export interface IEmployeeRequest extends IRegisterRequest {
    address?: string;
    payrollType: string;
    payRate: number | null;
    makeUpCredits: boolean | null;
    access?: boolean;
    admin?: boolean;
    manageOtherTeachers?: String[];
    manageSelf?: String[];
    manageStudentsParents?: String[];
    otherPrivileges?: String[];
}
