import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';

import { DatabaseService } from 'src/database/database.service';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UserService {
    constructor(private readonly prisma: DatabaseService) {}

    async createUser(dto: CreateUserDto): Promise<User> {
        return this.prisma.user.create({
            data: dto
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
