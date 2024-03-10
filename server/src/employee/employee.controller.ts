import { Body, Controller, Post } from '@nestjs/common';
import { EmployeeService } from './employee.service';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { dot } from 'node:test/reporters';

@Controller('employee')
export class EmployeeController {
  constructor(private readonly employeeService: EmployeeService) {}


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


    
    @Post()
    async createEmployee(@Body() dto: CreateEmployeeDto){

      return this.employeeService.createEmployee(dto);


    }



  
}
