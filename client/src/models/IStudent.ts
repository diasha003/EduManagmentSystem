export interface IStudent{
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber?: number;
    gender_id: number;
    birthdayDate: Date;
    educational_type_id: number;
    group_id: number;
    status_id: number;
    address: string;
    student_type_id: number;
    family_id: number;
    photo_url?: string
}
