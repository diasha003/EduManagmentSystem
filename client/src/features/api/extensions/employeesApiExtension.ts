import { IAuthState, ILoginRequest, IRegisterRequest } from '../../../models/api/auth/auth.user';
import { IEmployeeRequest } from '../../../models/api/employee/employee';
import { authActions } from '../../store/slices/authSlice';
import { baseApi } from '../api';

export const employeesApiExtensions = baseApi.injectEndpoints({
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
        create: builder.mutation<void, IEmployeeRequest>({
            query: (userData) => ({
                url: '/employee',
                method: 'POST',
                body: userData
            }),
            async onQueryStarted(arg, api) {
                try {
                    // const { data } = await api.queryFulfilled;
                    // api.dispatch(authActions.setCredentials(data));
                    // //console.log(await api.queryFulfilled);
                } catch (error) {
                    console.log(error);
                }
            }
        })
    })
});

export const { useLoginMutation, useCreateMutation } = employeesApiExtensions;
export const {
    endpoints: { login, create }
} = employeesApiExtensions;
