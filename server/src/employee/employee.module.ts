import { Module } from '@nestjs/common';
import { EmployeeService } from './employee.service';
import { EmployeeController } from './employee.controller';
import { DatabaseService } from 'src/database/database.service';

@Module({
    controllers: [EmployeeController],
    providers: [EmployeeService, DatabaseService]
})
export class EmployeeModule {}
