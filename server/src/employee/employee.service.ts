import { BadRequestException, Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { EmployeeInfo, PayrollType, Role, User } from '@prisma/client';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class EmployeeService {
    constructor(
        private readonly prisma: DatabaseService,
        private readonly userService: UserService,
        private readonly jwtService: JwtService
    ) {}

    getEmployee(employeeId: number) {
        //return this.prisma.employeeInfo;
    }

    async createEmployee(dto: CreateEmployeeDto) {
        const candidate = await this.userService.getUserByEmail(dto.email);
        if (candidate) {
            throw new BadRequestException('Such user is already exists');
        }

        if (dto.roles.includes(Role.TEACHER)) {
            return this.createTeacher(dto);
        } else {
            return this.createStaffMember(dto);
        }
    }

    async createTeacher(dto: CreateEmployeeDto) {
        await this.prisma.$transaction(async (prisma) => {
            const payroll = await prisma.payroll.create({
                data: {
                    payrollType: PayrollType[dto.payrollType],
                    makeUpCredits: dto.makeUpCredits,
                    payRate: Number(dto.payRate)
                }
            });

            const userId = await this.userService.createUser({
                email: dto.email,
                firstName: dto.firstName,
                lastName: dto.lastName,
                centerName: dto.centerName,
                phoneNumber: dto.phoneNumber,
                address: dto.address,
                roles: [Role.TEACHER],
                password: dto.password
            });

            await prisma.employeeInfo.create({
                data: {
                    payrollId: payroll.id,
                    userId: userId.id
                }
            });

            const permissions = await prisma.permission.findMany({
                where: {
                    displayName: { in: dto.permissions }
                }
            });

            const permissionsUserData = permissions.map((permission) => ({
                userId: userId.id,
                permissionId: permission.id
            }));

            await prisma.permissionsUser.createMany({
                data: permissionsUserData
            });
        });
    }

    async createStaffMember(dto: CreateEmployeeDto) {
        await this.prisma.$transaction(async (prisma) => {
            const userId = await this.userService.createUser({
                email: dto.email,
                firstName: dto.firstName,
                lastName: dto.lastName,
                centerName: dto.centerName,
                phoneNumber: dto.phoneNumber,
                address: dto.address,
                roles: [Role.STAFF],
                password: dto.password
            });

            const permissions = await prisma.permission.findMany({
                where: {
                    displayName: { in: dto.permissions }
                }
            });

            const permissionsUserData = permissions.map((permission) => ({
                userId: userId.id,
                permissionId: permission.id
            }));

            await prisma.permissionsUser.createMany({
                data: permissionsUserData
            });
        });
    }

    async getAllCenterName(headers: any): Promise<string[]> {
        const decoded: { id: number; roles: string[] } = this.jwtService.decode(headers.authorization.split(' ')[1]);

        if (decoded.roles.includes('ADMIN')) {
            let allCenterName = await this.prisma.user.findMany({
                select: {
                    centerName: true
                },
                distinct: ['centerName']
            });
            return allCenterName.flatMap((obj) => obj.centerName);
        } else {
            return;
        }
    }

    async getAllEmployees(headers: any): Promise<User[]> {
        const decoded: { id: number; roles: string[]; centerName: string } = this.jwtService.decode(headers.authorization.split(' ')[1]);

        let allEmployees = await this.prisma.user.findMany({
            include: {
                employeeInfo: {
                    include: {
                        payroll: true
                    }
                }
            },
            where: {
                // NOT: {
                //     employeeInfo: { none: {} }
                // },

                centerName: {
                    equals: decoded.centerName
                }
            }
        });

        const data = allEmployees.map((item) => {
            delete item['password'];
            return item;
        });

        return data;
    }

    async deleteEmployee(id: number): Promise<User> {
        return await this.userService.deleteById(id);
    }
}
