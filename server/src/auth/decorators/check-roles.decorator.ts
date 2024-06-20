import { UseGuards, applyDecorators } from '@nestjs/common';
import { Role } from '@prisma/client';
import { RolesDecorator } from './role.decorator';
import { RolesGuard } from '../guards/roles.guard';

export const CheckRolesDecorator = (...roles: Role[]) => {
    return applyDecorators(RolesDecorator(...roles), UseGuards(RolesGuard));
};
