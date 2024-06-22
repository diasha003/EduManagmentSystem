import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Prisma, Role, User } from '@prisma/client';
import { CreateUserDto } from 'shared/models';

import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class UserService {
    constructor(
        private readonly prisma: DatabaseService,
        private readonly jwtService: JwtService
    ) {}

    async createUser(dto: CreateUserDto): Promise<User> {
        return this.prisma.user.create({
            data: dto
        });
    }

    async createWithRoles(dto: CreateUserDto, roles: Role[]): Promise<User> {
        return this.prisma.user.create({
            data: {
                ...dto,
                roles: roles
            }
        });
    }

    async getUserByEmail(email: string): Promise<User> {
        return this.prisma.user.findFirst({
            where: { email }
        });
    }

    async getById(id: number): Promise<User> {
        return this.prisma.user.findFirst({
            where: { id }
        });
    }

    async deleteById(id: number): Promise<User> {
        return await this.prisma.user.delete({
            where: {
                id
            }
        });
    }

    async getAllFamily(headers: any): Promise<User[]> {
        const decoded: { id: number; roles: string[]; centerName: string } = this.jwtService.decode(headers.authorization.split(' ')[1]);

        const allStudents = await this.prisma.user.findMany({
            where: {
                centerName: decoded.centerName,
                roles: {
                    has: Role.FAMILY
                }
            },

            include: {
                studentInfo: true
            }
        });

        const data = allStudents.map((item) => {
            delete item['password'];
            return item;
        });

        return data;
    }

    async getAllUsers(headers: any) {
        const decoded: { id: number; roles: string[]; centerName: string } = this.jwtService.decode(headers.authorization.split(' ')[1]);

        // const allStudents = await this.prisma.user.groupBy({
        //     by: ['centerName', 'centerName']
        // });

        // const query = Prisma.sql`
        //     SELECT ID, FIRST_NAME, LAST_NAME, "centerName", ROLES
        //     FROM PUBLIC."User"
        //     WHERE EXISTS (
        //         SELECT 1
        //         FROM UNNEST(ROLES) AS R
        //         WHERE R = 'STUDENT' OR R = 'TEACHER'
        //     )
        //     GROUP BY ID, FIRST_NAME, LAST_NAME, "centerName"
        //     ORDER BY "centerName"
        // `;

        // const result = await this.prisma.$queryRaw(query);

        const allStudents = await this.prisma.user.findMany({
            where: {
                roles: {
                    hasSome: [Role.STUDENT, Role.TEACHER]
                }
            },
            orderBy: {
                centerName: 'asc'
            }
        });

        return allStudents;
    }
}
