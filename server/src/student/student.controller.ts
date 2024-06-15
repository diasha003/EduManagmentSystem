import { Body, Controller, Get, Headers, Post } from '@nestjs/common';
import { StudentService } from './student.service';
import { CreateStudentDto, Student } from 'shared/models';
import { User } from '@prisma/client';

@Controller('student')
export class StudentController {
    constructor(private readonly studentService: StudentService) {}

    //auth
    @Post('/')
    async createStudent(@Body() dto: CreateStudentDto) {
        return this.studentService.createStudent(dto);
    }

    //auth
    @Get('/')
    async getAllStudents(@Headers() headers: any): Promise<Student[]> {
        return await this.studentService.getAllStudents(headers);
    }
}
