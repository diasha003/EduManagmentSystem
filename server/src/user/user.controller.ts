import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { UserService } from './user.service';

@Controller('auth')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('register')
  async register() {
    //await this.userService.register();
  }

  @Post('login')
  async login(
    @Param('email') email: string,
    @Param('password') password: string,
  ) {
    await this.userService.login(email, password);
  }
}
