import { PartialType } from '@nestjs/mapped-types';
import { IsBoolean, IsNumber, IsOptional, IsString, IsEmpty } from 'class-validator';
import { CreateUserDto } from 'src/user/dto/create-user.dto';

export class CreateEmployeeDto extends PartialType(CreateUserDto) {
    @IsString()
    payrollType: string;

    payRate: number | null;

    makeUpCredits: boolean | null;
}
