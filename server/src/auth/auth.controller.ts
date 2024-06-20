import { CreateUserDto } from 'shared/models';
import { Body, Controller, HttpStatus, Post, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('/register')
    async register(@Body() dto: CreateUserDto) {
        return await this.authService.register(dto);
    }

    @Post('/login')
    async login(@Body() dto: CreateUserDto, @Res({ passthrough: true }) res: Response) {
        return await this.authService.login(dto.email, dto.password, res);
    }
}
