import { PaymentElement, useElements, useStripe } from '@stripe/react-stripe-js';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

interface CheckoutFormProps {
  deliveryPrice: number;
}

const CheckoutForm: React.FC<CheckoutFormProps> = ({ deliveryPrice }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [clientSecret, setClientSecret] = useState('');
  const [paymentSuccess, setPaymentSuccess] = useState(false); // State for payment success
  const router:any = useRouter();

  useEffect(() => {
    console.log("Delivery Price: " + deliveryPrice)
    const createPaymentIntent = async () => {
      const res = await fetch("/api/create-intent", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          amount: deliveryPrice
        }),
      });

      const data = await res.json();
      setClientSecret(data.clientSecret);
    };

    if (deliveryPrice > 0) {
      createPaymentIntent();
    }
  }, [deliveryPrice]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!elements || !stripe) {
      return;
    }

    // First, call elements.submit()
    const { error: submitError } = await elements.submit();
    if (submitError) {
      console.error(submitError);
      return;
    }

    // Then, confirm the payment
    const { error } = await stripe.confirmPayment({
      clientSecret: clientSecret,
      elements,
      confirmParams: {
        return_url: "http://localhost:3000/dashboard",
      }
    });
  };

  return (
    <div className='flex flex-col justify-center items-center w-full bg-white'>
      {paymentSuccess && <p className="text-green-500">Payment successful! Redirecting to dashboard...</p>} {/* Display success message */}
      <form className='max-w-md mt-40' onSubmit={handleSubmit}>
        <PaymentElement />
        <button className='w-full bg-customDark p-2 rounded-lg mt-10' type='submit' disabled={!stripe || !elements || !clientSecret}>
          Pay
        </button>
      </form>
    </div>
  );
}

export default CheckoutForm;
