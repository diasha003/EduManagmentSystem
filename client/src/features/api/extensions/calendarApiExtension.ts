import { EventModel } from '../../../models/api/eventModel';
import { EventsFilter } from '../../../models/api/eventsFilter';
import { baseApi } from '../api';

export const calendarApiExtensions = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        createEvent: builder.mutation<void, EventModel>({
            query: (data) => ({
                url: '/calendar/event',
                method: 'POST',
                body: data
            })
        }),
        getEvents: builder.query<EventModel[], EventsFilter>({
            query: (data) => ({
                url: '/calendar/search',
                method: 'POST',
                body: data
            })
        })
    })
});

export const { useCreateEventMutation, useGetEventsQuery } = calendarApiExtensions;
