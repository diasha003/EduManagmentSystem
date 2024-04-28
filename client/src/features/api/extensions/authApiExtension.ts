import { IAuthUser, ILoginRequest, IRegisterRequest } from '../../../models/api/auth/auth.user';
import { baseApi } from '../api';

export const authApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation<ILoginRequest, IAuthUser>({
            query: (userData) => ({
                url: '/user/login',
                method: 'POST',
                body: userData
            })
        }),

        register: builder.mutation<IRegisterRequest, IAuthUser>({
            query: (userData) => ({
                url: '/auth/register',
                method: 'POST',
                body: userData
            })
        })

        // current: builder.query<IAuthFields, void>({
        //     query: () => ({
        //         url: '/user/current',
        //         method: 'GET'
        //     })
        // })
    })
});

export const { useLoginMutation, useRegisterMutation } = authApi;
export const {
    endpoints: { login, register }
} = authApi;
