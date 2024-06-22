import { ConfirmTransactionDto, CreateEventPaymentDto, CreateIntentDto, EventPaymentDto, IntentDto } from 'shared/models';
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
        }),
        createIntent: builder.mutation<IntentDto, CreateIntentDto>({
            query: (payload) => ({
                url: '/payment/pay',
                method: 'POST',
                body: payload
            })
        }),
        confirmTransaction: builder.mutation<void, ConfirmTransactionDto>({
            query: (payload) => ({
                url: '/payment/confirm',
                method: 'POST',
                body: payload
            })
        })
    })
});

export const { useAssignPaymentMutation, useGetAllTransactionQuery, useCreateIntentMutation, useConfirmTransactionMutation } = paymentApi;
export const {
    endpoints: { assignPayment, getAllTransaction, createIntent, confirmTransaction }
} = paymentApi;
