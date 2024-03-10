import { Controller, Delete } from '@nestjs/common';
import { StudentService } from './student.service';

@Controller('student')
export class StudentController {
  constructor(private readonly studentService: StudentService) {


    // @Get()
    // async getAllStudents(){
    //   return
    // }

    // @Get(":id")
    // async getStudentInfo(){
    //   return
    // }

    // @Delete(":id")
    // async deleteUser(){

    // }
  }
}
