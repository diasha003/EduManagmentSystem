import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Gender, Role, Status, Type } from '@prisma/client';
import { CreateStudentDto, Student } from 'shared/models';
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

        await this.prisma.$transaction(async (prisma) => {
            const user = await this.userService.createWithRoles({ email: dto.email, firstName: dto.firstName, lastName: dto.lastName, centerName: dto.centerName, phoneNumber: dto.phoneNumber, address: dto.address, password: dto.password }, [Role.STUDENT]);

            console.log(dto)
            await prisma.studentInfo.create({
                data: {
                    userId: user.id,
                    type: Type[dto.type],
                    gender: Gender[dto.gender],
                    status: Status[dto.status],
                    birthdayDate: dto.birthdayDate,
                    dateRegister: dto.dateRegister,
                    institution: dto.institution,
                    skills: dto.skills,
                    note: dto.note
                }
            });

            if (dto.familyExist) {
                //переделать скорее всего
                await prisma.familyStudents.create({
                    data: {
                        parentId: dto.familyExist,
                        studentId: user.id
                    }
                });
            } else {
                const parent = await this.userService.createWithRoles(
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

                await prisma.familyStudents.create({
                    data: {
                        parentId: parent.id,
                        studentId: user.id
                    }
                });
            }
        });
    }

    async getAllStudents(headers: any): Promise<Student[]> {
        const decoded: { id: number; roles: string[]; centerName: string } = this.jwtService.decode(headers.authorization.split(' ')[1]);

        const allStudents = await this.prisma.user.findMany({
            where: {
                centerName: decoded.centerName,
                roles: {
                    has: Role.STUDENT
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

        console.log(data)
        
    
        return data;
    }
}
