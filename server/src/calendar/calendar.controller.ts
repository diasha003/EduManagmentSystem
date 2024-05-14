import { Body, Controller, Post } from '@nestjs/common';
import { CalendarService } from './calendar.service';
import { EventDto } from './dto/event.dto';
import { EventsFilter } from './dto/events-filter.dto';

@Controller('calendar')
export class CalendarController {
    constructor(private readonly service: CalendarService) {}

    @Post('/event')
    async createEvent(@Body() dto: EventDto) {
        console.log(dto);
        return await this.service.createEvent(dto);
    }

    @Post('/search')
    async getEvents(@Body() dto: EventsFilter) {
        console.log(dto)
        const res = await this.service.getEvents(dto);
        console.log(res)
        return res;
    }
}
