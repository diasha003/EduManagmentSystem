import { Body, Controller, Delete, Get, Headers, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { StudentService } from './student.service';
import { CreateGroups, CreateStudentDto, Student, Group, UpdateGroup } from 'shared/models';

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
