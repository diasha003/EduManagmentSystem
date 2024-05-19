import { BaseQueryFn, FetchArgs, FetchBaseQueryError, createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { RootState } from '../store';

const baseQuery = fetchBaseQuery({
    baseUrl: 'http://localhost:5000',
    credentials: 'include',

    prepareHeaders(headers, api) {
        headers.set('Content-type', 'application/json; charset=UTF-8');

        const accessToken = (api.getState() as RootState).auth.token;

        if (accessToken) {
            headers.set('authorization', `Bearer ${accessToken}`);
            return headers;
        }
    }
});

export const baseQueryWithErrorHandling: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = async (args, api, extraOptions) => {
    const result = await baseQuery(args, api, extraOptions);

    if (result.error) {
        if (result.error.status.toString().startsWith('4')) {
            console.log('Client error', result.error);
        } else if (result.error.status.toString().startsWith('5')) {
            console.log('Server error', result.error);
            //window.location.replace('/error');
        } else {
            console.log('Unknown error', result.error);
            //window.location.replace('/error');
        }
    }

    return result;
};

export const baseQueryWithDateParsing: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = async (args, api, extraOptions) => {
    const result = await baseQueryWithErrorHandling(args, api, extraOptions);
    const data = result.data as any;

    const parseDates = (entity: any) => Object.keys(entity ?? {}).forEach((key) => {
        if (!entity) return;
        const lowerKey = key.toLowerCase();
        if (lowerKey.indexOf('date') !== -1 || lowerKey.indexOf('utc') !== -1 || lowerKey.indexOf('time') !== -1 || lowerKey.indexOf('lt') !== -1) {
            entity[key] = new Date(entity[key])
        }
    });

    if (!Array.isArray(data)) {
        parseDates(data);
    }
    else {
        (data as any[]).forEach(x => parseDates(x))
    }

    return result;
};

export const baseApi = createApi({
    reducerPath: 'baseApi',
    baseQuery: baseQueryWithDateParsing,
    refetchOnMountOrArgChange: true,
    tagTypes: ['Employee'],
    endpoints: () => ({})
});
