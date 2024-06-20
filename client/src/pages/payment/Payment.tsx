import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { useEffect, useState } from 'react';
import CheckoutForm from './components/CheckoutForm';
import { useCreateIntentMutation } from '../../features/api/extensions/paymentApiExtension';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { SerializedError } from '@reduxjs/toolkit';
import { stripePromise } from '../../features/store/stripeStore';

const Payment: React.FC = () => {
    const [clientSecret, setClientSecret] = useState('');
    const [createIntent] = useCreateIntentMutation();

    useEffect(() => {
        const init = async () => {
            const response = await createIntent({});
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
                    <CheckoutForm />
                </Elements>
            ) : (
                <></>
            )}
        </div>
    );
};

export default Payment;
