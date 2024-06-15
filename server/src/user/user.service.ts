import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Role, User } from '@prisma/client';
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
}
