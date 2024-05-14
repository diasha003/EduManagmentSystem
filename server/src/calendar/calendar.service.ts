import { Injectable } from '@nestjs/common';
import { CalendarEvent, PrismaClient } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';
import { EventDto } from './dto/event.dto';
import { UserService } from 'src/user/user.service';
import { EventsFilter } from './dto/events-filter.dto';
import DateTimeService from 'src/common/DateTimeService';

@Injectable()
export class CalendarService {
    constructor(private readonly prisma: DatabaseService) {}

    async createEvent(dto: EventDto) {
        const event = this.prisma.calendarEvent.create({
            data: {
                ...dto
            }
        });

        return event;
    }

    async getEvents(dto: EventsFilter) {
        const now = new Date();

        const events = await this.prisma.calendarEvent.findMany({
            where: {
                AND: [
                    {
                        OR: [{ teacherId: dto.userId }, { studentId: dto.userId }]
                    },
                    {
                        OR: [
                            { frequency: null },
                            {
                                OR: [
                                    { repeatUntil: null },
                                    {
                                        repeatUntil: {
                                            gte: now
                                        }
                                    }
                                ]
                            }
                        ]
                    }
                ]
            },
            orderBy: {
                date: 'asc'
            }
        });

        console.log(events);

        const result = this.buildEvents(events, dto);
        return result.sort((a, b) => a.date.getTime() - b.date.getTime());
    }

    private buildEvents(source: CalendarEvent[], filter: EventsFilter) {
        const daysBetween = DateTimeService.daysBetween(new Date(filter.dateFrom), new Date(filter.dateTo));
        const result: EventDto[] = [];
        const dailyRepeatableEvents: CalendarEvent[] = source.filter((x) => x.frequency === 'Daily');
        const weeklyRepeatableEvents: CalendarEvent[] = [];
        const monthlyRepeatableEvents: CalendarEvent[] = [];

        for (let day of daysBetween) {
            const appliableDailyEvents = dailyRepeatableEvents.filter((x) => x.date <= day);
            const dailyRepeatedEvents = this.buildApplicableDailyEvents(day, appliableDailyEvents);
            result.push(...dailyRepeatedEvents.map((x) => ({ ...x }) as EventDto));

            const events = source.filter((x) => DateTimeService.isSameDate(day, x.date));
            for (let event of events) {
                if (events) {
                    result.push({
                        ...event
                    });
                }
            }
        }

        return result;
    }

    private buildApplicableDailyEvents(day: Date, dailyRepeatableEvents: CalendarEvent[]) {
        const freshEvents = dailyRepeatableEvents.filter((x) => !x.repeatUntil || x.repeatUntil > day);
        const result: CalendarEvent[] = [];
        const dayOfWeek = DateTimeService.dayOfWeek(day.getDay());

        for (let event of freshEvents) {
            const shouldApply = event.repeatOn.some((x) => x === dayOfWeek);

            if (shouldApply) {
                const eventCopy = { ...event };
                eventCopy.date = day;

                result.push(eventCopy);
            }
        }

        return result;
    }
}
