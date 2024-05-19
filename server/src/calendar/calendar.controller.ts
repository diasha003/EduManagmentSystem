import { Body, Controller, Post } from '@nestjs/common';
import { EventsFilter, EventDto } from 'shared/models';

import { CalendarService } from './calendar.service';

@Controller('calendar')
export class CalendarController {
    constructor(private readonly service: CalendarService) {}

    @Post('/event')
    async createEvent(@Body() dto: EventDto) {
        return await this.service.createEvent(dto);
    }

    @Post('/search')
    async getEvents(@Body() dto: EventsFilter) {
        const res = await this.service.getEvents(dto);
        return res;
    }
}
