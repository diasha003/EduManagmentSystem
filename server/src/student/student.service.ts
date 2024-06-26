import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Billing, Gender, Role, Status, Type, User } from '@prisma/client';
import { CreateGroups, CreateStudentDto, Group, Student } from 'shared/models';
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

            //console.log(dto);
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
            } else if (Type[dto.type] !== Type.adult) {
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
            } else {
                await this.prisma.user.update({
                    where: {
                        id: user.id
                    },
                    data: {
                        roles: [Role.FAMILY, Role.STUDENT]
                    }
                });

                await prisma.familyStudents.create({
                    data: {
                        parentId: user.id,
                        studentId: user.id
                    }
                });
            }

            if (dto.assignedTeachers) {
                const assignedTeacherStudent = dto.assignedTeachers.map((value) => ({
                    teacherId: Number(value.assignTeacherId),
                    studentId: user.id,
                    defaultLessonCategory: value.defaultLessonCategory,
                    defaultLessonLength: Number(value.defaultLessonLength),
                    defaultBilling: Billing[value.defaultBilling],
                    defaultPrice: Number(value.defaultPrice)
                }));

                await prisma.teacherStudent.createMany({
                    data: assignedTeacherStudent
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
                studentInfo: true,
                familyStudentsAsStudent: {
                    include: {
                        parent: true
                    }
                },
                groupStudents: {
                    include: {
                        student: false,
                        group: true
                    }
                },
                teacherStudentAsTeacher: {
                    include: {
                        teacher: true
                    }
                }
            }
        });

        const data = allStudents.map((item) => {
            delete item['password'];
            return item;
        });

        return data;
    }

    async getStudent(headers: any, studentId: number): Promise<Student> {
        const decoded: { id: number; roles: string[]; centerName: string } = this.jwtService.decode(headers.authorization.split(' ')[1]);

        const currentUser = await this.prisma.user.findFirstOrThrow({
            where: {
                id: studentId
            },

            include: {
                studentInfo: true,
                familyStudentsAsStudent: {
                    select: {
                        parent: true,
                        parentId: true,
                        studentId: true
                    }
                },
                groupStudents: {
                    include: {
                        student: false,
                        group: true
                    }
                },
                teacherStudentAsTeacher: {
                    select: {
                        defaultBilling: true,
                        defaultLessonCategory: true,
                        defaultLessonLength: true,
                        defaultPrice: true,
                        teacher: true
                    }
                }
            }
        });

        delete currentUser['password'];

        return currentUser ;
    }
}
