import { Body, Controller, Delete, Get, Headers, Param, ParseIntPipe, Patch, Post, UseGuards } from '@nestjs/common';
import { StudentService } from './student.service';
import { CreateStudentDto, Student } from 'shared/models';
import { Auth } from 'src/auth/guards/auth.guard';
import { CheckRolesDecorator } from 'src/auth/decorators/check-roles.decorator';
import { Role } from '@prisma/client';

@Controller('student')
export class StudentController {
    constructor(private readonly studentService: StudentService) {}

    @Post('/')
    async createStudent(@Body() dto: CreateStudentDto) {
        return this.studentService.createStudent(dto);
    }

    @Auth()
    @CheckRolesDecorator(Role.ADMIN)
    @Get('/')
    async getAllStudents(@Headers() headers: any): Promise<Student[]> {
        return await this.studentService.getAllStudents(headers);
    }
}
