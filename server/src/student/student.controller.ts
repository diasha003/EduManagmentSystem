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
    @Post('/group')
    async createGroup(@Body() dto: CreateGroups) {
        return this.studentService.createGroup(dto);
    }

    //auth
    @Get('/')
    async getAllStudents(@Headers() headers: any): Promise<Student[]> {
        return await this.studentService.getAllStudents(headers);
    }

    /////groups and students

    //auth
    @Get('/groups')
    async getAllGroups(@Headers() headers: any): Promise<Group[]> {
        return await this.studentService.getAllGroups(headers);
    }

    //@Auth()
    @Patch('/updateGroup')
    async updatePost(@Body() dto: UpdateGroup) {
        console.log('da');
        //return this.studentService.updateGroup(id, dto);
    }

    //@Auth()
    @Delete('/group/:id')
    async deleteComment(@Param('id', ParseIntPipe) id: number) {
        return this.studentService.deleteGroup(id);
    }
}
