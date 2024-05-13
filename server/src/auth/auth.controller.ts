import { Body, Controller, Get, Post, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/user/dto/create-user.dto';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('/register')
    async register(@Body() dto: CreateUserDto) {
        return await this.authService.register(dto);
    }

    @Post('/login')
    async login(@Body() dto: CreateUserDto) {
        //const userData = await this.authService.login(dto.email, dto.password);
        return await this.authService.login(dto.email, dto.password);
    }

 
}
