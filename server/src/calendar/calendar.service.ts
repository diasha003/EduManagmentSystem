import { Injectable } from '@nestjs/common';
import { CalendarEvent, DayOfWeek, Frequency, RepeatMonthly, User } from '@prisma/client';
import { DateTimeService } from 'shared/services';
import { EventsFilter, EventDto, CreateEventDto, EventDetailsDto } from 'shared/models';

import { DatabaseService } from 'src/database/database.service';

type CalendarEventTeacherIncluded = CalendarEvent & { teacher: User };

@Injectable()
export class CalendarService {
    constructor(private readonly prisma: DatabaseService) {}

    async createEvent(dto: CreateEventDto) {
        const event = this.prisma.calendarEvent.create({
            data: {
                ...dto,
                frequency: dto.frequency as Frequency,
                repeatOnDaily: dto.repeatOnDaily as DayOfWeek[],
                repeatOnMonthly: dto.repeatOnMonthly as RepeatMonthly
            }
        });

        return event;
    }

    async getEventDetails(id: number) {
        const event = await this.prisma.calendarEvent.findFirst({
            where: {
                id: id
            },
            include: {
                teacher: true,
                student: true
            }
        });

        return {
            date: event.date,
            duration: event.duration,
            teacher: {
                ...event.teacher
            },
            students: [
                {
                    ...event.student
                }
            ]
        } as EventDetailsDto;
    }

    async getEvents(dto: EventsFilter) {
        const events = await this.prisma.calendarEvent.findMany({
            where: {
                AND: [
                    {
                        OR: [{ teacherId: dto.userId }, { studentId: dto.userId }]
                    },
                    {
                        OR: [
                            {
                                AND: [
                                    { frequency: null },
                                    {
                                        date: {
                                            gte: dto.dateFrom,
                                            lte: dto.dateTo
                                        }
                                    }
                                ]
                            },
                            {
                                AND: [
                                    { frequency: { not: null } },
                                    {
                                        OR: [
                                            { repeatUntil: null },
                                            {
                                                repeatUntil: {
                                                    gte: dto.dateFrom
                                                }
                                            }
                                        ]
                                    }
                                ]
                            }
                        ]
                    }
                ]
            },
            orderBy: {
                date: 'asc'
            },
            include: {
                teacher: true
            }
        });

        const result = this.buildEvents(events, dto);
        return result.sort((a, b) => a.date.getTime() - b.date.getTime());
    }

    private buildEvents(source: CalendarEventTeacherIncluded[], filter: EventsFilter) {
        const daysBetween = DateTimeService.daysBetween(new Date(filter.dateFrom), new Date(filter.dateTo));
        const result: EventDto[] = [];
        const dailyRepeatableEvents: CalendarEventTeacherIncluded[] = source.filter((x) => x.frequency === Frequency.Daily);
        const weeklyRepeatableEvents: CalendarEventTeacherIncluded[] = source.filter((x) => x.frequency === Frequency.Weekly && x.everyWeek);
        const monthlyRepeatableEvents: CalendarEventTeacherIncluded[] = source.filter((x) => x.frequency === Frequency.Monthly && x.everyMonth);
        const yearlyRepeatableEvents: CalendarEventTeacherIncluded[] = source.filter((x) => x.frequency === Frequency.Yearly && x.everyYear);

        for (let day of daysBetween) {
            const date = DateTimeService.date(day.getFullYear(), day.getMonth(), day.getDate());

            const applicableDailyEvents = dailyRepeatableEvents.filter((x) => DateTimeService.date(x.date.getFullYear(), x.date.getMonth(), x.date.getDate()) <= date);
            const applicableWeeklyEvents = weeklyRepeatableEvents.filter((x) => DateTimeService.date(x.date.getFullYear(), x.date.getMonth(), x.date.getDate()) <= date);
            const applicableMonthlyEvents = monthlyRepeatableEvents.filter((x) => DateTimeService.date(x.date.getFullYear(), x.date.getMonth(), x.date.getDate()) <= date);
            const applicableYearlyEvents = yearlyRepeatableEvents.filter((x) => DateTimeService.date(x.date.getFullYear(), x.date.getMonth(), x.date.getDate()) <= date);

            const dailyRepeatedEvents = this.buildApplicableDailyEvents(day, applicableDailyEvents);
            const weeklyRepeatedEvents = this.buildApplicableWeeklyEvents(day, applicableWeeklyEvents);
            const monthlyRepeatedEvents = this.buildApplicableMonthlyEvents(day, applicableMonthlyEvents);
            const yearlyRepeatedEvents = this.buildApplicableYearlyEvents(day, applicableYearlyEvents);

            result.push(...dailyRepeatedEvents.map((x) => ({ ...x, teacherDisplayName: `${x.teacher.firstName} ${x.teacher.lastName}` }) as EventDto));
            result.push(...weeklyRepeatedEvents.map((x) => ({ ...x, teacherDisplayName: `${x.teacher.firstName} ${x.teacher.lastName}` }) as EventDto));
            result.push(...monthlyRepeatedEvents.map((x) => ({ ...x, teacherDisplayName: `${x.teacher.firstName} ${x.teacher.lastName}` }) as EventDto));
            result.push(...yearlyRepeatedEvents.map((x) => ({ ...x, teacherDisplayName: `${x.teacher.firstName} ${x.teacher.lastName}` }) as EventDto));

            const originalEvents = source.filter((x) => DateTimeService.isSameDate(day, x.date));
            for (let event of originalEvents) {
                if (originalEvents) {
                    result.push({
                        ...event,
                        teacherDisplayName: `${event.teacher.firstName} ${event.teacher.lastName}`
                    });
                }
            }
        }

        return result;
    }

