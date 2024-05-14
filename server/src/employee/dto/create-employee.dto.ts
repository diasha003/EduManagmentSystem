import { PartialType } from '@nestjs/mapped-types';
import { IsString } from 'class-validator';
import { CreateUserDto } from 'src/user/dto/create-user.dto';

export class CreateEmployeeDto extends CreateUserDto {
    payrollType: string | null;

    payRate: number | null;

    makeUpCredits: string | null;

    permissions: string[];
}
