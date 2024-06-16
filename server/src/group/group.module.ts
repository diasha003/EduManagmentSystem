import { Module } from '@nestjs/common';
import { GroupService } from './group.service';
import { GroupController } from './group.controller';
import { DatabaseService } from 'src/database/database.service';
import { JwtService } from '@nestjs/jwt';

@Module({
    controllers: [GroupController],
    providers: [GroupService, DatabaseService, JwtService]
})
export class GroupModule {}
