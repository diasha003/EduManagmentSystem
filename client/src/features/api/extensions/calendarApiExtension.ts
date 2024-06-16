import { EventsFilter, EventDto, CreateEventDto, EventDetailsDto } from 'shared/models';
import { baseApi } from '../api';

export const calendarApiExtensions = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        createEvent: builder.mutation<void, CreateEventDto>({
            query: (data) => ({
                url: '/calendar/event',
                method: 'POST',
                body: data
            }),
            invalidatesTags: ['Events']
        }),
        getEvents: builder.query<EventDto[], EventsFilter>({
            query: (data) => ({
                url: '/calendar/search',
                method: 'POST',
                body: data
            }),
            providesTags: ['Events']
        }),
        getEventDetails: builder.query<EventDetailsDto, number>({
            query: (data) => ({
                url: `/calendar/${data}`,
                method: 'GET'
            }),
            providesTags: ['Events']
        })
    })
});

export const { useCreateEventMutation, useGetEventsQuery, useGetEventDetailsQuery } = calendarApiExtensions;
