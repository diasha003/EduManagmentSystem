import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { AuthModule } from './auth/auth.module';
import { EmployeeModule } from './employee/employee.module';
import { CalendarModule } from './calendar/calendar.module';
import { StudentModule } from './student/student.module';
import { PaginationModule } from './pagination/pagination.module';
import { GroupModule } from './group/group.module';
import { PaymentModule } from './payment/payment.module';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from './auth/guards/roles.guard';

@Module({
    imports: [DatabaseModule, UserModule, JwtModule, ConfigModule.forRoot({ isGlobal: true }), AuthModule, EmployeeModule, CalendarModule, StudentModule, PaginationModule, GroupModule, PaymentModule],
    controllers: [],
    providers: [
        {
            provide: APP_GUARD,
            useClass: RolesGuard
        }
    ]
})
export class AppModule {}
