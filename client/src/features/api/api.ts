import { BaseQueryFn, FetchArgs, FetchBaseQueryError, createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { RootState } from '../store';

const baseQuery = fetchBaseQuery({
    baseUrl: 'http://localhost:5000',
    credentials: 'include',
    prepareHeaders: (headers, { getState }) => {
        headers.set('Content-type', 'application/json; charset=UTF-8');

        // const token = (getState() as RootState).auth.user?.access_token;
        // if (token) {
        //     headers.set('authorization', `Bearer ${token}`);
        //     return headers;
        // }
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

export const baseApi = createApi({
    reducerPath: 'baseApi',
    baseQuery: baseQueryWithErrorHandling,

    refetchOnMountOrArgChange: true,
    //tagTypes: ['Advert', 'Orders', 'Reviews', 'Categories', 'Chat'],
    endpoints: () => ({})
});
