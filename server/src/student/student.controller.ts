import { Body, Controller, Post } from '@nestjs/common';
import { StudentService } from './student.service';
import { CreateStudentDto } from 'shared/models';

@Controller('student')
export class StudentController {
  constructor(private readonly studentService: StudentService) {}

   //auth
   @Post('/')
   async createStudent(@Body() dto: CreateStudentDto) {
       //return this.employeeService();
       return 
   }
}
