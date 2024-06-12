import { Billing, Gender, Status, Type } from '../enums';
import { CreateUserDto, User } from './_user.dto';
export interface Student extends User {
    studentInfo?: {
        status: string;
        note: string;
        gender?: string;
        institution?: string;
        dateRegister?: Date;
        birthdayDate?: Date;
    };
}
export declare class CreateStudentDto extends CreateUserDto {
    birthdayDate?: Date;
    dateRegister?: Date;
    avatarUrl?: string;
    gender?: Gender;
    institution?: string;
    type: Type;
    skills?: string[];
    familyExist?: number;
    status: Status;
    note?: string;
    parentLastName?: string;
    parentFirstName?: string;
    parentEmail?: string;
    parentPhoneNumber?: string;
    parentAddress?: string;
}
export declare class AssignTeacherInfo {
    assignTeacherId?: number;
    defaultLessonCategory?: string;
    defaultLessonLength?: number;
    defaultBilling?: Billing;
    defaultPrice?: number;
}
