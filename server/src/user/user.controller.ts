import { Controller, Get, Headers } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from '@prisma/client';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}

     //auth
     @Get('/family')
     async getAllFamily(@Headers() headers: any): Promise<User[]> {
         return await this.userService.getAllFamily(headers);
     }


}
