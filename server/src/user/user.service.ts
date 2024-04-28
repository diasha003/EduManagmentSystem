import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { DatabaseService } from 'src/database/database.service';
import { Role, User } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserService {
    constructor(
        private readonly prisma: DatabaseService,
        private readonly jwtService: JwtService
    ) {}

    async login(email: string, password: string) {
        const user = await this.validateUser(email, password);

        return { ...user, token: this.generateToken(user.id, user.roles) };
    }

    async register(createUserDto: CreateUserDto) {
        const canditate = await this.getUserByEmail(createUserDto.email);

        if (canditate) {
            throw new BadRequestException('уже существует с таким email');
        }

        const salt = 10;
        const hashPassword = await bcrypt.hash(createUserDto.password, salt);

        let newUser = await this.prisma.user.create({
            data: { ...createUserDto, password: hashPassword }
        });

        return { ...newUser, token: this.generateToken(newUser.id, newUser.roles) };
    }

    async getUserByEmail(email: string): Promise<User> {
        return this.prisma.user.findFirst({
            where: { email }
        });
    }

    private async validateUser(email: string, password: string): Promise<User> {
        const currentUser = await this.getUserByEmail(email);

        if (!currentUser) {
            throw new BadRequestException('Invalid email');
        }

        const isEquals = await bcrypt.compare(password, currentUser.password);

        if (!isEquals) {
            throw new BadRequestException('Invalid password');
        }

        return currentUser;
    }

    private async generateToken(id: number, roles: Role[]): Promise<string> {
        const accessToken = await this.jwtService.signAsync(
            { id, roles },
            {
                expiresIn: '1h'
            }
        );
        return accessToken;
    }
}
