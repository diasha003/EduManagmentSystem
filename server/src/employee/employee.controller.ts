import { Body, Controller, Delete, Get, Headers, Param, ParseIntPipe, Post } from '@nestjs/common';
import { User } from '@prisma/client';
import { CreateEmployeeDto } from 'shared/models';

import { EmployeeService } from './employee.service';

@Controller('employee')
export class EmployeeController {
    constructor(private readonly employeeService: EmployeeService) {}

    //auth
    @Get('/')
    async getEmployees(@Headers() headers: any): Promise<User[]> {
        return await this.employeeService.getAllEmployees(headers);
    }

    @Get('teachers')
    async getAllTeachers(@Headers() headers: any): Promise<User[]> {
        return await this.employeeService.getAllTeachers(headers);
    }

    //auth
    @Get('/allCenterName')
    async getAllCenterName(@Headers() headers): Promise<string[]> {
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

    //auth
    @Delete(':id')
    async deleteEmployee(@Param('id', new ParseIntPipe()) id: number) {
        return this.employeeService.deleteEmployee(id);
    }

    // @Patch(':id')
    // async updateInfoEmployee() {}
}
