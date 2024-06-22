import { useEffect, useState } from 'react';

import { Elements } from '@stripe/react-stripe-js';
import { SerializedError } from '@reduxjs/toolkit';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';

import CheckoutForm from './components/CheckoutForm';
import { useCreateIntentMutation } from '../../features/api/extensions/paymentApiExtension';
import { stripePromise } from '../../features/store/stripeStore';
import { useParams } from 'react-router-dom';

const Payment: React.FC = () => {
    const { transactionId } = useParams();
    const [clientSecret, setClientSecret] = useState('');
    const [createIntent] = useCreateIntentMutation();

    useEffect(() => {
        const init = async () => {
            const response = await createIntent({ transactionId: +transactionId! });
            const errorResponse = response as { error: FetchBaseQueryError | SerializedError };

            if (errorResponse.error) {
                console.log('Error', errorResponse);
                // Handle error
            } else {
                const succeededResponse = response as { data: any };
                console.log(succeededResponse);
                setClientSecret(succeededResponse.data.clientSecret);
            }
        };

        init();
    }, []);

    const appearance = {
        theme: 'stripe'
    };
    const options = {
        clientSecret,
        appearance
    };

    return (
        <div className="App">
            {clientSecret ? (
                <Elements options={options as any} stripe={stripePromise}>
                    <CheckoutForm transactionId={+transactionId!} />
                </Elements>
            ) : (
                <></>
            )}
        </div>
    );
};

export default Payment;
