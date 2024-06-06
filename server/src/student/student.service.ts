import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Gender, Role, Type } from '@prisma/client';
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

    async createStudent(dto: CreateStudentDto) {
        const candidate = await this.userService.getUserByEmail(dto.email);
        if (candidate) {
            throw new BadRequestException('Such user is already exists');
        }

        const studentId = await this.userService.createWithRoles(
            {
                email: dto.email,
                firstName: dto.firstName,
                lastName: dto.lastName,
                centerName: dto.centerName,
                phoneNumber: dto.phoneNumber,
                address: dto.address,
                password: dto.password
            },
            [Role.STUDENT]
        );


      if (dto.familyExist){

      } else{
        const parentId = await this.userService.createWithRoles(
            {
                email: dto.parentEmail,
                firstName: dto.parentFirstName,
                lastName: dto.parentLastName,
                centerName: dto.centerName,
                phoneNumber: dto.parentPhoneNumber,
                address: dto.parentAddress,
            password: dto.password
            },
            [Role.FAMILY]
        );

      }


        console.log(dto)
        // await this.prisma.$transaction(async (prisma) => {
        //     const user = await this.userService.createWithRoles(
        //         {
        //             email: dto.email,
        //             firstName: dto.firstName,
        //             lastName: dto.lastName,
        //             centerName: dto.centerName,
        //             phoneNumber: dto.phoneNumber,
        //             address: dto.address,
        //             password: dto.password
        //         },
        //         [Role.STUDENT]
        //     );

            

        //     await prisma.studentInfo.create({
        //         data: {
        //             type: Type[dto.type],
        //             birthdayDate: dto.birthdayDate,
        //             dateRegister: dto.dateRegister,
        //             gender: Gender[dto.gender],
        //             userId: user.id,
        //             institution: dto.institution,
        //             skills: dto.skills
        //         }
        //     });
        // });
    }
}
