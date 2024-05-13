import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import { Role, User } from '@prisma/client';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UserService,
        private readonly jwtService: JwtService
    ) {}

    async login(email: string, password: string) {
        const user = await this.validateUser(email, password);

        return {
            user,
            token: await this.generateToken(user.id, user.roles, user.centerName)
        };
    }

    async register(createUserDto: CreateUserDto) {
        const canditate = await this.userService.getUserByEmail(createUserDto.email);
        if (canditate) {
            throw new BadRequestException('Such user is already exists');
        }

        const salt = 10;
        const hashPassword = await bcrypt.hash(createUserDto.password, salt);

        const newUser = await this.userService.createUser({
            ...createUserDto,
            password: hashPassword
        });

        return {
            ...newUser,
            token: await this.generateToken(newUser.id, newUser.roles, newUser.centerName)
        };
    }

    private async generateToken(id: number, roles: Role[], centerName: string): Promise<string> {
        const accessToken = await this.jwtService.signAsync({ id, roles, centerName });
        //console.log(accessToken)
        return accessToken;
    }

    private async validateUser(email: string, password: string): Promise<User> {
        const currentUser = await this.userService.getUserByEmail(email);

        if (!currentUser) {
            throw new BadRequestException('Invalid email');
        }

        const isEquals = await bcrypt.compare(password, currentUser.password);

        if (!isEquals) {
            throw new BadRequestException('Invalid password');
        }

        return currentUser;
    }
}
