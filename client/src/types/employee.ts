import { IUser } from './user';

export interface IEmployee extends IUser {
    employeeInfo?: {
        payroll?: {
            payrollType: string;
            payRate: number | null;
            makeUpCredits: string | boolean;
        };
    };
}
