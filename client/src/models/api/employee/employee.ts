import { IRegisterRequest } from '../auth/auth.user';

export interface IEmployeeRequest extends IRegisterRequest {

    payrollType: string | null;
    payRate: number | null;
    makeUpCredits: boolean | null;
    access?: boolean;
    admin?: boolean;
    manageOtherTeachers?: string[];
    manageSelf?: string[];
    manageStudentsParents?: string[];
    otherPrivileges?: string[];
    permissions?: string[];
    roles?: string[]
}



