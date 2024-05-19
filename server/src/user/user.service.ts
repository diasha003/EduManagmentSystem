import { Injectable } from '@nestjs/common';
import { Role, User } from '@prisma/client';
import { CreateUserDto } from 'shared/models';

import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class UserService {
    constructor(private readonly prisma: DatabaseService) {}

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
}
