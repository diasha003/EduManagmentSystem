import { CreateUserDto, User } from './_user.dto';
export declare class CreateEmployeeDto extends CreateUserDto {
    payrollType: string | null;
    payRate: number | null;
    makeUpCredits: string | null;
    manageOtherTeachers?: string[];
    manageSelf?: string[];
    manageStudentsParents?: string[];
    otherPrivileges?: string[];
    permissions?: string[];
}
export interface Employee extends User {
    employeeInfo?: {
        payroll?: {
            payrollType: string;
            payRate: number | null;
            makeUpCredits: string | boolean;
        };
    };
}
