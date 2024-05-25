import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Role } from '@prisma/client';
import { CreateStudentDto } from 'shared/models';
import { DatabaseService } from 'src/database/database.service';
import { UserService } from 'src/user/user.service';

@Injectable()
export class StudentService {
    constructor(
        private readonly prisma: DatabaseService,
        private readonly userService: UserService,
        private readonly jwtService: JwtService
    ) {}

    async createEmployee(dto: CreateStudentDto) {
        const candidate = await this.userService.getUserByEmail(dto.email);
        if (candidate) {
            throw new BadRequestException('Such user is already exists');
        }

        // const userId = await this.userService.createWithRoles(
        //     {
        //         email: dto.email,
        //         firstName: dto.firstName,
        //         lastName: dto.lastName,
        //         centerName: dto.centerName,
        //         phoneNumber: dto.phoneNumber,
        //         address: dto.address,
        //         password: dto.password
        //     },
        //     [Role.STUDENT]
        // );
    }
}
