import { Module, forwardRef } from '@nestjs/common';
import { StudentService } from './student.service';
import { StudentController } from './student.controller';
import { DatabaseService } from 'src/database/database.service';
import { JwtService } from '@nestjs/jwt';
import { UserModule } from 'src/user/user.module';

@Module({
    controllers: [StudentController],
    providers: [StudentService, DatabaseService, JwtService],
    imports: [forwardRef(() => UserModule)]
})
export class StudentModule {}
