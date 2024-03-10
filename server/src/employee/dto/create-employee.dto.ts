import { PayrollType, StatusEmployee, TypeEmployee } from "@prisma/client";
import { IsEmail, IsEnum, IsOptional, IsString } from "class-validator";


export class CreateEmployeeDto {

    @IsString()
    firstName: string;

    @IsString()
    lastName: string;

    @IsEmail()
    email: string;

    @IsString()
    @IsOptional()
    phoneNumber?: string;

    @IsString()
    @IsOptional()
    address?: string;

    @IsEnum(TypeEmployee)
    type: TypeEmployee;

    @IsEnum(StatusEmployee)
    status: StatusEmployee

    @IsEnum(PayrollType)
    payrollType: PayrollType

}