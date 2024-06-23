import { Billing, Gender, Status, Type } from '../enums';
import { Employee } from './_employee.dto';
import { CreateUserDto, User } from './_user.dto';

export interface Student extends User {
    studentInfo?: {
        status: string;
        note: string;
        //lastLesson
        //nextLesson
        //Attendance Average
        gender?: string;
        institution?: string;
        dateRegister?: Date;
        birthdayDate?: Date;
    };
    familyStudentsAsStudent?: { parent: User; parentId: number; studentId: number }[];
    groupStudents?: { group: Group }[];
    teacherStudentAsTeacher?: { teacher: Employee; defaultLessonCategory: string; defaultLessonLength: number; defaultBilling: string; defaultPrice?: number }[];
}

export class CreateStudentDto extends CreateUserDto {
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
    assignedTeachers?: AssignTeacherInfo[];
    parentLastName?: string;
    parentFirstName?: string;
    parentEmail?: string;
    parentPhoneNumber?: string;
    parentAddress?: string;
}

export class AssignTeacherInfo {
    assignTeacherId?: number;
    defaultLessonCategory?: string;
    defaultLessonLength?: number;
    defaultBilling?: Billing;
    defaultPrice?: number;
}

export class CreateGroups {
    name: string;
    groupStudents?: number[];
}

export class Group {
    id: number;
    name: string;
    groupStudents?: {
        groupId: number;
        student: User;
    }[];
}
export class UpdateGroup {
    id: number;
    name: string;
    groupStudents?: number[];
}
