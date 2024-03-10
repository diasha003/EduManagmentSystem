import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateEmployeeDto } from './dto/create-employee.dto';

@Injectable()
export class EmployeeService {
    constructor(private readonly prisma: PrismaService) { }


    async createEmployee(dto: CreateEmployeeDto) {
        return this.prisma.employee.create({
            data: {...dto}
        })

    }
}
