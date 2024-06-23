import React, { useEffect, useState } from 'react';
import { PaymentElement, LinkAuthenticationElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { StripePaymentElementOptions } from '@stripe/stripe-js';
import { useNavigate } from 'react-router-dom';
import { Button } from 'antd';
import { useConfirmTransactionMutation } from '../../../features/api/extensions/paymentApiExtension';
import { SerializedError } from '@reduxjs/toolkit';
import { ConfirmationResultDto } from 'shared/models';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';

export default function CheckoutForm(props: { transactionId: number }) {
    const navigate = useNavigate();
    const stripe = useStripe();
    const elements = useElements();

    const [confirm] = useConfirmTransactionMutation();
    const [_email, setEmail] = useState('');
    const [message, setMessage] = useState<string | null | undefined>(null);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const init = async () => {
            if (!stripe) return;

            const clientSecret = new URLSearchParams(window.location.search).get('payment_intent_client_secret');

            if (!clientSecret) {
                return;
            }

            const { paymentIntent } = await stripe.retrievePaymentIntent(clientSecret);

            switch (paymentIntent?.status) {
                case 'succeeded':
                    const result = await confirm({
                        intentId: paymentIntent.id,
                        transactionId: props.transactionId
                    });

                    break;
                case 'processing':
                    setMessage('Your payment is processing.');
                    break;
                case 'requires_payment_method':
                    setMessage('Your payment was not successful, please try again.');
                    break;
                case 'requires_capture':
                    // TODO:
                    break;
                default:
                    setMessage('Something went wrong.');
                    break;
            }
        };

        init();
    }, [stripe]);

    const handleSubmit = async (e: any) => {
        e.preventDefault();

        if (!stripe || !elements) {
            // Stripe.js has not yet loaded.
            // Make sure to disable form submission until Stripe.js has loaded.
            return;
        }

        setIsLoading(true);

        const res = await stripe.confirmPayment({
            elements,
            redirect: 'if_required',
            confirmParams: {
                // Make sure to change this to your payment completion page
                return_url: `${window.location.origin}/calendar`
            }
        });

        if (!res.error) {
            const result = await confirm({
                intentId: res.paymentIntent.id,
                transactionId: props.transactionId
            });

            const resultAsError = result as {
                error: FetchBaseQueryError | SerializedError;
            };

            if (resultAsError.error) {
                return;
            }

            const resultAsData = result as {
                data: ConfirmationResultDto;
            };

            if (resultAsData.data.receiptUrl) window.open(resultAsData.data.receiptUrl, '_blank')?.focus();

            navigate('/calendar');
            return;
        }

        // This point will only be reached if there is an immediate error when
        // confirming the payment. Otherwise, your customer will be redirected to
        // your `return_url`. For some payment methods like iDEAL, your customer will
        // be redirected to an intermediate site first to authorize the payment, then
        // redirected to the `return_url`.
        if (res.error.type === 'card_error' || res.error.type === 'validation_error') {
            setMessage(res.error?.message ?? '');
        } else {
            setMessage('An unexpected error occurred.');
        }

        setIsLoading(false);
    };

    const paymentElementOptions: StripePaymentElementOptions = {
        layout: 'tabs'
    };

    return (
        <form id="payment-form" onSubmit={handleSubmit}>
            <LinkAuthenticationElement id="link-authentication-element" onChange={(e: any) => setEmail(e.value.email)} />
            <PaymentElement id="payment-element" options={paymentElementOptions} className="mb-2" />
            <Button disabled={isLoading || !stripe || !elements} htmlType="submit">
                <span id="button-text">{isLoading ? <div className="spinner" id="spinner"></div> : 'Pay now'}</span>
            </Button>
            {/* Show any error or success messages */}
            {message && <div id="payment-message">{message}</div>}
        </form>
    );
}
