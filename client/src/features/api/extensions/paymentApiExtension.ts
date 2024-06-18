import { CreateEventPaymentDto, EventPaymentDto } from 'shared/models';
import { baseApi } from '../api';

export const paymentApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        assignPayment: builder.mutation<void, CreateEventPaymentDto>({
            query: (paymentData) => ({
                url: '/payment',
                method: 'POST',
                body: paymentData
            })
        }),
        getAllTransaction: builder.query<EventPaymentDto[], void>({
            query: () => ({
                url: '/payment',
                method: 'GET'
            }),
            providesTags: ['Transaction']
        })
    })
});

export const { useAssignPaymentMutation, useGetAllTransactionQuery } = paymentApi;
export const {
    endpoints: { assignPayment }
} = paymentApi;
