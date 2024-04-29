import { Body, Controller, Post, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/user/dto/create-user.dto';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('/register')
    async register(@Body() dto: CreateUserDto) {
        //return this.authService.register(dto);
    }

    @Post('/login')
    async login(@Body() dto: CreateUserDto) {
        //return this.authService.login(dto.email, dto.password);
    }
}
