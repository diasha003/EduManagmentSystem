import { Module, forwardRef } from '@nestjs/common';
import { EmployeeService } from './employee.service';
import { EmployeeController } from './employee.controller';
import { DatabaseService } from 'src/database/database.service';
import { UserModule } from 'src/user/user.module';
import { JwtService } from '@nestjs/jwt';

@Module({
    controllers: [EmployeeController],
    providers: [EmployeeService, DatabaseService, JwtService],
    imports: [forwardRef(() => UserModule)]
})
export class EmployeeModule {}
