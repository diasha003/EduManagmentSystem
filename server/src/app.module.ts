import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { AuthModule } from './auth/auth.module';
import { EmployeeModule } from './employee/employee.module';
import { CalendarModule } from './calendar/calendar.module';
import { StudentModule } from './student/student.module';

@Module({
    imports: [
        DatabaseModule,
        UserModule,
        JwtModule,
        ConfigModule.forRoot({ isGlobal: true }),
        AuthModule,
        EmployeeModule,
        CalendarModule,
        StudentModule
    ],
    controllers: [],
    providers: [],
})
export class AppModule {}
