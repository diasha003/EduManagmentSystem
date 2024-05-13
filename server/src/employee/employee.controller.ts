import { Body, Controller, Delete, Get, Headers, Param, Patch, Post, Query } from '@nestjs/common';
import { EmployeeService } from './employee.service';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { User } from '@prisma/client';

@Controller('employee')
export class EmployeeController {
    constructor(private readonly employeeService: EmployeeService) {}

    //auth
    @Get('/')
    async getEmployees(@Headers() headers: any): Promise<User[]> {
        return await this.employeeService.getAllEmployees(headers);
    }

    //auth
    @Get('/allCenterName')
    async getAllCenterName(@Headers() headers: any): Promise<string[]> {
        return await this.employeeService.getAllCenterName(headers);
    }

    @Get(':id')
    async getEmployee(@Param('id') id: number) {
        return this.employeeService.getEmployee(id);
    }

    //auth
    @Post('/')
    async createEmployee(@Body() dto: CreateEmployeeDto) {
        return this.employeeService.createEmployee(dto);
    }

    @Patch(':id')
    async updateInfoEmployee() {}

    @Delete(':id')
    async deleteEmployee() {}
}
