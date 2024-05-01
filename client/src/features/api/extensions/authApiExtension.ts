import { IAuthState, ILoginRequest, IRegisterRequest } from '../../../models/api/auth/auth.user';
import { authActions } from '../../store/slices/authSlice';
import { baseApi } from '../api';

export const authApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation<IAuthState, ILoginRequest>({
            query: (userData) => ({
                url: '/auth/login',
                method: 'POST',
                body: userData
            }),
            async onQueryStarted(arg, api) {
                
                try {
                    const { data } = await api.queryFulfilled;
                    console.log(data);
                    api.dispatch(authActions.setCredentials(data));
                   
                } catch (error) {
                    console.log(error);
                }
            }
        }),

        register: builder.mutation<IAuthState, IRegisterRequest>({
            query: (userData) => ({
                url: '/auth/register',
                method: 'POST',
                body: userData
            }),
            async onQueryStarted(arg, api) {
                try {
                    const { data } = await api.queryFulfilled;
                    api.dispatch(authActions.setCredentials(data));
                    //console.log(await api.queryFulfilled);
                } catch (error) {
                    console.log(error);
                }
            }
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
