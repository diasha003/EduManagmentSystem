import { Module } from '@nestjs/common';
import { CalendarService } from './calendar.service';
import { CalendarController } from './calendar.controller';
import { DatabaseService } from 'src/database/database.service';

@Module({
    controllers: [CalendarController],
    providers: [CalendarService, DatabaseService],
    exports: [CalendarService],
})
export class CalendarModule {}
