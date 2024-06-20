import { Module, forwardRef } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from 'src/user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { JwtStrategy } from './strategies/jwt.strategy';
import { PassportModule } from '@nestjs/passport';

@Module({
    controllers: [AuthController],
    providers: [AuthService, JwtStrategy],
    imports: [
        forwardRef(() => UserModule),
        JwtModule.register({
            secret: '123456',
            signOptions: {
                expiresIn: '3h'
            }
        })
    ],

    exports: [AuthService, JwtModule]
})
export class AuthModule {}
