import { Controller } from '@nestjs/common';
import { DatabaseService } from './database.service';

@Controller('prisma')
export class DatabaseController {
    constructor(private readonly prismaService: DatabaseService) {}
}
