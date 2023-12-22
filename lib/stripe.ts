import Stripe from 'stripe'

// stripe declared

export const stripe = new Stripe(process.env.STRIPE_API_KEY!, {
    apiVersion: "2023-10-16",
    typescript: true,
}) 


//lib to checkout subscription to confirm that we have active subscription-->
