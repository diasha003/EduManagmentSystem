import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

import { Role, User } from '@prisma/client';
import { Observable } from 'rxjs';
import { ROLES_KEY } from '../decorators/role.decorator';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(
        private readonly jwtService: JwtService,
        private readonly reflector: Reflector
    ) {}

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        try {
            const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [context.getHandler(), context.getClass()]);

            if (!requiredRoles) return true;

            const request = context.switchToHttp().getRequest<Request>();

            const authHeader = request.headers.authorization;

            if (!authHeader) {
                throw new UnauthorizedException('Unauthorized');
            }

            const bearer = authHeader.split(' ')[0];
            const token = authHeader.split(' ')[1];

            if (bearer === 'false' || token === 'false') {
                throw new UnauthorizedException('Unauthorized');
            }

            const decoded: { id: number; roles: string[]; centerName: string } = this.jwtService.decode(token);

            request.user = decoded;

            return decoded.roles.some((role) => requiredRoles.includes(Role[role]));
        } catch (error) {
            throw new UnauthorizedException(error.message);
        }
    }
}
