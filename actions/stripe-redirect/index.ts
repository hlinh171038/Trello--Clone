"use server"

import { auth, currentUser } from "@clerk/nextjs"
import { InputType,ReturnType } from "./types"
import { absoluteUrl } from "@/lib/utils"
import { db } from "@/lib/db"
import { stripe } from "@/lib/stripe"
import { revalidatePath } from "next/cache"
import { createSafeAction } from "@/lib/create-safe-action"
import { StripDirection } from "./schema"


const handler = async (data:InputType):Promise<ReturnType> =>{
    const {orgId,userId} = auth();
    const user = await currentUser()

    if(!orgId || !userId || !user) {
        return {
            error:"unauthozired"
        }
    }

    const settingsUrl = absoluteUrl(`/organization/${orgId}`)

    let url ="";

    try {
        const orgSubscription = await db.orgSubcription.findUnique({
            where: {orgId}
        })

        //check have subscription and stripeCustomerId
        if(orgSubscription && orgSubscription.stripeCustomerId) {
            const stripeSession = await stripe.billingPortal.sessions.create({
                customer: orgSubscription.stripeCustomerId,
                return_url: settingsUrl
            });

            url = stripeSession.url;
        } else {
            const stripeSession = await stripe.checkout.sessions.create({
                success_url:settingsUrl,
                cancel_url: settingsUrl,
                payment_method_types:["card"],
                mode: "subscription",
                billing_address_collection: "auto",
                customer_email: user.emailAddresses[0].emailAddress,
                line_items: [
                    {
                        price_data: {
                            currency: "USD",
                            product_data: {
                                name:"Taskify Pro",
                                description: "Unlimited boards for your organization"
                            },
                            unit_amount: 2000,
                            recurring: {
                                interval: "month"
                            }
                        },
                        quantity: 1,
                    }
                ],
                metadata: {
                    orgId,
                }
            });

            url = stripeSession.url || "";
        }
      
    } catch {
        return {
            error: "Something went wrong!"
        }
    }

    revalidatePath(`/organization/${orgId}`);
    return {data:url};
}

export const stripeRedirect = createSafeAction(StripDirection, handler)

// --> execute in modal, createa api web hook