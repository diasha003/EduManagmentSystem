import { Module, forwardRef } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { DatabaseService } from 'src/database/database.service';
import { JwtService } from '@nestjs/jwt';
import { AuthModule } from 'src/auth/auth.module';

@Module({
    controllers: [UserController],
    providers: [UserService, DatabaseService],
    exports: [UserService],
    imports: [forwardRef(() => AuthModule)],
})
export class UserModule {}
