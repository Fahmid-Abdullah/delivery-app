"use client"
import React, { useEffect } from 'react'
import { loadStripe } from '@stripe/stripe-js';
import CheckoutForm from '@/components/Payment/checkoutform';
import { Elements } from '@stripe/react-stripe-js';

export default function page() {
  const urlParams = new URLSearchParams(window.location.search);
  const deliveryPrice = Number(urlParams.get('deliveryPrice'));
  const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as any);

  // Reload the page until deliveryPrice is not equal to 0
  useEffect(() => {
    if (deliveryPrice === 0) {
      window.location.reload();
    }
  }, [deliveryPrice]);

  const options:any = {
    mode: 'payment',
    amount: deliveryPrice * 100, // Stripe expects the amount in cents
    currency: 'cad',
  };

  return (
    <Elements stripe={stripePromise} options={options}>
      <CheckoutForm deliveryPrice={deliveryPrice} />
    </Elements>
  )
}
