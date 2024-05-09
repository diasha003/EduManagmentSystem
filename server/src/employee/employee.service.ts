import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { EmloyeeInfo, PayrollType, Role } from '@prisma/client';

@Injectable()
export class EmployeeService {
    constructor(private readonly prisma: DatabaseService) {}

    getEmployee(emloyeeId: number) {
        //return this.prisma.emloyeeInfo;
    }

    async createEmployee(dto: CreateEmployeeDto) {
        const payroll = await this.prisma.payroll.create({
            data: {
                type: PayrollType[dto.payrollType],
                makeUpCredits: dto.makeUpCredits,
                payRate: dto.payRate
            },
            select: {
                id: true
            }
        });

        const userId = await this.prisma.user.create({
            data: {
                centerName: dto.centerName,
                email: dto.email,
                firstName: dto.firstName,
                lastName: dto.lastName,
                address: dto.address,
                phoneNumber: dto.phoneNumber,
                password: dto.password,
                roles: [Role.TEACHER]
            },
            select: {
                id: true
            }
        });

        //const newEmployee = 
        await this.prisma.emloyeeInfo.create({
            data: {
                payrollId: payroll.id,
                userId: userId.id
            }
        });

        return;
    }
}
