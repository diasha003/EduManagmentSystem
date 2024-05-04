import { Controller, Delete, Get, Patch, Post } from '@nestjs/common';
import { EmployeeService } from './employee.service';

@Controller('employee')
export class EmployeeController {
  constructor(private readonly employeeService: EmployeeService) {}


  @Get('/')
  async getEmployees(){

  }

  @Get(":id")
  async getEmployee(){

  }

  @Post("")
  async createEmployee(){

  }

  @Patch(":id")
  async updateInfoEmployee(){

  }

  @Delete(":id")
  async deleteEmployee(){

  }


}
