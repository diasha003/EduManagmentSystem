import { BadRequestException, Injectable } from '@nestjs/common';

import { CreateGroups, Group, UpdateGroup } from 'shared/models';
import { DatabaseService } from 'src/database/database.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class GroupService {
    constructor(
        private readonly prisma: DatabaseService,

        private readonly jwtService: JwtService
    ) {}

    async createGroup(dto: CreateGroups) {
        const currentGroup = await this.prisma.group.findFirst({
            where: {
                name: dto.name
            }
        });

        if (currentGroup) {
            throw new BadRequestException('Such group name is already exists');
        }

        await this.prisma.$transaction(async (prisma) => {
            const newGroup = await prisma.group.create({
                data: {
                    name: dto.name
                }
            });

            const groupStudents = dto.groupStudents.map((id) => ({
                groupId: newGroup.id,
                studentId: id
            }));

            await prisma.groupStudents.createMany({
                data: groupStudents
            });
        });
    }

    async getAllGroups(headers: any): Promise<Group[]> {
        const decoded: { id: number; roles: string[]; centerName: string } = this.jwtService.decode(headers.authorization.split(' ')[1]);

        const allGroups = await this.prisma.group.findMany({
            include: {
                groupStudents: {
                    include: {
                        student: true
                    }
                }
            }
        });

        return allGroups;
    }

    async deleteGroup(id: number) {
        //console.log(id);
        return await this.prisma.group.delete({
            where: {
                id: id
            }
        });
    }

    async updateGroup(dto: UpdateGroup) {
        const currentGroup = await this.prisma.group.findMany({
            where: {
                name: dto.name
            }
        });

        if (currentGroup.length > 1) {
            throw new BadRequestException('Such group name is already exists');
        }

        await this.prisma.$transaction(async (prisma) => {
            await prisma.group.update({
                where: {
                    id: Number(dto.id)
                },
                data: {
                    name: dto.name
                }
            });

            await prisma.groupStudents.deleteMany({
                where: {
                    groupId: Number(dto.id)
                }
            });

            if (dto.groupStudents && dto.groupStudents.length > 0) {
                const groupsStudents = dto.groupStudents.map((id) => ({
                    groupId: Number(dto.id),
                    studentId: id
                }));

                await prisma.groupStudents.createMany({
                    data: groupsStudents
                });
            }
        });
    }

    async getCountGroups(): Promise<number> {
        return await this.prisma.group.count();
    }

    async getAllRecordGroupTable(data: { skipCount: number; takeCount: number }) {
        return await this.prisma.group.findMany({
            skip: (data.skipCount - 1) * data.takeCount,
            take: Number(data.takeCount),
            include: {
                groupStudents: {
                    include: {
                        student: true
                    }
                }
            }
        });
    }
}
