import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { EmployeeService } from './employee.service';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { EmloyeeInfo } from '@prisma/client';

@Controller('employee')
export class EmployeeController {
    constructor(private readonly employeeService: EmployeeService) {}

    @Get('/')
    async getEmployees() {}

    @Get(':id')
    async getEmployee(@Param('id') id: number) {
        return this.employeeService.getEmployee(id);
    }

    //auth
    @Post('/')
    async createEmployee(@Body() dto: CreateEmployeeDto){
        return this.employeeService.createEmployee(dto);
    }

    @Patch(':id')
    async updateInfoEmployee() {}

    @Delete(':id')
    async deleteEmployee() {}
}
