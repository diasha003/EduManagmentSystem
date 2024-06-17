import { CreateEventPaymentDto } from 'shared/models';
import { baseApi } from '../api';

export const paymentApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        assignPayment: builder.mutation<void, CreateEventPaymentDto>({
            query: (paymentData) => ({
                url: '/payment',
                method: 'POST',
                body: paymentData
            })
        })
    })
});

export const { useAssignPaymentMutation } = paymentApi;
export const {
    endpoints: { assignPayment }
} = paymentApi;
