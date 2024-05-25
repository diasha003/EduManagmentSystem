import { Gender, Type } from '../enums';
import { CreateUserDto } from './_user.dto';

export class CreateStudentDto extends CreateUserDto {
    birthdayDate?: Date;
    dateRegister?: Date;
    avatarUrl?: string;
    gender?: Gender;
    institution?: string;
    type: Type;
    skills?: string[];
}
