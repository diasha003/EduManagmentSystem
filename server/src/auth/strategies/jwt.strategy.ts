import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UserService } from '../../user/user.service';
import { User } from '@prisma/client';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(private readonly userService: UserService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: '123456'
        });
    }

    async validate({ id }: Pick<User, 'id'>) {
        //console.log('sdfg', id);
        const user = this.userService.getById(id);

        if (!user) {
            throw new UnauthorizedException();
        }
        return user;
    }
}
