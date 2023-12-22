import Stripe from 'stripe'
import {headers} from 'next/headers'
import { NextResponse } from 'next/server'

import {db} from '@/lib/db'
import {stripe} from '@/lib/stripe'

export async function POST(req:Request) {
    const body = await req.text();
    const signature = headers().get("Stripe-Signature") as string;

    let event: Stripe.Event;

    try {
        event = stripe.webhooks.constructEvent(
            body,
            signature,
            process.env.STRIPE_WEBHOOK_SECRET!,
        )
    } catch (error) {
        return new NextResponse('Webhook error', {status: 400})
    }
    
    // CREDIT CARD
    const session = event.data.object as Stripe.Checkout.Session;

    if(event.type ==="checkout.session.completed") {
        const subscription = await stripe.subscriptions.retrieve(
            session.subscription as string
        );

        if(!session?.metadata?.orgId) {
            return new NextResponse("Org ID is required", {status: 400})
        }

        await db.orgSubcription.create({
            data: {
                orgId: session?.metadata?.orgId,
                stripeSubscriptionId: subscription.id,
                stripeCustomerId: subscription.customer as string,
                stripePriceId: subscription.items.data[0].price.id,
                stripeCurrentPeriodEnd: new Date(
                    subscription.current_period_end * 1000
                )
            }
        })
    }

    // renew their subscription
    if (event.type === "invoice.payment_succeeded") {
        const subscription = await stripe.subscriptions.retrieve(
            session.subscription as string
        )

        await db.orgSubcription.update({
            where: {
                stripeSubscriptionId: subscription.id
            },
            data:{
                stripePriceId: subscription.items.data[0].price.id,
                stripeCurrentPeriodEnd: new Date(
                    subscription.current_period_end * 1000,
                )
            }
        })
    }
    return new NextResponse(null, {status: 200})
}