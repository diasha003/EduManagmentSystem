import { BadRequestException, Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { EmloyeeInfo, PayrollType, Role } from '@prisma/client';
import { UserService } from 'src/user/user.service';

@Injectable()
export class EmployeeService {
    constructor(
        private readonly prisma: DatabaseService,
        private readonly userService: UserService
    ) {}

    getEmployee(emloyeeId: number) {
        //return this.prisma.emloyeeInfo;
    }

    async createEmployee(dto: CreateEmployeeDto) {
        console.log(dto);

        const candidate = await this.userService.getUserByEmail(dto.email);
        if (candidate) {
            throw new BadRequestException('Such user is already exists');
        }

        const payroll = await this.prisma.payroll.create({
            data: {
                type: PayrollType[dto.payrollType],
                makeUpCredits: dto.makeUpCredits,
                payRate: Number(dto.payRate)
            }
        });

        const userId = await this.userService.createUser({
            ...dto,
            roles: [Role.TEACHER]
        });

        await this.prisma.emloyeeInfo.create({
            data: {
                payrollId: payroll.id,
                userId: userId.id
            }
        });

        const permissions = await this.prisma.permission.findMany({
            where: {
                displayName: { in: dto.permissions }
            }
        });

        const permissionsUserData = permissions.map(permission => ({
            userId: userId.id,
            permissionId: permission.id
        }));
        
        await this.prisma.permissionsUser.createMany({
            data: permissionsUserData
        });
    }
}
