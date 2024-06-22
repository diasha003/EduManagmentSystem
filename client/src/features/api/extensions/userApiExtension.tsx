import { User } from 'shared/models';
import { baseApi } from '../api';

export const userApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getAllUser: builder.query<User[], void>({
            query: () => ({
                url: `/user/all`,
                method: 'GET'
            }),
            providesTags: ['Users']
        })
    })
});

export const { useGetAllUserQuery } = userApi;
