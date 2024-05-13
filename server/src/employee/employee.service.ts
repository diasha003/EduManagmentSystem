import { BadRequestException, Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { EmloyeeInfo, PayrollType, Role, User } from '@prisma/client';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class EmployeeService {
    constructor(
        private readonly prisma: DatabaseService,
        private readonly userService: UserService,
        private readonly jwtService: JwtService
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

        const permissionsUserData = permissions.map((permission) => ({
            userId: userId.id,
            permissionId: permission.id
        }));

        await this.prisma.permissionsUser.createMany({
            data: permissionsUserData
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
                emloyeeInfo: {
                    include: {
                        payroll: true
                    }
                }
            },
            where: {
                NOT: {
                    emloyeeInfo: { none: {} }
                },

                centerName: {
                    equals: decoded.centerName
                }
            }
        });

        const data = allEmployees.map((item) => {
            delete item['password'];
            return item;
        });

        console.log(data)

        return data;
    }
}
