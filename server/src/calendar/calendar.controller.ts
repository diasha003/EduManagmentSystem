import { Body, Controller, Get, Param, ParseIntPipe, Post } from '@nestjs/common';
import { EventsFilter, EventDto } from 'shared/models';

import { CalendarService } from './calendar.service';
import { CreateEventDto } from 'shared/models/_calendar.dto';

@Controller('calendar')
export class CalendarController {
    constructor(private readonly service: CalendarService) {}

    @Post('/event')
    async createEvent(@Body() dto: CreateEventDto) {
        return await this.service.createEvent(dto);
    }

    @Post('/search')
    async getEvents(@Body() dto: EventsFilter) {
        const res = await this.service.getEvents(dto);
        return res;
    }

    @Get('/:eventId')
    async getEventDetails(@Param('eventId', ParseIntPipe) eventId: number) {
        const res = await this.service.getEventDetails(eventId);
        return res;
    } 
}
