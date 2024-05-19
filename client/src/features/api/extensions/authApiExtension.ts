import { LoginRequest, CreateUserDto} from 'shared/models'
import { IAuthState } from '../../../models/api/auth/auth.user';
import { authActions } from '../../store/slices/authSlice';
import { baseApi } from '../api';

export const authApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation<IAuthState, LoginRequest>({
            query: (userData) => ({
                url: '/auth/login',
                method: 'POST',
                body: userData
            }),
            async onQueryStarted(arg, api) {
                try {
                    const { data } = await api.queryFulfilled;

                    api.dispatch(authActions.setCredentials(data));
                } catch (error) {
                    console.log(error);
                }
            }
        }),

        register: builder.mutation<IAuthState, CreateUserDto>({
            query: (userData) => ({
                url: '/auth/register',
                method: 'POST',
                body: userData
            }),
            async onQueryStarted(arg, api) {
                try {
                    const { data } = await api.queryFulfilled;
                    api.dispatch(authActions.setCredentials(data));
                } catch (error) {
                    console.log(error);
                }
            }
        }),

    })
});

export const { useLoginMutation, useRegisterMutation } = authApi;
export const {
    endpoints: { login, register }
} = authApi;