    private buildApplicableDailyEvents(day: Date, dailyRepeatableEvents: CalendarEventTeacherIncluded[]) {
        const freshEvents = dailyRepeatableEvents.filter((x) => !x.repeatUntil || x.repeatUntil > day);
        const result: CalendarEventTeacherIncluded[] = [];
        const dayOfWeek = DateTimeService.dayOfWeek(day.getDay());

        for (let event of freshEvents) {
            const shouldApply = event.repeatOnDaily.some((x) => x === dayOfWeek);

            if (shouldApply) {
                const eventCopy = { ...event };
                eventCopy.date = DateTimeService.addTime(day, event.date.getHours(), event.date.getMinutes());

                result.push(eventCopy);
            }
        }

        return result;
    }

    private buildApplicableWeeklyEvents(day: Date, weeklyRepeatableEvents: CalendarEventTeacherIncluded[]) {
        const freshEvents = weeklyRepeatableEvents.filter((x) => !x.repeatUntil || x.repeatUntil > day);
        const result: CalendarEventTeacherIncluded[] = [];

        for (let event of freshEvents) {
            const dayDiff = DateTimeService.diffDays(day, event.date);
            const weekDiff = dayDiff / 7;
            const shouldApply = weekDiff % event.everyWeek === 0 && day.getDay() === event.date.getDay() && !DateTimeService.isSameDate(event.date, day);

            if (shouldApply) {
                const eventCopy = { ...event };
                eventCopy.date = DateTimeService.addTime(day, event.date.getHours(), event.date.getMinutes());

                result.push(eventCopy);
            }
        }

        return result;
    }

    private buildApplicableMonthlyEvents(day: Date, monthlyRepeatableEvents: CalendarEventTeacherIncluded[]) {
        const freshEvents = monthlyRepeatableEvents.filter((x) => !x.repeatUntil || x.repeatUntil > day);
        const result: CalendarEventTeacherIncluded[] = [];

        for (let event of freshEvents) {
            const monthDiff = DateTimeService.diffMonths(day, event.date);

            let shouldApply = monthDiff % event.everyMonth === 0 && !DateTimeService.isSameDate(event.date, day);
            if (event.repeatOnMonthly === RepeatMonthly.EVERY_NTH_DATE) {
                shouldApply = shouldApply && day.getDate() === event.date.getDate();
            } else if (event.repeatOnMonthly === RepeatMonthly.EVERY_NTH_DAY) {
                const eventDateWeek = DateTimeService.numberOfWeek(event.date);
                const dayWeek = DateTimeService.numberOfWeek(day);

                shouldApply = shouldApply && eventDateWeek === dayWeek && event.date.getDay() === day.getDay();
            } else {
                throw new Error(`Unknown RepeatMonthly value: ${event.repeatOnMonthly}`);
            }

            if (shouldApply) {
                const eventCopy = { ...event };
                eventCopy.date = DateTimeService.addTime(day, event.date.getHours(), event.date.getMinutes());

                result.push(eventCopy);
            }
        }

        return result;
    }

    private buildApplicableYearlyEvents(day: Date, yearlyRepeatableEvents: CalendarEventTeacherIncluded[]) {
        const freshEvents = yearlyRepeatableEvents.filter((x) => !x.repeatUntil || x.repeatUntil > day);
        const result: CalendarEventTeacherIncluded[] = [];

        for (let event of freshEvents) {
            const yearDiff = DateTimeService.diffYears(day, event.date);
            const shouldApply = yearDiff % event.everyYear === 0 && day.getDate() === event.date.getDate() && day.getMonth() === event.date.getMonth() && !DateTimeService.isSameDate(event.date, day);

            if (shouldApply) {
                const eventCopy = { ...event };
                eventCopy.date = DateTimeService.addTime(day, event.date.getHours(), event.date.getMinutes());

                result.push(eventCopy);
            }
        }

        return result;
    }
}
