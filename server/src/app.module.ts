import { Module } from '@nestjs/common';
import { StudentModule } from './student/student.module';
import { PrismaModule } from './prisma/prisma.module';
import { EmployeeModule } from './employee/employee.module';

@Module({
  imports: [StudentModule, PrismaModule, EmployeeModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
