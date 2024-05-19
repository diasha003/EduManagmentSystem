import { EventsFilter, EventDto } from 'shared/models';
import { baseApi } from '../api';


export const calendarApiExtensions = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        createEvent: builder.mutation<void, EventDto>({
            query: (data) => ({
                url: '/calendar/event',
                method: 'POST',
                body: data
            })
        }),
        getEvents: builder.query<EventDto[], EventsFilter>({
            query: (data) => ({
                url: '/calendar/search',
                method: 'POST',
                body: data
            })
        })
    })
});

export const { useCreateEventMutation, useGetEventsQuery } = calendarApiExtensions;
